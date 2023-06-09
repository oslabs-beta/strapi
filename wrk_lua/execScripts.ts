import { exec } from 'child_process';

export default function runScript(req, res) {
  exec('ls', (err) => {
    if (err) {
      console.error(`Error running script: ${err}`);
      res.status(500).send('Error running script');
      return;
    }
  });
  exec('chmod +x execWrk2Script.sh', (err) => {
    if (err) {
      console.error(`Error running script: ${err}`);
      res.status(500).send('Error running script');
      return;
    }
  });
  exec('./execWrk2Script.sh', (err) => {
    if (err) {
      console.error(`Error running script: ${err}`);
      res.status(500).send('Error running script');
      return;
    }
  });
}
