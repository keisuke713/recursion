let target = document.getElementById("target");

let melos = {
    name: "melos",
    src: "images/melos2.png",
    positionX: 0,
    positionY: 0,
    moveToRight: (event)=>{
        melos.positionX += 1;
        event.target.style.left = `${melos.positionX}px`;
    },
    moveToBottom: (event)=>{
        melos.positionY += 1;
        event.target.style.top = `${melos.positionY}px`;
    }
}

appendMelosImg(target, melos);

function appendMelosImg(target, melos){
    let img = document.createElement("img");
    img.id = melos.name;
    img.src = melos.src;
    img.setAttribute("style", `position:absolute; top:${melos.positionX}px; left:${melos.positionY}px; max-width: 50px;`);
    target.append(img);
}

document.getElementById("melos").addEventListener("click", function(event){
    test2(event);
});

function test2(event){
    let counter = 0;
    let i = setInterval(function(){
        counter++;
        test(event);
        if(counter >= 32){
            clearInterval(i);
        }
    }, 32);
}

function test(event){
    melos.positionX += 1;
    melos.moveToBottom(event);
    event.target.style.left = `${melos.positionX}px`;
}