# albanesiluca_tictactoe

- `generate()` <br>
  In dieser funktion wird das Spielfeld generiert, d.h hier werden die erforderlichen tr & td elemente erzeugt und an das table element in der html datei gehängt. Fals schon ein Spielfeld besteht z.b nach einer Runde, wird erst das alte Spielfeld gelöscht. `$("tr").remove();` sorgt dafür das alle Zeilen des Spielfelds vor der neuerstellung gelöscht wird. In dieser Funktion wird neben der Visuellen erstellung des Spielfeldes auch ein Abgleich in Form eines 2 Dimensionalen Arrays erstellt. Dieses Array spiegelt die aktuelle Situation des Spielfeldes in Datenform wieder. Ebenso ist diese Funktion verantwortlich dafür die Inputtags wie auch den "generatebtn" verschwinden zu lassen wenn.
  Die generierung des Spielfeldes läuft wie folgt ab: <br>
  Es wird erst eine Zeile (tr) erstellt, diese wird dann mit elementen (td) befüllt. Ähnlich verläuft die generierung des Datenmodells. Das globale gamearry beinhaltet für jede Zeile ein array d.h jede Zeile wird durch ein Array im Datenmodell representiert. Da hier Array in Array verschatelt ist lässt sich der Inhalt jedes td element mit seinen koordinaten abfragen. z.B. `gamearry[x][y]`
- `$("#pointstowin").change(function () {}` <br>
  Diese Funktion dient dazu dem User Visuelles Feedback bezüglich seiner Angaben zu geben. Es wird geprüft ob die pointstowin der Spielfedgröße gerecht werden.
  pointstowin darf niemals kleiner als 0 und größer als die gamesize sein. Die Funktion wird ausgeführt jedes mal wenn sich der Wert im Inputtag ändert. Je nach wert bekommt der User ein Visuelles Feedback inform von rotem oder grünen hintergrund des Inputtags.
- `$("table").on("click", "td", function () {}` <br>
  Diese Funktion bzw. dieser EventListener hat die Aufgabe ein geklicktes Feld aufzunehmen und zu verarbeiten. Erst wird geprüft ob das geklickte Feld nicht schon beschrieben ist. Ist es beschrieben passiert nichts und der aktuelle Spieler ändert sich nicht. Ist das geklickte Feld nicht beschrieben wird `changeplayer()` ausgeführt. Danach wird die ID des geklickten Feldes abgerufen und geparst um die in der ID enthaltenden Positionsdaten zu gelangen. Mit den Positionsdaten kann das Zeichen des aktuellen spielers an die richtige Position im Datenmodell geschrieben werde.
  Fals als Spieler 2 ein Bot gewählt wurde wird er nach ablauf von 500ms nach dem klick des echten Users ausgeführt.
- `changeplayer()` <br>
  Die Funktion changeplayer() hat die Aufgabe die gobale Variable `currentplayer` zu manipulieren. Ebenso ändert diese Funktion die Rotation des Pfeils welcher anzeigt wer aktuell an der Reihe ist. Die Funktion gibt den wert des currentplayers nach der manipluation als return aus.
- `setPlayer()` <br>
  Diese Funktion hat die Aufgabe nach betätigen des "SetPlayer" buttons die Inputs der Spielernamen zu disablen. Ebenso lässt sie den Button nach betätigung verschwinden.
- `checkwin(button)` <br>
- `checkdiagonal()` <br>
- `generatewincon(zeichen)` <br>
  Diese Funktion generiert einen String der das überbergebene Zeichen so oft enthält wie pointstowin angegeben ist. Dieser String wird zurückgegeben.
- `sperren()`<br>
  Die Aufgabe dieser Funktion ist es das Spielfeld nach der ermittlung eines Gewinners zu sperren um mögliche Spielfeldmanipulationen vorzubeugen. Ebenso verhindert sie das der Bot weiter setzen kann.
- `showcase(posofwincells)`<br>
  Diese Funktion zeigt nach gewinn die zum geinn führenden Felder an, indem sie die Felder grün highlightet. Dazu wird ihr ein Array mit den Positionsdaten der Gewinnfeldern übergeben. Die Funktion extrahiert jede position aus dem übergebenen Array und setzt die Hintergründe der jeweiligen Zellen auf grün
- `checkunentschieden()`<br>
  In dieser Funktion wird das Spielfeld nach leeren Felder durchsucht. Es wird das Datenmodell des Spielfeldes für die Suche verwendet. D.h es wird einmal Über das gesamte gamearry geloopt um alle Stellen zu finden die undefined sind. Soblad kein Feld mehr undefined ist wird das Unentschieden ausgerufen.
- `winner(zeichen)`<br>
  Diese Funktion ist für das handling des Gewinners zuständig. Ihr wird das Zeichen übergeben welches in der Gewinnermitllung als Gewinner hervorgegengen ist. Auf der Basis des übergebenen Zeichens wird dem jeweiligen Spieler ein Punkt gegeben. Ebenso manipuliert diese Funktion die Rotation des Pfeils richtung Button (Neues Spiel)
- `resetfield() `<br>
  In dieser Funktion wird die `generate()` aufgerufen um das Spielfeld zu reseten. Ebenso darf nun der jenige die neue Runde anfangen der dies letzte runde nicht durfte.
- `placingBot()`<br>
  Dies ist die Funktion des Basic-Bots. Es werden zunächst eine Zufällige x & y Koordinate generiert. Wenn diese schon beschreiben ist wird eine neue Koordinate generiert. Wenn diese Koordinate Frei ist beschreibt diese der Bot mit seinem Zeichen. Ebnso setzt der Bot sein Zeichen im Datenmodell.
