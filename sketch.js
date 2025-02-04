function setup() {
  createCanvas(windowWidth, windowHeight);
  p1 = genNew();
}

var p1;
var R = 100;

function draw() {
  background(0);
  noStroke();
  translate(width/2,height/2);
  p1.update();
  p1.contacts();
  p1.show();
  fill(0);
  ellipse(0, 0, R*2, R*2);
  
  push();
  clip(mask, {invert:true});
  clip(mask2, {invert:true});
  fill(255,40,0);
  ellipse(0, 0, R*2, R*2);
  p1.trail();
  pop();
  
  if(p1.d > 300) {
    p1 = genNew();
  }
}

class circle {
  constructor(x, y, r, vx, vy) {
    this.ingress = true;
    this.inside = false;
    this.sx = x;
    this.sy = y;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.d = Math.sqrt(x * x + y * y);
    //this.theta = Math.atan2(-vy,vx);
    this.gtx, this.gty, this.ix, this.iy, this.ex, this.ey;
  }
  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  trail() {
    // let x_corr = (this.r) * Math.cos(this.theta);
    // let y_corr = (this.r) * Math.sin(this.theta);
    stroke(255, 120);
    strokeWeight(2.5);
    //drawingContext.setLineDash([10,10]);
    line(this.sx, this.sy, this.x, this.y);
  noStroke();
  }
  contacts() {
    noStroke();
    fill(255);
    ellipse(this.gtx, this.gty, this.r*2, this.r*2);
    ellipse(this.ix, this.iy, this.r*2, this.r*2);
    ellipse(this.ex, this.ey, this.r*2, this.r*2);
    
    fill(0);
    ellipse(this.gtx, this.gty, this.r*2-4, this.r*2-4);
    ellipse(this.ix, this.iy, this.r*2-4, this.r*2-4);
    ellipse(this.ex, this.ey, this.r*2-4, this.r*2-4);
    
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    let d_old = this.d
    this.d = Math.sqrt(this.x * this.x + this.y * this.y);
    let dddt = this.d - d_old;
    
    let pdotv = this.x * this.vx + this.y * this.vy;
    if (pdotv >= 0 && this.ingress) {
      let factor = this.d / (this.d + d_old);
      this.gtx = this.x - this.vx * factor;
      this.gty = this.y - this.vy * factor;
      this.ingress = false;
    }
    else if (this.d <= this.r + R && !this.inside) {
      let diff = this.d - (R + this.r);
      let factor = diff / dddt;
      this.ix = this.x - this.vx * factor;
      this.iy = this.y - this.vy * factor;
      this.inside = true;
    }
    else if (this.d >= this.r + R && this.inside) {
      let diff = this.d - (R + this.r);
      let factor = diff / dddt;
      this.ex = this.x - this.vx * factor;
      this.ey = this.y - this.vy * factor;
      this.inside = false;
    }
  }
}

function mask() {
  p1.show();
}

function mask2() {
  p1.contacts();
}

function genNew() {
  pangle = Math.PI * 0.25 * Math.random() - Math.PI * 0.125;
  if (Math.random() >= 0.5) {
    pangle = Math.PI
  }
  px = Math.cos(pangle) * 250;
  py = Math.sin(pangle) * 250;
  pr = 0.15 * R * Math.random() + 10;
  parallax = Math.asin((R+pr)/250);
  pdir = Math.atan2(py, px) + parallax * 2 * Math.random() - parallax;
  pvx = -2 * Math.cos(pdir);
  pvy = -2 * Math.sin(pdir);
  return new circle(px, py, pr, pvx, pvy);
}
