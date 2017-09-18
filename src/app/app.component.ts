import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { RFGData } from './services/rfg';
import { SHVData } from './services/shv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(BaseChartDirective) private _chart;

  title = 'Charts';  
  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // price
      backgroundColor: 'rgba(148,159,177, 0.0)',
      borderColor: 'rgba(40, 124, 234,1)',
      pointBackgroundColor: 'rgba(148,159,177,0)',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // average
      backgroundColor: 'rgba(253, 97, 0, 0.0)',
      borderColor: 'rgba(33, 33, 33,1)',
      pointBackgroundColor: 'rgba(77,83,96,0)',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // lower average
      backgroundColor: 'rgba(253, 97, 0, 0.0)',
      borderColor: 'rgba(156, 39, 176,1)',
      pointBackgroundColor: 'rgba(77,83,96,0)',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // upper average
      backgroundColor: 'rgba(253, 97, 0, 0.0)',
      borderColor: 'rgba(32, 204, 175,1)',
      pointBackgroundColor: 'rgba(77,83,96,0)',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // floor
      backgroundColor: 'rgba(253, 97, 0, 0.0)',
      borderColor: 'rgba(156, 39, 176, 0.2)',
      pointBackgroundColor: 'rgba(77,83,96,0)',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // 15 day
      backgroundColor: 'rgba(253, 97, 0, 0.0)',
      borderColor: 'rgba(253, 97, 0,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // 5 day
      backgroundColor: 'rgba(255, 0, 0, 0.0)',
      borderColor: 'rgba(253,1,1, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 50 day
      backgroundColor: 'rgba(255, 0, 0, 0.0)',
      borderColor: 'rgba(0, 175, 8, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 200 day
      backgroundColor: 'rgba(255, 0, 0, 0.0)',
      borderColor: 'rgba(255, 25, 149, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 15 day EX
      backgroundColor: 'rgba(255, 0, 0, 0.0)',
      borderColor: 'rgba(121, 85, 72, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  constructor(private rfgData: RFGData, private shvData: SHVData) {
    // var data = rfgData.data('Price End');
    // var avg = { data: rfgData.avgPlot(data.data), label: 'Price Average' };
    // var low = { data: rfgData.avgLowerPlot(data.data), label: 'Price Low Average' };
    // var high = { data: rfgData.avgUpperPlot(data.data), label: 'Price High Average' };
    // var floor = { data: rfgData.lowestPlot(data.data), label: 'Floor' };
    // var sma = rfgData.ma({ days: 15, series: '15 Day MA', ema: false });
    // var sma5 = rfgData.ma({ days: 5, series: '5 Day MA', ema: false });
    // var sma50 = rfgData.ma({ days: 50, series: '50 Day MA', ema: false });
    // var sma200 = rfgData.ma({ days: 200, series: '200 Day MA', ema: false });

    // this.lineChartData = [
    //   {data: this.takeLastDays(50, data.data), label: data.series},
    //   {data: this.takeLastDays(50, avg.data), label: avg.label},
    //   {data: this.takeLastDays(50, low.data), label: low.label},
    //   {data: this.takeLastDays(50, high.data), label: high.label},
    //   {data: this.takeLastDays(50, floor.data), label: floor.label},
    //   {data: this.takeLastDays(50, sma.data), label: sma.series},
    //   {data: this.takeLastDays(50, sma5.data), label: sma5.series},
    //   {data: this.takeLastDays(50, sma50.data), label: sma50.series},
    //   {data: this.takeLastDays(50, sma200.data), label: sma200.series}
    // ];

    // this.lineChartLabels = this.takeLastDays(50, rfgData.labels());
      this.changeRange(+"20");

  }

  private takeLastDays(noDays: number, data: any[]): any[] {
    var startIndex = (data.length - (noDays+1));
    var newData = [];
    for(var i=startIndex; i<data.length;i++) newData.push(data[i]);
    return newData;
  }

  changeRange(value) {
      var rfgData = this.rfgData;
      var shvData = this.shvData;

      // RFG
      var data = rfgData.data('Price End');
      var avg = { data: rfgData.avgPlot(data.data), label: 'Price Average' };
      var low = { data: rfgData.avgLowerPlot(data.data), label: 'Price Low Average' };
      var high = { data: rfgData.avgUpperPlot(data.data), label: 'Price High Average' };
      var floor = { data: rfgData.lowestPlot(data.data), label: 'Floor' };
      var sma = rfgData.ma({ days: 15, series: '15 Day MA', ema: false });
      var sma5 = rfgData.ma({ days: 5, series: '5 Day MA', ema: false });
      var sma50 = rfgData.ma({ days: 50, series: '50 Day MA', ema: false });
      var sma200 = rfgData.ma({ days: 200, series: '200 Day MA', ema: false });
      var ema15 = rfgData.ma({ days: 15, series: '15 Day EMA', ema: true });

      // SHV
      // var data = shvData.data('Price End');
      // var avg = { data: shvData.avgPlot(data.data), label: 'Price Average' };
      // var low = { data: shvData.avgLowerPlot(data.data), label: 'Price Low Average' };
      // var high = { data: shvData.avgUpperPlot(data.data), label: 'Price High Average' };
      // var floor = { data: shvData.lowestPlot(data.data), label: 'Floor' };
      // var sma = shvData.ma({ days: 15, series: '15 Day MA', ema: false });
      // var sma5 = shvData.ma({ days: 5, series: '5 Day MA', ema: false });
      // var sma50 = shvData.ma({ days: 50, series: '50 Day MA', ema: false });
      // var sma200 = shvData.ma({ days: 200, series: '200 Day MA', ema: false });
      // var ema15 = shvData.ma({ days: 15, series: '15 Day EMA', ema: true });

      //this.lineChartLabels = this.takeLastDays(+value, rfgData.labels());
      this.lineChartLabels = this.takeLastDays(+value, shvData.labels());

      this.lineChartData = [
          {data: this.takeLastDays(+value, data.data), label: data.series},
          {data: this.takeLastDays(+value, avg.data), label: avg.label},
          {data: this.takeLastDays(+value, low.data), label: low.label},
          {data: this.takeLastDays(+value, high.data), label: high.label},
          {data: this.takeLastDays(+value, floor.data), label: floor.label},
          {data: this.takeLastDays(+value, sma.data), label: sma.series},
          {data: this.takeLastDays(+value, sma5.data), label: sma5.series},
          {data: this.takeLastDays(+value, sma50.data), label: sma50.series},
          {data: this.takeLastDays(+value, sma200.data), label: sma200.series},
          {data: this.takeLastDays(+value, ema15.data), label: ema15.series}
      ]; 

      if(this._chart) window.setTimeout(() => {
        this._chart.refresh();
      });     
  }

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
