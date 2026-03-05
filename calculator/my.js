// // const add= (a,b)=>a+b;
// const sub= (a,b)=> a-b;
// const mul=(a,b)=>a*b;
// function add(a,b){return a+b;}
// const div=(a,b)=>a/b;
// let op1;
// let op2;
// let op;
// function operate(op1, op2, op){
//     return op(op1, op2);
// }

let items=[7, 8, 9, '/', 4, 5,6, '*',1,2,3, '-','.', 0, '=', '+']
let itemptr=0;
let cal=document.querySelector("#clickable")
for (let row=1; row<=4; row++){
    let mydiv=document.createElement("div");
    mydiv.setAttribute("id", "row"+row);
    mydiv.classList.add("row");
    for (let col=1; col<=4; col++){
        let itEle=document.createElement("button");
        itEle.setAttribute("id", ""+items[itemptr]);
        itEle.innerText=items[itemptr];
        itEle.classList.add("btn");
        if (typeof(items[itemptr])=='number'){
            itEle.classList.add("num");
        }
        else {
            if (items[itemptr]=='.'){itEle.classList.add("point");}
            if(items[itemptr]=='='){itEle.classList.add("equal"); }
            else {
                itEle.classList.add("operator");
            }
            
        }
        itemptr++;
        mydiv.appendChild(itEle);
    }
    cal.appendChild(mydiv);
}
let currState=0; 

let prev= document.querySelector("#prev")
let curr= document.querySelector("#curr")
let clickable=document.querySelector("#clickable");
clickable.addEventListener("click", (e)=>{
    let myId=e.target.id;
    if (myId=="clear"){
        prev.innerText=""; curr.innerText="";
        return;
    }
    let types=e.target.classList
    let type="num"
    if (types.contains("operator")) {type="operator";}
    else if (types.contains("point")){type="point";}
    else if (types.contains("equal")){type="equal";}
    if (currState==0){
        curr.innerText+=myId;
    }

})

