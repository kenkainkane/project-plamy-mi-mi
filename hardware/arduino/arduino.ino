#include <SoftwareSerial.h>
#include<Servo.h>

int buz_sta = 1;
Servo servod;

SoftwareSerial se_read(12, 13); // write only
SoftwareSerial se_write(10, 11); // read only

struct ProjectData {
  int32_t cur_pos;  //0, 1, 2
  int32_t watering; //-1, 0, n
  int32_t readysts; //0, 1
  int32_t lux; //100, 202, ...
  float humit; 
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

void setup() {
  Serial.begin(115200);
  se_read.begin(38400);
  se_write.begin(38400);
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
            
            
            //send_to_nodemcu(UPDATE_PROJECT_DATA, &project_data, sizeof(ProjectData));
            //Serial.println("Send data");
          } break;
        }
        cur_buffer_length = -1;
      }
    }
  }
}

