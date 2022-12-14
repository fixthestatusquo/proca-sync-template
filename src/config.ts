/**
 * What info we need to read actions from Proca action queue?
 * */

export type Configuration = {
  url: string  // the URL of queue server
  queue: string // the queue name
};

export function help() {
  console.error(`edit .env or set --env=path/to/.env:
  PROCA_USERNAME=
  PROCA_PASSWORD=
  PROCA_QUEUE= [eg: cus.123.deliver]
`);
}

// you can also use env vars, or any other config style
export function configFromOptions(opt: any): Configuration {
  if (!process.env.PROCA_QUEUE) throw Error("Provide queue name");
  if (!process.env.PROCA_USERNAME  && !process.env.PROCA_URL) throw Error("Provide queue user");
  if (!process.env.PROCA_PASSWORD && !process.env.PROCA_URL) throw Error("Provide queue password");

  // we allow opt.U to override the url
  return {
    url: process.env.PROCA_URL || `amqps://${process.env.PROCA_USERNAME}:${process.env.PROCA_PASSWORD}@api.proca.app/proca_live`,
    queue: process.env.PROCA_QUEUE,
  };
}


// our default queue server
export const DEFAULT_URL = "amqps://api.proca.app";

