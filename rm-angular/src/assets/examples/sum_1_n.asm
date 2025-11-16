; Programm zur Berechnung der Summe 1+2+3+...+n; wobei n einzugeben ist
; =====================================================================
;-------- Einlesen von n ---------------------------------------------
INP 1   ; Lies n ein (an Adresse 1)
;-------- Zaehlvariable und Einer-Konstante initialisieren -----------
LDK 1   ; Setze Akku (Zaehlvariable) auf 1
STA 2   ; Speichere Zaehlvariable an Adresse 2
STA 3   ; Speichere Konstante 1 an Adresse 3
;-------- Schleife: for (i=1; i<=n; i++) -----------------------------
SUB 1   ; Subtrahiere: Zaehlvar. - n (an Adresse 1)
JGZ 14  ; Wenn Akku > 0, dann springe an Adresse 14
LDA 2   ; Lade Zaehlvar. (an Adresse 2) in Akku
ADD 4   ; Addiere auf Zaehlvariable bisherige Summe
STA 4   ; Schreibe neue Summe zurueck an Adresse 4
LDA 2   ; Lade Zaehlvar. (an Adresse 2) in Akku
ADD 3   ; Inkrementiere Akku um 1
STA 2   ; Speichere inkrem. Zaehlvar. wieder an Adresse 2
JMP 5   ; Springe zurueck an Programmadr. 5
OUT 4   ; Gib berechnete Summe (an Adresse 4) aus
HLT 99