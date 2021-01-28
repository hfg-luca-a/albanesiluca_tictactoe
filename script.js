//declarieren von globalen variablen
let currentplayer;
let p1 = "X";
let p2 = "O";
let gamearry = [];
let gamesize = 0;
let p1points = 0;
let p2points = 0;
let pointstowin = 0;
let switchvar = true;
let posarry = [];
//--------------------------------------


// wird in der html datei aufgerufen und im programmcode unter resetfield()
/* jshint ignore:start */


function generate() {

    let newId = 0;
    // lässt input und button verschwinden 
    document.getElementById("pointstowin").setAttribute('hidden', true);
    document.getElementById("size").setAttribute('hidden', true);
    document.getElementById("generatebtn").setAttribute('hidden', true);
    //leert das gamearray
    gamearry.splice(0, gamearry.length); //leert das gamearry
    $("tr").remove(); // löscht alle td elemente
    // holt sich die größe des Spielfeldes
    gamesize = Number(document.getElementById("size").value);
    pointstowin = Number(document.getElementById("pointstowin").value);
    //generiert spalten
    for (let i = 0; i < gamesize; i++) {
        newId = "Zeile" + i
        $("table").append("<tr id=" + newId + "></tr>");
        gamearry[i] = new Array(gamesize);
        //füllt spalten
        for (let j = 0; j < gamesize; j++) {
            let idvar = String(i) + "-" + String(j)
            $("#" + newId).append("<td id=" + idvar + "></td>");
            
        }
    }
}
/* jshint ignore:end */
// gibt dem user visual feedback ob eine seine angegbenen parameter korrekt sind
$("#pointstowin").change(function () {
    let temp = Number(document.getElementById("size").value) //verlegt weil zeile zu lang
    if (Number(document.getElementById("pointstowin").value) > temp || Number(document.getElementById("pointstowin").value) <= 0) {
        document.getElementById("pointstowin").style.backgroundColor = "red"
    } else {
        document.getElementById("pointstowin").style.backgroundColor = "lightgreen"
    }
});

$("table").on("click", "td", function () { //wird ausgeführt wenn of ein td element geklickt wird


    if ($(this).text() === "") { // wenn in dem td element noch kein wert drin ist kann er beschrieben werden 
        $(this).text(changeplayer()); // schreibt den Spielr in das Element der aktuell an der Reihe ist
        let id = $(this).attr("id"); // holt sich die id des geklickten td Elements
        posarry = id.split("-"); // schreibt die Positions werte in ein temp. array
        gamearry[posarry[0]][posarry[1]] = currentplayer; // schreibt  an die stelle des gamearrys den aktuellen Spieler 
        // console.log(gamearry)
        checkunentschieden();
        checkwin(posarry);
        checkdiagonal();
    }
    if (document.getElementById("player2").value === "Bot") { // lässt den Bot setzten
        setTimeout(function () {
            placingBot();
        }, 500);
    }
});



function changeplayer() { // gibt X oder O bei aufruf zurück, je nach vorherigem status 

    if (currentplayer === "X") {

        currentplayer = "O";
        // Dreht den Pfeil zum dem der an der Reihe ist
        document.getElementById("arrow").innerHTML = "&#8592;"
    } else {

        currentplayer = "X";
        // Dreht den Pfeil zum dem der an der Reihe ist
        document.getElementById("arrow").innerHTML = "&#8594;"
    }
    return currentplayer
}
// wird in der html datei aufgerufen
/* jshint ignore:start */
function setPlayer() {
    //Spieler inputs können nun nicht mehr beschrieben werden 
    const p1 = document.getElementById("player1");
    const p2 = document.getElementById("player2");
    p1.setAttribute('disabled', true);
    p2.setAttribute('disabled', true);
    // Button Setplayer verschwindet
    document.getElementById("setplayerbtn").setAttribute('hidden', true);
}
/* jshint ignore:end */




