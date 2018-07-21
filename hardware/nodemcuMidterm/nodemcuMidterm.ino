#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <EspSoftwareSerial.h>
#include <math.h>

SoftwareSerial se_read(D5, D6); // write only
SoftwareSerial se_write(D0, D1); // read only
String const url = "http://ecourse.cpe.ku.ac.th:1515/api/";

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
} server_data = {0,1,0,1};

const char GET_SERVER_DATA = 1;
const char GET_SERVER_DATA_RESULT = 2;
const char UPDATE_PROJECT_DATA = 3;

// wifi configuration
const char SSID[] = "KUWIN_FRONT_RIGHT_2.4GHz";
const char PASSWORD[] = "1234567890";

// for nodemcu communication
uint32_t last_sent_time = 0;
char expected_data_size = 0;
char cur_data_header = 0;
char buffer[256];
int8_t cur_buffer_length = -1;

void send_to_arduino(char code, void *data, char data_size) {
  char *b = (char*)data;
  int sent_size = 0;
  while (se_write.write(code) == 0) {
    delay(1);
  }
  while (sent_size < data_size) {
    sent_size += se_write.write(b, data_size);
    delay(1);
  }
}

void wifi_initialization() {
  Serial.println("WIFI INITIALIZING.");

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    yield();
    delay(10);
  }

  Serial.println("WIFI INITIALIZED.");
}

void serial_initialization() {
  Serial.begin(115200);
  se_read.begin(38400);
  se_write.begin(38400);

  while (!se_read.isListening()) {
    se_read.listen();
  }

  Serial.println();
  Serial.println("SERIAL INITIALIZED.");
}

String set_builder(const char *key, int32_t value) {
  String str = url;
  str = str + key;
  str = str + "/set?value=";
  str = str + value;
  Serial.println(str);
  return str;
}

String get_builder(const char *key) {
  String str = url;
  str = str + key;
  str = str + "/view/";
  return str;
}

void update_data_to_server_callback(String const &str) {
  Serial.println("update_data_to_server_callback FINISHED!");
}

bool GET(const char *url, void (*callback)(String const &str,int32_t &value), int32_t &value) {
  HTTPClient main_client;
  main_client.begin(url);
  if (main_client.GET() == HTTP_CODE_OK) {
    Serial.println("GET REQUEST RESPONSE BEGIN");
    if (callback != 0) {
      callback(main_client.getString(),value);
    }
    delay(200);
    return true;
  }
  Serial.println("GET REQUEST RESPONSE BEGIN");
  return false;
}
bool GET(const char *url, void (*callback)(String const &str,float &value), float &value) {
  HTTPClient main_client;
  main_client.begin(url);
  if (main_client.GET() == HTTP_CODE_OK) {
    Serial.println("GET REQUEST RESPONSE BEGIN");
    if (callback != 0) {
      callback(main_client.getString(),value);
    }
    delay(200);
    return true;
  }
  Serial.println("GET REQUEST RESPONSE BEGIN");
  return false;
}

bool POST(const char *url, void (*callback)(String const &str)) {
  HTTPClient main_client;
  main_client.begin(url);
  if (main_client.GET() == HTTP_CODE_OK) {
    Serial.println("POST REQUEST RESPONSE BEGIN");
    if (callback != 0) {
      callback(main_client.getString());
    }
    delay(200);
    return true;
  }
  Serial.println("POST REQUEST RESPONSE BEGIN");
  return false;
}

int get_request_int(String const &str) {
  int32_t tmp = str.toInt();
  return tmp;
}

float get_request_float(String const &str) {
  float tmp = str.toFloat();
  return tmp;
}
void get_request(String const &str, int32_t &value){
  value = get_request_int(str);
}
void get_request(String const &str, float &value){
  value = get_request_float(str);  
}

