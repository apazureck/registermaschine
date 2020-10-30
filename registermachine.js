var g_output = "";
var g_changed = [-1, -1, -1];
var g_pc = -1;
var g_MAX_DATALEN = 16;
var g_MAX_PROGLEN = 64;
var g_MAX_CYCLE = 1000;
var g_dmem = new Array(g_MAX_DATALEN);
var g_pmem = new Array(g_MAX_PROGLEN);
var svg;
var pcPmStartY;
const MEMORY_TABLE_CELLHEIGHT = 21.8;

var alu_ops = ["add", "sub", "mul", "div"];

var jump_ops = [
  "jmp",
  "jez",
  "jne",
  "jlz",
  "jle",
  "jgz",
  "jge"
];

var g_instr = [
  "lda",
  "ldk",
  "sta",
  "add",
  "sub",
  "mul",
  "div",
  "jmp",
  "jez",
  "jne",
  "jlz",
  "jle",
  "jgz",
  "jge",
  "inp",
  "out",
  "hlt"
];

function c_reset() {
  g_pc = 1;
  for (var idx = 0; idx < g_MAX_DATALEN; idx++) g_dmem[idx] = 0;
  for (var idx = 0; idx < g_MAX_PROGLEN; idx++) g_pmem[idx] = undefined;
  g_history = [];
  g_changed = [-1, -1, -1];
}

function c_parseLine(line) {
  var parts = line.trim().match(/\S+/g);
  if (parts == null) return;
  if (parts[0].startsWith(";")) return;
  if (parts.length < 3) return;

  var addr = parseInt(parts[0]);
  if (isNaN(addr)) throw "falsche Programmadresse " + addr;
  if (addr < 0 || addr >= g_MAX_PROGLEN)
    throw "falsche Programmadresse " + addr;

  var mnemo = parts[1].toLowerCase();

  if (g_instr.indexOf(mnemo) < 0) throw "unbekannter Befehl " + mnemo;

  var data = parseInt(parts[2]);
  if (isNaN(data)) throw "falsches Befehlsargument " + data;

  g_pmem[addr] = [mnemo, data];
}

function c_readData(addr) {
  if (addr < 0 || addr > g_MAX_DATALEN) throw "ungültige Datenadresse " + addr;

  return g_dmem[addr] | 0;
}

function c_writeData(addr, val) {
  if (addr < 0 || addr >= g_MAX_DATALEN) throw "ungültige Datenadresse " + addr;
  g_dmem[addr] = val | 0;
}

function c_readProg(addr) {
  if (addr < 1 || addr >= g_MAX_PROGLEN)
    throw "ungültige Programmadresse " + addr;

  return g_pmem[addr];
}

function c_lim(val, B) {
  var bound = Math.pow(2, B);
  var maxval = bound / 2;
  var newval = val % bound;
  if (newval >= maxval) newval -= bound;
  //if (newval < 0) newval += maxval;
  return newval;
}

function c_explainData(data) {
  if (data == 0) {
    descr = "Akkumulator";
  } else {
    descr = "Datenspeicher " + p_lformat(data, 2);
  }
  return descr;
}

function c_explainInstr(mnemo, data) {
  switch (mnemo) {
    case "nop":
      return "leere Anweisung";

    case "ldk":
      return "lade Zahl " + c_lim(data, 16) + " in Akku";

    case "lda":
      return "lade Zahl aus " + c_explainData(data) + " in Akku";

    case "sta":
      return "speichere Akkuinhalt in " + c_explainData(data);

    case "add":
      return "Akku = Akku + " + c_explainData(data);

    case "sub":
      return "Akku = Akku - " + c_explainData(data);

    case "mul":
      return "Akku = Akku * " + c_explainData(data);

    case "div":
      return "Akku = Akku / " + c_explainData(data);

    case "jmp":
      return "springe zu Programmadresse " + data;

    case "jez":
      return "springe zu Programmadresse " + data + " falls Akku == 0";

    case "jne":
      return "springe zu Programmadresse " + data + " falls Akku != 0";

    case "jlz":
      return "springe zu Programmadresse " + data + " falls Akku < 0";

    case "jle":
      return "springe zu Programmadresse " + data + " falls Akku <= 0";

    case "jgz":
      return "springe zu Programmadresse " + data + " falls Akku > 0";

    case "jge":
      return "springe zu Programmadresse " + data + " falls Akku >= 0";

    case "inp":
      return "Zahl in => " + c_explainData(data) + " einlesen";

    case "out":
      return "Zahl in " + c_explainData(data) + " ausgeben";

    case "hlt":
      return "Registermaschine anhalten";
  }

  return "";
}

