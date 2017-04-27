import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { Vector2d } from '../helpers/vector2d';
import { ParticleService } from '../services/particle.service';

@Component({
  selector: 'dsk-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  private _sWidth:number;
  private _sHeight:number;
  public ctx:CanvasRenderingContext2D;
  private running:boolean;
  private idx:number;
  private isViewInit:boolean;

  // get the element with the #dskCanvas on it
  @ViewChild("dskCanvas") dskCanvas: ElementRef;

  constructor(private cdr:ChangeDetectorRef, private ngZone:NgZone, private particleServise:ParticleService) {
    this.idx=0;
    this.isViewInit = false;
    let getWindowDims = () => {
      this._sWidth = window.innerWidth-20;
      this._sHeight = window.innerHeight-110;
      if(this.isViewInit){ };
    };
    window.onresize = () => {
      getWindowDims();
      this.cdr.detectChanges(); //running change detection manually
      this.drawGreenChess();

    }
    getWindowDims();
  }

  ngOnInit() {
    this.running = true;
    this.ngZone.runOutsideAngular(()=>this.paint());
  }

  ngOnDestroy() {
    this.running = false;
  }

  ngAfterViewInit() { // wait for view to init before using the element
    this.isViewInit = true;
    this.ctx = this.dskCanvas.nativeElement.getContext("2d");
    this.particleServise.setCtx(this.ctx);
    this.drawGreenChess();
  }

  get sWidth(){
    return this._sWidth;
  }

  get sHeight(){
    return this._sHeight;
  }

  public clear(){
    this.ctx.clearRect(0,0,this._sWidth, this._sHeight);
  }

  private drawGreenChess(){
    this.ctx.fillStyle = 'green';
    let dw = this._sWidth/20;
    let dh = this._sHeight/20;
    for (let w=0; w<=this._sWidth; w+=dw){
      for (let h=0; h<=this._sHeight; h+=dh){
        this.ctx.fillRect(w+dw*0.1, h+dh*0.1, dw*0.8, dh*0.8);
      }
    }
  }

  public update(){
    this.particleServise.addNewParticles();
    this.particleServise.plotParticles(this._sWidth, this._sHeight);
  }

  public draw(){
    this.particleServise.drawParticles();
    this.particleServise.fields.forEach(f=>{
      this.drawCircle(f);
    });
    this.particleServise.emitters.forEach(e=>{
      this.drawCircle(e);
    });
  }

  public drawCircle(object){
    this.ctx.fillStyle = object.drawColor;
    this.ctx.beginPath();
    this.ctx.arc(object.position.x, object.position.y, object.size, 0, Math.PI*2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  private paint(){
    this.idx++;
    // Check that we're still running
    if (!this.running || this.idx>=5000){
      return;
    }
    if (this.ctx){
      this.clear();
      this.update();
      this.draw();
    }
    // Schedule next
    requestAnimationFrame(()=>{
      this.paint();
    });
  }

}
