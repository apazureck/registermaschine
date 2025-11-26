import { languages } from 'monaco-editor';
import {
  REGISTERMASCHINE_MEMORY_KEYWORDS,
  REGISTERMASCHINE_OTHER_KEYWORDS,
  REGISTERMASCHINE_PROGRAM_KEYWORDS,
} from './language-metadata';

export function getRegistermaschineSyntax(): languages.IMonarchLanguage {
  return {
    ignoreCase: true,
    program_keywords: REGISTERMASCHINE_PROGRAM_KEYWORDS,
    memory_keywords: REGISTERMASCHINE_MEMORY_KEYWORDS,
    other_keywords: REGISTERMASCHINE_OTHER_KEYWORDS,

    // The main tokenizer for our languages
    tokenizer: {
      root: [
        // identifiers and keywords
        [
          /^\w+/,
          {
            cases: {
              '@program_keywords': {
                token: 'keyword',
              },
              '@memory_keywords': {
                token: 'constant',
              },
              '@other_keywords': {
                token: 'type',
              },
            },
          },
        ],

        // whitespace
        { include: '@whitespace' },
      ],

      comment: [[/[;#]/, 'comment', '@comment']],

      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/;.*/, 'comment'],
      ],
    },
  };
}
