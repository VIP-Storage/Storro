const fs = require('fs');
require('dotenv').config();

let apiURL, mqttServer, mqttPort, mqttProtocol, stripeKey, googleMapsKey;

apiURL = process.env.API_URL;
mqttServer = process.env.MQTT_SERVER;
mqttProtocol = process.env.MQTT_PROTOCOL || 'ws';
mqttPort = process.env.MQTT_PORT || 15675;
stripeKey = process.env.STRIPE_KEY;
googleMapsKey = process.env.GMAP_KEY;

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
    url: '${apiURL}',
  },
  stripeKey: '${stripeKey}',
  googleMapsKey: '${googleMapsKey}'
};
 `.trim();

fs.writeFile(targetPath, envConfigFile,  (err: any) => {
  if (err) {
    console.log(err);
  }
});
