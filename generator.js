
let input;
let tf = document.getElementById("tf");
let data = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","_"];
let dataString = data.join("");
let nums = [];
let numString;
let color = [];
let mult = 7;
let pattern = [];


//Functons
function getInput(){
  nums = [];
  let goodIN = true;
  let x = tf.value.toLowerCase();
  for(let i = 0; i < x.length; i++){
    if(!dataString.includes(x.charAt(0))){
      goodIN = false;
    }
  }
  if(goodIN && x.length > 2){
    input = x;

    convert();
  }/*else{
    alert("FOLLOW THE RULES. please :)");
  }*/
}

function convert(){
  for(let i = 0; i < input.length; i++){
    let x = dataString.indexOf(input.charAt(i));
    nums[i] = x;
  }
  numString = nums.join("");
  color[0] = "rgb("+qsum(numString.length-1)*9.4+","+nums[1]*mult+","+nums[2]*mult+")";
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
  while(seed.length < 18){
    seed =seed+ qsum(numString.length-1).toString() + seed;
  }

  for(let i = 0;i<18;i++){
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
  let width = 100;
  let height = width;
  let x = width * col;
  let y = width * row;
  const canvas = document.getElementById("cv");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function patternDraw(){
  let x = 0;
    for(let col = 0; col < 3;col++){
      for(let row = 0; row < 6;row++){
        draw(row,col,pattern[x])
        x++;
      }
    }

    for(let col = 3; col < 6;col++){
          for(let row = 5; row >= 0;row--){
            x--;
            draw(row,col,pattern[x])
        }
    }
}

function joke(){
  alert("Nahh i dont think so. Im lazy");
}
