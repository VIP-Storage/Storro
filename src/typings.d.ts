declare var $ENV: Env;

interface Env {
  production: boolean,
  mqtt: {
    server: string,
    protocol: string,
    port: number,
  },
  http: {
    url: string
  }
}
