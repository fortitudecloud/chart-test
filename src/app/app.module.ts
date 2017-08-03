import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';

import { RFGData } from './services/rfg';
import { SHVData } from './services/shv';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ChartsModule
  ],
  providers: [RFGData, SHVData],
  bootstrap: [AppComponent]
})
export class AppModule { }
