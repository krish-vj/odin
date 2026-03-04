let num=16;
let dimension=960/num;
btn=document.querySelector("button");
btn.addEventListener("click", ()=>{
    let res=prompt("enter number of squares per side");
    while (res>100 || res<0){
        res=prompt("value should be between [0, 100]");
    }
    num=res;
    dimension=960/num;
    draw()
})

function draw(){
    const cont=document.querySelector("#container")
    cont.innerHTML="";
    cont.style.backgroundColor='#f5f5f5';
    cont.style.border="1px solid black";
    cont.style.width='fit-content';
for (let row=0; row<num; row++){
    
    let myRow=document.createElement("div");
    cont.appendChild(myRow);
    myRow.style.display='flex';
    for (let col=0; col<num; col++){
        let item=document.createElement("div");
        // item.style.border="2px solid black";
        item.style.backgroundColor='black';
        item.style.opacity='0.1';
        item.style.height=dimension+'px'; item.style.width=dimension+'px';
        item.addEventListener("mouseenter", (event)=>{
            event.target.style.opacity=event.target.style.opacity*1.2;
        })
        myRow.appendChild(item);
    }
}}
draw()