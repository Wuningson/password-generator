#!/usr/bin/env node

import { createCommand } from 'commander';
import chalk from 'chalk';
import clipboardy from 'clipboardy';
import {
  encrypt,
  writeToFile,
  inputIsValid,
  passwordGenerator,
} from './utils/generatePassword';

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

  interface ProgramOptions {
    characterSet: string;
    save?: boolean;
    length?: number;
    filename: string;
  }

  const { characterSet, save, length, filename } = program.opts<
    ProgramOptions
  >();

  log({ characterSet, save, length, filename });

  if (inputIsValid(characterSet)) {
    const password = passwordGenerator(characterSet, length);
    if (save) {
      const hashed = encrypt(password);
      writeToFile(hashed, filename);
      log(chalk.blueBright('Encoded password written to file'));
    }

    await clipboardy.write(password);
    log(chalk.greenBright('Password copied to clipboard'));
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
