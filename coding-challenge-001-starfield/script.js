let stars = new Array(100)
let speedy = 4

function setup () {
  createCanvas(500, 500)
  for (let i = 0; i < stars.length; i++) {
    stars[i] = new Star()
  }
}

function draw () {
	speedy = map(mouseX, 0, width, 4, 20)
	background(0)
	translate(width / 2, height / 2)
	stars.forEach(star => {
		star.update()
		star.show()
	})
}

class Star {
	constructor() {
		this.x = random(-width/2, width/2)
		this.y = random(-height/2, height/2)
		this.z = random(width)
		this.pz = this.z
	}

	update() {
		this.z = this.z - speedy
		if (this.z < 1) {
			this.z = width
			this.x = random(-width/2, width/2)
			this.y = random(-height/2, height/2)
			this.pz = this.z
		}
	}

	show() {
		fill(255)
		noStroke()

		let sx = map(this.x / this.z, 0, 1, 0, width)
		let sy = map(this.y / this.z, 0, 1, 0, height)
		let r  = map(this.z, 0, width, 8, 0)
		ellipse(sx, sy, r, r)

		let px = map(this.x / this.pz, 0, 1, 0, width)
		let py = map(this.y / this.pz, 0, 1, 0, height)

		this.pz = this.z

		stroke(255)
		line(px, py, sx, sy)
	}
}
