import { CharsetType } from '../types';
import randomstring from 'randomstring';

const allCharSet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`@#$%^&*()_+-=|\\{}[]"":;/?>.<,\'\'';

const specialCharSet = '~`@#$%^&*()_+-=|\\{}[]"":;/?>.<,\'\'';

const charsetOptions = [
  'all',
  'numeric',
  'special',
  'alphabetic',
  'alphanumeric',
];

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
