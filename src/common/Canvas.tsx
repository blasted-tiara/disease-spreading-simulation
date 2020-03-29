import React from 'react';
import ParticleType from '../types/ParticleType';
import { States } from '../types/ParticleType';
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
        ctx.fillStyle = this.getColor(particle.state);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  getColor(state: States) : string {
    switch (state) {
      case States.Healthy:
        return "#1eb2a6";
      case States.Infected:
        return "#f67575";
      case States.Cured:
        return "#1eb2a6";
      default:
        return "#1eb2a6";
    }
  }

  render() {
    return <div>
      <canvas ref="canvas" width={Constants.CANVAS_WIDTH} height={Constants.CANVAS_HEIGHT}></canvas>
    </div>
  }
}

export default Canvas;