import { Injectable } from '@angular/core';
import { Vector2d } from '../helpers/vector2d';
import { Particle } from '../particlesystem/particle';
import { Emitter } from '../particlesystem/emitter';
import { Field } from '../particlesystem/field';
import { VectorService } from '../services/vector.service';

@Injectable()
export class ParticleService {
  public particles:Array<Particle>;
  public emitters:Array<Emitter>;
  public fields:Array<Field>;
  private maxParticles:number;
  private emissionRate:number; // how many particles are emitted each frame
  private particleSize:number;
  public ctx: CanvasRenderingContext2D;
  public sWidth:number;
  public sHeight:number;

  constructor(private vectorService: VectorService) {
    this.particles = [];
    this.emitters = [new Emitter(new Vector2d(100,230), vectorService.fromAngle(0,2),0,vectorService)];
    this.fields = [new Field(new Vector2d(400,230),-140, vectorService)];
    this.maxParticles = 200;
    this.emissionRate = 4;
    this.particleSize = 2;
  }

  public setCtx(contex:CanvasRenderingContext2D){
    this.ctx = contex;
    this.sWidth = this.ctx.canvas.width;
    this.sHeight = this.ctx.canvas.height;
  }

  public addNewParticles(){
    if (this.particles.length > this.maxParticles) return;

    // for each emitter
    for (var i =0; i<this.emitters.length; i++){
      // for emissionRate , emit a particle
      for (var j=0; j<this.emissionRate; j++){
        this.particles.push(this.emitters[i].emitParticle());
      }
    }
  }

  public plotParticles(boundsX:number, boundsY:number){
    // a new array to hold particles within our bounds
    let currentParticles:Array<Particle> = [];
    for (var i=0; i<this.particles.length; i++){
      var particle = this.particles[i];
      var pos = particle.position;
      // if we're out of bounds, drop this particle and move on the next
      if (pos.x <0 || pos.x>boundsX || pos.y<0 || pos.y>boundsY) continue;
      // update velocities and accelerations to account for the fields
      particle.submitToFields (this.fields);

      // Move our particles
      particle.move();

      // Add this particle to the list of current particles
      currentParticles.push(particle);
    }

    // Update our global particles, clearing room for old particles to be collected
    this.particles = currentParticles;
  }

  public drawParticles(){
    // Set the color of our particles
    this.ctx.fillStyle = 'rgb(20,255,5)';

    for (var i=0; i<this.particles.length; i++){
      var position = this.particles[i].position;
      // Draw a square at our position [particleSize] wide and tall
      this.ctx.fillRect(position.x, position.y, this.particleSize, this.particleSize);
    }
  }

  public getParticles(){
    return this.particles;
  }

}
