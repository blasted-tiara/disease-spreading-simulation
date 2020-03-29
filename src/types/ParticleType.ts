export default interface ParticleType {
  x: number;
  y: number;
  dx: number;
  dy: number;
  state: States
}

export enum States {
  Healthy = "#1eb2a6",
  Infected = "#f67575"
}