#include<Servo.h>
#define TRIG 3
#define ECHO 14
#define SER 11
Servo serwater;
long duration,cm ;
long micro(long microse)
  {
  return microse / 29 / 2;
  }
void setup() {
  pinMode(TRIG,OUTPUT);
  pinMode(ECHO,INPUT);
  serwater.attach(SER);
  serwater.write(0);
  Serial.begin(9600);

}
int web=0;
void loop() {
  digitalWrite(TRIG,LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG,HIGH);
  delayMicroseconds(5);
  digitalWrite(TRIG,LOW);
  duration=pulseIn(ECHO,HIGH);
  cm=micro(duration);
  Serial.println(cm);
  delay(1000);
  /*if( web == 1){
    serwater.write(90);}
  else{
    serwater.write(0);}*/
    
  
  

}
