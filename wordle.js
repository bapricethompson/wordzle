let messageDiv=document.querySelector("#message");
let start=document.querySelector("#button");
let board=document.querySelector("#board");
let currentEntry="";
let words=[];
let allowed=[];
let answerIndex=0;
let answer="";
let currentRow = 0;
let currentTile = 0;
const maxTilesPerRow = 5;
let gameInPlay=false;


start.addEventListener("click", function(){
    const date = new Date();
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const hourOfYear = dayOfYear * 24 + date.getHours();
    answerIndex = hourOfYear % words.length;
    answer = words[answerIndex];

    if (gameInPlay) {
        board.innerHTML = "";
        generateBoard(board);
        currentRow = 0;
        currentTile = 0;
        console.log("ANSWER", answer);
        messageDiv.textContent = "";
    } else {
        board.innerHTML = "";
        generateBoard(board);
        gameInPlay = true;
        currentRow = 0;
        currentTile = 0;
        console.log("ANSWER", answer);
        start.textContent = "Reset";
        messageDiv.textContent = "";
    }
})

function giveHints(word, answervari) {
    console.log(word);
    console.log(answervari);
    let wordList = word.split("");
    let answerList = answervari.toUpperCase().split("");
    let fix = {};
    for (let i = 0; i < 5; i++) {
        if (wordList[i] === answerList[i]) {
            fix[i] = "#86BF5E";  
            answerList[i] = null; 
            wordList[i] = null;   
        }
    }
    
    for (let i = 0; i < 5; i++) {
        if (wordList[i] && answerList.includes(wordList[i])) {
            fix[i] = "#F2B84B";  
            answerList[answerList.indexOf(wordList[i])] = null; 
        }
    }

    return fix;
}

function generateKeyBoard(){
    let keyboardDiv=document.createElement("div");
    keyboardDiv.id="keyboard";
    const keys = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"]
    ];

    for (item of keys){
        let keyRow=document.createElement("div");
        keyRow.classList.add("keyRow");
        item.forEach((key) => {
            const button = document.createElement("div");
            button.textContent = key;
            button.classList.add("key");
            button.dataset.key = key; 
            keyRow.appendChild(button);
            button.addEventListener("click", () => handleKeyPress(key));
        });
        keyboardDiv.appendChild(keyRow);
    }

    
    
    console.log(keyboardDiv);

    return keyboardDiv;

};


function generateBoard(vari){{
    for (let i=0;i<6;i++){
        let rowDiv=document.createElement("div");
        rowDiv.classList.add("row");
        for (let i=0;i<5;i++){
            let square=document.createElement("div");
            square.classList.add("tile");
            rowDiv.appendChild(square);
        }
        vari.appendChild(rowDiv);
    }
    vari.appendChild(generateKeyBoard());
}};


function enterKey(rows) {
    console.log("hit");
        messageDiv.textContent="";
        if (currentTile === maxTilesPerRow) {
            if (currentEntry.toLowerCase() === answer.toLowerCase()) {
                for (let i = 0; i < 5; i++) {
                    rows[currentRow].children[i].style.backgroundColor = "#86BF5E";
                }
                messageDiv.textContent = "You WIN!";
                gameInPlay = false;
            } else if (!words.includes(currentEntry.toLowerCase()) && !allowed.includes(currentEntry.toLowerCase())) {
                for (let i = 0; i < currentTile; i++) {
                    rows[currentRow].children[i].textContent = "";
                }
                messageDiv.textContent = "Not a valid word, please try again";
                currentEntry = "";
                currentTile = 0;
            } else {
                if (currentRow === 5) {
                    let resp = giveHints(currentEntry, answer);
                    for (key in resp) {
                        rows[currentRow].children[parseInt(key)].style.backgroundColor = resp[key];
                    }
                    messageDiv.textContent = "You LOSE!";
                    gameInPlay = false;
                } else {
                    console.log("here");
                    let resp = giveHints(currentEntry, answer);
                    for (key in resp) {
                        rows[currentRow].children[parseInt(key)].style.backgroundColor = resp[key];
                    }
                    currentRow++;
                    currentTile = 0;
                    currentEntry = "";
                }
            }
        } else {
            messageDiv.textContent = "Please enter a 5 letter word.";
            for (let i = 0; i < currentTile; i++) {
                rows[currentRow].children[i].textContent = "";
            }
            currentEntry = "";
            currentTile = 0;
        }

};


function handleKeyPress(key) {
    console.log(key);
    let rows = document.querySelectorAll(".row");
    if (!gameInPlay) return;

    if (key === "Backspace" || key==="BACKSPACE") {  // Backspace should be written with a lowercase "b"
        if (currentTile > 0) {
            currentTile--;
            rows[currentRow].children[currentTile].textContent = ""; 
            currentEntry = currentEntry.slice(0, -1);
        }
    } else if (key === "Enter" || key==="ENTER") {  
        enterKey(rows);
    } else if (/^[A-Z]$/.test(key)) {  
        if (currentTile < maxTilesPerRow) {
            rows[currentRow].children[currentTile].textContent = key;
            currentTile++;
            currentEntry += key;
        }
    }
}

document.addEventListener("keydown", function (event) {
    console.log(event.key);
    handleKeyPress(event.key.toUpperCase()); // Convert key to uppercase for consistency
});



// document.addEventListener("keydown",function(event){
//     // let buttons=document.querySelectorAll(".tile");
//     // let rows=document.querySelectorAll(".row");
//     // if (!gameInPlay) return;

//     //     if (event['key'] === "Backspace"){
//     //         if (currentTile > 0) {
//     //             currentTile--;  
//     //             rows[currentRow].children[currentTile].textContent = ""; 
//     //             currentEntry = currentEntry.slice(0, -1);
//     //         }
//     //     }
//     //     else if (event['key']==="Enter"){
//     //         enterKey(rows);
//     //     }
//     //     else if (event['keyCode']>=65 & event['keyCode']<=90){
//     //         // console.log("row",rows[currentRow]);
//     //         // console.log("bleh",rows[currentRow].children[currentTile].textContent);
//     //         rows[currentRow].children[currentTile].textContent = event['key'];
//     //         currentTile++;
//     //         currentEntry+=event['key'];
//     //     }
    

// });

fetch("https://wordle-api.up.railway.app/words").then(function (response){
    response.json().then(function (data) {
        console.log("important",data.answers);
        words=data.answers;
        allowed=data.allowed;
        
    });
});
