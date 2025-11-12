import { Program } from "./program";

test("Parse example program", () => {
  const programCode = `
    LDA 10
    ADD 11
    STA 12
    HLT 99
  `;
  const program = new Program(programCode);
  const commands = program.getCommandSet();
  expect(commands.length).toBe(4);
});
