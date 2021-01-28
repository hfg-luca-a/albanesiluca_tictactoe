# albanesiluca_tictactoe
 
- `generate()` 
In dieser funktion wird das Spielfeld generiert, d.h hier werden die erforderlichen tr & td elemente erzeugt und an das table element in der html datei gehängt. Fals schon ein Spielfeld besteht z.b nach einer runde wird erst das Alte Spielfeld gelöscht. `$("tr").remove();` sorgt dafür das alle Zeilen des Spielfelds vor der neuerstellung gelöscht wird. In dieser Funktion wird neben der Visuellen erstellung des Spielfeldes auch ein Abgleich in Form eines 2 Dimensionalen Arrays erstellt. Dieses Array spiegelt die aktuelle Situation des Spielfeldes in Datenform wieder. 
- `$("#pointstowin").change(function () {}`
- `$("table").on("click", "td", function () {}`
- `changeplayer()`
- `setPlayer()`
- `checkwin(button)`
- `checkdiagonal()`
- `generatewincon(zeichen)`
- `sperren()`
- `showcase(posofwincells)`
- `checkunentschieden()`
- `winner(zeichen)`
- `resetfield() `
- `placingBot()`































