type InstructionCategory = 'program' | 'memory' | 'other';

export interface RegistermaschineInstruction {
  opcode: string;
  signature: string;
  description: string;
  category: InstructionCategory;
  snippet?: string;
}

export const REGISTERMASCHINE_INSTRUCTIONS: RegistermaschineInstruction[] = [
  {
    opcode: 'JMP',
    signature: 'JMP [Adresse]',
    description: 'Springt zur angegebenen Adresse im Programmspeicher.',
    category: 'memory',
    snippet: 'JMP ${1:Adresse}',
  },
  {
    opcode: 'JEZ',
    signature: 'JEZ [Adresse]',
    description:
      'Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator 0 ist.',
    category: 'memory',
    snippet: 'JEZ ${1:Adresse}',
  },
  {
    opcode: 'JNZ',
    signature: 'JNZ/JNE [Adresse]',
    description:
      'Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator nicht 0 ist.',
    category: 'memory',
    snippet: 'JNZ ${1:Adresse}',
  },
  {
    opcode: 'JNE',
    signature: 'JNE/JNZ [Adresse]',
    description:
      'Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator nicht 0 ist.',
    category: 'memory',
    snippet: 'JNE ${1:Adresse}',
  },
  {
    opcode: 'JLZ',
    signature: 'JLZ [Adresse]',
    description:
      'Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator kleiner als 0 ist.',
    category: 'memory',
    snippet: 'JLZ ${1:Adresse}',
  },
  {
    opcode: 'JLE',
    signature: 'JLE [Adresse]',
    description:
      'Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator kleiner oder gleich 0 ist.',
    category: 'memory',
    snippet: 'JLE ${1:Adresse}',
  },
  {
    opcode: 'JGZ',
    signature: 'JGZ [Adresse]',
    description:
      'Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator größer als 0 ist.',
    category: 'memory',
    snippet: 'JGZ ${1:Adresse}',
  },
  {
    opcode: 'JGE',
    signature: 'JGE [Adresse]',
    description:
      'Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator größer oder gleich 0 ist.',
    category: 'memory',
    snippet: 'JGE ${1:Adresse}',
  },
  {
    opcode: 'HLT',
    signature: 'HLT 99',
    description: 'Hält die Ausführung des Programms an.',
    category: 'other',
    snippet: 'HLT 99',
  },
  {
    opcode: 'ADD',
    signature: 'ADD [Adresse]',
    description:
      'Addiert den Wert an der angegebenen Adresse aus dem Datenspeicher zum Akkumulator.',
    category: 'program',
    snippet: 'ADD ${1:Adresse}',
  },
  {
    opcode: 'SUB',
    signature: 'SUB [Adresse]',
    description:
      'Subtrahiert den Wert an der angegebenen Adresse aus dem Datenspeicher vom Akkumulator.',
    category: 'program',
    snippet: 'SUB ${1:Adresse}',
  },
  {
    opcode: 'MUL',
    signature: 'MUL [Adresse]',
    description:
      'Multipliziert den Akkumulator mit dem Wert an der angegebenen Adresse aus dem Datenspeicher.',
    category: 'program',
    snippet: 'MUL ${1:Adresse}',
  },
  {
    opcode: 'DIV',
    signature: 'DIV [Adresse]',
    description:
      'Dividiert den Akkumulator durch den Wert an der angegebenen Adresse aus dem Datenspeicher.',
    category: 'program',
    snippet: 'DIV ${1:Adresse}',
  },
  {
    opcode: 'LDA',
    signature: 'LDA [Adresse]',
    description:
      'Lädt den Wert an der angegebenen Adresse aus dem Datenspeicher in den Akkumulator.',
    category: 'program',
    snippet: 'LDA ${1:Adresse}',
  },
  {
    opcode: 'LDK',
    signature: 'LDK [Konstante]',
    description: 'Lädt die angegebene Konstante in den Akkumulator.',
    category: 'program',
    snippet: 'LDK ${1:Konstante}',
  },
  {
    opcode: 'STA',
    signature: 'STA [Adresse]',
    description:
      'Speichert den Wert des Akkumulators an der angegebenen Adresse im Datenspeicher.',
    category: 'program',
    snippet: 'STA ${1:Adresse}',
  },
  {
    opcode: 'INP',
    signature: 'INP [Adresse]',
    description:
      'Liest einen Wert vom Eingabegerät und speichert ihn an der angegebenen Adresse im Datenspeicher, oder bei Adresse 0 in den Akkumulator.',
    category: 'program',
    snippet: 'INP ${1:Adresse}',
  },
  {
    opcode: 'OUT',
    signature: 'OUT [Adresse]',
    description:
      'Schreibt den Wert an der angegebenen Adresse aus dem Datenspeicher auf das Ausgabegerät, oder bei Adresse 0 den Wert des Akkumulators.',
    category: 'program',
    snippet: 'OUT ${1:Adresse}',
  },
];

export function findInstructionfromOpcode(opcode: string) {
  let t = REGISTERMASCHINE_INSTRUCTIONS.filter((instruction) => instruction.opcode === opcode.toUpperCase())[0]
  console.log(t)
  return t
}

export function getHelpText(word: string): string | undefined {
  const instruction = findInstructionfromOpcode(word);
  if (!instruction) return undefined;
  return `\`${instruction.signature}\`: ${instruction.description}`;
}

export const REGISTERMASCHINE_PROGRAM_KEYWORDS = REGISTERMASCHINE_INSTRUCTIONS.filter(
  (instruction) => instruction.category === 'program'
).map((instruction) => instruction.opcode);

export const REGISTERMASCHINE_MEMORY_KEYWORDS = REGISTERMASCHINE_INSTRUCTIONS.filter(
  (instruction) => instruction.category === 'memory'
).map((instruction) => instruction.opcode);

export const REGISTERMASCHINE_OTHER_KEYWORDS = REGISTERMASCHINE_INSTRUCTIONS.filter(
  (instruction) => instruction.category === 'other'
).map((instruction) => instruction.opcode);
