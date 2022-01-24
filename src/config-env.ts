const fs = require('fs');
require('dotenv').config();

let apiURL, mqttServer, mqttPort, mqttProtocol, stripeKey;

apiURL = process.env.API_URL;
mqttServer = process.env.MQTT_SERVER;
mqttProtocol = process.env.MQTT_PROTOCOL || 'ws';
mqttPort = process.env.MQTT_PORT || 15675;
stripeKey = process.env.STRIPE_KEY;

const targetPath = `./src/environments/environment.prod.ts`;
const envConfigFile = `
export const environment = {
  production: true,
  mqtt: {
    server: '${mqttServer}',
    protocol: '${mqttProtocol}',
    port: ${mqttPort},
  },
  http: {
    url: 'http://localhost:3000'
  },
  stripeKey: '${stripeKey}'
};
 `.trim();

fs.writeFile(targetPath, envConfigFile,  (err: any) => {
  if (err) {
    console.log(err);
  }
});
