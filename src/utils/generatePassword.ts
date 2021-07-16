import fs from 'fs';
import chalk from 'chalk';
import crypto from 'crypto';
import randomstring from 'randomstring';

const log = console.log;

const allCharSet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`@#$%^&*()_+-=|\\{}[]"":;/?>.<,\'\'';

const specialCharSet = '~`@#$%^&*()_+-=|\\{}[]"":;/?>.<,\'\'';

export type CharsetType =
  | 'all'
  | 'numeric'
  | 'special'
  | 'alphabetic'
  | 'alphanumeric';

const charsetOptions = [
  'all',
  'numeric',
  'special',
  'alphabetic',
  'alphanumeric',
];

const algorithm = 'aes256';
const salt = 'jCb17JEozZ9V6chPGnOmyg91SZnJtxi37';
const encoding = 'base64';

export const encrypt = (text: string) => {
  const cipher = crypto.createCipher(algorithm, salt);
  return cipher.update(text, 'utf8', encoding) + cipher.final(encoding);
};

export const decrypt = (hash: string) => {
  const decipher = crypto.createDecipher(algorithm, salt);
  return decipher.update(hash, encoding, 'utf8') + decipher.final('utf8');
};

export const inputIsValid = (input: string): input is CharsetType =>
  charsetOptions.includes(input);

const selectCharSet = (type: CharsetType) => {
  switch (type) {
    case 'numeric':
    case 'alphabetic':
    case 'alphanumeric':
      return type;
    case 'special':
      return specialCharSet;
    case 'all':
    default:
      return allCharSet;
  }
};

export const passwordGenerator = (type: CharsetType, length = 8): string => {
  const options = {
    length,
    charset: selectCharSet(type),
  };
  return randomstring.generate(options);
};

export const writeToFile = (hashedPassword: string, fileName: string) => {
  fs.writeFile(`${fileName}.txt`, hashedPassword, err => {
    if (err) {
      log(chalk.redBright(err.message));
    } else {
      log(chalk.blueBright('Password file created'));
    }
  });
};

export const readFileContent = (path: string) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      log(chalk.redBright(err.message));
    }
    log(chalk.blueBright(data));
  });
};
