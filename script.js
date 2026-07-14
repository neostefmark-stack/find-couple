const game=document.getElementById("game");
const movesText=document.getElementById("moves");
const restart=document.getElementById("restart");

const emojis=[
"🍎","🍌","🍇","🍉",
"🍎","🍌","🍇","🍉",
"🍒","🥝","🍍","🍓",
"🍒","🥝","🍍","🍓"
];

let firstCard=null;
let secondCard=null;
let lock=false;
let moves=0;
let pairs=0;

function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
}

function createGame(){

    game.innerHTML="";
    moves=0;
    pairs=0;
    movesText.textContent=0;

    shuffle(emojis);

    emojis.forEach(emoji=>{

        const card=document.createElement("div");
        card.className="card";
        card.dataset.emoji=emoji;
        card.textContent="?";

        card.addEventListener("click",flip);

        game.appendChild(card);

    });

}

function flip(){

    if(lock)return;

    if(this.classList.contains("open"))return;

    if(this.classList.contains("matched"))return;

    this.classList.add("open");
    this.textContent=this.dataset.emoji;

    if(!firstCard){
        firstCard=this;
        return;
    }

    secondCard=this;

    moves++;
    movesText.textContent=moves;

    if(firstCard.dataset.emoji===secondCard.dataset.emoji){

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        firstCard=null;
        secondCard=null;

        pairs++;

        if(pairs===8){
            setTimeout(()=>{
                alert("🎉 Победа!\nХодов: "+moves);
            },300);
        }

    }else{

        lock=true;

        setTimeout(()=>{

            firstCard.classList.remove("open");
            secondCard.classList.remove("open");

            firstCard.textContent="?";
            secondCard.textContent="?";

            firstCard=null;
            secondCard=null;

            lock=false;

        },900);

    }

}

restart.addEventListener("click",createGame);

createGame();