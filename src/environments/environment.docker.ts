export const environment = {
  production: true,
  mqtt: {
    server: $ENV.mqttWSURL,
    protocol: "ws",
    port: $ENV.mqttWSPort
  },
  http: {
    url: $ENV.apiURL
  }
};

