import { languages  } from 'monaco-editor';

export function getRegistermaschineSyntax(): languages.IMonarchLanguage {
  return {
    ignoreCase: true,
    keywords: [
      'JMP',
      'JEZ',
      'LNE',
      'JLZ',
      'JLE',
      'JGZ',
      'JGE',
      'HLT',
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

    // The main tokenizer for our languages
    tokenizer: {
      root: [
        // identifiers and keywords
        [/^\w+/, { cases: { '@keywords': 'keyword' } }],

        // whitespace
        { include: '@whitespace' },

        // numbers
        [/\d+/, 'constant'],
      ],

      comment: [[/[;#].*/, 'comment']],

      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/;.*/, 'comment'],
      ],
    },
  };
}
