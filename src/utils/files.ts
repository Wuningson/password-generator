import fs from 'fs';
import chalk from 'chalk';

const log = console.log;
export const writeToFile = (hashedPassword: string, fileName: string) => {
  fs.writeFile(`${fileName}.txt`, hashedPassword, err => {
    if (err) {
      log(chalk.redBright(err.message));
    }
  });
};
