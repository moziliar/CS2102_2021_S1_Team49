import initServer from './server'
import dotenv from 'dotenv'

// for local dev
dotenv.config()

const port: number = parseInt(process.env.PORT || '4000');

console.log('init server');
const server = initServer(port);

console.log('starting server');
server.start();

console.log('server started');
