import initServer from './server'

const port = parseInt(process.env.PORT || '4000');

console.log('init server');
const server = initServer(port);

console.log('starting server');
server.start();

console.log('server started');
