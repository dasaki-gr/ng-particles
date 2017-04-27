import { Vector2d } from '../helpers/vector2d';
import { VectorService } from '../services/vector.service';

export class Field {
  position: Vector2d;
  mass: number;
  drawColor: string;
  size: number;

  constructor (point?:Vector2d, fMass?:number, private vectorService?: VectorService){
    this.position = point || new Vector2d(0,0);
    this.mass = fMass || 100;
    this.drawColor = "#999"; //temp
    this.size = 3;
  }

  public setMass(fMass?:number){
    this.mass = fMass || 100;
    this.drawColor = fMass <0? "#f00":"#0f0";
  }

}
