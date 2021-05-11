function load_images(){
    virus_image = new Image;
    virus_image.src = "./Assets/v1.png";

    player_image = new Image;
    player_image.src = "./Assets/superhero.png";

    gem_image = new Image;
    gem_image.src = "./Assets/gemm.png";
}

// Dom tree traversal to find an elment
// variables are global

function init(){
    canvas = document.getElementById('mycanvas');
    console.log(canvas);

    // Change the height and width of the canvas using JS
    W = 700
    H = 400

    canvas.width = W;
    canvas.height = H;

    // try to work with canvas
    pen = canvas.getContext('2d');

    score = 0;
    game_over = false;

    // We want to create a virus with JSON objects
    e1 = {
        x : 130,
        y : 150,
        w : 60,
        h : 60,
        speed : 15,
    };
    
    e2 = {
        x : 250,
        y : 50,
        w : 60,
        h : 60,
        speed : 25,
    };

    e3 = {
        x : 450,
        y : 100,
        w : 60,
        h : 60,
        speed : 30,
    };

    enemy = [e1,e2,e3];

    player = {
        x : 40,
        y : H/2,
        w : 60,
        h : 60,
        speed : 15,
        moving : false,
    }

    gem = {
        x : 600,
        y : H/2,
        w : 60,
        h : 60,
    }

    // create event listner
    canvas.addEventListener('mousedown', function(){
        console.log('you pressed the mouse')
        player.moving = true;
    })

    canvas.addEventListener('mouseup', function(){
        console.log('you released the mouse')
        player.moving = false;
    })
}

// Add Movement to the bird // Game loop
function draw(){

    // clear the old screen (entire area)
    pen.clearRect(0,0,W,H);
    
    pen.fillStyle = "white";
    pen.font = "bold 20px serif";  
    pen.fillText("Score "+ score, 20,25)

    pen.drawImage(gem_image, gem.x,gem.y,gem.w,gem.h)

    pen.drawImage(player_image, player.x, player.y,player.w, player.h)

    for(let i = 0; i<enemy.length; i++){
        pen.drawImage(virus_image, enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
}

function isColliding(b1,b2){

    // x,y,w,h
    if(Math.abs(b1.x - b2.x) <= 30 && Math.abs(b1.y - b2.y) <= 30){
        return true;
    }
    return false;
}

function update(){

    if(player.moving == true){
        player.x += player.speed;
        score = score+10;
    }

    // Loop to check collision between enemy and player
    for(let i = 0; i<enemy.length ;i++){
        if(isColliding(enemy[i], player)){
            score -= i*100;
            if(score<0){
                game_over = true;
                alert('Game over');
            }
        }
    }

    //collision gem and player
    if(isColliding(player,gem)){
        game_over = true;
        draw();
        alert('Your score: ' + score);
        // break the game loop
    }

    for(let i = 0 ; i<enemy.length; i++){
        enemy[i].y += enemy[i].speed
        if(enemy[i].y >= H - enemy[i].h || enemy[i].y <= 0){
            enemy[i].speed *= -1;
        }
    }
}

function gameloop(){
    if(game_over == true){
        clearInterval(setIntervalRef);
    }
    draw();
    update();
}

// start of the game
init();
load_images();

// repeated call gameloop after 100 ms
let setIntervalRef = setInterval(gameloop,100);
