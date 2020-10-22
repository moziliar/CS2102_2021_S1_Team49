import initServer from './server'
import dotenv from 'dotenv'

// for local dev
if (process.env.ENV != "live") {
  dotenv.config()
}

const port: number = parseInt(process.env.PORT || '4000');

console.log(`init server at port ${port} in env ${process.env.ENV}`);
const server = initServer(port);

console.log('starting server');
server();

console.log('server started');