function c_step() {
  if (g_pc < 1 || g_pc >= g_MAX_PROGLEN)
    throw "Ungültige Programmadresse " + g_pc;

  var instr = c_readProg(g_pc);
  var curPC = g_pc;
  g_pc += 1;

  var oldVal = undefined;
  var newVal = undefined;
  var oldIdx = undefined;

  g_output = "";
  try {
    if (instr == undefined)
      throw "Ungültiger Befehl an Programmadresse " + curPC;
    if ((instr.length | 0) < 2)
      throw "Ungültiger Befehl an Programmadresse " + curPC;

    var mnemo = instr[0];
    var data = instr[1];

    switch (mnemo) {
      case "nop":
        break;

      case "ldk":
        oldIdx = 0;
        oldVal = c_readData(0);
        newVal = c_lim(data, 16);
        c_writeData(0, newVal);
        break;

      case "lda":
        newVal = c_readData(data);
        oldIdx = 0;
        oldVal = c_readData(0);
        c_writeData(0, newVal);
        break;

      case "sta":
        newVal = c_readData(0);
        oldVal = c_readData(data);
        oldIdx = data;
        c_writeData(data, newVal);
        break;

      case "add":
        oldVal = c_readData(0);
        var tmpVal = c_readData(data);
        newVal = c_lim(oldVal + tmpVal, 16);
        oldIdx = 0;
        c_writeData(0, newVal);
        break;

      case "sub":
        oldVal = c_readData(0);
        var tmpVal = c_readData(data);
        newVal = c_lim(oldVal - tmpVal, 16);
        oldIdx = 0;
        c_writeData(0, newVal);
        break;

      case "mul":
        oldVal = c_readData(0);
        var tmpVal = c_readData(data);
        newVal = c_lim(oldVal * tmpVal, 16);
        oldIdx = 0;
        c_writeData(0, newVal);
        break;

      case "div":
        oldVal = c_readData(0);
        var tmpVal = c_readData(data);
        if (tmpVal == 0) throw "Teilen durch Null verboten";
        newVal = Math.floor(oldVal / tmpVal);
        oldIdx = 0;
        c_writeData(0, newVal);
        break;

      case "jmp":
        if (data < 1 || data >= g_MAX_PROGLEN)
          throw "ungültige Zieladresse " + p_lformat(data, 2);
        g_pc = data;
        break;

      case "jez":
        if (c_readData(0) == 0) g_pc = data;
        break;

      case "jne":
        if (c_readData(0) != 0) g_pc = data;
        break;

      case "jlz":
        if (c_readData(0) < 0) g_pc = data;
        break;

      case "jle":
        if (c_readData(0) <= 0) g_pc = data;
        break;

      case "jgz":
        if (c_readData(0) > 0) g_pc = data;
        break;

      case "jge":
        if (c_readData(0) >= 0) g_pc = data;
        break;

      case "inp":
        oldIdx = data;
        oldVal = c_readData(data);
        var txtval = "NAN";
        while (isNaN(txtval)) {
          var txt = getValueFromInput();
          var txtval = parseInt(txt);
          if(isNaN(txtval)) {
            txt = prompt("Bitte eine Zahl in Input eingeben!");
            setValueToInput(txt);
          }          
        }

        newVal = c_lim(parseInt(txtval), 16);
        c_writeData(data, newVal);
        break;

      case "out":
        const elem = document.getElementById("outputValue");
        elem.innerText = c_readData(data);
        var msg = c_explainData(data) + " = " + c_readData(data);
        // alert(msg);
        g_output = "Ausgabe: " + msg;
        break;

      case "hlt":
        g_pc = curPC;
        throw "Programm mit HLT beendet";
        break;

      default:
      //throw "unknown menmonic " + mnemo
    }
  } catch (e) {
    g_output = e;
  }

  var what = [curPC, oldIdx, oldVal];
  if (curPC != g_pc || oldIdx != undefined) {
    g_history.unshift(what);
  }
  return what;
}

