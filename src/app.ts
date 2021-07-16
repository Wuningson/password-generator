#!/usr/bin/env node

import chalk from 'chalk';
import clipboardy from 'clipboardy';
import { ProgramOptions } from './types';
import { createCommand } from 'commander';
import { writeToFile } from './utils/files';
import { inputIsValid, passwordGenerator } from './utils/generatePassword';

const main = async () => {
  const log = console.log;
  const program = createCommand();

  program.version('1.0.0').description('CLI password generator');

  program
    .option('-s, --save', 'Save to file')
    .option('-l, --length <length>', 'Password length')
    .option(
      '-f, --filename <filename>',
      'Filename for password file',
      'password'
    )
    .option(
      '-c, --characterSet <characterSet>',
      `Character set for generating the password. One of 'all', 'numeric', 'special', 'alphabetic' and 'alphanumeric'`,
      'all'
    );

  program.parse();

  const { characterSet, save, length, filename } =
    program.opts<ProgramOptions>();

  if (inputIsValid(characterSet)) {
    const password = passwordGenerator(characterSet, length);
    if (save) {
      writeToFile(password, filename);
      log(chalk.blueBright(`Password written to file ${filename}.txt\n`));
    }

    await clipboardy.write(password);
    log(chalk.greenBright('Password copied to clipboard.'));
    process.exit();
  } else {
    log(
      chalk.redBright(
        `Invalid input type.\ntype should be one of 'all', 'numeric', 'special', 'alphabetic' and 'alphanumeric'`
      )
    );
    process.exit(1);
  }
};

main();
