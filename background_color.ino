#define R 6
#define G 5
#define B 3

void setup() {
  Serial.begin(9600);
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);

  analogWrite(R, LOW);
  analogWrite(G, LOW);
  analogWrite(B, LOW);

  Serial.println("Ready for commands");
}

void serialEvent() {

  char c = Serial.read();
  int i;

  byte rgb[3];

  switch( c ) {
  case '#':

    for(i=0;i<=2;i++) {
      rgb[i] = readPair();
    }

    analogWrite(R, rgb[0]);
    analogWrite(G, rgb[1]);
    analogWrite(B, rgb[2]);
    break;
  }
}

byte readPair() {
  char data[2];
  byte pair;
  if(Serial.readBytes(data, 2)) {
    return getHex(data[0], data[1]);
  }
}

byte getVal(char c)
{
  if(c >= '0' && c <= '9')
    return (byte)(c - '0');
  if(c >= 'A' && c <= 'F')
    return (byte)(c-'A'+10);
  if(c >= 'a' && c <= 'f')
    return (byte)(c-'a'+10);
  return 0;
}

byte getHex(char c, char d) {    
  return (getVal(c) << 4) + getVal(d);
}

void loop() {
}

