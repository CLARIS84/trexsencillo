var trex,ground,trex_running,groundImg, fakeground
var cloud, cloudImg,cactus1, cactus2,cactus3,cactus4,cactus5,cactus6;
var gameState="PLAY", gameover, gameoverImg,reinicio,reinicioImg



function preload() 
{
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
trex_collided =loadAnimation("trex_collided.png")
groundImg=loadImage("ground2.png");
cloudImg=loadImage("cloud.png");
cactus1=loadImage("obstacle1.png")
cactus2=loadImage("obstacle2.png")
cactus3=loadImage("obstacle3.png")
cactus4=loadImage("obstacle4.png")
cactus5=loadImage("obstacle5.png")
cactus6=loadImage("obstacle6.png")
gameoverImg=loadImage("gameOver.png")
reinicioImg=loadImage("restart.png")
}


function setup() 
{
createCanvas(600,200);
trex=createSprite(50,165,30,20)
trex.addAnimation("corriendo",trex_running);
trex.addAnimation("collided",trex_collided)
trex.scale=.6;

//Con esta linea creamos los sprites
ground=createSprite(0,190,600,10);
ground.addImage(groundImg);


fakeground=createSprite(0,200,300,10);
fakeground.visible=false;

cloudsGroup= createGroup();
cactusGroup=createGroup();

gameover=createSprite(300,80,20,20);
gameover.addImage(gameoverImg);
gameover.visible=false;

reinicio=createSprite(300,150,20,20);
reinicio.addImage(reinicioImg);
reinicio.visible=false;

}

function draw() 
{
background ("white") 

if (gameState==="PLAY"){
    trex.changeAnimation("corriendo",trex_running);
    ground.velocityX=-4;
    if (ground.x < 0){
        ground.x = ground.width/2;
    }  
    if (keyDown("space")&& trex.y>160){
        trex.velocityY=-14;
    }
    spawnClouds();
    spawnCactus();
}

trex.velocityY= trex.velocityY+.8
trex.collide(fakeground);
drawSprites();

if (trex.isTouching(cactusGroup)){
    gameState="GAMEOVER"
}

if (gameState==="GAMEOVER"){
    ground.velocityX=0;
    cloudsGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided)
    cloudsGroup.setLifetimeEach(-1);
    cactusGroup.setLifetimeEach(-1);
    gameover.visible=true;
    reinicio.visible=true
    if (mousePressedOver(reinicio)){
        gameState="PLAY"
        gameover.visible=false
        reinicio.visible=false
        cloudsGroup.destroyEach();
        cactusGroup.destroyEach();
    }
}
}

function spawnClouds(){
if (frameCount %60===0){
var cloud =createSprite(650,75,30,20);
cloud.y=random(5,75);
cloud.addImage(cloudImg);
cloud.scale=.8;
cloud.velocityX=-4;
cloud.depth=trex.depth;
trex.depth=cloud.depth+1;

cloud.lifetime=180;

cloudsGroup.add(cloud)

}    
}

function spawnCactus(){
    if (frameCount %70===0){
    var cactus =createSprite(650,165,10,30);
    cactus.velocityX=-4;

    var rand=Math.round(random(1,6));
    switch(rand){
        case 1: cactus.addImage(cactus1);
        cactus.scale=.5
                break;
        case 2: cactus.addImage(cactus2);
        cactus.scale=.5
                break;
        case 3: cactus.addImage(cactus3);
        cactus.scale=.5
                break;
        case 4: cactus.addImage(cactus4);
        cactus.scale=.5
                break;
        case 5: cactus.addImage(cactus5);
        cactus.scale=.5
                break;
        case 6: cactus.addImage(cactus6);
        cactus.scale=.5
                break;
        default: break; 
    }
    cactus.lifetime=180;
    cactusGroup.add(cactus);
    }  
}

