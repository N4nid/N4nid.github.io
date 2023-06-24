let textI = document.getElementById("speed");
let speed = parseFloat(textI.value);
let xp = 0;
let yp = 0;
let xM = speed;
let yM = xM;
let pWidth = 20;
let pHeigth = pWidth;
let width = 10;
let heigth = width;
let boom = false;
//let liveTime = 100;
let canShoot = true;
let i = false;


function init() {
  const canvas = document.getElementById("cv");
  var ctx = canvas.getContext("2d");
  ctx.canvas.width  = (window.innerWidth-(window.innerWidth/50));
  ctx.canvas.height = (window.innerHeight-(window.innerHeight/50));

}
function setSpeed(){
  speed = parseFloat(textI.value);22
  xM = speed;
  yM = xM;

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bounce(){
  x = xp;
  y = yp
  j = 0;
  //console.log(document.getElementById("cv").clientHeight - heigth);
  if(canShoot){
    canShoot = false;
    while (!boom) {

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

      await sleep(20);
    }
  }
  canShoot = true;
  clear(heigth,width,x,y);
  clear(pHeigth,pWidth,xp,yp);
  draw(pHeigth,pWidth,x,y);
  xp = x;
  yp = y;
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

function displayD(){
  draw(pHeigth,pWidth,xp,yp);
  if(xM > 0 && yM > 0){
    clear((pWidth/2),(pHeigth/2),xp,yp);
    clear(xp,yp,(pWidth/2),(pHeigth/2));
  }else if (xM < 0 && yM > 0) {
    clear((pWidth/2),(pHeigth/2),xp+(pWidth/2),yp);
  }else if (xM < 0 && yM < 0) {
    clear((pWidth/2),(pHeigth/2),xp+(pWidth/2),yp+(pWidth/2));
  }else{
    clear((pWidth/2),(pHeigth/2),xp,yp+(pWidth/2));
  }
}


document.addEventListener('keydown', function(event) {

  if (event.key == "w") {
   if(yp > 0){
    clear(pHeigth,pWidth,xp,yp);
    yp -= speed;
    draw(pHeigth,pWidth,xp,yp);
   }
   displayD();
  }
  if (event.key == "a") {
    if(xp > 0){
      clear(pHeigth,pWidth,xp,yp);
      xp -= speed;
      draw(pHeigth,pWidth,xp,yp);
    }
    displayD();
  }
  if (event.key == "s") {
    //console.log("yoo");
    if(yp < document.getElementById("cv").clientHeight - (speed)){
      clear(pHeigth,pWidth,xp,yp);
      yp+=speed;
      draw(pHeigth,pWidth,xp,yp);
    }
    displayD();

  }
  if (event.key == "d") {
    if(xp < document.getElementById("cv").width - (speed)){
      clear(pHeigth,pWidth,xp,yp);
      xp += speed;
      draw(pHeigth,pWidth,xp,yp);

    }
    displayD();

  }

  if(event.key == " "){
    if(canShoot){
      boom = false;
      bounce();
    }else{
      boom = true;
    }

  }

  if(event.key == "q" && canShoot){
    if(i){
      xM = xM*-1;
      i = false;
    }else{
      yM = yM*-1;
      i = true;
    }

    displayD();
  }

  if (event.key == "e" && canShoot) {
    if (i) {
      yM = yM * -1;
      i = false;
    } else {
      xM = xM * -1;
      i = true;
    }
    displayD();
  }

  if(event.key == "r" && canShoot){
    clear(pHeigth,pWidth,xp,yp);
    xp = 0;
    yp = 0;
    draw(pHeigth,pWidth,xp,yp);
  }

});
