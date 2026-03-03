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
    if (humanChoice==computerChoice){
        console.log(`Tie! ${arr[humanChoice]} and ${arr[computerChoice]} give tie`);
    }
    else if(humanChoice<computerChoice){
        if (computerChoice-humanChoice==1) {console.log(`You lose! ${arr[computerChoice]} beats ${arr[humanChoice]}`); computerScore++;}
        else {console.log(`You Win! ${arr[humanChoice]} beats  ${arr[computerChoice]}`); humanScore++;}
    }
    else{
        if (computerChoice-humanChoice==-1) {console.log(`You Win! ${arr[humanChoice]} beats  ${arr[computerChoice]}`); humanScore++;}
        else  {console.log(`You lose! ${arr[computerChoice]} beats ${arr[humanChoice]}`); computerScore++;}

    }    
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
