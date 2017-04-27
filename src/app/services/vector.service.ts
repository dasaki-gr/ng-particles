import { Injectable } from '@angular/core';
import { Vector2d } from '../helpers/vector2d';

@Injectable()
export class VectorService {

  constructor() { }

  // Allows us to get a new vector from angle and magnitude
  public fromAngle (angle:number, magnitude:number):Vector2d{
    return new Vector2d(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }

}
