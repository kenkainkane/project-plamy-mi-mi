#include <SoftwareSerial.h>
#include <Servo.h>
#include "DHT.h"
#define TRIG 2
#define ECHO 14
#define SER 3
#define LDR 15
#define DHTPIN 8
#define DHTTYPE DHT11 
#define MOTERBA 6
#define MOTERBB 4
#define MOTERAA 9
#define MOTERAB 7

DHT dht(DHTPIN,DHTTYPE);
int buz_sta = 1;
long micro(long microse)
{
  return microse / 29 / 2;
}
Servo servod;

SoftwareSerial se_read(12, 13); // write only
SoftwareSerial se_write(10, 11); // 10->7, 11->8

struct ProjectData {
  int32_t cur_pos;  //0, 1, 2
  int32_t watering; //-1, 0, n
  int32_t readysts; //0, 1
  int32_t lux; //100, 202, ...
  float humid; 
  float temperature;
} project_data = {0,0,0,100,65.5,25.5};

struct ServerData {
  int32_t goto_pos; //0, 1
  int32_t watering; //-1, 0, 100
  int32_t e_stop; //0, 1
} server_data = {0, 0, 0};

const char GET_SERVER_DATA = 1;
const char GET_SERVER_DATA_RESULT = 2;
const char UPDATE_PROJECT_DATA = 3;
const char UPDATE_CURRENT_POSSITION = 4;

void send_to_nodemcu(char code, void *data, char data_size) {
  char *b = (char*)data; 
  char sent_size = 0;
  while (se_write.write(code) == 0) {
    delay(1);
  }
  while (sent_size < data_size) {
    sent_size += se_write.write(b, data_size);
    delay(1);
  }
}
//=================Method
long dis(){
  delay(200);
  digitalWrite(TRIG,LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG,HIGH);
  delayMicroseconds(5);
  digitalWrite(TRIG,LOW);
  long tmp = micro(pulseIn(ECHO,HIGH));
  Serial.println(tmp);
  return tmp;
}
void walk(int cur_pos,int goto_pos){
  while(cur_pos!=goto_pos)
  {
    /*Serial.print("cur_pos");
    Serial.println(cur_pos);
    Serial.print("target_pos");
    Serial.println(goto_pos);*/
    if(cur_pos<goto_pos){
      //Serial.println("if 1");
      analogWrite(MOTERBA,47);
      digitalWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,100);
      digitalWrite(MOTERAB,LOW);
      while(dis()<10){
        Serial.print("on base");
        Serial.println(dis());
      }
      //Serial.print(dis());
      while(dis()>10)
      {
        Serial.print("on the way");
        Serial.println(dis());
      }
      delay(1000);
      analogWrite(MOTERBA,LOW);
      digitalWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,LOW);
      digitalWrite(MOTERAB,LOW);
      cur_pos++;
    }
    else{
      analogWrite(MOTERBA,LOW);
      digitalWrite(MOTERBB,100);
      analogWrite(MOTERAA,LOW);
      digitalWrite(MOTERAB,100);
      while(dis()<10){
        delay(200);
      }
      while(dis()>10)
      {
        delay(200);
      }
      delay(1000);
      analogWrite(MOTERBA,LOW);
      digitalWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,LOW);
      digitalWrite(MOTERAB,LOW);
      cur_pos--;
    } 
  }
    Serial.println("out!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");
}

//================EndMethod
void setup() {


  pinMode(LDR,INPUT);
  Serial.begin(115200);
  se_read.begin(38400);
  se_write.begin(38400);
  //walk(0,1);
  while (!se_read.isListening()) {
    se_read.listen();
  }
  Serial.println((int)sizeof(ServerData));
  Serial.println("Connected to NodeMCU!");
}

uint32_t last_sent_time = 0;
uint32_t last_get_time = 0;

boolean is_data_header = false;
char expected_data_size = 0;
char cur_data_header = 0;
char buffer[256];
int8_t cur_buffer_length = -1;
int32_t b = -1;
void loop() {
  delay(500);
  uint32_t cur_time = millis();
  
  if (cur_time - last_get_time > 1000) {//always update
    send_to_nodemcu(GET_SERVER_DATA, &server_data, sizeof(ServerData));

    last_get_time = cur_time;
  }
  if (cur_time - last_sent_time > 10000) {//always update
    send_to_nodemcu(UPDATE_PROJECT_DATA, &project_data, sizeof(ProjectData));

    last_sent_time = cur_time;
  }
  //READ SENSOR
  project_data.lux = analogRead(LDR);
  project_data.temperature = dht.readTemperature();
  project_data.humid = dht.readHumidity();
  
  while (se_read.available()) {
    char ch = se_read.read();
    Serial.print("RECV: ");
    Serial.println((byte)ch);
    if (cur_buffer_length == -1) {
      cur_data_header = ch;
      switch (cur_data_header) {
        case GET_SERVER_DATA_RESULT:
          expected_data_size = sizeof(ServerData);
          cur_buffer_length = 0;
          break;
      }
    } else if (cur_buffer_length < expected_data_size) {
      buffer[cur_buffer_length++] = ch;
      if (cur_buffer_length == expected_data_size) {
        switch (cur_data_header) {
          case GET_SERVER_DATA_RESULT: {
            ServerData *data = (ServerData*)buffer;
            //use data to control sensor
            Serial.print("target_pos: ");
            Serial.println(data->goto_pos);
            Serial.print("watering: ");
            Serial.println(data->watering);
            Serial.print("e_stop: ");
            Serial.println(data->e_stop);
            if(data->goto_pos!=project_data.cur_pos){
              walk(0,1);
            }
            
            //send_to_nodemcu(UPDATE_PROJECT_DATA, &project_data, sizeof(ProjectData));
            //Serial.println("Send data");
          } break;
        }
        cur_buffer_length = -1;
      }
    }
  }
}

