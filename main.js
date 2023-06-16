document.getElementById("btn").onclick = function fun(){
  console.log("yoo");
  bounce();
}

let speed = 10;
let xp = speed;
let yp = speed;
let xM = speed;
let yM = xM;
let pWidth = 20;
let pHeigth = pWidth;
let width = 10;
let heigth = width;
let doBounce = false;
let liveTime = 100;
let canShoot = true;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bounce(){
  x = xp;
  y = yp
  i = 0;
  //console.log(document.getElementById("cv").clientHeight - heigth);
  if(canShoot){
    canShoot = false;
    while (i < liveTime) {
    
      if (x == 0) {
        xM = xM * -1;
      }
      else if (x > document.getElementById("cv").width - (width + 5)) {
        xM = xM * -1;
      }
      if (y == 0) {
        yM = yM * -1;
      }
      else if (y > document.getElementById("cv").clientHeight - (heigth + 5)) {
        yM = yM * -1;
      }
    
      clear(heigth, width, x, y);
      x += xM;
      y += yM;
      draw(heigth, width, x, y);
    
      await sleep(50);
      i++;
    }
  }
  canShoot = true;
  clear(heigth,width,x,y);
}

function draw(h,w,x,y){
  const canvas = document.getElementById("cv");
  if(canvas.getContext){
    const ctx = canvas.getContext("2d");
    ctx.fillRect(x,y,h,w);
    
  }
  
}

function clear(h,w,x,y) {
  const canvas = document.getElementById("cv");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(x, y, h, w);

  }

}

document.addEventListener('keydown', function(event) {
  if (event.key == "w") {
   if(yp > 0){
    clear(pHeigth,pWidth,xp,yp);
    yp -= speed;
    draw(pHeigth,pWidth,xp,yp); 
   }
  }
  if (event.key == "a") {
    if(xp > 0){
      clear(pHeigth,pWidth,xp,yp);
      xp -= speed;
      draw(pHeigth,pWidth,xp,yp);
    }
    
  }
  if (event.key == "s") {
    //console.log("yoo");
    if(yp < document.getElementById("cv").clientHeight - (heigth+5)){
      clear(pHeigth,pWidth,xp,yp);
      yp+=speed;
      draw(pHeigth,pWidth,xp,yp);
    }
    
    
  }
  if (event.key == "d") {
    if(xp < document.getElementById("cv").width - (width+5)){
      clear(pHeigth,pWidth,xp,yp);
      xp += speed;
      draw(pHeigth,pWidth,xp,yp);
      
    }
    
  }
  
  if(event.key == " "){
    if(canShoot){
      bounce();
    }
    
  }


});
