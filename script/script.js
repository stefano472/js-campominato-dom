console.log('JS OK')

/*
crea una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra 1 e 100
Quando l'utente clicca su ogni cella, questa diventa azzurra
*/





// creo una const che va a modificare il numero di bombe presenti
const bombNumber = 16;


// inizio il gioco al click del bottone
document.getElementById('btn-start').addEventListener('click', function(){
    
    // al click acquisisco il numero di celle selezionato (difficoltà)
    const cellNumber = document.getElementById('grid-width').value;
    console.log(cellNumber)
    
    // vado a creare la griglia in base alle celle
    gridCreator(cellNumber);
    console.log(gridCreator(cellNumber))

    // creo un array per generare 16 numeri unici
    const bombs = [];

    // genero un array con la posizione delle bombe
    onlyOneNumberGenerator(1, cellNumber, bombs, bombNumber);
    console.log(bombs)

    
    
}
);

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

        // definisco la larghezza delle colonne in base al num di celle
        if (numberOfCells == 100) {
            myCell.classList.add('w-10')
        } else if (numberOfCells == 81) {
            myCell.classList.add('w-9')
        } else {
            myCell.classList.add('w-7')
        }

        // inserisco il testo nelle celle create
        myCell.innerText = i + 1; 

        // aggiungo tutto ciò che ho creato al mio grid
        grid.appendChild(myCell);
        
        celleTotali.push(myCell)
        // myCell.addEventListener('click', ()=> myCell.classList.toggle('color-ok'))
        
    }
    return celleTotali;
}

// funzione creo numero random
function randomNumberGenerator (min, max) {
    const range  = max - min + 1;
    const randomNumber = Math.floor(Math.random() * range + min);
    return randomNumber;
}
// creo funzione per ottenere totNumeri(nel mio caso 16, le bombe) presenti solo una volta nel segmento
function onlyOneNumberGenerator (min, max, numberPresent, totNumber) {
    while (numberPresent.length < totNumber) {
        let number = randomNumberGenerator(min, max);
        if (!numberPresent.includes(number)) {
            numberPresent.push(number)
        }
    }
    
}




/*


In seguito l'utente clicca su una cella: se il numero è presente 
nella lista dei numeri generati - abbiamo calpestato una bomba - 
la cella si colora di rosso e la partita termina, 
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare 
a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge 
il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, 
evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, 
il software scopre tutte le bombe nascoste
3- L'utente indica un livello di difficoltà in base al 
quale viene generata una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi in un range:
*/