#include<Servo.h>
#define TRIG 3
#define ECHO 14
#define SER 5
#define SW 0
#define MOTERBA 6
#define MOTERBB 9
#define MOTERAA 11
#define MOTERAB 10
Servo serwater;
long disAv = 0;
int sw;
//int cur_pos=0,goto_pos=10;
long micro(long microse)
  {
  return microse / 29 / 2;
  }
void setup() {
  pinMode(SW,INPUT);
  pinMode(TRIG,OUTPUT);
  pinMode(ECHO,INPUT);
  pinMode(MOTERBA,OUTPUT);
  pinMode(MOTERBB,OUTPUT);
  pinMode(MOTERAA,OUTPUT);
  pinMode(MOTERAB,OUTPUT);
  serwater.attach(SER);
  serwater.write(180);
  Serial.begin(9600);

}
long dis(){
  int i;
  delay(200);
  for(i=0;i<1;i++)
  {
    digitalWrite(TRIG,LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG,HIGH);
    delayMicroseconds(5);
    digitalWrite(TRIG,LOW);
    //disAv = (disAv*9 + micro(pulseIn(ECHO,HIGH)) )/10;
  }
  return micro(pulseIn(ECHO,HIGH));
}
void walk(int cur_pos,int goto_pos){
  /*while(cur_pos!=goto_pos){
    //if(cur_pos<goto_pos){
      Serial.println(dis());
      Serial.println("A");
      delay(5000);
    while(dis()<10){
      
      Serial.println("B");
      delay(2000);
      analogWrite(MOTERBA,100);
      analogWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,100);
      analogWrite(MOTERAB,LOW);
      Serial.println(dis());
    } 
    Serial.println(dis());
    if(dis()>10){
      Serial.println("C");
      analogWrite(MOTERBA,LOW);
      analogWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,LOW);
      analogWrite(MOTERAB,LOW);    
      }
    delay(5000);
    while(dis()>10){
      Serial.print("D");
      analogWrite(MOTERBA,100);
      analogWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,100);
      analogWrite(MOTERAB,LOW);
    }
    //}
  }*/
  while(cur_pos!=goto_pos)
  {
    Serial.print("cur_pos");
    Serial.println(cur_pos);
    Serial.print("target_pos");
    Serial.println(goto_pos);
    if(cur_pos<goto_pos){
      Serial.println("if 1");
      analogWrite(MOTERBA,100);
      analogWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,100);
      analogWrite(MOTERAB,LOW);
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
      analogWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,LOW);
      analogWrite(MOTERAB,LOW);
      cur_pos++;
    }
    else{
      analogWrite(MOTERBA,LOW);
      analogWrite(MOTERBB,100);
      analogWrite(MOTERAA,LOW);
      analogWrite(MOTERAB,100);
      while(dis()<10){
        delay(200);
      }
      while(dis()>10)
      {
        delay(200);
      }
      delay(1000);
      analogWrite(MOTERBA,LOW);
      analogWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,LOW);
      analogWrite(MOTERAB,LOW);
      cur_pos--;
      }
      
    }
    Serial.println("out!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");
}
void loop() {
  /*analogWrite(MOTERBA,200);
      analogWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,200);
      analogWrite(MOTERAB,LOW);
      delay(5000);
      analogWrite(MOTERBA,LOW);
      analogWrite(MOTERBB,LOW);
      analogWrite(MOTERAA,LOW);
      analogWrite(MOTERAB,LOW);
      delay(5000);
  */
  walk(0,1);
  //delay(10000);
  //Serial.println(dis());
  delay(10000);
  sw=digitalRead(SW);
  if( sw == 0){
    serwater.write(90);}
  else{
    serwater.write(180);}
}
