#include <SoftwareSerial.h>
#include<Servo.h>
#define LEDA 7
#define LEDD 5
#define HUMID
#define SW 2
#define BUZ 9
#define SV 6
#define LDR 14

int buz_sta = 1;
Servo servod;

SoftwareSerial se_read(12, 13); // write only
SoftwareSerial se_write(10, 11); // read only

struct ProjectData {
  int32_t light_sw;
  int32_t air_sw;
  int32_t door;
  int32_t bell;
  int32_t lux;
  float humit;
  float temperature;
} project_data = {0,0,0,0,100,60.6,25.5};

struct ServerData {
  int32_t light_sw;
  int32_t air_sw;
  int32_t door;
  int32_t bell;
} server_data = {0,0,0,0};

const char GET_SERVER_DATA = 1;
const char GET_SERVER_DATA_RESULT = 2;
const char UPDATE_PROJECT_DATA = 3;
const char UPDATE_BELL_DATA = 4;

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

void setup() {
  pinMode(LEDA,OUTPUT);
  pinMode(LEDD,OUTPUT);  
  //pinMode(LDR,INPUT);
  pinMode(SW,INPUT);
  //pinMode(HUMID,INPUT);
  pinMode(BUZ,OUTPUT);
  pinMode(SV,OUTPUT);
  servod.attach(SV);
  servod.write(90);
  //analogWrite(BUZ,LOW);
  digitalWrite(LEDD,LOW);
  digitalWrite(LEDA,LOW);
  
  // put your setup code here, to run once:
  Serial.begin(115200);
  se_read.begin(38400);
  se_write.begin(38400);
  while (!se_read.isListening()) {
    se_read.listen();
  }
  Serial.println((int)sizeof(ServerData));
  Serial.println("ARDUINO READY!");
}
uint32_t ldr_sta=0;
uint32_t last_sent_time = 0;
boolean is_data_header = false;
char expected_data_size = 0;
char cur_data_header = 0;
char buffer[256];
int8_t cur_buffer_length = -1;
int32_t b = -1;
void loop() {
  delay(500);
  uint32_t cur_time = millis();
  ldr_sta=analogRead(LDR);
  project_data.lux = ldr_sta;
  Serial.println(ldr_sta);


  
  if (cur_time - last_sent_time > 2000) {//always update
    send_to_nodemcu(GET_SERVER_DATA, &server_data, sizeof(ServerData));
    send_to_nodemcu(UPDATE_PROJECT_DATA, &project_data, sizeof(ProjectData));

    last_sent_time = cur_time;
  }
  if (!digitalRead(SW))
  {
       tone(BUZ,300,500);
       delay(500);
       tone(BUZ,200,500);
       //data->bell = 0;

       //send_to_nodemcu(UPDATE_BELL_DATA, &project_data, sizeof(ProjectData));
  }
 
  //send to nodemcu
  
  //read data from server pass by nodemcu
  while (se_read.available()) {
    char ch = se_read.read();
    Serial.print("RECV: ");
    Serial.println((byte)ch);
    if (cur_buffer_length == -1) {
      cur_data_header = ch;
      switch (cur_data_header) {
        case GET_SERVER_DATA_RESULT:
        //unknown header
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
            Serial.print("light_sw: ");
            Serial.println(data->light_sw);
            Serial.print("air_sw: ");
            Serial.println(data->air_sw);
            Serial.print("door: ");
            Serial.println(data->door);
            Serial.print("bell: ");
            Serial.println(data->bell);
            
            digitalWrite(LEDD,data->light_sw);
            digitalWrite(LEDA,data->air_sw);
            project_data.light_sw = data->light_sw;
            Serial.println(project_data.light_sw);
            Serial.println(data->light_sw);
            
            project_data.air_sw = data->air_sw;
            if(data->door)
            {
              servod.write(90); 
            }
            else
            {
              servod.write(180);
            }
            project_data.door = data->door;
            if(data->bell)
            {
              tone(BUZ,300,500);
              delay(500);
              tone(BUZ,200,500);
              delay(500);
              data->bell = 0;
              //send_to_nodemcu(UPDATE_BELL_DATA, &project_data, sizeof(ProjectData));
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

