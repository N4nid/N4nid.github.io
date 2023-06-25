
let input;
let tf = document.getElementById("tf");
let data = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","_"];
let dataString = data.join("");
let nums = [];
let numString;
let color = [];
let mult = 7;
let pattern = [];
let nijlo = [];
let delay = 20;
let slider = document.getElementById("slider");
let sizeS = document.getElementById("size");
let txt = document.getElementById("yoo");
let tDelay = document.getElementById("delay");
let tSize = document.getElementById("tSize");
let size = 6;
let mirror = true;
let wiHi = document.getElementById("cv").width; // width and hight

//Functons
function getInput(){
  nums = [];
  let goodIN = true;
  let x = tf.value.toLowerCase();
  for(let i = 0; i < x.length; i++){
    if(!dataString.includes(x.charAt(0)) || x.includes(" ")){
      goodIN = false;
    }
  }
  if(goodIN && x.length > 2 && x != "nijlo"){
    input = x;

    convert();
  }else if(x == "nijlo"){
    for(let i = 0; i< 18;i++){
      nijlo[i] = "black";
    }
    nijlo[6] = "white";
    nijlo[7] = "white";
    nijlo[12] = "white";
    nijlo[15] = "white";
    nijlo[16] = "white";
    nijlo[17] = "white";
    nijloD();
  }
}

function setDelay(){
  delay = parseInt(slider.value);
  tDelay.innerText = "delay: "+delay;
}

function setSize(){
  size = parseInt(sizeS.value);
  tSize.innerText = "size: "+size;
  getInput();
}

function nijloD(){
  let x = 0;
  for(let row = 0;row<6;row++){
    for(let col = 0;col<3;col++){
      draw(row,col,nijlo[x]);
      x++;
    }
  }

  for(let row = 5;row>=0;row--){
    for(let col = 3;col<6;col++){
      x--;
      draw(row,col,nijlo[x]);

    }
  }
}

function convert(){
  for(let i = 0; i < input.length; i++){
    let x = dataString.indexOf(input.charAt(i));
    nums[i] = x;
  }
  numString = nums.join("");
  txt.innerText = nums.join(" ");
  color[0] = "rgb("+nums[1]*mult+","+qsum(numString.length-1)*9.4+","+nums[2]*mult+")";
  color[1] = "rgb("+nums[nums.length-1]*mult+","+qsum(2)*9.4+","+(qsum(numString.length-1)*qsum(2))/2.86+")";
  
  patternGen();
}

function qsum(start){
  let qsum = 0;
  let qs = nums.join("");

  for(let i = start; i>0;i--){
    qsum = qsum + parseInt(qs.charAt(i));
  }
  return qsum;
}

function patternGen(){
  let seed = nums.join("");
  while(seed.length < (size*size)){
    seed =seed+ seed;//+ qsum(numString.length-1).toString() +
  }

  for(let i = 0;i<(size*size);i++){
    let x = parseInt(seed.charAt(i));
    if(x % 2 == 0 || x == 8){
      pattern[i] = color[1];
    }else{
      pattern[i] = color[0];
    }
  }

  patternDraw();
}

function draw(row,col,color){ // 0-5
  let width = wiHi/size;
  let height = width;
  let x = width * col;
  let y = width * row;
  const canvas = document.getElementById("cv");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function patternDraw(){
  let x = 0;
  if(mirror){
    for(let col = 0; col < size/2;col++){
      for(let row = 0; row < size;row++){
        draw(row,col,pattern[x])
        x++;
        if(delay != 0){
          await sleep(delay);
        }
      }
    }

    for(let col = size/2; col < size;col++){
          for(let row = size-1; row >= 0;row--){
            x--;
            draw(row,col,pattern[x])
            if(delay != 0){
              await sleep(delay);
            }
            
        }
    }
  }else{
    for(let col = 0; col < size;col++){
      for(let row = 0; row < size;row++){
        draw(row,col,pattern[x])
        x++;
        if(delay != 0){
          await sleep(delay);
        }
      }
    }
  }
    
}

function joke(){
  alert("Nahh i dont think so. Im lazy");
}
