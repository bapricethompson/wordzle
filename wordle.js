let messageDiv=document.querySelector("#message");
let start=document.querySelector("#button");
let buttons=document.querySelectorAll(".tile");
let rows=document.querySelectorAll(".row");
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
    messageDiv.textContent="";
    gameInPlay=true;
})


document.addEventListener("keydown",function(event){
    console.log("Data", event);
    if (gameInPlay){
        if (event['key'] === "Backspace"){
            if (currentTile > 0) {
                currentTile--;  
                rows[currentRow].children[currentTile].textContent = ""; 
                currentEntry = currentEntry.slice(0, -1);
            }
        }
        // hint logic somehow
        else if (event['key']==="Enter"){
            if (currentTile === maxTilesPerRow){
                if (currentEntry.toLowerCase()===answer.toLowerCase()){
                    console.log("current",currentEntry);
                    messageDiv.textContent="You WIN!";
                    gameInPlay=false;
                    
                }
                else if (!words.includes(currentEntry.toLowerCase()) & !allowed.includes(currentEntry.toLowerCase())){
                    //FIX THIS
                    messageDiv.textContent="Not a valid word, please try again";
                    for (let i=0;i<currentTile;i++){
                        rows[currentRow].children[i].textContent="";
                    }
                    currentEntry="";
                    currentTile=0;

                }
                else{
                    console.log("row",currentRow);
                    if (currentRow===5){
                        messageDiv.textContent="You LOSE!";
                        gameInPlay=false;
                    }
                    else{
                        currentRow++;
                        currentTile=0;
                        currentEntry="";
                    }
                    
                }
            }
            else if (currentTile < maxTilesPerRow) {
                messageDiv.textContent="Please enter a 5 letter word."
                for (let i=0;i<currentTile;i++){
                    rows[currentRow].children[i].textContent="";
                }
                currentEntry="";
                currentTile=0;
    
            }
        }
        else if (event['keyCode']>=65 & event['keyCode']<=90){
            rows[currentRow].children[currentTile].textContent = event['key'];
            currentTile++;
            currentEntry+=event['key'];
        }

    }

    

});

fetch("https://wordle-api.up.railway.app/words").then(function (response){
    response.json().then(function (data) {
        console.log("important",data.answers);
        words=data.answers;
        allowed=data.allowed;
        answerIndex= Math.floor(Math.random() * words.length);
        answer=words[answerIndex];
        console.log("ANSWER",answer);

    });
});
