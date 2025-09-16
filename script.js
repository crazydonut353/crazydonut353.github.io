const c = document.getElementById("c");
const ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineTo(20, 100);
ctx.lineTo(70, 100);
ctx.strokeStyle = "red";
ctx.stroke();