function checkwin(button) {

    // console.log(button)
    const posx = Number(button[0]);
    const posy = Number(button[1]);
    //console.log(posx, posy, typeof posx, typeof posy)
    let winarryh = [],
        winarryv = [],
        hpos = [],
        vpos = []; // Statements reduzieren
    // hier wird die aktuell geklickte reihe durchsucht
    for (let index = 0; index < gamesize; index++) {
        if (gamearry[posx][posy] === gamearry[posx][index]) {
            // hier werden die positionen der gleichen symbole gespeichert um später die gewinnreihe zu highlighten 
            hpos.push({
                posx: posx,
                posy: index
            });
            // gleiche symbole werden in einem arry gespeichert | wenn sie nebeinader sind
            winarryh.push(gamearry[posx][posy]);
            if (winarryh.length >= pointstowin) {
                winner(currentplayer);
                showcase(hpos);
                break;
            }
            // wenn ein ungleiches symbol erkannt wird, wird das winarry geleert
            // somit kann ich festellen ob die Zeichen nebeneinader liegen
        } else {
            winarryh.splice(0, winarryh.length);
        }
    }
    // hier wird die aktuell geklickte spalte durchsucht
    for (let index = 0; index < gamesize; index++) {

        if (gamearry[posx][posy] === gamearry[index][posy]) {
            // hier werden die positionen der gleichen symbole gespeichert um später die gewinnreihe zu highlighten 
            vpos.push({
                posx: index,
                posy: posy
            })
            // gleiche symbole werden in einem arry gespeichert | wenn sie nebeinader sind
            winarryv.push(gamearry[posx][posy])
            if (winarryv.length >= pointstowin) {
                winner(currentplayer)
                showcase(vpos)
                break;
            }
            // wenn ein ungleiches symbol erkannt wird, wird das winarry geleert
            // somit kann ich festellen ob die Zeichen nebeneinader liegen 
        } else {
            winarryv.splice(0, winarryv.length)
        }
    }
}
// hier ich generiere die wincondition abhänig von der angegebenen länge der gewinnreihe 
// bei übergebenen zeichen = X und pointstowin = 5 erzeugt diese Funktion einen string = XXXXX und gibt diesen zurück
function generatewincon(zeichen) {
    let tempvar = "";
    for (let index = 0; index < pointstowin; index++) {
        tempvar += zeichen;
    }
    return tempvar;
}
//hier werden die diagonalen gecheckt
function checkdiagonal() {

    let winconditiond1 = generatewincon(p1),
        winconditiond2 = generatewincon(p2),
        curLineD = "",
        curLineD2 = "",
        d1pos = [],
        d2pos = [];
    // hier loopen wir durch das ganze spielfeld
    for (let i = 0; i < gamesize; i++) {
        for (let j = 0; j < gamesize; j++) {
            // fals unten stehende if statements nicht zutreffen werden die positions arrays und diagonalen string wieder geleert
            // um platz für einen neuen durchlauf zu schaffen
            // falls aber ein gewinner gefunden wurde, werden die zugehörigen winner funktionen aufgerufen
            curLineD = "";
            curLineD2 = "";
            d1pos.splice(0, d1pos.length);
            d2pos.splice(0, d2pos.length);
            //hier wird das spielfeld eingegrenzt damit wir keine felder checken die garnicht existieren
            if ((i + pointstowin - 1) < gamesize) {
                if ((j + pointstowin - 1) < gamesize) {
                    for (let m = 0; m < pointstowin; m++) {
                        curLineD += gamearry[i + m][j + m]
                        // hier werden positionsdaten für die showcase funktion gespeichert
                        d1pos.push({
                            posx: i + m,
                            posy: j + m
                        })
                    }
                    //hier wird ermittelt ob die diagonale abgebildet als string die wincondition enthält
                    if (curLineD.includes(winconditiond1)) {
                        showcase(d1pos)
                        winner(p1);
                        
                    } else if (curLineD.includes(winconditiond2)) {
                        showcase(d1pos)
                        winner(p2)
                        
                    }
                }
            }
            //hier wird der code bzw die suche gespiegelt um auch alle anderen diagonalen zu checken
            if (j - (pointstowin - 1) >= 0) {
                if (i + (pointstowin - 1) < gamesize) {
                    for (let m = 0; m < pointstowin; m++) {
                        curLineD2 += gamearry[i + m][j - m]
                        d2pos.push({
                            posx: i + m,
                            posy: j - m
                        })
                    }
                    if (curLineD2.includes(winconditiond1)) {
                        showcase(d2pos)
                        winner(p1);

                    } else if (curLineD2.includes(winconditiond2)) {
                        showcase(d2pos)
                        winner(p2)
                    }
                }
            }
        }
    }
}
// diese Funktion sperrt das spielfeld nachdem ein gewinner ermittelt wurde
// dies ist nötig fals ein spieler gewinnt befor das gesammte feld beschrieben ist
function sperren() {
    switchvar = false; // fals ein bot ausgewählt ist wird dieser auch gesperrt
    $("td").prop("disabled", true); // disabled alle td zellen -> onclick ist disabled

}
// diese funktion highlightet alle zellen einer gewinnreihe 
// ihr wird ein array mit der postion aller zellen die am gewinn beteiligt sind übergeben 
function showcase(posofwincells) {
    console.log(posofwincells)
    for (const item of posofwincells) { //loopt durch jede zelle durch
        let x = item.posx
        let y = item.posy
        let pos = `${x}-${y}`;
        document.getElementById(pos).style.background = "lightgreen"; //highlightet die jeweilige zelle in lightgreen
    }
}
// diese Funktion checkt ob ein unentschieden vorliegt
function checkunentschieden() {
    let counter = 0
    console.log(gamearry)
    for (let x = 0; x < gamesize; x++) { //loopt über das ganze spielfeld und zählt noch freie stellen
        for (let y = 0; y < gamesize; y++) {
            if (gamearry[x][y] === undefined) {
                counter++;
            }
        }
    }
    if (counter === 0) { // wenn keine freien stellen mehr zur verfügung stehen wird das Unentschieden ausgerufen
        alert('Unentschieden')
        winner("none")
    }
}

