import { createContext, Dispatch, SetStateAction } from 'react';

export type SentenceObject = {
  original: string;
  translation: string;
  tags: string[];
};


export type FileData = {
    name: string | null,
    text: string | null,
    parsed: SentenceObject[] | null
  };

export type FileContextType = [FileData, Dispatch<SetStateAction<FileData>>];

export const FileContext = createContext<FileContextType>([{ name: null, text: null, parsed: [] }, () => {}]);

export type LocalStorageFile = {
  name: string,
  text: string
}

