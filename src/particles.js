
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

        ensureDirection () {
            if (this.coord.x <= 0 || this.coord.x >= width) {
                this.vel.x = -this.vel.x
            }
            if (this.coord.y <= 0 || this.coord.y >= height) {
                this.vel.y = -this.vel.y
            }
        }
    
        avoidCollision (coord) {
            if (distance(this.coord, coord) <= this.radius * 2){
                this.vel.x = -this.vel.x
                this.vel.y = -this.vel.y
            }
        }
        draw (ctx) {

           
            this.coord.x += this.vel.x
            this.coord.y += this.vel.y


    
            ctx.beginPath();
            ctx.strokeStyle = 'black'
            ctx.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI);
            ctx.lineWidth = 1
            ctx.stroke();
    
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

    const agents = [...Array(20).keys()].map(_ => new Agent(randomCoordVector(), randomVelocityVector()))

    const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))

    const gradient = ctx.createLinearGradient(0, 0, Math.floor(width), 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5" ,"blue");
    gradient.addColorStop("1.0", "red");

    const lineWidthByDistance = (currentDistance, maxDistance) => {

        const maxWidth = 20
        const minWidth = 1

        return minWidth + (1 - currentDistance/maxDistance) * (maxWidth - minWidth)
    }

    /**
     * RENDER the scene
     */
    const render = (time) => {

        starttime = starttime || time

        requestAnimationFrame(render)

        ctx.clearRect(0, 0, ...sizes)

        

        for(let i = 0; i< agents.length; i++){
            const fromCoord = agents[i].coord
            for (let j = 0; j < agents.length; j++){

                if(agents[j] === agents[i])
                    continue;

                const toCoord =  agents[j].coord

                const _distance = distance(fromCoord, toCoord)

                agents[j].avoidCollision(fromCoord)
                if (distance(fromCoord, toCoord) < 100) {

                    ctx.beginPath();
                    ctx.strokeStyle = gradient
                    ctx.moveTo(fromCoord.x, fromCoord.y);
                    ctx.lineTo(toCoord.x, toCoord.y);
                    
                    ctx.lineWidth = lineWidthByDistance(_distance, 100);
                    ctx.lineCap = 'round'

                    ctx.stroke();

                }

                
            }
            agents[i].ensureDirection()

            agents[i].draw(ctx)
            

            
            //agents.forEach(agent => agent.draw(ctx))
        }
        

    }


    document.body.appendChild(canvas)
    render()
}

window.renderStandBy = renderStandBy