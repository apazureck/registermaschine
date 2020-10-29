const myTextarea = document.getElementById("code");

const editor = CodeMirror.fromTextArea(myTextarea, {
  lineNumbers: true,
});

function p_loadCode() {
  const sel = document.getElementById("program-sel");

  const prog = document.getElementById(sel.value);
  editor.setValue(prog.textContent.trim());
  p_reset();
}
