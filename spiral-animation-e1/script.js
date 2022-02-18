let canvas
let ctx
let flowFiled
let flowFieldAnimation

window.onload  = function() {
	canvas = document.getElementById('my-canvas')
	ctx = canvas.getContext('2d')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	flowFiled = new FlowFieldEffect(ctx, canvas.width, canvas.height)
	flowFiled.animate(0)
}

window.addEventListener('resize', () => {
	cancelAnimationFrame(flowFieldAnimation)
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	flowFiled = new FlowFieldEffect(ctx, canvas.width, canvas.height)
	flowFiled.animate(0)
})

const mouse = {
	x: 0,
	y: 0,
}

window.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX
	mouse.y = e.clientY
})

class FlowFieldEffect {
	#ctx
	#width
	#height
	#lastTime = 0
	#interval = 1000/60
	#timer = 0
	#cellSize = 15
	#gredient
	#radius = 5
	#vr = 0.03

	constructor(ctx, width, height) {
		this.#ctx = ctx
		this.#ctx.strokeStyle = 'white'
		this.#ctx.lineWidth = 0.5
		this.#width = width
		this.#height = height
		this.#createGredient()
		this.#ctx.strokeStyle = this.#gredient
	}

	#createGredient() {
		this.#gredient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height)
		this.#gredient.addColorStop("0.1", '#ff5c33') 
		this.#gredient.addColorStop("0.9", '#ffff33') 
	}

	#drawLine(x, y, angle) {
		const dx = x - mouse.x
		const dy = y - mouse.y
		let dist = (dx * dx + dy * dy)
		const maxDist = 500000
		if (dist > maxDist) dist = maxDist
		else if (dist < 50000) dist = 50000
		const length = dist/10000
		this.#ctx.beginPath()
		this.#ctx.moveTo(x, y)
		this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
		this.#ctx.stroke()
	}

	animate(timeStamp) {
		let deltaTime = timeStamp - this.#lastTime
		this.#lastTime = timeStamp

		if (this.#timer > this.#interval) {
			this.#ctx.clearRect(0, 0, this.#width, this.#height)
			this.#radius += this.#vr
			if (this.#radius > 6 || this.#radius < -6) {
				this.#vr *= -1
			}

			for (let y = 0; y < this.#height; y += this.#cellSize) {
				for (let x = 0; x < this.#width; x += this.#cellSize) {
					const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.#radius
					this.#drawLine(x, y, angle)				
				}
			}

			this.#timer = 0
		} else {
			this.#timer += deltaTime
		}
		
		flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
	}
}