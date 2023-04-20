

let r;
let s;
let stars = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  r = height * .60;
  s = width * .45
  theta = 0;
  speed = .01;

  for (let i = 0; i < 75; i++) {
    stars.push(new star());
  }
}

function draw() {
    background(0);
    translate(width / 2, 3* height / 4);

    let y = r * cos(theta);
    let x = s * sin(theta);
    /*    sunX = 200 + 600 * cos(time);
       sunY = 200 + 600 * sin(time);
       moonX = 200 + 600 * cos(time);
       moonY = -400 + 600 * sin(time);
       time++; */
    //push();
    let alpha = .8+ cos(theta);
    if (alpha < 0) {
        alpha = 0;
    } else if (alpha > 1){
        alpha = 1;
    }
    let redtint = abs(sin(theta))*100;


    sky(width, height, redtint, alpha);
    starfield(alpha)
    sun(-x, -y);
    moon(x, y); 
    earth(width, height, alpha);
    

    if(mouseIsPressed == true){
        theta += speed;
    }
    if ((keyIsPressed == true) && (key == ',')) {
        theta += speed;
      }
      if ((keyIsPressed == true) && (key == '.')) {
        theta -= speed;
      }
 }

 function keyPressed() {
    if ((keyIsPressed == true) && (keyCode === LEFT_ARROW)) {
        theta += speed;
    } else if (keyCode === RIGHT_ARROW) {
        theta -= speed;
    }
  }

function sun(sunx,suny){
    push();
    strokeWeight(0);
    fill(230, 255, 5);
    ellipse(sunx,suny,100,100);
    
    pop();
}

function moon(moonX,moonY){
    push();
    strokeWeight(0);
    fill(160, 203, 217);
    ellipse(moonX,moonY,100,100);
    
    pop();
}

function earth(w, h, a){
    push();
    
    colorMode(RGB, 255, 255, 255, 1); 
    fill(19, 156, 6, a+.6);
    //rect(-1.25*r, 0, r*2.5, 1.25*r);
    rect(-(w/2),0,w,(h/2));
    pop();
}

function sky(w, h, redtint, a){
    push();
    colorMode(RGB, 255, 255, 255, 1);   
    fill(48, 201, 240, a+.1);
    //rect(-1.25*r, 0, r*2.5, 1.25*r);
    rect(-(w/2),-h,w,h);
    pop();
}

function starfield(t){
    if (t<.4){
        for (let i = 0; i < stars.length; i++) {
            push();
            stars[i].display();
            stars[i].twinkle();
            pop();
          }
    }
}
class star {
    constructor() {
        this.x = random(-width/2,width/2);
        this.y = random(0,-3*height/4);
        this.radius1 = random(4, 6);
        this.radius2 = this.radius1-3;
        this.speed = 1;
    }
    display(){
        push()
        strokeWeight(0);
        let angle = TWO_PI / 5;
        let halfAngle = angle / 2.0;
        
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = this.x + cos(a) * this.radius2;
            let sy = this.y + sin(a) * this.radius2;
            vertex(sx, sy);
            sx = this.x + cos(a + halfAngle) * this.radius1;
            sy = this.y + sin(a + halfAngle) * this.radius1;
            vertex(sx, sy);
        }
        endShape(CLOSE);
        
        pop()
        }
    twinkle(){
        this.radius1 = random(4, 7);
        
        
        // if (this.radius1 < 9){
        //     this.radius1 += random(-1,1);
        // } else if (this.radius1 < 2){
        // this.radius1 += 1;
        // }else{
        //     this.radius1 -=1;
        // }
       
        
      
       // translate(this.x,this.y);
      //  rotate(frameCount / random(-200,200)); 
       
    }
    
}
function flagpole(){

}
    