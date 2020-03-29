import React from 'react';
import ParticleType from '../types/ParticleType';
import * as Constants from './constants';
import Canvas from './Canvas';

interface AnimationState {
  particles: ParticleType[];
}

class Animation extends React.Component {
  state = {
    particles: this.generateNRandomParticles(50)
  }

  generateRandomParticle() : ParticleType {
    let x = Constants.PARTICLE_RADIUS + Math.random() * (Constants.CANVAS_WIDTH - 2 * Constants.PARTICLE_RADIUS);
    let y = Constants.PARTICLE_RADIUS + Math.random() * (Constants.CANVAS_HEIGHT - 2 * Constants.PARTICLE_RADIUS);
    let dx = Math.random() * Constants.MAX_SPEED;
    let dy = Math.random() * Constants.MAX_SPEED;

    return {x, y, dx, dy};
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