; Summe von einzugebenden Zahlen ermitteln und ausgeben
; =====================================================
; ---------------- Zahl einlesen ---------------------------------------------
INP 01    ; Zahl einlesen und an Adresse 1 (Datenspeicher) einlesen
; ---------------- Wenn Zahl = 0, dann naechsten Anweisungen ueberspringen ---
LDA 01    ; Lade Zahl von Adresse 1 (Datenspeicher) in den Akkumulator
JEZ 07    ; Falls Akku == 0, springe an Programmadr. 7 (OUT 02)
; ---------------- Zahl auf bisherige Summe aufaddieren ----------------------
ADD 02    ; Addiere auf Akku Inhalt von Adresse 2 (Datenspeicher)
STA 02    ; Speichere Akku an Adresse 2 (Datenspeicher)
; ---------------- Sprung auf Programmanfang (neue Zahl einlesen ) -----------
JMP 01    ; Springe zurück an Programmadr. 1 (INP 01)
; ---------------- Ermittelte Summe ausgeben und Programmende ----------------
OUT 02    ; Gib Inhalt von Adresse 2 (Datenspeicher) aus
HLT 99    ; Programmende