let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let box = 32;
let direction="right";
let color="green";
let score=0;


const input = document.querySelector('input');
input.addEventListener('change', updateColor);

function updateColor(e) {
  color = e.target.value;
}



let body = [];
body[0]={
    x: 4*box,
    y: 6*box
}
let food={
    x: Math.floor(Math.random()*15+1)*box,
    y: Math.floor(Math.random()*15+1)*box
}


function background(){
    context.fillStyle = "aquamarine";
    context.fillRect(0,0,16*box,16*box);
}

function snake(){
    for(i=0; i<body.length; i++){
        context.fillStyle=color;
        context.fillRect(body[i].x, body[i].y, box,box);
    }
}

function drawFood(){
    context.fillStyle="red";
    context.fillRect(food.x, food.y, box, box);
}


document.addEventListener('keydown', update);
function update(event){
    if(event.keyCode == 37 && direction != "right") direction="left";
    if(event.keyCode == 38 && direction != "down") direction="up";
    if(event.keyCode == 39 && direction != "left") direction="right";
    if(event.keyCode == 40 && direction != "up") direction="down";
}

function start(){

    if(body[0].x > 15*box && direction=="right") body[0].x=0;
    if(body[0].x < 0 && direction=="left") body[0].x=16*box;
    if(body[0].y < 0 && direction=="up") body[0].y=16*box;
    if(body[0].y > 15*box && direction=="down") body[0].y=0;

    for(i=1; i<body.length; i++){
        if(body[0].x == body[i].x && body[0].y == body[i].y){
            clearInterval(start);
            document.getElementById("gameOver").play();
            alert('Game Over! :(');
        }
    }

    background();
    snake();
    drawFood();

    let bodyX = body[0].x;
    let bodyY = body[0].y;

    if(direction=="right") bodyX += box;
    if(direction=="left") bodyX -= box;
    if(direction=="up") bodyY -= box;
    if(direction=="down") bodyY += box;

    if(bodyX != food.x || bodyY != food.y){
        body.pop();
    }else{
        document.getElementById("scoreSound").play();
        food.x = Math.floor(Math.random()*15+1)*box,
        food.y = Math.floor(Math.random()*15+1)*box;
        score+=1;
        document.getElementById("score").innerHTML=score;
        
    }

    

    let newHead = {
        x: bodyX,
        y: bodyY
    }
    body.unshift(newHead);
}

let game = setInterval(start,100);
