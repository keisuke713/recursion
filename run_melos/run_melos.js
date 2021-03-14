let target = document.getElementById("target");
let img = null;

let melos = {
    name: "melos",
    srcWhenMoveToRight: "images/melos2.png",
    srcWhenMoveToBottom: "images/melos3.png",
    positionX: 0,
    positionY: 0,
    latestDirect: 1,
    moveToRight: (target)=>{
        if(melos.latestDirect == 0){
            melos.latestDirect = 1;
            target.src = melos.srcWhenMoveToRight;
        }
        melos.positionX += 1;
        target.style.left = `${melos.positionX}px`;
    },
    moveToBottom: (target)=>{
        if(melos.latestDirect == 1){
            melos.latestDirect = 0;
            target.src = melos.srcWhenMoveToBottom;
        }
        melos.positionY += 1;
        target.style.top = `${melos.positionY}px`;
    }
}

appendMelosImg(target, melos);

function appendMelosImg(target, melos){
    let img = document.createElement("img");
    img.id = melos.name;
    img.src = melos.srcWhenMoveToRight;
    img.setAttribute("style", `position:absolute; top:${melos.positionX}px; left:${melos.positionY}px; max-width: 50px;`);
    target.append(img);
}

img = document.getElementById("melos");

addEventListener("keydown", function(event){
    if(event.key == "ArrowRight") moveToRight(img);
    if(event.key == "ArrowDown") moveToBottom(img);
});

function moveToBottom(target){
    let counter = 0;
    let i = setInterval(function(){
        counter++;
        melos.moveToBottom(img);
        if(counter >= 16){
            clearInterval(i);
        }
    }, 8);
}

function moveToRight(target){
    let counter = 0;
    let i = setInterval(function(){
        counter++;
        melos.moveToRight(img);
        if(counter >= 16){
            clearInterval(i);
        }
    }, 8);
}