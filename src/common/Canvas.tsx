import React from 'react';
import ParticleType from '../types/ParticleType';
import * as Constants from './constants';

interface CanvasProps {
  particles: ParticleType[];
}

interface CanvasState {
  scalingFactor: number;
}

class Canvas extends React.Component<CanvasProps, CanvasState> {
  state = {
    scalingFactor: this.getScalingFactor()
  }

  getScalingFactor() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    return 0.6 * ((width < height) ? width / Constants.CANVAS_WIDTH : height / Constants.CANVAS_HEIGHT);
  }

  componentDidUpdate() {
    const canvas = this.refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(
      0,
      0,
      Constants.CANVAS_WIDTH * this.state.scalingFactor,
      Constants.CANVAS_HEIGHT * this.state.scalingFactor
    );

    for(const particle of this.props.particles) {
      if(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          particle.x * this.state.scalingFactor,
          particle.y * this.state.scalingFactor,
          Constants.PARTICLE_RADIUS * this.state.scalingFactor,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = particle.state;
        ctx.fill();
        ctx.restore();
      }
    }
  }

  render() {
    return <div className='App-canvas'>
      <canvas
        ref="canvas"
        width={Constants.CANVAS_WIDTH * this.state.scalingFactor}
        height={Constants.CANVAS_HEIGHT * this.state.scalingFactor}>
      </canvas>
    </div>
  }
}

export default Canvas;