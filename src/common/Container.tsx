import React from "react";
import Animation from './Animation';

interface ContainerState {
  numOfParticles: number;
  initInfectedProb: number;
}

export default class Container extends React.Component{
  state: ContainerState = {
    numOfParticles: 100,
    initInfectedProb: 0.01
  }

  handleNumOfParticlesChange = (e: any, newValue: number | number[]) => {
    this.setState({numOfParticles: newValue});
  }

  handleInitInfectedPRobChange = (e: any, newValue: number | number[]) => {
    this.setState({initInfectedProb: newValue});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            🥔 infection spread simulation 🥔
          </h1>
          <Animation
            initInfectedProb={this.state.initInfectedProb}
            handleInitInfectedProbChange={this.handleInitInfectedPRobChange }
            numOfParticles={this.state.numOfParticles}
            handleNumOfParticlesChange={this.handleNumOfParticlesChange}
          />
        </header>
      </div>
    );
  }
}