function winner(zeichen) {
    sperren()
    //schaut wer gewonnen hat
    if (zeichen === p1) {
        //schreibt die aktuelle punktzahl in das span tag
        console.log(document.getElementById("player1").value + " hat gewonnen")
        p1points++;
        document.getElementById("punktep1").innerText = p1points;


    } else if (zeichen === "none") {
        //placeholder
    } else if (zeichen === p2) {
        p2points++;
        console.log(document.getElementById("player2").value + " hat gewonnen")
        document.getElementById("punktep2").innerText = p2points;
    }
    //lässt den neue Runde Button erscheinen
    document.getElementById("neuerundebtn").removeAttribute('hidden');
    // dreht den Pfeil nach unten
    document.getElementById("arrow").innerHTML = "&#8595;"
    //console.log("Das Zeichen: "+ zeichen + " hat gewonnen")
}

//wird in der html datei aufgerufen -> heißt jshint trifft nicht zu
/* jshint ignore:start */
function resetfield() {
    switchvar = true; //enabeled wieder den bot
    //richtet den Pfeil aus
    if (currentplayer !== "X") {
        document.getElementById("arrow").innerHTML = "&#8592;"
    } else {
        document.getElementById("arrow").innerHTML = "&#8594;"
    }
    // lässt Button für neue runde verschwinden 
    document.getElementById("neuerundebtn").setAttribute('hidden', true);
    //generiert das Spielfeld neu
    generate();
    if (document.getElementById("player2").value === "Bot") {
        setTimeout(function () { // wartet 500ms -> der Bot denkt hahah
            placingBot();
        }, 500);
    }
}
/* jshint ignore:end */

function getRandomInt(max) { //Funktion für eine Zufallszahl
    return Math.floor(Math.random() * Math.floor(max));
}

function placingBot() { //Zufalls Bot
    //generiert eine Zufällige x y Koordinate
    if (switchvar === true) {
        let y = getRandomInt(gamesize)
        let x = getRandomInt(gamesize)
        if (gamearry[x][y] === undefined) { //checkt ob die zufällige position schon beschrieben ist
            const temparry = [x, y]
            console.error(y + "|" + x)
            //beschreibt ein td tag mit O
            let randomtdtag = document.getElementById(`${x}-${y}`)
            $(randomtdtag).prop("disabled", true); // disabled td tag damit der human player ihn nicht benutzen kann
            const temp = changeplayer();
            randomtdtag.innerText = temp
            //setzt an der gleichen stelle im gamearry ein O
            gamearry[x][y] = temp
            // console.warn(x + ":" + y + "|" + document.getElementById(`${x}-${y}`).innerHTML)
            checkunentschieden()
            checkwin(temparry)
            return
        } else {
            placingBot()
            console.error("Generating new place to be")
        }
    }
}