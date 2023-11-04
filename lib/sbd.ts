import * as tokenizer from 'sbd';

type TranslationObject = {
    original: string;
    translation: string;
    tags: string[];
  };

export default function detectSentences(text: string){
    const optional_options = {};
    const sentences = tokenizer.sentences(text, optional_options);
    const objectsInArray: TranslationObject[] = sentences.map((sentence:string) => ({
        original: sentence,
        translation: "",
        tags: []
      }));
     
    return objectsInArray;
}