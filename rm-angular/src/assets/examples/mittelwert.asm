; Mittelwert zu einzugebenden Zahlen ermitteln und ausgeben
; =========================================================
; ---------------- Zahl einlesen ---------------------------------------------
INP 01    ; Zahl einlesen und an Adresse 1 (Datenspeicher) einlesen
; ---------------- Wenn Zahl = 0, dann naechsten Anweisungen ueberspringen ---
LDA 01    ; Lade Zahl von Adresse 1 (Datenspeicher) in den Akkumulator
JEZ 10    ; Falls Akku == 0, springe an Programmadr. 10
; ---------------- Zahl auf bisherige Summe aufaddieren ----------------------
ADD 02    ; Addiere auf Akku Inhalt von Adresse 2 (Datenspeicher)
STA 02    ; Speichere Akku an Adresse 2 (Datenspeicher)
; ---------------- Erhoehe Wertezaehler (Adresse 3) um 1 ---------------------
LDK 01    ; Lade Wert 1 in den Akku
ADD 03    ; Inkrementiere Akku um 1
STA 03    ; Wertezaehler (in Akku) wieder an Adresse 3 zurueckschreiben
; ---------------- Springe an Programmanfang zurueck -------------------------
JMP 01    ; Springe zurueck am Programmadr. 1
; ---------------- Ermittle den Mittelwert und gib ihn aus -------------------
LDA 02    ; Lade die Summe aller Werte
DIV 03    ; Teile Akku durch den Wertezaehler
OUT 00    ; Mittelwert (aus Akku) ausgeben
HLT 99    ; Programmende