import initServer from './server'
import dotenv from 'dotenv'
import initDB from './dbconfig/db'

// for local dev
if (process.env.ENV != "live") {
  dotenv.config()
}

initDB();

const port: number = parseInt(process.env.PORT || '4000');

console.log(`init server at port ${port} in env ${process.env.ENV}`);
const server = initServer(port);

process.on('uncaughtException', function (err) {
  console.error(err.stack); // either logs on console or send to other server via api call.
})

console.log('starting server');
server();

console.log('server started');
