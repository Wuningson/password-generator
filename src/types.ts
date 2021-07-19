export type CharsetType =
  | 'all'
  | 'numeric'
  | 'special'
  | 'alphabetic'
  | 'alphanumeric';

export interface ProgramOptions {
  save?: boolean;
  length?: number;
  filename: string;
  characterSet: string;
}
