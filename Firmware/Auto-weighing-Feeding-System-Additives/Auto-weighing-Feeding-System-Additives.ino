#include <ArduinoHttpClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <Servo.h>
#include <HX711.h>


class Res {
  private:
    int status;
    String data;

  public:
    //constructor 1
    Res(int initStatus, String initData) {
      this->status = initStatus;
      this->data = initData;
    }

    //constructor 2
    Res(int initStatus) {
      this->status = initStatus;
    }

    //constructor 3
    Res(String initData) {
      this->data = initData;
    }

    //constructor 4
    Res() {
      
    }

    int getStatus() {
      return this->status;
    }

    void setStatus(int val) {
      this->status = val;
    }

    void setData(String data) {
      this->data = data;
    }

    String getData() {
      return this->data;
    }
};

class Blend {
  private:
    String type;
    int add1Weight;
    int add2Weight;
    int add3Weight;

  public:
    //constructor 1
    Blend(String _type, int _add1Weight, int _add2Weight, int _add3Weight) {
      this->type = _type;
      this->add1Weight = _add1Weight;
      this->add2Weight = _add2Weight;
      this->add3Weight = _add3Weight;
    }

    String getType() {
      return this->type;
    }

    int getAdd1Weight() {
      return this->add1Weight;
    }

    int getAdd2Weight() {
      return this->add2Weight;
    }

    int getAdd3Weight() {
      return this->add3Weight;
    }
};


/*
 *   SERVO STATUS 
 *   true -> open
 *   false -> closed
 *
 *   SELECTED BLEND
 *   0 -> none
 *   1 -> sewer
 *   2 -> upvc
 *   3 -> mpvc
 *   4 -> conduit
 *   5 -> hdpe
 */

Servo servo1; 
Servo servo2;
Servo servo3;
int openDeg = 90;
int closeDeg = 0;
bool servo1Status, servo2Status, servo3Status; 

// hx711 object
HX711 scale;
uint8_t dataPin = 16;
uint8_t clockPin = 4;

const char* ssid     = "test";
const char* password = "12345677";

char serverAddress[] = "10.42.0.1";  // server address
int port = 5000;

WiFiClient wifi;
HttpClient client = HttpClient(wifi, serverAddress, port);

String servoOpenEndpoint = "/servo";
String servoCloseEndpoint = "/servo";
String weightEndpoint = "/weight";
String pvcEndpoint = "/pvc";
String completeEndpoint = "/complete";

Blend sewer("Sewer", 2, 3, 4);
Blend upvc("U-PVC", 4, 3, 5);
Blend mpvc("M-PVC", 3, 5, 1);
Blend conduit("Conduit", 5, 4, 3);
Blend hdpe("HDPE", 1, 6, 3);

int selectedBlend;

