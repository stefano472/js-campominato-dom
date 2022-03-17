console.log('JS OK')

/*
crea una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra 1 e 100
Quando l'utente clicca su ogni cella, questa diventa azzurra
*/

/*
In seguito l'utente clicca su una cella: se il numero è presente 
nella lista dei numeri generati - abbiamo calpestato una bomba - 
la cella si colora di rosso e la partita termina, 
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare 
a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge 
il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
1- quando si clicca su una bomba e finisce la partita, 
evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, 
il software scopre tutte le bombe nascoste
3- L'utente indica un livello di difficoltà in base al 
quale viene generata una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi in un range:
*/

// creo una const che va a modificare il numero di bombe presenti
const bombNumber = 16;
let cellNumber;

// inizio il gioco al click del bottone
document.getElementById('btn-start').addEventListener('click', function(){
    
    // al click acquisisco il numero di celle selezionato (difficoltà)
    cellNumber = document.getElementById('grid-width').value;
    console.log(cellNumber)

    // vado a creare la griglia in base alle celle che comparirà nel DOM 
    gridCreator(cellNumber);

    // creo un array per generare 16 numeri unici che saranno la posizione delle bombe
    const bombPositions = onlyOneNumberInArrayGenerator(1, cellNumber, bombNumber);
    console.log(bombPositions);


    addFunctionsToCells (bombPositions);
    /*
    // ciclo per aggiungere classi colorate in base alle bombe
    for (let i = 0; i<cellNumber; i++) {
        // aggiungo i colori in base a click
        arrayCelle[i].addEventListener('click', ()=>  bombOrNot (i, arrayCelle, bombPositions))
        
    }
    */

}
);

// funzione per aggiungere le classi bomba o no in base proprio a dove sono le bombe ---> argomento (arrayposizione bombe)
function addFunctionsToCells (bombPositions) {
    // creo var per il punteggio
    let score = 0;

    // vado a richiamare i div creati in precedenza per poter aggiungere altre classi
    const arrayCelle = document.querySelectorAll('.cell');

    // ciclo per aggiungere classi colorate in base alle bombe
    for (let i = 0; i<cellNumber; i++) {
        // aggiungo i colori in base a click
        arrayCelle[i].addEventListener('click', ()=>  {
            // dalla funzione bombOrNot torna una booleana vera o falsa la metto in una const per utilizzarla successivamente
            // quando sarà vera il gioco finisce
            const gameOver = bombOrNot (i, arrayCelle, bombPositions)

            // utilizzo l'if per applicare diverse classi se è una bomba o meno
            if (gameOver) {
                // blocco la griglia ---> classe pointer events none su css
                addPointerEventsNone();
                // faccio apparire tutte le bombe applicando classe error da css
                cellOver (bombPositions);
                // faccio apparire testo che mi specifica che ho perso ed il punteggio in % --> 100 / (totcells - bombe) *score 
            } else {
                // aumento il punteggio di 1 perchè vuol dire che ho premuto casella buona
                score++;
                // applico il pointer event none alla casella cliccata in modo d non aumentare lo score schiacciando ancora
                arrayCelle[i].classList.add('block-cell');
                console.log(score)
                // se ho premuto tutte le caselle buone ho vinto ed appare lo score
            }
        }
        )
        
    }

}

// funzione per aggiungere classe pointer events alla griglia
function addPointerEventsNone() {
    document.getElementById('grid').classList.add('block-cell')
}

// funzione per fare apparire tutte le bombe
function cellOver (bombPositions) {
    const tutteLeCellNelDom = document.querySelectorAll('.cell') 
    for (let i = 0; i < tutteLeCellNelDom.length; i++) {
        if (bombPositions.includes(i+1)) {
            tutteLeCellNelDom[i].classList.add('color-error')
        }
    }
}


// funzione per inserire i colori alle celle abbinato ad una booleana vero = bomba, falso = no
function bombOrNot (index, arrayCelle, arrayPosizioneBombe) {
    if (arrayPosizioneBombe.includes(index + 1)){
        arrayCelle[index].classList.add('color-error')
    }
    arrayCelle[index].classList.add('color-ok');
    
    return arrayPosizioneBombe.includes(index + 1);
}

// funzione creo una cella
function cellCreator() {
    const block = document.createElement('div');
    block.classList.add('cell');
    return block;
}

// funzione creo griglia
function gridCreator(numberOfCells) {
    // recupero la variabile grid dal documento al quale aggiungerò le classi
    const grid = document.getElementById('grid');
    // resetto l'inner html tutte le volte che richiamo la funzione nel mio caso sarà appena clicco il bottone
    grid.innerHTML = '';

    const celleTotali = [];
    // creo ciclo per inserire il numero di celle richieste
    for (let i = 0; i<numberOfCells; i++){

        const myCell = cellCreator();
        // aggiungo classe per difficoltà selezionata
        myCell.classList.add(getClassName(numberOfCells));

        // inserisco il testo nelle celle create
        myCell.innerText = i + 1; 

        // aggiungo tutto ciò che ho creato al mio grid
        grid.appendChild(myCell);
        
        // pusho le celle create all'interno del mio array
        celleTotali.push(myCell)

    }
    // ritorno l'array per poter aggiungere classi in seguito
    return celleTotali;
}

// funzione per aggungere classi e definire la larghezza delle celle
function getClassName (numberOfCells) {
    let classToUse = 'w-7';
        // definisco la larghezza delle colonne in base al num di celle
        if (numberOfCells == 100) {
            classToUse = 'w-10';
        } else if (numberOfCells == 81) {
            classToUse = 'w-9';
        }
    return classToUse;
}

// funzione creo numero random
function randomNumberGenerator (min, max) {
    const range  = max - min + 1;
    const randomNumber = Math.floor(Math.random() * range + min);
    return randomNumber;
}
// creo funzione per ottenere totNumeri(nel mio caso 16, le bombe) presenti solo una volta in un Array che ritprno all'esterno,
// argomentando con il range (min e max)
function onlyOneNumberInArrayGenerator (min, max, totNumber) {
    const arrayTotNumbers = [];
    while (arrayTotNumbers.length < totNumber) {
        const number = randomNumberGenerator(min, max);
        if (!arrayTotNumbers.includes(number)) {
            arrayTotNumbers.push(number)
        }
    }
    return arrayTotNumbers;
}



