const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        production: true,
        mqtt: {
          server: process.env.MQTT_SERVER,
          protocol: "ws",
          port: process.env.MQTT_PORT,
        },
        http: {
          url: process.env.API_URL
        }
      }
    })
  ]
};
