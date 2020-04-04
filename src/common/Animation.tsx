import React from 'react';
import ParticleType, { States } from '../types/ParticleType';
import * as Constants from './constants';
import Canvas from './Canvas';

interface AnimationState {
  particles: ParticleType[];
  rAF: number;
  startTime: Date;
}

class Animation extends React.Component {
  state = {
    rAF: 0,
    particles: this.generateNRandomParticles(Constants.NUMBER_OF_PARTICLES),
    startTime: new Date()
  }

  updateAnimationState = () => {
    let rAF = requestAnimationFrame(this.updateAnimationState);
    let particles = this.moveParticles()
    particles = this.updateParticlesState(particles); 
    this.setState({rAF: rAF, particles: particles});
  }

  updateParticlesState(particles: ParticleType[]) {
    for(let infector = 0; infector < particles.length; infector++) {
      if(particles[infector].state === States.Infected) {
        for(let infectee = 0; infectee < particles.length; infectee++) {
          if(particles[infectee].state === States.Healthy) {
            if(this.calculateDistance(particles[infector], particles[infectee]) < Constants.SPREAD_RADIUS){
              if(Math.random() < Constants.INFECTION_PROBABILITY) {
                particles[infectee].state = States.Infected;
              }
            }
          }
        }
      }
    }
    return particles;
  }

  calculateDistance(a: ParticleType, b: ParticleType) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
  }

  moveParticles() {
    let particles: ParticleType[] = [];
    for(let particle of this.state.particles) {
      let x = particle.x + particle.dx;
      let y = particle.y + particle.dy;
      let dx = this.isInRange(x, Constants.CANVAS_WIDTH) ? particle.dx : -particle.dx;
      let dy = this.isInRange(y, Constants.CANVAS_HEIGHT) ? particle.dy : -particle.dy;
      particles.push({x, y, dx, dy, state: particle.state});
    }
    return particles;
  }

  elapsedMiliseconds(ms: number, time: Date) {
    return time.getDate() - this.state.startTime.getTime() > ms;
  }

  isInRange(x: number, range: number) : boolean {
    return  (x >= Constants.PARTICLE_RADIUS && x <= range - Constants.PARTICLE_RADIUS);
  }

  componentDidMount() {
    let rAF = requestAnimationFrame(this.updateAnimationState);
    this.setState({rAF: rAF});
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.rAF);
  }

  generateRandomParticle() : ParticleType {
    let x = Constants.PARTICLE_RADIUS + Math.random() * (Constants.CANVAS_WIDTH - 2 * Constants.PARTICLE_RADIUS);
    let y = Constants.PARTICLE_RADIUS + Math.random() * (Constants.CANVAS_HEIGHT - 2 * Constants.PARTICLE_RADIUS);
    let dx = (Math.random() - 0.5) * Constants.MAX_SPEED;
    let dy = (Math.random() - 0.5) * Constants.MAX_SPEED;

    return {x, y, dx, dy, state: (Math.random() >= Constants.INIT_INFECTED_PROBABILITY) ? States.Healthy : States.Infected};
  }
  
  generateNRandomParticles(n: number) : ParticleType[] {
    let particles: ParticleType[] = [];
    for(let i = 0; i < n; i++){
      particles.push(this.generateRandomParticle());
    }
    return particles;
  }

  render() {
    return <div>
      <Canvas particles={this.state.particles}/> 
    </div>
  }
}

export default Animation;