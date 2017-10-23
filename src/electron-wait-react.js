// This script waits for the React dev server to start, then starts Electron.
// Foreman will offset the port number by 100 for processes of different types.
// So, electron-wait-react.js subtracts 100 to set the port number of the
// React dev server correctly.
const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
  client.end();
  if(!startedElectron) {
    console.log('starting electron');
    startedElectron = true;
    const exec = require('child_process').exec;
    exec('npm run electron');
  }
}
);

tryConnection();

client.on('error', (error) => {
  setTimeout(tryConnection, 1000);
});
