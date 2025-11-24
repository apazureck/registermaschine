export function getHelpText(word: string): string | undefined {
  switch (word.toUpperCase()) {
    case 'JMP':
      return '`JMP [Adresse]`: Springt zur angegebenen Adresse im Programmspeicher.';
    case 'JEZ':
      return '`JEZ [Adresse]`: Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator 0 ist.';
    case 'JNZ':
      return '`JNZ [Adresse]`: Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator nicht 0 ist.';
    case 'JLZ':
      return '`JLZ [Adresse]`: Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator kleiner als 0 ist.';
    case 'JLE':
      return '`JLE [Adresse]`: Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator kleiner oder gleich 0 ist.';
    case 'JGZ':
      return '`JGZ [Adresse]`: Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator größer als 0 ist.';
    case 'JGE':
      return '`JGE [Adresse]`: Springt zur angegebenen Adresse im Programmspeicher, wenn der Akkumulator größer oder gleich 0 ist.';
    case 'HLT':
      return '`HLT 99`: Hält die Ausführung des Programms an.';
    case 'ADD':
      return '`ADD [Adresse]`: Addiert den Wert an der angegebenen Adresse aus dem Datenspeicher zum Akkumulator.';
    case 'SUB':
      return '`SUB [Adresse]`: Subtrahiert den Wert an der angegebenen Adresse aus dem Datenspeicher vom Akkumulator.';
    case 'MUL':
      return '`MUL [Adresse]`: Multipliziert den Akkumulator mit dem Wert an der angegebenen Adresse aus dem Datenspeicher.';
    case 'DIV':
      return '`DIV [Adresse]`: Dividiert den Akkumulator durch den Wert an der angegebenen Adresse aus dem Datenspeicher.';
    case 'LDA':
      return '`LDA [Adresse]`: Lädt den Wert an der angegebenen Adresse aus dem Datenspeicher in den Akkumulator.';
    case 'LDK':
      return '`LDK [Konstante]`: Lädt die angegebene Konstante in den Akkumulator.';
    case 'STA':
      return '`STA [Adresse]`: Speichert den Wert des Akkumulators an der angegebenen Adresse im Datenspeicher.';
    case 'INP':
      return '`INP [Adresse]`: Liest einen Wert vom Eingabegerät und speichert ihn an der angegebenen Adresse im Datenspeicher, oder bei Adresse 0 in den Akkumulator.';
    case 'OUT':
      return '`OUT [Adresse]`: Schreibt den Wert an der angegebenen Adresse aus dem Datenspeicher auf das Ausgabegerät, oder bei Adresse 0 den Wert des Akkumulators.';
    default:
      return undefined;
  }
}