function getValueFromInput() {
  let elem = document.getElementById("userInput");
  return elem.value;
}

function setValueToInput(val) {
  let elem = document.getElementById("userInput");
  elem.value = val;
}

function p_setClass(elem, val) {
  if (elem == undefined) return;
  elem.classList.add(val);
}

function p_unsetClass(elem, val) {
  if (elem == undefined) return;
  elem.classList.remove(val);
}

function p_lformat(num, sz) {
  var txt = Number(num).toString(10);
  var pat = "00000000";

  var count = sz - txt.length;
  if (count < 0) return txt;

  var retval = pat.substr(0, count) + txt;
  return retval;
}

function p_step() {
  if (g_pc < 1) return;
  g_changed = c_step();
  p_showState();
  p_showData();
  p_showProg();
}

function p_rewind() {
  if (g_pc < 1) return;
  if (g_history.length < 1) return;

  undo = g_history.shift();
  g_pc = undo[0];
  c_writeData(undo[1], undo[2]);

  g_changed = g_history[0];
  if (!g_changed) g_changed = [-1, -1, -1];

  g_output = "";
  p_showState();
  p_showProg();
  p_showData();
}

function p_cont() {
  if (g_pc < 1) return;
  var prevLen = 0;
  for (var cycle = 0; cycle <= g_MAX_CYCLE; cycle++) {
    p_step();
    if (g_history.length <= prevLen) break;
    prevLen = g_history.length;
  }

  if (cycle > g_MAX_CYCLE) {
    alert(
      "Programmlauf abgebrochen\nwg. mehrals " + g_MAX_CYCLE + " Iterationen"
    );
  }

  p_showState();
  p_showData();
  p_showProg();
}

function p_parse() {
  var src = editor.getValue();
  var lines = src.split("\n");
  for (var idx = 0; idx < lines.length; idx++) c_parseLine(lines[idx]);
}

function p_reset() {
  g_output = "";
  c_reset();
  p_parse();

  p_showState();
  p_showData();
  p_showProg();
}

function p_clearCode() {
  var src = document.getElementById("code");
  src.value = "";
}

function p_showProg() {
  var beg = 1;
  var step = g_MAX_DATALEN - 1;
  while (beg + step <= g_pc) beg += step;
  var pmem = document.getElementById("pmem");
  var tab = "";
  var end = beg + step;
  if (end >= g_MAX_PROGLEN) end = g_MAX_PROGLEN - 1;
  for (var pos = beg; pos < end; pos++) {
    instr = c_readProg(pos);
    var line = "<tr>";
    var klass = `class=""`;
    if (pos == g_pc) {
      klass = `class="hilite"`;
      line += "<th " + klass + ">&gt;</th>";
    } else {
      line += "<th></th>";
    }

    klass = `class="listing"`;
    if (pos == g_pc) klass = `class="listing hilite"`;
    var addr = p_lformat(pos, 2);
    line += "<td " + klass + ">" + addr + "</td>";

    klass = `class="listing pline"`;
    if (pos == g_pc) klass = `class="listing pline hilite"`;
    line += "<td " + klass + ">";
    if (instr && instr[0]) line += instr[0] + " " + instr[1];
    line += "</td></tr>";
    tab += line;
  }
  pmem.innerHTML = tab;
}

