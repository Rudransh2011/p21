var PLAY = 1;
var END = 0;
var player,playerImg;
var bird,birdAn,birdGroup;
var thun,thunImg,thunGroup;
var up_cloud,up_cloudImg;
var ap,apImg,apGroup;
var jumpSound;

var land;
var gameState = PLAY;

var game_Over,game_OverImg;
var retry,retryImg;

var score = 0;

function preload()
{
   playerImg = loadImage("player.png");
   birdAn = loadAnimation("bird1.png","bird2.png");
   thunImg = loadImage("thunder.png");
   game_OverImg = loadImage("game_Over.png");
   retryImg = loadImage("retry_button.png");
   up_cloudImg = loadImage("upper_clouds.png");
   ap = loadImage("ap.png");
   jumpSound = loadSound("boing.mp3");
}

function setup()
{
   canvas = createCanvas(600,500);
    
   player = createSprite(100,230,20,20);
   player.addImage(playerImg);
   player.scale = 0.09
 
   land = createSprite(100,500,300,500);
   land.shapeColor = "lightgreen";

   game_Over = createSprite(700,200,20,20);
   game_Over.visible = false;
   game_Over.addImage(game_OverImg);
   game_Over.scale = 0.5;

   retry = createSprite(700,300,20,20);
   retry.visible = false;
   retry.addImage(retryImg);
   retry.scale = 0.5;

   up_cloud = createSprite(500,-150,20,20);
   up_cloud.addImage(up_cloudImg);
   up_cloud.scale = 2;
}

function draw()
{
   background("lightblue");
    
   drawSprites();

   text("SCORE:" + score,1150,125);
    
   if(gameState == PLAY)
   {
      if(keyDown("space"))
      {
         player.velocityY = -15;
         land.velocityX = -5;
         up_cloud.velocityX = -5;
         score = Math.round(getFrameRate()/100);
         jumpSound.play();
      }
      player.velocityY = player.velocityY+5;

      if(up_cloud.x < 0)
      {
         up_cloud.x = up_cloud.width/2;
      }

      
      spawnBirds();
      spawnThuder();
      spawnAp();

      retry.visible = false;
      game_Over.visible = false;
   }
   if(gameState == END)
   {
      retry.visible = true;
      game_Over.visible = true;

      if (mousePressedOver(retry)) 
      {
        reset();   
      }

      birdGroup.setLifetimeEach(-1);
      thunGroup.setLifetimeEach(-1);
   }
   
   player.collide(land);

   birdGroup = createGroup();
   thunGroup = createGroup();
   apGroup = createGroup();

   player.depth = up_cloud.depth;
   player.depth += 1;
}

function reset()
{
   birdGroup.destroyEach();
   thunGroup.destroyEach();
   apGroup.destroyEach();
   gameState = PLAY;
}

function spawnBirds()
{
   if(frameCount % 100 == 0)
   {
     bird = createSprite(600,Math.round(random(0,600)),20,20);
     birdGroup.add(bird)
     bird.addAnimation("flying",birdAn);
     bird.velocityX = -5;
     bird.lifetime = 120;
   }
}

function spawnThuder()
{
   if(frameCount % 100 == 0)
   {
      thun = createSprite(1300,Math.round(random(0,600)),20,20);
      thunGroup.add(thun);
      thun.addImage(thunImg);
      thun.velocityX = -5;
      thun.lifetime = 120;
   }
}

function spawnAp() 
{
   if (frameCount % 100 == 0) 
   {
      ap = createSprite(1300,Math.round(random(0,1000)),20,20);
      apGroup.add(ap);
      ap.addImage(apImg);
      ap.velocityX = -5;
      ap.lifetime = 120;
   }
}