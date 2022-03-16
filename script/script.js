console.log('JS OK')

/*
crea una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra 1 e 100
Quando l'utente clicca su ogni cella, questa diventa azzurra
*/


const grid = document.getElementById('grid');

const startGame = document.getElementById('btn-start');

startGame.addEventListener('click', function(){
    grid.innerHTML = '';
    const cellNumber = document.getElementById('grid-width').value;

    for (let i = 0; i<cellNumber; i++) {
        
        const myCell = cellCreator();
        myCell.innerText = i + 1;

        if (cellNumber == 100) {
            myCell.classList.add('w-10')
        } else if (cellNumber == 81) {
            myCell.classList.add('w-9')
        } else {
            myCell.classList.add('w-7')
        }
    
        myCell.addEventListener('click',
            function() {
                myCell.classList.toggle('click')
            }
        )
        
        grid.appendChild(myCell);
    }
}
);

// creo una cella
function cellCreator() {
    const block = document.createElement('div');
    block.classList.add('cell');
    return block;
}

/* esercizio numeri random
const numberPicked = [];
for (let i = 0; i < cellNumber; i++) {
const cell = cellCreator ();
    const numberSelected = randomNumberGenerator (1, cellNumber, numberPicked);
    numberPicked.push(numberSelected)
    cell.innerText = numberSelected;
    grid.appendChild(cell);
}
// creo numero random
function randomNumberGenerator (min, max) {
    const range  = max - min + 1;
    const randomNumber = Math.floor(Math.random() * range + min);
    return randomNumber;
}
// creo numero random contenuto solo una volta nel segmento
function onlyOneNumberGenerator (min, max, numberPresent) {
    let number = randomNumberGenerator(min, max);

    while (numberPresent.includes(number)) {
        number = randomNumberGenerator(min, max)
    }
    return number;
}
*/
