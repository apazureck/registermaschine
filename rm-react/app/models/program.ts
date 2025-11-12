import { CommandCode } from "./commands";

const keys: (keyof typeof CommandCode)[] = <(keyof typeof CommandCode)[]>(
  Object.keys(CommandCode)
);
const commandCodeRegex = new RegExp(
  `^\\s*\\d*\\s+(${keys.join("|")})\\s+(\\d+)`
);

export class Program {
  constructor(public readonly programCode: string) {}

  getCommandSet(): CommandCode[] {
    const commandLines = this.programCode.split("\n");
    const commands: CommandCode[] = [];

    for (const line of commandLines) {
      const trimmedLine = line.trim();
    }

    return commands;
  }
}
