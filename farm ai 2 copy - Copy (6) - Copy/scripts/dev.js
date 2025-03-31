const concurrently = require('concurrently');

concurrently([
  { 
    command: 'python ml_server/main.py',
    name: 'ML_SERVER',
    prefixColor: 'blue'
  },
  { 
    command: 'npm run dev',
    name: 'NEXT',
    prefixColor: 'green'
  }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
}).then(
  function onSuccess() {
    console.log('All processes exited with code 0');
  },
  function onError(error) {
    console.error('Error occurred:', error);
  }
); 