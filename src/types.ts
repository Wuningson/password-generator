export type CharsetType =
  | 'all'
  | 'numeric'
  | 'special'
  | 'alphabetic'
  | 'alphanumeric';

export interface ProgramOptions {
  characterSet: string;
  save?: boolean;
  length?: number;
  filename: string;
}
