; Minimum von zwei Zahlen bestimmen und ausgeben
; ==============================================
; ---------------- Zahlen einlesen -------------------------------------------
INP 01    ; 1. Zahl einlesen und an Adresse 1 (Datenspeicher) einlesen
INP 02    ; 2. Zahl einlesen und an Adresse 2 (Datenspeicher) einlesen
; ---------------- Subtrahiere: 1.Zahl - 2.Zahl ------------------------------
LDA 01    ; Lade 1. Zahl von Adresse 1 (Datenspeicher) in den Akkumulator
SUB 02    ; Subtrahiere 1.Zahl - 2.Zahl
; ---------------- Auswerten des Subtraktionsergebnis (evtl. Sprung) ---------
JGE 08    ; Sprung wenn a-b >= 0; d.h b <= a
; ---------------- 1. Zahl ist das Minimum -----------------------------------
LDA 01    ; 1. Zahl in den Akku
JMP 09    ; Sprung zur Ausgabe
; ---------------- 2. Zahl ist das Minimum -----------------------------------
LDA 02    ; 2. Zahl in den Akku
; ---------------- Ausgabe des Akkumulatorinhalts (Minimum) ------------------
OUT 00    ; Ausgabe des Akkumulatorinhalts
HLT 99    ; Programmende