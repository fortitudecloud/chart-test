import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';

import { RFGData } from './services/rfg';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ChartsModule
  ],
  providers: [RFGData],
  bootstrap: [AppComponent]
})
export class AppModule { }
