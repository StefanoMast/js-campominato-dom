const playButton = document.getElementById("play-btn");
playButton.addEventListener("click", startGame);

// MAIN FUNCTION
function startGame() {

    prepareGrid();

    
    // Nascondere la scritta con classe "hidden"
    // Far vedere il contenitore della griglia, togliendo la classe "hidden"
    
    const grid = document.getElementById("grid");
    title.classList.add("hidden");
    grid.classList.remove("hidden");
    grid.innerHTML = "";

    // Prelevare la scelta della difficoltà dell'utente
    const difficulty = parseInt(document.getElementById("level").value);
    let cellNumber;
    let cellsNuberInRow;
    if (difficulty === 1) {
        cellNumber = 100;
        cellsNuberInRow = 10;
    } else if (difficulty === 2) {
        cellNumber = 81;
        cellsNuberInRow = 9;
    } else {
        cellNumber = 49;
        cellsNuberInRow = 7;
    }
    //Generare 16 bombe: 16 numeri casuali non ripetuti compresi tra 1 e cellNumber
    const bombsNumber = 16; //salvo per comodità il numero di bombs in una variabile
    const bombsArray = generateUniqueRandomNumbers(bombsNumber, cellNumber);
    console.log(bombsArray);
    const safeCells = [];


    // Generare le celle da 1 a 100
    for (let i = 1; i <= cellNumber; i++) {
        // genera cella
        const newItem = generateGridItem(i, cellsNuberInRow);
        // aggiungo il handler del click
        newItem.addEventListener("click", handleCellClick);
        // appendere la cella generata al contenitore
        grid.append(newItem);
    }
        /** 
     * Description La funzione che colora di blu la cella
     * Non ritorna niente
     */
    function handleCellClick() {
    //prelevare il numero della cella cliccata
        const clickedNumber = parseInt(this.querySelector("span").textContent);

        //se il numero della cella è presente nell'array delle bombe:
        if (bombsArray.includes(clickedNumber) ) {
            //la cella si colora di rosso
            this.classList.add("bomb");
            //stampare il numero di tentativi azzeccati
            //fine gioco, utente ha perso
            alert ("hai perso")
        } else {
            //la cella cliccata si colora di azzurro
            this.classList.add("clicked");
            //rendo la cella non cliccabile
            this.style.pointerEvents = "none";
            //il numero  della cella viene salvato all'interno dell'array di numeri azzeccati
            safeCells.push(safeCells);
            //se la lunghezza dell'array di numeri azzeccati è uguale al numero massimo di tentativi di numeri consentit
            //fine gioco, l'utente ha vinto
        }
    }
}

// DOM FUNCTIONS

/**
 * Description Funzione che genera un elemento (cella) html della griglia
 * @param {any} gridNumber -> un numero da inserire nella cella
 * @param {any} cellsInRow -> numero delle celle in una riga
 * @returns {any} -> elemento del DOM che rappresenta la cella della griglia
 */
function generateGridItem(gridNumber, cellsInRow) {
    // creare l'elemento html
    const gridItem = document.createElement("div");
    // aggiungere la classe "grid-item"
    gridItem.classList.add("grid-item");
    // settare le dimensioni della cella corrispondenti;
    gridItem.style.width = `calc(100% / ${cellsInRow})`;
    gridItem.style.height = `calc(100% / ${cellsInRow})`;
    // inserire lo span con il numero corrispondente
    gridItem.innerHTML = `<span>${gridNumber}</span>`

    return gridItem;
}

//UTILITY FUNCTIONS
function getRndInteger (min, max) {
    return Math.floor(Math.random() * (max - min +1) ) + min;
}

/**
 * Description: La funzione che genera numeri random non ripetuti
 * @param {Numerber} numberQuantity  -> la quantità di numeri da generare
 * @param {Number} maxLimit -> il limite massimo del range di numeri
 * @returns {Array} -> array di numeri random non ripetuti
 */
function generateUniqueRandomNumbers(numberQuantity, maxLimit) {
   const numbersArray =[];
   while (numbersArray.length < numberQuantity) {
    const randomNumber = getRndInteger(1, maxLimit);
    if ( !numbersArray.includes(randomNumbers)) {
        numbersArray.push(randomNumber);
    }
   }
   return numbersArray;
}

