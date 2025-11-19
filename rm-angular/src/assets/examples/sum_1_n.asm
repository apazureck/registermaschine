; Programm zur Berechnung der Summe 1+2+3+...+n; wobei n einzugeben ist
; =====================================================================
;-------- Einlesen von n ---------------------------------------------
INP 01   ; Lies n ein (an Adresse 1)
;-------- Zaehlvariable und Einer-Konstante initialisieren -----------
LDK 01   ; Setze Akku (Zaehlvariable) auf 1
STA 02   ; Speichere Zaehlvariable an Adresse 2
STA 03   ; Speichere Konstante 1 an Adresse 3
;-------- Schleife: for (i=1; i<=n; i++) -----------------------------
SUB 01   ; Subtrahiere: Zaehlvar. - n (an Adresse 1)
JGZ 14  ; Wenn Akku > 0, dann springe an Adresse 14
LDA 02   ; Lade Zaehlvar. (an Adresse 2) in Akku
ADD 04   ; Addiere auf Zaehlvariable bisherige Summe
STA 04   ; Schreibe neue Summe zurueck an Adresse 4
LDA 02   ; Lade Zaehlvar. (an Adresse 2) in Akku
ADD 03   ; Inkrementiere Akku um 1
STA 02   ; Speichere inkrem. Zaehlvar. wieder an Adresse 2
JMP 05   ; Springe zurueck an Programmadr. 5
OUT 04   ; Gib berechnete Summe (an Adresse 4) aus
HLT 99