void setup() {
  servo1.attach(12);  // attaches the servo on pin 12 to the servo object
  servo2.attach(13);  // attaches the servo on pin 13 to the servo object
  servo3.attach(14);  // attaches the servo on pin 14 to the servo object
  delay(1000);
  servo1.write(closeDeg);
  servo2.write(closeDeg);
  servo3.write(closeDeg);
  servo1Status = false;
  servo2Status = false;
  servo3Status = false;
  selectedBlend = 0;
  
  Serial.begin(9600);
  while(!Serial){delay(100);}

  scale.begin(dataPin, clockPin);
  // Obtained from HX711 calibration
  scale.set_offset(35644);
  scale.set_scale(9.298984);

  Serial.println();
  Serial.println("******************************************************");
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


Res PostHttpRequest(String endpoint, String body = "") {
  Res httpResponse;

  client.beginRequest();
  client.post(endpoint);
  client.sendHeader("Content-Type", "application/json");
  client.sendHeader("Content-Length", body.length());
  client.sendHeader("Connection", "close");
  client.beginBody();
  client.print(body);
  httpResponse.setStatus(client.responseStatusCode());
  httpResponse.setData(client.responseBody());
  client.endRequest();

  return httpResponse;
}

Res GetHttpRequest(String endpoint, String body = "") {
  Res httpResponse;

  client.beginRequest();
  client.get(endpoint);
  client.sendHeader("Content-Type", "application/json");
  client.sendHeader("Content-Length", body.length());
  client.sendHeader("Connection", "close");
  client.beginBody();
  client.print(body);
  httpResponse.setStatus(client.responseStatusCode());
  httpResponse.setData(client.responseBody());
  client.endRequest();

  return httpResponse;
}

void loop(){
  while (selectedBlend == 0) {
    // get selected blend from server
    Res selectedRes = GetHttpRequest(pvcEndpoint);
    if (selectedRes.getStatus() == 200) {
      selectedBlend = selectedRes.getData().toInt();
    }
  }

  switch (selectedBlend) {
    case 1:
      mixAdditives(sewer);
      break;
    case 2:
      mixAdditives(upvc);
      break;
    case 3:
      mixAdditives(mpvc);
      break;
    case 4:
      mixAdditives(conduit);
      break;
    case 5:
      mixAdditives(hdpe);
      break;
    default:
      selectedBlend = 0;
      break;
  }

  delay(250);
}

void openServo1() {
  for(int deg = closeDeg; deg <= openDeg; deg++) {
    servo1.write(deg);
    delay(50);
  }

  servo1Status = true;
}

void openServo2() {
  for(int deg = closeDeg; deg <= openDeg; deg++) {
    servo2.write(deg);
    delay(50);
  }

  servo2Status = true;
}

void openServo3() {
  for(int deg = closeDeg; deg <= openDeg; deg++) {
    servo3.write(deg);
    delay(50);
  }

  servo3Status = true;
}

void closeServo1() {
  for(int deg = openDeg; deg >= closeDeg; deg--) {
    servo1.write(deg);
    delay(50);
  }

  servo1Status = false;
}

void closeServo2() {
  for(int deg = openDeg; deg >= closeDeg; deg--) {
    servo2.write(deg);
    delay(50);
  }

  servo2Status = false;
}

void closeServo3() {
  for(int deg = openDeg; deg >= closeDeg; deg--) {
    servo3.write(deg);
    delay(50);
  }

  servo3Status = false;
}

void mixAdditives(Blend blend) {
  Serial.print("Loading ");
  Serial.println(blend.getType());
  JsonDocument weightObject;
  String weightObjectString;

  JsonDocument servoObject;
  String servoObjectString;

  JsonDocument completeObject;
  String completeObjectString;

  openServo1();
  // send servo status to server
  servoObject["status"] = servo1Status;
  servoObject["servo"] = 1;

  serializeJson(servoObject, servoObjectString);
  Serial.print("Server servo 1 open status update response status: ");
  Serial.println(PostHttpRequest(servoOpenEndpoint, servoObjectString).getStatus());

  // send loading process status to server
  completeObject["data"] = false;

  serializeJson(completeObject, completeObjectString);
  Serial.print("Loading not complete status update response status: ");
  Serial.println(PostHttpRequest(completeEndpoint, completeObjectString).getStatus());

  while (scale.get_units(20) < blend.getAdd1Weight()) {
    servo1.write(openDeg);
  }
  closeServo1();
  servo1.write(closeDeg);
  // send servo status to server
  servoObject["status"] = servo1Status;
  servoObject["servo"] = 1;

  serializeJson(servoObject, servoObjectString);
  Serial.print("Server servo 1 close status update response status: ");
  Serial.println(PostHttpRequest(servoCloseEndpoint, servoObjectString).getStatus());

  // send current weight to server
  weightObject["data"] = blend.getAdd1Weight();
  serializeJson(weightObject, weightObjectString);
  Serial.print("Server current weight update response status: ");
  Serial.println(PostHttpRequest(weightEndpoint, weightObjectString).getStatus());

  openServo2();
  // send servo status to server
  servoObject["status"] = servo2Status;
  servoObject["servo"] = 2;

  serializeJson(servoObject, servoObjectString);
  Serial.print("Server servo 2 open status update response status: ");
  Serial.println(PostHttpRequest(servoOpenEndpoint, servoObjectString).getStatus());
  while (scale.get_units(20) < blend.getAdd1Weight() + blend.getAdd2Weight()) {
    servo2.write(openDeg);
  }
  closeServo2();
  servo2.write(closeDeg);

  // send servo status to server
  servoObject["status"] = servo2Status;
  servoObject["servo"] = 2;

  serializeJson(servoObject, servoObjectString);
  Serial.print("Server servo 2 close status update response status: ");
  Serial.println(PostHttpRequest(servoCloseEndpoint, servoObjectString).getStatus());

  // send current weight to server
  weightObject["data"] = blend.getAdd1Weight() + blend.getAdd2Weight();
  serializeJson(weightObject, weightObjectString);
  Serial.print("Server current weight update response status: ");
  Serial.println(PostHttpRequest(weightEndpoint, weightObjectString).getStatus());

  openServo3();
  // send servo status to server
  servoObject["status"] = servo3Status;
  servoObject["servo"] = 3;

  serializeJson(servoObject, servoObjectString);
  Serial.print("Server servo 3 open status update response status: ");
  Serial.println(PostHttpRequest(servoOpenEndpoint, servoObjectString).getStatus());

  while (scale.get_units(20) < blend.getAdd1Weight() + blend.getAdd2Weight() + blend.getAdd3Weight()) {
    servo3.write(openDeg);
  }
  closeServo3();
  servo3.write(closeDeg);

  // send servo status to server
  servoObject["status"] = servo3Status;
  servoObject["servo"] = 3;

  serializeJson(servoObject, servoObjectString);
  Serial.print("Server servo 3 close status update response status: ");
  Serial.println(PostHttpRequest(servoCloseEndpoint, servoObjectString).getStatus());

  // send current weight to server
  weightObject["data"] = blend.getAdd1Weight() + blend.getAdd2Weight() + blend.getAdd3Weight();
  serializeJson(weightObject, weightObjectString);
  Serial.print("Server current weight update response status: ");
  Serial.println(PostHttpRequest(weightEndpoint, weightObjectString).getStatus());

  // send selected blend to server
  selectedBlend = 0;
  JsonDocument selectedObject;
  String selectedObjectString;
  selectedObject["data"] = selectedBlend;
  serializeJson(selectedObject, selectedObjectString);
  Serial.print("Server selected blend update response status: ");
  Serial.println(PostHttpRequest(pvcEndpoint, selectedObjectString).getStatus());

  // send loading process status to server
  completeObject["data"] = true;

  serializeJson(completeObject, completeObjectString);
  Serial.print("Loading complete status update response status: ");
  Serial.println(PostHttpRequest(completeEndpoint, completeObjectString).getStatus());
}