function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let arr=["rock", "paper", "scissors"]
function getComputerChoice(){
    // return arr[getRandomInt(3)];  
    return getRandomInt(3);
}
function getHumanChoice(){
    let choice=prompt("enter 0 for rock, 1 for paper, 2 for scissors");
    // return arr[choice];
    return choice;
}
let humanScore=0; let computerScore=0;
function playRound(humanChoice, computerChoice){
    // 3C2 3 if's, but 3P2 6 if's! i am not writing so much :(
    // maybe i could simplfy via index difference? diff 1, right wala wins
    //diff 2 left wala wins that's about it
    if (humanScore==0 && computerScore==0){
        let finalll= document.querySelector("#final");
        finalll.innerText="";
    }

    let res=document.querySelector("#result");
    if (humanChoice==computerChoice){
        res.innerText= `Tie! ${arr[humanChoice]} and ${arr[computerChoice]} give tie`;
    }
    else if(humanChoice<computerChoice){
        if (computerChoice-humanChoice==1) {res.innerText=(`You lose! ${arr[computerChoice]} beats ${arr[humanChoice]}`); computerScore++;}
        else {res.innerText=(`You Win! ${arr[humanChoice]} beats  ${arr[computerChoice]}`); humanScore++;}
    }
    else{
        if (computerChoice-humanChoice==-1) {res.innerText=(`You Win! ${arr[humanChoice]} beats  ${arr[computerChoice]}`); humanScore++;}
        else  {res.innerText=(`You lose! ${arr[computerChoice]} beats ${arr[humanChoice]}`); computerScore++;}

    }    
    let hscore=document.querySelector("#human");
    let cscore=document.querySelector("#comp");
    hscore.innerText=humanScore;
    cscore.innerText=computerScore;
    let finalans=document.querySelector("#final");
    if (humanScore==5 || computerScore==5){
    hscore.innerText='0';
    cscore.innerText='0';
    res.innerText='';
    if (humanScore==5){
      finalans.innerText="You won the last game";
      alert("You Won!")
    }
    else{
        finalans.innerText="You lost the last game";
        alert("You Lost")
    }
    
    
    humanScore=0; computerScore=0;}
}
function playGame(){
    humanScore=0; computerScore=0;
    for (let i=0; i<5; i++){
        let HumanS=getHumanChoice();
        let comp= getComputerChoice();
        playRound(HumanS, comp);
    }
    if (humanScore>computerScore){alert("YOU WIN!")}
    else if(humanScore<computerScore) alert("YOU LOSE!")
    else alert("TIE!");
}

// add event listener to choice buttons
btns=document.querySelector("#buttons");
btns.addEventListener("click", (e)=>{
        let hchoice=e.target.id;
        playRound(hchoice, getComputerChoice());
})

