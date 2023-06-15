document.getElementById("btn").onclick = function fun(){
  console.log("yoo");
  bounce();
}


let x = 30;
let y = 10;
let speed = 10;
let xM = speed;
let yM = xM;
let width = 10;
let heigth = width;
let doBounce = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bounce(){
  doBounce = !doBounce;
  console.log(document.getElementById("cv").clientHeight - speed);
  while(doBounce){
    clear();
    x += xM;
    y += yM;
    draw();
    
    if (x == 0) {
      xM = xM * -1;
    }
    else if (x > document.getElementById("cv").width - (speed+5)) {
      xM = xM * -1;
    }
    if (y == 0) {
      yM = yM * -1;
    }
    else if (y > document.getElementById("cv").clientHeight - (speed+5)) {
      yM = yM * -1;
    }
      
    await sleep(50);
  }
}

function draw(){
  const canvas = document.getElementById("cv");
  if(canvas.getContext){
    const ctx = canvas.getContext("2d");
    ctx.fillRect(x,y,heigth,width);
    
  }
  
}

function clear() {
  const canvas = document.getElementById("cv");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(x, y, heigth, width);

  }

}

document.addEventListener('keydown', function(event) {
  if (event.key == "w") {
   if(y > 0){
    clear();
    y -= speed;
    draw(); 
   }
  }
  if (event.key == "a") {
    if(x > 0){
      clear();
      x -= speed;
      draw();
    }
    
  }
  if (event.key == "s") {
    //console.log("yoo");
    if(y > document.getElementById("cv").clientHeight - (speed+5)){
      clear();
      y+=speed;
      draw();
    }
    
    
  }
  if (event.key == "d") {
    if(x > document.getElementById("cv").width - (speed+5)){
      clear();
      x += speed;
      draw();
      
    }
    
  }


});
