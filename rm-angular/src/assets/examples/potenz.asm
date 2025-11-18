; Berechnen und Ausgeben der Potenz von zwei Zahlen
; =================================================
;    Eingabe:
;       Die erste einzugebende Zahl ist die Basis und
;       die zweite einzugebende Zahl ist die Potenz
;    Ausgabe:
;       Ergebnis von (basis hoch potenz)
; ---- Initialisierung
LDK 01    ; ergeb mit 1 initialisieren
STA 01    ; ergeb (Adresse 1) zurueckschreiben
STA 02    ; Wert 1 (fuer De-/Inkrementieren) an Adresse 2
; ---- Basis und Potenz einlesen
INP 03    ; Einlesen einer Zahl (basis) an die Adresse 3
INP 04    ; Einlesen einer Zahl (potenz) an die Adresse 4
; ---- Ergebnis der Potenz (basis hoch potenz) berechnen
LDA 04    ; Lade Potenz lin Akkumulator
JEZ 13    ; Falls potenz gleich 0 ist, Sprung auf 14 (Ergebnis ausgeben)
SUB 02    ; Potenz um 1 dekrementieren
STA 04    ; Potenz wieder zurueckspeichern (an die Adresse 4)
LDA 03    ; Lade Basis in den Akku
MUL 01    ; und dann Akku-Inhalt mit bisheriges Ergebnis multiplizieren
STA 01    ; Speichere neuen Wert aus Akku zurueck nach Ergebnis (Adr. 1)
JMP 05    ; Springe zurueck und fahre mit Algorithmus fort
; ---- Ausgabe des Ergebnis und Programmende
OUT 01    ; Gib Ergebnis aus
HLT 99