function p_showState() {
  updateProgramCounterRegister();

  var data = c_readData(0);

  elem = document.getElementById("areg");
  elem.textContent = data;

  elem = document.getElementById("alu_left_register");
  elem.textContent = data;

  if (g_changed[1] == 0) {
    elem.classList.add("hilite");
  } else {
    elem.classList.remove("hilite");
  }

  let instr = getInstructionArray();

  updateInstructionRegister(instr);
  updateRightRegister(instr);

  updateAluOperation(instr);

  updateProgramCounterToProgramMemoryConnection(g_pc);
  updateProgramMemoryToInstructionRegisterConnection(g_pc);
  updateInstructionToDataMemoryConnection(instr);
  updateInputToDataMemoryConnection(instr);
  updateDataMemoryToAccuConnection(instr);
  updateDataMemoryToAluConnection(instr);
  updateAccuConnectionToDataMemory(instr);
  updateInstructionRegisterToAccuConnection(instr);
  updateOutputConnections(instr);

  updateExplanationBox();
  updateOutputText();

  showJumpArrow(g_pc, instr);

  function updateOutputConnections(instr) {
    hideMemoryConnection();
    hideAccuConnection();
    if(instr[0] === "out") {
      if(instr[1] === 0) {
        showAccuConnection();
      } else {
        showMemoryConnection(instr[1]);
      }
    }

    function hideMemoryConnection() {
      const elem = document.getElementById("datamem-output-connection");
      hideElement(elem);
    }

    function showMemoryConnection(memoryAddress) {
      const elem = document.getElementById("datamem-output-connection");
      showElement(elem);
      const startPoint = elem.points[0];
      const firstBend = elem.points[1];
      startPoint.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
        firstBend.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
    }

    function showAccuConnection() {
      const elem = document.getElementById("acc-output-connection");
      showElement(elem);
    }

    function hideAccuConnection() {
      const elem = document.getElementById("acc-output-connection");
      hideElement(elem);
    }
  }

  function updateProgramCounterRegister() {
    var elem = document.getElementById("pcreg");
    var data = p_lformat(g_pc, 2);
    elem.textContent = data;
  }

  function updateExplanationBox() {
    if (instr && instr[0]) {
      var elem = document.getElementById("explained");
      if (elem) {
        elem.innerText = c_explainInstr(instr[0], instr[1]);
      }
    }
  }

  function updateInstructionRegister(instr) {
    elem = document.getElementById("cur_instr");

    var txt = "";
    if (instr && instr[0]) {
      txt = instr[0] + " " + instr[1];
      //txt += "   " + c_explainInstr(instr[0], instr[1])
    }

    elem.textContent = txt;
  }

  function updateRightRegister(instr) {
    switch(instr[0]) {
      case "sub":
      case "add":
      case "mul":
      case "div":
        showRegisterValue(instr[1]);
        break;
      default:
        break;
    }

    function showRegisterValue(memoryAddress) {
      let elem = document.getElementById("alu-right-register");
      if(memoryAddress > 0) {
        elem.textContent = c_readData(memoryAddress);
      }
    }
  }

  function getInstructionArray() {
    return c_readProg(g_pc);
  }

  function updateProgramCounterToProgramMemoryConnection(
    currentProgramCounter
  ) {
    let elem = document.getElementById("pc-progmem-connection");
    const endpoint = elem.points[elem.points.length - 1];
    const lowerLeftCorner = elem.points[elem.points.length - 2];
    endpoint.y =
      pcPmStartY + (currentProgramCounter - 1) * MEMORY_TABLE_CELLHEIGHT;
    lowerLeftCorner.y =
      pcPmStartY + (currentProgramCounter - 1) * MEMORY_TABLE_CELLHEIGHT;
  }

  function updateProgramMemoryToInstructionRegisterConnection(
    currentProgramCounter
  ) {
    let elem = document.getElementById("progmem-instrreg-connection");
    const startPoint = elem.points[0];
    const firstCorner = elem.points[1];
    startPoint.y =
      pcPmStartY + (currentProgramCounter - 1) * MEMORY_TABLE_CELLHEIGHT;
    firstCorner.y =
      pcPmStartY + (currentProgramCounter - 1) * MEMORY_TABLE_CELLHEIGHT;
  }

  function updateInstructionToDataMemoryConnection(instr) {
    hideMemoryConnection();
    hideAccuConnection();
    switch (instr[0]) {
      case "inp":
        if(instr[1] > 0) {
          showMemoryConnection(instr[1]);
        } else {
          showAccuConnection();
        }
        break;
      case "sub":
      case "add":
      case "mul":
      case "div":
        showMemoryConnection(instr[1]);
        break;
      default:
        break;
    }

    function showMemoryConnection(memoryAddress) {
      let elem = document.getElementById("instrreg-datamem-connection");
      showElement(elem);
      const endpoint = elem.points[elem.points.length - 1];
      const lowerLeftCorner = elem.points[elem.points.length - 2];
      endpoint.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
      lowerLeftCorner.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
    }

    function hideMemoryConnection() {
      let elem = document.getElementById("instrreg-datamem-connection");
      hideElement(elem);
    }

    function hideAccuConnection() {
      let elem = document.getElementById("userInput-acc-connection");
      hideElement(elem);
    }

    function showAccuConnection() {
      let elem = document.getElementById("userInput-acc-connection");
      showElement(elem);
    }
  }

  function updateInputToDataMemoryConnection(instr) {
      hideToMemoryConnection();
      hideToAccuConnection();
    switch(instr[0]) {
      case "inp":
        if(instr[1] != 0) {
          showConnection(instr[1]);
        } else {
          showAccuConnection();
        }
        break;
      default:
        break;
    }

    function showConnection(memoryAddress) {
      let elem = document.getElementById("userInput-datamem-connection");
      showElement(elem);
      const endpoint = elem.points[elem.points.length - 1];
      const rightBend = elem.points[elem.points.length - 2];
      endpoint.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
        rightBend.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
    }

    function showAccuConnection() {
      let elem = document.getElementById("userInput-acc-connection");
      showElement(elem);
    }

    function hideToMemoryConnection() {
      let elem = document.getElementById("userInput-datamem-connection");
      hideElement(elem);
    }

    function hideToAccuConnection() {
      let elem = document.getElementById("userInput-acc-connection");
      hideElement(elem);
    }
  }

  function updateDataMemoryToAccuConnection(instr) {
    switch(instr[0]) {
      case "lda":
        showConnection(instr[1]);
        break;
      default:
        hideConnection();
        break;
    }

    function showConnection(memoryAddress) {
      let elem = document.getElementById("datamem-acc-connection");
      showElement(elem);
      const startPoint = elem.points[0];
      const firstBend = elem.points[1];
      startPoint.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
        firstBend.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
    }

    function hideConnection() {
      let elem = document.getElementById("datamem-acc-connection");
      hideElement(elem);
    }
  }

  function updateAccuConnectionToDataMemory(instr) {
    switch(instr[0]) {
      case "sta":
        showConnection(instr[1]);
        break;
      default:
        hideConnection();
        break;
    }

    function showConnection(memoryAddress) {
      let elem = document.getElementById("acc-datamem-connection");
      showElement(elem);
      const startPoint = elem.points[elem.points.length - 1];
      const firstBend = elem.points[elem.points.length - 2];
      startPoint.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
        firstBend.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
    }

    function hideConnection() {
      let elem = document.getElementById("acc-datamem-connection");
      hideElement(elem);
    }
  }

  function updateDataMemoryToAluConnection(instr) {
    switch (instr[0]) {
      case "sub":
      case "add":
      case "mul":
      case "div":
        showConnection(instr[1]);
        break;
      default:
        hideConnection();
        break;
    }

    function showConnection(memoryAddress) {
      let elem = document.getElementById("datamem-op2-connection");
      showElement(elem);
      const startPoint = elem.points[0];
      const firstBend = elem.points[1];
      startPoint.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
        firstBend.y =
        pcPmStartY + (memoryAddress - 1) * MEMORY_TABLE_CELLHEIGHT;
    }

    function hideConnection() {
      let elem = document.getElementById("datamem-op2-connection");
      hideElement(elem);
    }
  }

  function updateOutputText() {
    var elem = document.getElementById("cur_output");
    if (elem) {
      elem.innerText = g_output;
    }
  }

  function updateAluOperation(instr) {
    try {
      elem = document.getElementById("alu_operation");
      const op = getAluOperation(instr[0]);
      elem.textContent = op
      if(op !== "nop") {
        showInstrRegAluOperationConnection();
        showAluToAccuConnection();
      } else {
        hideInstrRegAluOperationConnection();
        hideAluToAccuConnection();
      }
    }
    catch(error) {}

    function getAluOperation(operation) {
      let opindex = alu_ops.indexOf(operation);
      if (opindex >= 0) {
        return alu_ops[opindex];
      } else return "nop";
    }

    function showInstrRegAluOperationConnection() {
      const elem = document.getElementById("instrreg-aluOp-connection");
      showElement(elem);
    }

    function hideInstrRegAluOperationConnection() {
      const elem = document.getElementById("instrreg-aluOp-connection");
      hideElement(elem);
    }

    function showAluToAccuConnection() {
      const elem = document.getElementById("op2-acc-connection");
      showElement(elem);
    }

    function hideAluToAccuConnection() {
      const elem = document.getElementById("op2-acc-connection");
      hideElement(elem);
    }
  }

  function showJumpArrow(curInstrLine, instr) {
    const elem = document.getElementById("jumpPath");
    const endY = (instr[1] - curInstrLine) * MEMORY_TABLE_CELLHEIGHT;
    const startY = (curInstrLine - 1) * MEMORY_TABLE_CELLHEIGHT;
    const rightXOfProgramMem = 207;

    elem.setAttribute("d", `M${rightXOfProgramMem},${startY + pcPmStartY} c 50,0 50,${endY} 5,${endY}`);
    if(jump_ops.indexOf(instr[0]) >= 0) {
      showElement(elem);
    } else {
      hideElement(elem);
    }
  }

  function updateInstructionRegisterToAccuConnection(instr) {
    const elem = document.getElementById("instrreg-accu-connection");
    switch(instr[0]) {
      case "lda":
      case "ldk":
      case "sta":
      case "mul":
      case "div":
      case "add":
      case "sub":
        showElement(elem);
        break;
      default:
        hideElement(elem);
        break;
    }
  }
}

