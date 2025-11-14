import { Command, CommandCode } from './commands';
import { getCommand } from './commands/command-factory';

const keys: (keyof typeof CommandCode)[] = <(keyof typeof CommandCode)[]>(
  Object.keys(CommandCode)
);
const commandParsingRegexString = `^\\s*\\d*\\s+(${keys
  .map((key) => CommandCode[key])
  .join('|')})\\s+(\\d+)`;

export class Program {
  constructor(public readonly programCode: string) {}

  getCommandSet(): Command[] {
    const commands: Command[] = [];
    const commandCodeRegex = new RegExp(commandParsingRegexString, 'gm');

    let match: RegExpExecArray | null;
    do {
      match = commandCodeRegex.exec(this.programCode);
      if (!match) {
        continue;
      }
      const commandString = match[1] + ' ' + match[2];
      commands.push(getCommand(commandString));
    } while (match);

    return commands;
  }
}
