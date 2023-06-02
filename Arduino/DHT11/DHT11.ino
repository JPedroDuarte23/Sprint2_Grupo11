#include "DHT.h"
#define dht_type DHT11 //define qual o tipo de sensor DHTxx que se está utilizando

int dht_pin = A0;
DHT dht_1 = DHT(dht_pin, dht_type); //pode-se configurar diversos sensores DHTxx
void setup()
{
  Serial.begin(9600);
  dht_1.begin();
}/* A */
void loop()
{
  /**
    Bloco do DHT11
  */
  float umidade = dht_1.readHumidity();
  float temperatura = dht_1.readTemperature();
  float sensor1_umidade = umidade;
  float sensor1_temperatura = temperatura;
  float sensor2_umidade = umidade;
  float sensor2_temperatura = temperatura;
  float sensor3_umidade = umidade;
  float sensor3_temperatura = temperatura;
  float sensor4_umidade = umidade;
  float sensor4_temperatura = temperatura;
  if (isnan(temperatura) or isnan(umidade))
  {
    Serial.println("Erro ao ler o DHT");
  }
  else
  { 
    Serial.print(sensor1_umidade);
    Serial.print(";");
    Serial.print(sensor1_temperatura);
    Serial.print  (";");
    
    Serial.print(sensor2_umidade);
    Serial.print(";");
    Serial.print(sensor2_temperatura);
    Serial.print  (";");
    
    Serial.print(sensor3_umidade);
    Serial.print(";");
    Serial.print(sensor3_temperatura);
    Serial.print  (";");
    
    Serial.print(sensor4_umidade);
    Serial.print(";");
    Serial.print(sensor4_temperatura);
    Serial.println  (";");
  }
  delay(2000);
}
