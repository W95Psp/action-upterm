import { spawn, exec } from 'child_process'

export function isInPath(cmd) {
  return new Promise((resolve) => {
    const check = process.platform === "win32" ? "where" : "which";
    exec(`${check} ${cmd}`, (error) => {
      resolve(!error);
    });
  });
}

export const execShellCommand = (cmd) => {
  return new Promise((resolve, reject) => {
    const process = spawn(cmd, [], { shell: '/bin/bash' })
    let stdout = ""
    process.stdout.on('data', (data) => {
      console.log(data.toString());
      stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    process.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(code ? code.toString() : undefined))
      }
      resolve(stdout)
    });
  });
}
