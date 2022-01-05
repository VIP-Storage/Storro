const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        apiURL: JSON.stringify(process.env.API_URL),
        mqttWSURL: JSON.stringify(process.env.MQTT_WS_URL),
        mqttWSPort: process.env.MQTT_WS_PORT
      }
    })
  ]
};
