const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let eat;
let sad;
let blink;
var gameLevel = "Start";


let engine;
let world;
var rope,fruit,ground,rope2,rope3;
var fruit_con,fruitCon2,fruitCon3;

let txt_start;
let bg_img;
let food;
let bunny_img;
let balloon;
let mute;
let collided = false;

let button3;
let button2;
var button;
var bunny;

let airSound;
let cuttingSound;
let bgSound
let eatSound;
let sadSound;


function preload()
{
  bg_img = loadImage('Images/background.png');
  food = loadImage('Images/melon.png');
  sad = loadAnimation("Images/sad_1.png","Images/sad_2.png","Images/sad_3.png")
  eat = loadAnimation("Images/eat_0.png","Images/eat_1.png","Images/eat_2.png","Images/eat_3.png","Images/eat_2.png","Images/eat_3.png","Images/eat_4.png")
  blink = loadAnimation("Images/blink_1.png","Images/blink_2.png","Images/blink_3.png")
  sadSound = loadSound("Images/sad.wav");
  eatSound = loadSound("Images/eating_sound.mp3");
  bgSound = loadSound("Images/sound1.mp3");
  cuttingSound = loadSound("Images/rope_cut.mp3");
  airSound = loadSound("Images/air.wav");
  blink.playing = true
  eat.playing = true
  sad.playing = true
  eat.looping = false
  sad.looping = false
}

function setup() 
{

  createCanvas(500,700);
  //bgSound.play()
  bgSound.setVolume(0.1)
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //cut btns
  button = createImg('Images/cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('Images/cut_btn.png');
  button2.position(450,50);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('Images/cut_btn.png');
  button3.position(20,550);
  button3.size(50,50);
  button3.mouseClicked(drop3);


  //btn mute
  mute = createImg('Images/mute.png');
  mute.position(450,30);
  mute.size(30,30);
  mute.mouseClicked(muteSound);

  //balloon
  //balloon = createImg('Images/balloon.png')
  //balloon.position(5,260);
  //balloon.size(150,100);
  //balloon.mouseClicked(blowAir)
  blink.frameDelay = 20
  eat.frameDelay = 25
  sad.frameDelay = 20

  rope = new Rope(9,{x:220,y:30});
  rope2 = new Rope(10,{x:480,y:50});
  rope3 = new Rope(14,{x:20,y:550});

  ground = new Ground(200,690,600,20);
  bunny = createSprite(200,620,100,100);
  
  
  bunny.scale = 0.2;

  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eat)
  bunny.addAnimation("sad",sad)

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  //fruitCon2 = new Link(rope2, fruit);
  //fruitCon3 = new Link(rope3, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  
  background(51);

  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  
  Engine.update(engine);
  ground.show();
  drawSprites();


  if(gameLevel == "Start"){
    textSize(50)
    fill("orange")
    strokeWeight(5)
    stroke("black")
    text("Click here to start",50,450)
    
  }

  

  if(collide(fruit,bunny)==true && collided == false){
    textSize(50)
    fill("orange")
    strokeWeight(5)
    stroke("black")
    text("LEVEL 1 COMPLETED",150,350)
    
    collided = true;
    bunny.changeAnimation("eating")
    eatSound.play();
    
  }
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("sad")
    sadSound.play();
  }
 
  if(gameLevel == "stage1"){
    
  }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  cuttingSound.play()
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruitCon2.detach();
  cuttingSound.play()
  fruitCon2 = null; 
}

function drop3()
{
  rope3.break();
  fruitCon3.detach();
  cuttingSound.play()
  fruitCon3 = null; 
}




function collide(body,sprite){
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<=80){
      World.remove(engine.world,fruit)
      fruit = null
      return true
    }
    else{
      return false
  
    }
    
  }
  
}


function blowAir(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
  airSound.play()
}


function muteSound(){
  if(bgSound.isPlaying()){
    bgSound.stop()
  }
  else{
    bgSound.play()
  }
}



function keyPressed(){
  if(keyCode == 83){
    gameLevel = "stage1";

  }
}