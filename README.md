# albanesiluca_tictactoe

- `generate()` <br>
  In dieser funktion wird das Spielfeld generiert, d.h hier werden die erforderlichen tr & td elemente erzeugt und an das table element in der html datei gehängt. Fals schon ein Spielfeld besteht z.b nach einer Runde, wird erst das alte Spielfeld gelöscht. `$("tr").remove();` sorgt dafür das alle Zeilen des Spielfelds vor der neuerstellung gelöscht wird. In dieser Funktion wird neben der Visuellen erstellung des Spielfeldes auch ein Abgleich in Form eines 2 Dimensionalen Arrays erstellt. Dieses Array spiegelt die aktuelle Situation des Spielfeldes in Datenform wieder. Ebenso ist diese Funktion verantwortlich dafür die Inputtags wie auch den "generatebtn" verschwinden zu lassen wenn.
  Die generierung des Spielfeldes läuft wie folgt ab: <br>
  Es wird erst eine Zeile (tr) erstellt, diese wird dann mit elementen (td) befüllt. Ähnlich verläuft die generierung des Datenmodells. Das globale gamearry beinhaltet für jede Zeile ein array d.h jede Zeile wird durch ein Array im Datenmodell representiert. Da hier Array in Array verschatelt ist lässt sich der Inhalt jedes td element mit seinen koordinaten abfragen. z.B. gamearry[x][y]
- `$("#pointstowin").change(function () {}` <br>
- `$("table").on("click", "td", function () {}` <br>
- `changeplayer()` <br>
- `setPlayer()` <br>
- `checkwin(button)` <br>
- `checkdiagonal()` <br>
- `generatewincon(zeichen)` <br>
- `sperren()`<br>
- `showcase(posofwincells)`<br>
- `checkunentschieden()`<br>
- `winner(zeichen)`<br>
- `resetfield() `<br>
- `placingBot()`<br>
