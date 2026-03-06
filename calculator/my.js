function perOp(a, b, opp){
    const actions = {
        '+': (x,y)=>x+y,
        '-': (x,y)=>x-y,
        '*': (x,y)=>x*y,
        '/': (x,y)=>x/y
    };
    return actions[opp](a,b);
}

function roundRes(num){
    return Math.round((num + Number.EPSILON) * 1000000) / 1000000;
}

let items=[7,8,9,'/',4,5,6,'*',1,2,3,'-','.',0,'=','+'];
let itemptr=0;

let cal=document.querySelector("#clickable");

for(let row=1; row<=4; row++){

    let mydiv=document.createElement("div");
    mydiv.setAttribute("id","row"+row);
    mydiv.classList.add("row");

    for(let col=1; col<=4; col++){

        let itEle=document.createElement("button");
        itEle.setAttribute("id",""+items[itemptr]);
        itEle.innerText=items[itemptr];
        itEle.classList.add("btn");

        if(typeof(items[itemptr])=='number'){
            itEle.classList.add("num");
        }
        else{
            if(items[itemptr]=='.') itEle.classList.add("point");
            else if(items[itemptr]=='=') itEle.classList.add("equal");
            else itEle.classList.add("operator");
        }

        itemptr++;
        mydiv.appendChild(itEle);
    }

    cal.appendChild(mydiv);
}

let allowed={

    phase:"op1",
    op1:"",
    op2:"",
    opertation:"",

    number:true,
    operator:false,
    point:false,
    equal:false,

    pointCount:0,
    lastRes:null
};

function resetAllowed(){

    allowed.phase="op1";
    allowed.op1="";
    allowed.op2="";
    allowed.opertation="";

    allowed.number=true;
    allowed.operator=false;
    allowed.point=false;
    allowed.equal=false;

    allowed.pointCount=0;
}

function doOperation(){

    if(allowed.op1=="" || allowed.op2=="" || allowed.opertation==""){
        return null;
    }

    if(allowed.opertation=="/" && parseFloat(allowed.op2)==0){
        curr.innerText="Nice try. Divide by 0 😏";
        resetAllowed();
        return null;
    }

    let res=perOp(parseFloat(allowed.op1),parseFloat(allowed.op2),allowed.opertation);

    res=roundRes(res);

    allowed.lastRes=res;

    return res;
}

let prev=document.querySelector("#prev");
let curr=document.querySelector("#curr");

let clickable=document.querySelector("#clickable");

clickable.addEventListener("click",(e)=>{

    let myId=e.target.id;

    if(!myId) return;
    if(myId!="clear" && myId!="delete" &&!e.target.classList.contains("btn")){
        return;
    }

    if(myId=="clear"){
        prev.innerText="";
        curr.innerText="";
        resetAllowed();
        return;
    }

    if(myId=="delete"){

        let text=curr.innerText;
        if(text.length==0) return;

        let deleted=text.charAt(text.length-1);

        curr.innerText=text.slice(0,-1);

        if(deleted=="."){
            allowed.pointCount=0;
            allowed.point=true;
        }

        if(allowed.phase=="op1"){

            allowed.op1=allowed.op1.slice(0,-1);

            if(allowed.op1.length==0){
                allowed.operator=false;
            }

            return;
        }

        if(allowed.phase=="op2"){

            if(deleted==allowed.opertation){

                allowed.phase="op1";
                allowed.opertation="";

                allowed.operator=true;
                allowed.equal=false;

                return;
            }

            allowed.op2=allowed.op2.slice(0,-1);

            if(allowed.op2.length==0){
                allowed.equal=false;
            }

            return;
        }
    }

    let types=e.target.classList;

    let type="number";

    if(types.contains("operator")) type="operator";
    else if(types.contains("point")) type="point";
    else if(types.contains("equal")) type="equal";

    if(allowed[type]==false) return;

    if(type=="number"){

        if(curr.innerText==allowed.lastRes){
            resetAllowed();
            curr.innerText="";
        }

        curr.innerText+=myId;

        if(allowed.phase=="op1"){
            allowed.op1+=myId;
        }
        else{
            allowed.op2+=myId;
            allowed.equal=true;
        }

        allowed.operator=true;
        allowed.point=true;

        return;
    }

    if(type=="point"){

        if(allowed.pointCount>=1) return;

        curr.innerText+=myId;

        allowed.pointCount++;
        allowed.point=false;
        allowed.number=true;
        allowed.operator=false;

        return;
    }

    if(type=="operator"){

        if(allowed.phase=="op1"){

            allowed.phase="op2";
            allowed.opertation=myId;

            curr.innerText+=myId;

            allowed.operator=false;
            allowed.number=true;
            allowed.point=false;
            allowed.pointCount=0;

            return;
        }

        if(allowed.phase=="op2"){

            if(allowed.op2==""){

                allowed.opertation=myId;

                curr.innerText=curr.innerText.slice(0,-1)+myId;

                return;
            }

            let res=doOperation();
            if(res===null) return;

            prev.innerText=allowed.op1+" "+allowed.opertation+" "+allowed.op2;

            allowed.op1=String(res);
            allowed.op2="";

            allowed.opertation=myId;

            curr.innerText=res+myId;

            allowed.operator=false;
            allowed.number=true;
            allowed.point=false;
            allowed.pointCount=0;

            return;
        }
    }

    if(type=="equal"){

        if(!allowed.equal) return;

        let res=doOperation();
        if(res===null) return;

        prev.innerText=allowed.op1+" "+allowed.opertation+" "+allowed.op2;

        curr.innerText=res;

        allowed.op1=String(res);
        allowed.op2="";

        allowed.phase="op1";

        allowed.operator=true;
        allowed.number=true;
        allowed.point=true;
        allowed.equal=false;

        allowed.pointCount=(curr.innerText.includes("."))?1:0;

        return;
    }

});