
const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'extension')
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = 9999;

let width, height;
const sizes = [width, height] = [window.innerWidth, window.innerHeight]
const center = sizes.map(s => s * .5)
const side = Math.min(...sizes)
canvas.width = sizes[0]
canvas.height = sizes[1]

const ctx = canvas.getContext('2d')

let starttime = null


export const renderStandBy = () => {
   
    class Vector {
        constructor (x,y) {
            this.x = x
            this.y = y
        }
        
    }
    
    class Agent {
    
        constructor (pointVector, velVector){
            this.coord = pointVector
            this.vel = velVector
            this.radius = 10
    
        }
    
        draw (ctx) {

            if (this.coord.x <= 0 || this.coord.x >= width) {
                this.vel.x = -this.vel.x
            }
            if (this.coord.y <= 0 || this.coord.y >= height) {
                this.vel.y = -this.vel.y
            }
    
    
            this.coord.x += this.vel.x
            this.coord.y += this.vel.y


    
            ctx.beginPath();
            ctx.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'black'

            ctx.fill();
    
        }
    }

        const randomCoordVector = () => {
            const x = Math.random() * width
            const y = Math.random() * height
            return new Vector(x,y)
        }

        const randomVelocityVector = () => {
            const x = Math.random() * 2 - 1
            const y = Math.random() * 2 - 1
            return new Vector(x,y)
        }

        const agents = [...Array(300).keys()].map(_ => new Agent(randomCoordVector(), randomVelocityVector()))

        const render = (time) => {

            starttime = starttime || time

            requestAnimationFrame(render)

            ctx.clearRect(0, 0, ...sizes)

            
            agents.forEach(agent => agent.draw(ctx))

        }


    document.body.appendChild(canvas)
    render()
}

window.renderStandBy = renderStandBy