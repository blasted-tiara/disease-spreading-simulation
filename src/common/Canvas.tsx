import React from 'react';
import ParticleType from '../types/ParticleType';
import * as Constants from './constants';

interface CanvasProps {
  particles: ParticleType[];
}

interface CanvasState {

}

class Canvas extends React.Component<CanvasProps, CanvasState> {
  componentDidMount() {
    const canvas = this.refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    for(const particle of this.props.particles) {
      if(ctx){
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Constants.PARTICLE_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
  addParticles(node: ParticleType) {
    
  }

  render() {
    return <div>
      <canvas ref="canvas" width={Constants.CANVAS_WIDTH} height={Constants.CANVAS_HEIGHT}></canvas>
    </div>
  }
}

export default Canvas;