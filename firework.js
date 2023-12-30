const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// set canvas
canvas.width = innerWidth;
canvas.height = innerHeight;
let particles = [];
// variables for physics
const gravity = 0.03;
const friction = 0.99;
let power = 20;
// particle class definition
class Particle {
  constructor(x, y, color, velocity, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.opacity = 1;
  }

  draw() {
    // method to draw the particle on the canvas
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    //  method to update the particle's position and opacity
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.opacity -= 0.003;
  }
}

// function to initialize the canvas
function initCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// function to apply class for explosion
function playAnimation() {
  const particleCount = randomCount();
  let power = randomPower();
  let radians = (Math.PI * 2) / particleCount;

  // clear existing particles
  particles = [];

  // declare counter for the while loop
  let i = 0;
  while (i < particleCount) {
    particles.push(
      new Particle(
        canvas.width / 2,
        0,
        `hsl(${Math.random() * 360}, 50%, 50%)`,
        {
          x: Math.cos(radians * i) * (Math.random() * power),
          y: Math.sin(radians * i) * (Math.random() * power),
        },
        3
      )
    );

    i++;
  }
}

initCanvas();
playAnimation();

// random count;
function randomCount() {
  return Math.floor(Math.random() * 1000);
}

// random power
function randomPower() {
  return Math.floor(Math.random() * (30 - 12 + 1)) + 12;
}

// function to continuously update and render particles
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // check opacity for each particle
  particles.forEach((particle, index) => {
    particle.update();
    // remove faded-out particles
    if (particle.opacity <= 0) particles.splice(index, 1);
  });

  // check if all particles are gone and trigger new animation
  if (particles.length === 0) playAnimation();
}

// start the animation loop
requestAnimationFrame(animate);
