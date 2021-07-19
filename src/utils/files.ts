import fs from 'fs';
import chalk from 'chalk';

const log = console.log;
export const writeToFile = (password: string, fileName: string) => {
  fs.writeFile(`${fileName}.txt`, password, err => {
    if (err) {
      log(chalk.redBright(err.message));
    }
  });
};
