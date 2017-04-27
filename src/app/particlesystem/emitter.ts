import { Vector2d } from '../helpers/vector2d';
import { Particle } from '../particlesystem/particle';
import { VectorService } from '../services/vector.service';

export class Emitter {
  position: Vector2d;
  velocity: Vector2d;
  spread: number;
  drawColor: string;
  size: number;

  constructor (point?:Vector2d, velocity?: Vector2d, spread?:number, private vectorService?: VectorService){
    this.position = point || new Vector2d(0,0);
    this.velocity = velocity || new Vector2d(0,0);
    this.spread = spread || Math.PI/32; // possible angles = velocity +/- spread
    this.drawColor = "#099";
    this.size = 5;
  }

  public setEmitter (point?:Vector2d, velocity?: Vector2d, spread?:number){
    this.position = point || new Vector2d(0,0);
    this.velocity = velocity || new Vector2d(0,0);
    this.spread = spread || Math.PI/32; // possible angles = velocity +/- spread
  }

  public emitParticle(){
    // Use an angle randomized over the spread so we have more of a "spray"
    var angle = this.velocity.getAngle() + this.spread - (Math.random()*this.spread*2);

    // The magnitude of the emitter's velocity
    var magnitude = this.velocity.getMagnitude();

    // The emitter's position
    var position = new Vector2d(this.position.x, this.position.y);

    // New velocity based off of the calculated angle and magnitude
    var velocity = this.vectorService.fromAngle(angle, magnitude);

    // return our new Particle
    return new Particle(position,velocity);
  }

}
