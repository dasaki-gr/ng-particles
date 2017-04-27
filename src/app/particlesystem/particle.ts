import { Vector2d } from '../helpers/vector2d';

export class Particle {
  position: Vector2d;
  velocity: Vector2d;
  acceleration: Vector2d;
  size:number;

  constructor (point?:Vector2d, velocity?:Vector2d, acceleration?: Vector2d){
    this.position = point|| new Vector2d(0,0);
    this.velocity = velocity || new Vector2d(0,0);
    this.acceleration = acceleration || new Vector2d(0,0);
    this.size = 2;
  }

  public move(){
    // Add our current acceleration to our current velocity
    this.velocity.add(this.acceleration);

    // Add our current velocity to our position
    this.position.add(this.velocity);
  }

  public submitToFields = function (fields){
    // our starting acceleration this frame
    var totalAccelerationX = 0;
    var totalAccelerationY = 0;

    // for each passed field
    for (var i=0; i<fields.length; i++){
      var field = fields[i];
      // find the distance between the particle and the field
      var vectorX = field.position.x - this.position.x;
      var vectorY = field.position.y - this.position.y;

      // calculate the force
      var force = field.mass/Math.pow(vectorX*vectorX+vectorY*vectorY,1.5);

      // add to the total acceleration the force adjusted by distance
      totalAccelerationX += vectorX * force;
      totalAccelerationY += vectorY * force;
    }

    // update our particle's acceleration
    this.acceleration = new Vector2d(totalAccelerationX, totalAccelerationY);
  };

}
