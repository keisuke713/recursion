// let melos = {
//     name: "melos",
//     srcWhenMoveToRight: "images/melos2.png",
//     srcWhenMoveToBottom: "images/melos3.png",
//     positionX: 0,
//     positionY: 0,
//     latestDirect: 1,
//     moveToRight: (target)=>{
//         if(melos.latestDirect == 0){
//             melos.latestDirect = 1;
//             target.src = melos.srcWhenMoveToRight;
//         }
//         melos.positionX += 1;
//         target.style.left = `${melos.positionX}px`;
//     },
//     moveToBottom: (target)=>{
//         if(melos.latestDirect == 1){
//             melos.latestDirect = 0;
//             target.src = melos.srcWhenMoveToBottom;
//         }
//         melos.positionY += 1;
//         target.style.top = `${melos.positionY}px`;
//     }
// }

// melos.imgWhenMoveToBottom = new Image();
// melos.imgWhenMoveToBottom.src = "images/melos3.png";

// melos.imgWhenMoveToRight = new Image();
// melos.imgWhenMoveToBottom.src = "images/melos2.png";

class Melos{
    static direct = ["bottom", "right"];
    constructor(srcWhenMoveToBottom, srcWhenMoveToRight){
        this.name = "melos",
        this.imgWhenMoveToBottom = this.setImage(srcWhenMoveToBottom);
        this.imgWhenMoveToRight = this.setImage(srcWhenMoveToRight);
        this.positionX = 0;
        this.positionY = 0;
        this.latestDirect = 0; 
        this.move = 0;
    }
    setImage(src){
        let image = new Image();
        image.src = src;
        return image;
    }
    moveToBottom(target){
    }
    moveToRight(target){
    }
}

let melos = new Melos("images/melos3.png","images/melos2.png")

// appendMelosImg(target, melos);

// function appendMelosImg(target, melos){
//     let img = document.createElement("img");
//     img.id = melos.name;
//     img.src = melos.srcWhenMoveToRight;
//     img.setAttribute("style", `position:absolute; top:${melos.positionX}px; left:${melos.positionY}px; max-width: 50px;`);
//     target.append(img);
// }

// img = document.getElementById("melos");

// addEventListener("keydown", function(event){
//     if(event.key == "ArrowRight") moveToRight(img);
//     if(event.key == "ArrowDown") moveToBottom(img);
// });

// function moveToBottom(target){
//     let counter = 0;
//     let i = setInterval(function(){
//         counter++;
//         melos.moveToBottom(img);
//         if(counter >= 16){
//             clearInterval(i);
//         }
//     }, 8);
// }

// function moveToRight(target){
//     let counter = 0;
//     let i = setInterval(function(){
//         counter++;
//         melos.moveToRight(img);
//         if(counter >= 16){
//             clearInterval(i);
//         }
//     }, 8);
// }

// window.onload = function(){
//     let canvas = document.getElementById("canvas");
//     let context = canvas.getContext('2d');
//     context.fillStyle = "rgb(0, 0, 255)";
//     context.fillRect(20,20,50,50);
//     let img = new Image();
//     img.src = melos.srcWhenMoveToBottom;
//     context.drawImage(img, 0, 0);
// }

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let key = {
    up: false,
    down: false,
    right: false,
    left: false,
    push: "" 
}

let map = [
	[0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
	[0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
	[0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
	[1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
	[1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
	[0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
	[1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
	[0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0]
];

// addEventListener('load', function(){
//     context.drawImage(melos.imgWhenMoveToBottom, melos.positionX, melos.positionY, 100, 100);
// }, false);

function main(){
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, 640, 640);
    let img = new Image();
    img.src = "images/map.png";

    for(let i=0; i<map.length; i++){
        for(let j=0; j<map[i].length; j++){
            if(map[i][j] == 0) ctx.drawImage(img, 0, 0, 32, 32, 32*j, 32*i, 32, 32);
            else ctx.drawImage(img, 32, 0, 32, 32, 32*j, 32*i, 32, 32)
        }
    }
    ctx.drawImage(melos.imgWhenMoveToBottom, melos.positionX, melos.positionY, 32, 32);

    addEventListener("keydown", keydownfunc, false);
    addEventListener("keyup", keyupfunc, false);

    if(melos.move === 0){
        let x = melos.positionX/32;
        let y = melos.positionY/32;

        if(key.left === true){
            let x = melos.positionX/32;
            let y = melos.positionY/32;
            x--;
            if(map[y][x]===0){
                melos.move = 32;
                key.push = "left";
            }
        }
        if(key.up === true){
            if(y>0){
                y--;
                if(map[y][x] === 0){
                    melos.move = 32;
                    key.push = "up";
                }
            }
        }
        if(key.right === true){
            x++;
            if(map[y][x] === 0){
                melos.move = 32;
                key.push = "right";
            }
        }
        if(key.down === true){
            if(y<19){
                y++;
                if(map[y][x] === 0){
                    melos.move = 32;
                    key.push = "down";
                }
            }
        }
    }
    if(melos.move > 0){
        melos.move -= 4;
        if(key.push === "left") melos.positionX -= 4;
        if(key.push === "up") melos.positionY -= 4;
        if(key.push === "right") melos.positionX += 4;
        if(key.push === "down") melos.positionY += 4;
    }
    requestAnimationFrame(main);
}

addEventListener("load", main(), false);

function keydownfunc(event){
    let keyCode = event.keyCode;
    if(keyCode === 37) key.left = true;
    if(keyCode === 38) key.up = true;
    if(keyCode === 39) key.right = true;
    if(keyCode === 40) key.down = true;
    event.preventDefault();
}

function keyupfunc(event){
    let keyCode = event.keyCode;
    if(keyCode === 37) key.left = false;
    if(keyCode === 38) key.up = false;
    if(keyCode === 39) key.right = false;
    if(keyCode === 40) key.down = false;
}