function p_showData() {
  var dmem = document.getElementById("dmem");
  var tab = "";
  for (var pos = 1; pos < g_MAX_DATALEN; pos++) {
    data = c_readData(pos);
    var line = "<tr>";
    var klass = `class="listing"`;
    if (pos == g_changed[1]) klass = `class="listing hilite"`;
    line += "<td " + klass + `">` + p_lformat(pos, 2) + "</td>";

    klass = `class="listing dline"`;
    if (pos == g_changed[1]) klass = `class="listing dline hilite"`;
    line += "<td " + klass + `">` + data + "</td>";

    line += "</tr>";

    tab += line;
  }
  dmem.innerHTML = tab;
}

window.onload = function () {
  svg = document.getElementById("registersvg");
  let elem = document.getElementById("pc-progmem-connection");
  pcPmStartY = elem.points[3].y;

  var selection = document.getElementById("program-sel");
  if (!selection) return;

  var scripts = document.getElementsByClassName("asm");
  var txt = "";
  for (var idx = 0; idx < scripts.length; idx++) {
    var id = scripts[idx].id;
    var line = `<option value="` + id + `">` + id + "\n";
    txt += line;
  }
  selection.innerHTML = txt;
  p_showProg();
  p_showData();
};

function hideElement(elem) {
  elem.classList.add("hide");
}

function showElement(elem) {
  elem.classList.remove("hide");
}