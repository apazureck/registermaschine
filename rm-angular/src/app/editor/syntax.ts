import { languages } from 'monaco-editor';

export function getRegistermaschineSyntax(): languages.IMonarchLanguage {
  return {
    ignoreCase: true,
    program_keywords: [
      'ADD',
      'SUB',
      'MUL',
      'DIV',
      'LDA',
      'LDK',
      'STA',
      'INP',
      'OUT',
    ],
    memory_keywords: ['JMP', 'JEZ', 'JNZ', 'JNE', 'JLZ', 'JLE', 'JGZ', 'JGE'],

    other_keywords: ['HLT'],

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
