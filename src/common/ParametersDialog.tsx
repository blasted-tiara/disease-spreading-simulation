import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, Slider } from '@material-ui/core';


interface ParametersDialogProps {
  handleClose: () => void,
  numOfParticles: number,
  handleNumOfParticlesChange: (e: any, newValue: number | number[]) => void,
  initInfectedProb: number;
  handleInitInfectedProbChange: (e: any, newValue: number | number[]) => void;
  open: boolean
}

interface ParametersDialogState {
}

export default class ParametersDialog extends React.Component<ParametersDialogProps, ParametersDialogState> {
  render() {
    return (
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.props.open}
        >
        <div className="dialog-content">
            <DialogTitle>Simulation parameters</DialogTitle>
            Number of asshats who go out
            <Slider
              value={this.props.numOfParticles}
              min={20}
              max={200}
              onChange={this.props.handleNumOfParticlesChange}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
            />
            Percentage of initially infected people
            <Slider
              value={this.props.initInfectedProb}
              min={0.001}
              max={1}
              onChange={this.props.handleInitInfectedProbChange}
              aria-labelledby="continuous-slider"
              step={0.01}
              valueLabelDisplay="auto"
            />
            Henlo
        </div>
        </Dialog>
    );
  }
}