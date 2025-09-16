class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class PhysicsBase {
  constructor(x, y) {
    this.force = new Vec2(0,0);
    this.velocity = new Vec2(0,0);
    this.position = new Vec2(x, y);
  }

  update() {
    //add collision soon
    this.velocity.x += this.force.x;
    this.velocity.y += this.force.y;
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class SpringJoint {
  constructor(anchor, tail, k, d) {
    this.anchor = anchor;
    this.tail = tail;
    this.k = k;
    this.d = d;
  }

  update() {
    this.tail.force.x = (-this.k * (this.tail.position.x - this.anchor.x));
    this.tail.force.y = (-this.k * (this.tail.position.y - this.anchor.y));
    
    // something like this models a form of damping... maybe
    this.tail.force.x += this.tail.velocity.x * this.d;
    this.tail.force.y += this.tail.velocity.y * this.d;

    this.tail.update();
  }
}

const c = document.getElementById("c");
const ctx = c.getContext("2d");
const g = .1;
let spring = new SpringJoint(new Vec2(10, 10), new PhysicsBase(10, 50), .1, -.1);

function resize() {
  c.width = window.innerWidth + 8;
  c.height = window.innerHeight + 8;
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "red";
  ctx.stroke();
}

async function init() {
  resize();
  
  document.addEventListener("mousemove", (e) => {spring.anchor.x=e.clientX+8;spring.anchor.y=e.clientY+8;})
    
  loop();
}

function loop() {
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,c.width,c.height)

  spring.update();
  drawLine(spring.anchor.x,spring.anchor.y,spring.tail.position.x,spring.tail.position.y);
  
  requestAnimationFrame(loop);
}

init();
