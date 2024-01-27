import { exec } from 'child_process';

export async function getCommitedFiles(numCommits) {
    return new Promise((resolve, reject) => {
        const gitCommand = `git diff --name-only HEAD~${numCommits} HEAD`;
    
        exec(gitCommand, (error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }
    
          if (stderr) {
            reject(stderr);
            return;
          }
    
          const modifiedFiles = stdout.split('\n').filter(file => file.trim() !== '');
          console.log(modifiedFiles);
          resolve(modifiedFiles);
        });
      });
}

export async function getModifiedFiles() {
    return new Promise((resolve, reject) => {
        const gitCommand = `git diff --name-only`;
    
        exec(gitCommand, (error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }
    
          if (stderr) {
            reject(stderr);
            return;
          }
    
          const modifiedFiles = stdout.split('\n').filter(file => file.trim() !== '');
          console.log(modifiedFiles);
          resolve(modifiedFiles);
        });
      });
}