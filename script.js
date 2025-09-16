const c = document.getElementById("c");
const ctx = c.getContext("2d");
const g = .1;

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

class Vec2 {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class PhysicsBase {
  constructor() {
    this.force = new Vec2();
    this.velocity = new Vec2();
    this.position = new Vec2();
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
    this.tail.force.x = -this.k * (this.tail.position.x - this.anchor.position.x);
    this.tail.force.y = -this.k * (this.tail.position.y - this.anchor.position.y);

    this.tail.velocity.x += this.tail
  }
}

async function init() {
  loop();
}

function loop() {
  requestAnimationFrame(loop);
}

init();
