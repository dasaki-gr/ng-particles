/**
 * A simple 2D vector
 */
export class Vector2d {
  constructor (public x:number =0, public y:number =0){}
  /**
   * Add another vector to this vector
   */
  public add(vector: Vector2d){
    this.x += vector.x;
    this.y += vector.y;
  }

  //Gets the length of the vector
  public getMagnitude(){
    return Math.sqrt(this.x*this.x+this.y*this.y);
  }

  // Gets the angle accounting for the quadrant we're in
  public getAngle(){
    return Math.atan2(this.y, this.x);
  }

  
}
