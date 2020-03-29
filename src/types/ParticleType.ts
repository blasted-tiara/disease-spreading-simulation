export default interface ParticleType {
  x: number;
  y: number;
  dx: number;
  dy: number;
  state: States
}

export enum States {
  Healthy,
  Infected,
  Cured,
  Dead
}