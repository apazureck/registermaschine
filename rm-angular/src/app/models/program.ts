import { Command, CommandCode } from './commands';
import { getCommand } from './commands/command-factory';
import { RmComponents } from './registermaschine';

export interface ProgramError {
  line: number;
  message: string;
  lineContent: string;
}

const keys: (keyof typeof CommandCode)[] = <(keyof typeof CommandCode)[]>(
  Object.keys(CommandCode)
);
const commandParsingRegexString = `^\\s*\\d*\\s*(${keys
  .map((key) => CommandCode[key])
  .join('|')})\\s+(\\d+)`;

export class Program {
  constructor(public readonly programCode: string) {}

  getCommandSet(rm: RmComponents): Command[] {
    const commands: Command[] = [];

    const lines = this.programCode.split('\n');
    const errors: ProgramError[] = [];
    let i = 0;
    for (const rLine of lines) {
      const line = rLine.trim();
      i++;
      const commandCodeRegex = new RegExp(commandParsingRegexString, 'gm');
      if (line.length === 0) continue;
      if (line.startsWith('#') || line.startsWith(';')) continue;
      const match = commandCodeRegex.exec(line);
      if (!match) {
        errors.push({
          line: i,
          message: `Invalid command: ${line}`,
          lineContent: line,
        });
        continue;
      }
      const commandString = match[1] + ' ' + match[2];
      const command = getCommand(rm, commandString, i, commands.length);
      commands.push(command);
    }

    if (errors.length > 0) {
      const errorMessages = errors
        .map(
          (err) =>
            `Line ${err.line}: ${err.message} ("${err.lineContent.trim()}")`
        )
        .join('\n');
      throw new Error(`Program parsing errors:\n${errorMessages}`, {
        cause: errors,
      });
    }

    return commands;
  }
}
