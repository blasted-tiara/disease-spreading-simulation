import React from 'react';
import ParticleType from '../types/ParticleType';
import * as Constants from './constants';

interface CanvasProps {
  particles: ParticleType[];
}

interface CanvasState {

}

class Canvas extends React.Component<CanvasProps, CanvasState> {
  componentDidUpdate() {
    const canvas = this.refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);

    for(const particle of this.props.particles) {
      if(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Constants.PARTICLE_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  render() {
    return <div>
      <canvas ref="canvas" width={Constants.CANVAS_WIDTH} height={Constants.CANVAS_HEIGHT}></canvas>
    </div>
  }
}

export default Canvas;