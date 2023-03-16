import { exec } from 'child_process';

export default function runScript(req, res) {
  exec('my_script.sh', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running script: ${err}`);
      res.status(500).send('Error running script');
      return;
    }
    console.log(`Script output: ${stdout}`);
    res.status(200).send(stdout);
  });
}