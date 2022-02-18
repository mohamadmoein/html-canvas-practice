const canvas = document.getElementById('my-canvas')
const video = document.getElementById('my-video')
const ctx = canvas.getContext('2d')
const particlesArray = []
let hue = 0

const mouse = {
  x: undefined,
  y: undefined
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

document.addEventListener('resize', () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
})

canvas.addEventListener('click', (e) => {
	mouse.x = e.clientX
	mouse.y = e.clientY
	for (let i = 0; i < 10; i++) {
		particlesArray.push(new Particle())
	}
})

canvas.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX
	mouse.y = e.clientY
	// for (let i = 0; i < 2; i++) {
		particlesArray.push(new Particle())
	// }
})

class Particle {
	constructor() {
		this.x = mouse.x
		this.y = mouse.y
		this.size = Math.random() * 12 + 1
		this.speedX = Math.random() * 2 - 1
		this.speedY = Math.random() * 2 - 1
		this.color = `hsl(${hue}, 100%, 50%)`
	}

	update() {
		this.x += this.speedX
		this.y += this.speedY
		if (this.size > 0.2) this.size -= 0.1
	}

	draw() {
		ctx.fillStyle = this.color
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
		ctx.fill()
	}
}

function handleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update()
		particlesArray[i].draw()
	
		for (let j = 0; j < particlesArray.length; j++) {
			const dx = particlesArray[i].x - particlesArray[j].x
			const dy = particlesArray[i].y - particlesArray[j].y
			const dist = Math.sqrt(dx * dx + dy * dy)
			if (dist < 100) {
				ctx.beginPath()
				ctx.strokeStyle = particlesArray[i].color
				ctx.lineWidth = 0.2
				
				ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
				ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
				ctx.stroke()
			}
		}

		if (particlesArray[i].size <= 0.3) {
			particlesArray.splice(i, 1)
			i--
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	// ctx.fillStyle = 'rgba(0,0,0,0.02)'
	// ctx.fillRect(0, 0,s canvas.width, canvas.height)
	handleParticles()
	hue += 0.5
	requestAnimationFrame(animate)
}

animate()

// To store canvas movements as mp4 video file,
// uncomment this section and video tag in index.html file
/*
var videoStream = canvas.captureStream(60);
var mediaRecorder = new MediaRecorder(videoStream);

var chunks = [];
mediaRecorder.ondataavailable = function(e) {
  chunks.push(e.data);
};

mediaRecorder.onstop = function(e) {
  var blob = new Blob(chunks, { 'type' : 'video/mp4' });
  chunks = [];
  var videoURL = URL.createObjectURL(blob);
  video.src = videoURL;
};

mediaRecorder.start();
setTimeout(function (){ mediaRecorder.stop(); }, 5000);
*/