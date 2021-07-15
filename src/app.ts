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

const log = console.log;
const program = createCommand();

program.version('1.0.0').description('CLI password generator');

program
  .option('-s, --save', 'Save to file')
  .option('-l, --length <length>', 'Password length')
  .option('-f, --filename', 'Filename for password file', 'password')
  .option(
    '-c, --character-set <type>',
    `Character set for generating the password. One of 'all', 'numeric', 'special', 'alphabetic' and 'alphanumeric'`,
    'all'
  );

program.parse();

interface ProgramOptions {
  type: string;
  save?: boolean;
  length?: number;
  filename: string;
}

const { type, save, length, filename } = program.opts<ProgramOptions>();

log({ type, save, length, filename });

if (inputIsValid(type)) {
  const password = passwordGenerator(type, length);
  if (save) {
    const hashed = encrypt(password);
    writeToFile(hashed, filename);
    log(chalk.blueBright('Encoded password written to file'));
  }

  clipboardy.write(password);
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