void get_request_raw_callback(String const &str) {
  Serial.println("GET REQUEST RESPONSE BEGIN");
  Serial.println("========================");
  Serial.println(str.c_str());
  Serial.println("========================");
  Serial.println("GET REQUEST RESPONSE END");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void setup() {
  serial_initialization();
  wifi_initialization();

  Serial.print("sizeof(ServerData): ");
  Serial.println((int)sizeof(ServerData));
  Serial.print("ESP READY!");
}
void loop() {
  /* 1) Server polling data from server every 1500 ms
     2) Arduino always get local data
  */

  uint32_t cur_time = millis();
  if (cur_time - last_sent_time > 1000) {
    //int variable
    //GET("http://ku-exceed-backend.appspot.com/api/exceed-door/view/", get_request,server_data.door);
    //Serial.print("door : ");
    //Serial.println(server_data.door);
    //float variable
    //GET("http://ku-exceed-backend.appspot.com/api/exceed-temperature/view/", get_request,server_data.temp); 
    //Serial.print("temp : ");
    //Serial.println(server_data.temp);
    GET(get_builder("palmmy-test").c_str(), get_request,server_data.light_sw); 
    Serial.print("light_sw : ");
    Serial.println(server_data.light_sw);
    GET(get_builder("palmmy").c_str(), get_request,server_data.air_sw); 
    Serial.print("air_sw : ");
    Serial.println(server_data.air_sw);
    GET(get_builder("palmmy").c_str(), get_request,server_data.door); 
    Serial.print("door : ");
    Serial.println(server_data.door);
    GET(get_builder("palmmy").c_str(), get_request,server_data.bell); 
    Serial.print("bell : ");
    Serial.println(server_data.bell);
    //GET("http://ku-exceed-backend.appspot.com/api/exceed_value/set/?value=test", 0);
    //Serial.println(project_data->light_sw);
    /*POST(set_builder("palmmy-test", project_data.light_sw).c_str(), update_data_to_server_callback);
    POST(set_builder("palmmy", project_data.air_sw).c_str(), update_data_to_server_callback);
    POST(set_builder("palmmy", project_data.door).c_str(), update_data_to_server_callback);
    POST(set_builder("palmmy", project_data.bell).c_str(), update_data_to_server_callback);
    POST(set_builder("palmmy", project_data.lux).c_str(), update_data_to_server_callback);
    POST(set_builder("palmmy", project_data.humit).c_str(), update_data_to_server_callback);
    POST(set_builder("palmmy", project_data.temperature).c_str(), update_data_to_server_callback);
    */        
    
    last_sent_time = cur_time;
  }

  while (se_read.available()) {
    char ch = se_read.read();
    //Serial.print("RECV: ");0
    //Serial.println((byte)ch);
    if (cur_buffer_length == -1) {
      cur_data_header = ch;
      switch (cur_data_header) {
        case UPDATE_PROJECT_DATA:
          expected_data_size = sizeof(ProjectData);
          cur_buffer_length = 0;
          break;
        case GET_SERVER_DATA:
          expected_data_size = sizeof(ServerData);
          cur_buffer_length = 0;
          break;
      }
    } else if (cur_buffer_length < expected_data_size) {
      buffer[cur_buffer_length++] = ch;
      if (cur_buffer_length == expected_data_size) {
        switch (cur_data_header) {
          case UPDATE_PROJECT_DATA: {
              ProjectData *project_data = (ProjectData*)buffer;
              /*float temp = project_data->temp;
              int32_t light_lux = project_data->light_lux;
              int32_t is_button_pressed = project_data->is_button_pressed;
              float sound = project_data->sound;
              int32_t door = project_data->door;
              int32_t plus = project_data->plus;
              Serial.println(plus);
              */
              POST(set_builder("palmmy-light_sw", project_data->light_sw).c_str(), update_data_to_server_callback);
              POST(set_builder("palmmy-air_sw", project_data->air_sw).c_str(), update_data_to_server_callback);
              POST(set_builder("palmmy-door", project_data->door).c_str(), update_data_to_server_callback);
              POST(set_builder("palmmy-bell", project_data->bell).c_str(), update_data_to_server_callback);
              POST(set_builder("palmmy-lux", project_data->lux).c_str(), update_data_to_server_callback);
              POST(set_builder("palmmy-humit", project_data->humit).c_str(), update_data_to_server_callback);
              POST(set_builder("palmmy-temperature", project_data->temperature).c_str(), update_data_to_server_callback);
              /*POST(set_builder("exceed-temp", temp).c_str(), update_data_to_server_callback);
              POST(set_builder("exceed-light_lux", light_lux).c_str(), update_data_to_server_callback);
              POST(set_builder("exceed-is_button_pressed", is_button_pressed).c_str(), update_data_to_server_callback);
              POST(set_builder("exceed-sound", sound).c_str(), update_data_to_server_callback);
              POST(set_builder("exceed-door", door).c_str(), update_data_to_server_callback);
              POST(set_builder("exceed-plus", plus).c_str(), update_data_to_server_callback);*/
            }
            break;
          case GET_SERVER_DATA:
            Serial.println("Send data to arduino");
            send_to_arduino(GET_SERVER_DATA_RESULT, &server_data, sizeof(ServerData));
            break;
        }
        cur_buffer_length = -1;
      }
    }
  }
}
