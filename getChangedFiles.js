import { exec } from 'child_process';

export async function getChangedFiles(numCommits) {
    if(numCommits === undefined){
        var command = "git diff --name-only HEAD^ HEAD"
    }
    else{
        var command = `git diff --name-only HEAD~${numCommits} HEAD`
    }
    const op = exec(command, { encoding: 'utf-8' }, (error) => {
        if (error) {
            console.error('Unable to check security. Something went wrong');
            return;
        }
    });
    return op;
}