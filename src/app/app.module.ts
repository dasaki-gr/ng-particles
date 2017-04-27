import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { VectorService } from './services/vector.service';
import { ParticleService } from './services/particle.service';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [VectorService, ParticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
