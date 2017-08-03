import { Injectable } from '@angular/core';

@Injectable()
export class SHVData {
    
    /** gets the moving average */
    ma(options: Options): LineRow {
        if(options.ema) return this.ema(options.days, options.series);
        else return this.sma(options.days, options.series);
    }

    /** calculates the simple moving average for set day range */
    private sma(days: number, label: string): LineRow {
        var count = 0
        var currentDay = days;
        var dayCount = 0;
        var averages = [];
        var dataValues = this.data('raw');

        // prime the period where averages cant be computed
        for(var i=0;i<days;i++) averages.push(0);

        while(averages.length <= dataValues.data.length) {
            var blockTotal = 0;

            for(var d=count; d<(count+days); d++) blockTotal += dataValues.data[d];

            averages.push(+(blockTotal/days).toFixed(3));
            count++;
        }

        return {
            data: averages,
            series: label
        };
    }

    /** calculates the exponential moving average for set day range */
    private ema(days: number, label: string): LineRow {
        var sma = this.sma(days, label);
		var dataValues = this.data('raw');

        // determine the exponential moving average
        var exAvg: number[] = [];
		var multiplier = (2 / (days + 1));
        sma.data.forEach((d, i) => {
			if(i === 0) exAvg.push(+d.toFixed(3));
			else {
				var exVal = (dataValues.data[i] - exAvg[i-1]) * multiplier + exAvg[i-1];
				exAvg.push(+exVal.toFixed(3));
			}
        }); 

        return {
            data: exAvg,
            series: label
        };
    }

    labels(): string[] {
        var labelArray = [];
        for(var i=(data.data.length-1); i>=0; i--) labelArray.push(new Date(data.data[i].close_date).toDateString());
        return labelArray;
    }

    /** gets raw raw as a LineDataRow */
    data(label: string): LineRow {
        var dataArray = [];    

        for(var i=(data.data.length-1); i>=0; i--) dataArray.push(+(data.data[i].close_price).toFixed(3));          

        //return lineRow;
        return {
            data: dataArray,
            series: label
        };
    }	

    /** plots an average stock price for total length of element */
    avgPlot(data: number[]): number[] {
        var arr: number[] = [];
        var avg = this.average(data);
        data.forEach(v => {
            arr.push(avg);
        });
        return arr;
    }

    /** plots a lower sector average of a stocks avergage price */
    avgLowerPlot(data: number[]): number[] {
        var arr: number[] = [];
        var lower = this.lower(data);
        data.forEach(v => {
            arr.push(lower);
        });
        return arr;
    }

    avgUpperPlot(data: number[]): number[] {
        var arr: number[] = [];
        var upper = this.upper(data);
        data.forEach(v => {
            arr.push(upper);
        });
        return arr;
    }

    lowestPlot(data: number[]): number[] {
        var arr: number[] =[];
        var lowest = this.lowest(data);
        data.forEach(v => {
            arr.push(lowest);
        });
        return arr;
    }

    private average(data: number[]): number {
        var total=0;
        for(var n=0;n<data.length;n++) total += data[n];
        return +(total/data.length).toFixed(3);
    }

    private lower(data: number[]): number {
        var average = this.average(data);
        var lowerValues = [];
        var total=0;
        data.forEach(v => {
            if(v < average) {
                lowerValues.push(v);
                total += v;
            }
        });
        return +(total/lowerValues.length).toFixed(3);
    }

    private upper(data: number[]): number {
        var average = this.average(data);
        var higherValues = [];
        var total=0;
        data.forEach(v => {
            if(v > average) {
                higherValues.push(v);
                total += v;
            }
        });
        return +(total/higherValues.length).toFixed(3);
    }

    private lowest(data: number[]): number {
        var lowest;
        data.forEach(v => {
            if(!lowest) lowest = v;
            else {
                if(v < lowest) lowest = v;
            }
        });
        return lowest;
    }

}

export interface Options {
    /** exponential moving average (if false then simple) */
    ema: boolean;
    /** moving average length */
    days: number;
    /** line row label */
    series: string;
}

export interface LineRow {
    //data: Array<LineRowItem>;
    data: number[];
    series: string;
}

/*export interface LineRowItem {
    point: number;
    label: string;
}*/

export interface DailyData {
    code: string;
    close_date: Date;
    close_price: number;
    change_price: number;
    volume: number;
    day_high_price: number;
    day_low_price: number;
    change_in_percent: string;
}

export interface StockData {
    data: DailyData[];
}

/** 200 Day data */
var data: any = {
  "data": [
    {
      "code": "SHV",
      "close_date": "2017-08-03T00:00:00+1000",
      "close_price": 4.25,
      "change_price": -0.67,
      "volume": 2746078,
      "day_high_price": 4.34,
      "day_low_price": 4.18,
      "change_in_percent": "-13.618%"
    },
    {
      "code": "SHV",
      "close_date": "2017-08-02T00:00:00+1000",
      "close_price": 4.92,
      "change_price": -0.06,
      "volume": 227218,
      "day_high_price": 5.04,
      "day_low_price": 4.92,
      "change_in_percent": "-1.205%"
    },
    {
      "code": "SHV",
      "close_date": "2017-08-01T00:00:00+1000",
      "close_price": 4.98,
      "change_price": 0.08,
      "volume": 203034,
      "day_high_price": 5,
      "day_low_price": 4.9,
      "change_in_percent": "1.633%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-31T00:00:00+1000",
      "close_price": 4.9,
      "change_price": -0.01,
      "volume": 239659,
      "day_high_price": 4.97,
      "day_low_price": 4.9,
      "change_in_percent": "-0.204%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-28T00:00:00+1000",
      "close_price": 4.91,
      "change_price": -0.09,
      "volume": 540429,
      "day_high_price": 5.01,
      "day_low_price": 4.91,
      "change_in_percent": "-1.8%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-27T00:00:00+1000",
      "close_price": 5,
      "change_price": -0.07,
      "volume": 476691,
      "day_high_price": 5.09,
      "day_low_price": 5,
      "change_in_percent": "-1.381%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-26T00:00:00+1000",
      "close_price": 5.07,
      "change_price": -0.07,
      "volume": 450900,
      "day_high_price": 5.17,
      "day_low_price": 5.06,
      "change_in_percent": "-1.362%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-25T00:00:00+1000",
      "close_price": 5.14,
      "change_price": 0.01,
      "volume": 366405,
      "day_high_price": 5.18,
      "day_low_price": 5.13,
      "change_in_percent": "0.195%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-24T00:00:00+1000",
      "close_price": 5.13,
      "change_price": 0.02,
      "volume": 325823,
      "day_high_price": 5.19,
      "day_low_price": 5.11,
      "change_in_percent": "0.391%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-21T00:00:00+1000",
      "close_price": 5.11,
      "change_price": 0.06,
      "volume": 295569,
      "day_high_price": 5.19,
      "day_low_price": 5.07,
      "change_in_percent": "1.188%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-20T00:00:00+1000",
      "close_price": 5.05,
      "change_price": 0.01,
      "volume": 259983,
      "day_high_price": 5.09,
      "day_low_price": 5,
      "change_in_percent": "0.198%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-19T00:00:00+1000",
      "close_price": 5.04,
      "change_price": 0.02,
      "volume": 331578,
      "day_high_price": 5.11,
      "day_low_price": 5.01,
      "change_in_percent": "0.398%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-18T00:00:00+1000",
      "close_price": 5.02,
      "change_price": -0.07,
      "volume": 457000,
      "day_high_price": 5.18,
      "day_low_price": 5.015,
      "change_in_percent": "-1.375%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-17T00:00:00+1000",
      "close_price": 5.09,
      "change_price": 0.19,
      "volume": 689767,
      "day_high_price": 5.28,
      "day_low_price": 5,
      "change_in_percent": "3.878%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-14T00:00:00+1000",
      "close_price": 4.9,
      "change_price": -0.04,
      "volume": 113204,
      "day_high_price": 4.95,
      "day_low_price": 4.88,
      "change_in_percent": "-0.81%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-13T00:00:00+1000",
      "close_price": 4.94,
      "change_price": 0.07,
      "volume": 196279,
      "day_high_price": 4.99,
      "day_low_price": 4.85,
      "change_in_percent": "1.437%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-12T00:00:00+1000",
      "close_price": 4.87,
      "change_price": -0.2,
      "volume": 419073,
      "day_high_price": 5.09,
      "day_low_price": 4.86,
      "change_in_percent": "-3.945%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-11T00:00:00+1000",
      "close_price": 5.07,
      "change_price": -0.05,
      "volume": 242022,
      "day_high_price": 5.16,
      "day_low_price": 5.055,
      "change_in_percent": "-0.977%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-10T00:00:00+1000",
      "close_price": 5.12,
      "change_price": 0.08,
      "volume": 229110,
      "day_high_price": 5.18,
      "day_low_price": 5.06,
      "change_in_percent": "1.587%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-07T00:00:00+1000",
      "close_price": 5.04,
      "change_price": 0.07,
      "volume": 247833,
      "day_high_price": 5.05,
      "day_low_price": 4.88,
      "change_in_percent": "1.408%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-06T00:00:00+1000",
      "close_price": 4.97,
      "change_price": -0.06,
      "volume": 136060,
      "day_high_price": 5.06,
      "day_low_price": 4.94,
      "change_in_percent": "-1.193%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-05T00:00:00+1000",
      "close_price": 5.03,
      "change_price": 0.08,
      "volume": 132385,
      "day_high_price": 5.06,
      "day_low_price": 4.96,
      "change_in_percent": "1.616%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-04T00:00:00+1000",
      "close_price": 4.95,
      "change_price": 0.08,
      "volume": 372934,
      "day_high_price": 5.05,
      "day_low_price": 4.89,
      "change_in_percent": "1.643%"
    },
    {
      "code": "SHV",
      "close_date": "2017-07-03T00:00:00+1000",
      "close_price": 4.87,
      "change_price": -0.03,
      "volume": 306020,
      "day_high_price": 4.99,
      "day_low_price": 4.83,
      "change_in_percent": "-0.612%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-30T00:00:00+1000",
      "close_price": 4.9,
      "change_price": -0.01,
      "volume": 383380,
      "day_high_price": 4.94,
      "day_low_price": 4.815,
      "change_in_percent": "-0.204%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-29T00:00:00+1000",
      "close_price": 4.91,
      "change_price": 0.31,
      "volume": 525962,
      "day_high_price": 4.93,
      "day_low_price": 4.63,
      "change_in_percent": "6.739%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-28T00:00:00+1000",
      "close_price": 4.6,
      "change_price": 0.11,
      "volume": 312580,
      "day_high_price": 4.63,
      "day_low_price": 4.48,
      "change_in_percent": "2.45%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-27T00:00:00+1000",
      "close_price": 4.49,
      "change_price": -0.04,
      "volume": 226351,
      "day_high_price": 4.56,
      "day_low_price": 4.47,
      "change_in_percent": "-0.883%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-26T00:00:00+1000",
      "close_price": 4.53,
      "change_price": -0.02,
      "volume": 259284,
      "day_high_price": 4.65,
      "day_low_price": 4.52,
      "change_in_percent": "-0.44%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-23T00:00:00+1000",
      "close_price": 4.55,
      "change_price": -0.02,
      "volume": 183235,
      "day_high_price": 4.58,
      "day_low_price": 4.51,
      "change_in_percent": "-0.438%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-22T00:00:00+1000",
      "close_price": 4.57,
      "change_price": 0.08,
      "volume": 352349,
      "day_high_price": 4.58,
      "day_low_price": 4.48,
      "change_in_percent": "1.782%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-21T00:00:00+1000",
      "close_price": 4.49,
      "change_price": -0.07,
      "volume": 513035,
      "day_high_price": 4.58,
      "day_low_price": 4.47,
      "change_in_percent": "-1.535%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-20T00:00:00+1000",
      "close_price": 4.56,
      "change_price": 0.05,
      "volume": 386241,
      "day_high_price": 4.67,
      "day_low_price": 4.52,
      "change_in_percent": "1.109%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-19T00:00:00+1000",
      "close_price": 4.51,
      "change_price": 0.14,
      "volume": 335856,
      "day_high_price": 4.55,
      "day_low_price": 4.42,
      "change_in_percent": "3.204%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-16T00:00:00+1000",
      "close_price": 4.37,
      "change_price": -0.1,
      "volume": 305337,
      "day_high_price": 4.5,
      "day_low_price": 4.365,
      "change_in_percent": "-2.237%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-15T00:00:00+1000",
      "close_price": 4.47,
      "change_price": -0.04,
      "volume": 444625,
      "day_high_price": 4.55,
      "day_low_price": 4.39,
      "change_in_percent": "-0.887%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-14T00:00:00+1000",
      "close_price": 4.51,
      "change_price": 0.1,
      "volume": 467914,
      "day_high_price": 4.54,
      "day_low_price": 4.4,
      "change_in_percent": "2.268%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-13T00:00:00+1000",
      "close_price": 4.41,
      "change_price": 0.17,
      "volume": 578430,
      "day_high_price": 4.43,
      "day_low_price": 4.28,
      "change_in_percent": "4.009%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-09T00:00:00+1000",
      "close_price": 4.24,
      "change_price": 0.05,
      "volume": 244549,
      "day_high_price": 4.25,
      "day_low_price": 4.14,
      "change_in_percent": "1.193%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-08T00:00:00+1000",
      "close_price": 4.19,
      "change_price": 0.11,
      "volume": 426728,
      "day_high_price": 4.21,
      "day_low_price": 4.03,
      "change_in_percent": "2.696%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-07T00:00:00+1000",
      "close_price": 4.08,
      "change_price": 0.05,
      "volume": 306948,
      "day_high_price": 4.1,
      "day_low_price": 4,
      "change_in_percent": "1.241%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-06T00:00:00+1000",
      "close_price": 4.03,
      "change_price": -0.07,
      "volume": 1020602,
      "day_high_price": 4.1,
      "day_low_price": 4,
      "change_in_percent": "-1.707%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-05T00:00:00+1000",
      "close_price": 4.1,
      "change_price": -0.03,
      "volume": 632265,
      "day_high_price": 4.14,
      "day_low_price": 4.08,
      "change_in_percent": "-0.726%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-02T00:00:00+1000",
      "close_price": 4.13,
      "change_price": -0.02,
      "volume": 375332,
      "day_high_price": 4.18,
      "day_low_price": 4.11,
      "change_in_percent": "-0.482%"
    },
    {
      "code": "SHV",
      "close_date": "2017-06-01T00:00:00+1000",
      "close_price": 4.15,
      "change_price": -0.02,
      "volume": 553794,
      "day_high_price": 4.25,
      "day_low_price": 4.13,
      "change_in_percent": "-0.48%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-31T00:00:00+1000",
      "close_price": 4.17,
      "change_price": 0.1,
      "volume": 766160,
      "day_high_price": 4.24,
      "day_low_price": 4.1,
      "change_in_percent": "2.457%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-30T00:00:00+1000",
      "close_price": 4.07,
      "change_price": -0.03,
      "volume": 764971,
      "day_high_price": 4.18,
      "day_low_price": 4.06,
      "change_in_percent": "-0.732%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-29T00:00:00+1000",
      "close_price": 4.1,
      "change_price": -0.24,
      "volume": 988728,
      "day_high_price": 4.38,
      "day_low_price": 4.06,
      "change_in_percent": "-5.53%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-26T00:00:00+1000",
      "close_price": 4.34,
      "change_price": -0.49,
      "volume": 2459542,
      "day_high_price": 4.45,
      "day_low_price": 4.09,
      "change_in_percent": "-10.145%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-25T00:00:00+1000",
      "close_price": 4.83,
      "change_price": 0.1,
      "volume": 413845,
      "day_high_price": 4.87,
      "day_low_price": 4.71,
      "change_in_percent": "2.114%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-24T00:00:00+1000",
      "close_price": 4.73,
      "change_price": -0.18,
      "volume": 661320,
      "day_high_price": 4.97,
      "day_low_price": 4.73,
      "change_in_percent": "-3.666%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-23T00:00:00+1000",
      "close_price": 4.91,
      "change_price": -0.06,
      "volume": 444929,
      "day_high_price": 5.06,
      "day_low_price": 4.88,
      "change_in_percent": "-1.207%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-22T00:00:00+1000",
      "close_price": 4.97,
      "change_price": -0.1,
      "volume": 285863,
      "day_high_price": 5.13,
      "day_low_price": 4.97,
      "change_in_percent": "-1.972%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-19T00:00:00+1000",
      "close_price": 5.07,
      "change_price": -0.03,
      "volume": 153112,
      "day_high_price": 5.14,
      "day_low_price": 4.98,
      "change_in_percent": "-0.588%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-18T00:00:00+1000",
      "close_price": 5.1,
      "change_price": 0.13,
      "volume": 648474,
      "day_high_price": 5.14,
      "day_low_price": 4.94,
      "change_in_percent": "2.616%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-17T00:00:00+1000",
      "close_price": 4.97,
      "change_price": 0.03,
      "volume": 323933,
      "day_high_price": 5.1,
      "day_low_price": 4.95,
      "change_in_percent": "0.607%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-16T00:00:00+1000",
      "close_price": 4.94,
      "change_price": -0.16,
      "volume": 469730,
      "day_high_price": 5.22,
      "day_low_price": 4.94,
      "change_in_percent": "-3.137%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-15T00:00:00+1000",
      "close_price": 5.1,
      "change_price": -0.1,
      "volume": 229853,
      "day_high_price": 5.28,
      "day_low_price": 5.1,
      "change_in_percent": "-1.923%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-12T00:00:00+1000",
      "close_price": 5.2,
      "change_price": 0.09,
      "volume": 420720,
      "day_high_price": 5.28,
      "day_low_price": 5.1,
      "change_in_percent": "1.761%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-11T00:00:00+1000",
      "close_price": 5.11,
      "change_price": 0.16,
      "volume": 544150,
      "day_high_price": 5.13,
      "day_low_price": 4.86,
      "change_in_percent": "3.232%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-10T00:00:00+1000",
      "close_price": 4.95,
      "change_price": -0.06,
      "volume": 347281,
      "day_high_price": 5.04,
      "day_low_price": 4.95,
      "change_in_percent": "-1.198%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-09T00:00:00+1000",
      "close_price": 5.01,
      "change_price": -0.01,
      "volume": 336266,
      "day_high_price": 5.08,
      "day_low_price": 4.99,
      "change_in_percent": "-0.199%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-08T00:00:00+1000",
      "close_price": 5.02,
      "change_price": 0.04,
      "volume": 363794,
      "day_high_price": 5.18,
      "day_low_price": 5,
      "change_in_percent": "0.803%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-05T00:00:00+1000",
      "close_price": 4.98,
      "change_price": -0.05,
      "volume": 250373,
      "day_high_price": 5.07,
      "day_low_price": 4.95,
      "change_in_percent": "-0.994%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-04T00:00:00+1000",
      "close_price": 5.03,
      "change_price": -0.02,
      "volume": 518009,
      "day_high_price": 5.09,
      "day_low_price": 5,
      "change_in_percent": "-0.396%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-03T00:00:00+1000",
      "close_price": 5.05,
      "change_price": -0.06,
      "volume": 550757,
      "day_high_price": 5.2,
      "day_low_price": 5.03,
      "change_in_percent": "-1.174%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-02T00:00:00+1000",
      "close_price": 5.11,
      "change_price": -0.01,
      "volume": 665309,
      "day_high_price": 5.3,
      "day_low_price": 5.09,
      "change_in_percent": "-0.195%"
    },
    {
      "code": "SHV",
      "close_date": "2017-05-01T00:00:00+1000",
      "close_price": 5.12,
      "change_price": -0.32,
      "volume": 959572,
      "day_high_price": 5.48,
      "day_low_price": 5.06,
      "change_in_percent": "-5.882%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-28T00:00:00+1000",
      "close_price": 5.44,
      "change_price": -0.5,
      "volume": 1242894,
      "day_high_price": 5.7,
      "day_low_price": 5.42,
      "change_in_percent": "-8.418%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-27T00:00:00+1000",
      "close_price": 5.94,
      "change_price": 0.08,
      "volume": 354423,
      "day_high_price": 5.94,
      "day_low_price": 5.76,
      "change_in_percent": "1.365%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-26T00:00:00+1000",
      "close_price": 5.86,
      "change_price": 0.1,
      "volume": 326365,
      "day_high_price": 5.9,
      "day_low_price": 5.74,
      "change_in_percent": "1.736%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-24T00:00:00+1000",
      "close_price": 5.76,
      "change_price": 0.06,
      "volume": 170178,
      "day_high_price": 5.8,
      "day_low_price": 5.67,
      "change_in_percent": "1.053%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-21T00:00:00+1000",
      "close_price": 5.7,
      "change_price": 0.15,
      "volume": 154921,
      "day_high_price": 5.73,
      "day_low_price": 5.59,
      "change_in_percent": "2.703%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-20T00:00:00+1000",
      "close_price": 5.55,
      "change_price": 0.06,
      "volume": 117254,
      "day_high_price": 5.55,
      "day_low_price": 5.48,
      "change_in_percent": "1.093%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-19T00:00:00+1000",
      "close_price": 5.49,
      "change_price": -0.07,
      "volume": 257609,
      "day_high_price": 5.6,
      "day_low_price": 5.48,
      "change_in_percent": "-1.259%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-18T00:00:00+1000",
      "close_price": 5.56,
      "change_price": -0.04,
      "volume": 183688,
      "day_high_price": 5.65,
      "day_low_price": 5.53,
      "change_in_percent": "-0.714%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-13T00:00:00+1000",
      "close_price": 5.6,
      "change_price": 0.01,
      "volume": 170160,
      "day_high_price": 5.64,
      "day_low_price": 5.55,
      "change_in_percent": "0.179%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-12T00:00:00+1000",
      "close_price": 5.59,
      "change_price": -0.05,
      "volume": 229870,
      "day_high_price": 5.7,
      "day_low_price": 5.56,
      "change_in_percent": "-0.887%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-11T00:00:00+1000",
      "close_price": 5.64,
      "change_price": 0.04,
      "volume": 460911,
      "day_high_price": 5.7,
      "day_low_price": 5.59,
      "change_in_percent": "0.714%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-10T00:00:00+1000",
      "close_price": 5.6,
      "change_price": -0.01,
      "volume": 266413,
      "day_high_price": 5.74,
      "day_low_price": 5.56,
      "change_in_percent": "-0.178%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-07T00:00:00+1000",
      "close_price": 5.61,
      "change_price": -0.07,
      "volume": 207406,
      "day_high_price": 5.73,
      "day_low_price": 5.59,
      "change_in_percent": "-1.232%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-06T00:00:00+1000",
      "close_price": 5.68,
      "change_price": -0.02,
      "volume": 325900,
      "day_high_price": 5.73,
      "day_low_price": 5.66,
      "change_in_percent": "-0.351%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-05T00:00:00+1000",
      "close_price": 5.7,
      "change_price": 0.03,
      "volume": 151278,
      "day_high_price": 5.79,
      "day_low_price": 5.67,
      "change_in_percent": "0.529%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-04T00:00:00+1000",
      "close_price": 5.67,
      "change_price": -0.04,
      "volume": 154473,
      "day_high_price": 5.8,
      "day_low_price": 5.67,
      "change_in_percent": "-0.701%"
    },
    {
      "code": "SHV",
      "close_date": "2017-04-03T00:00:00+1000",
      "close_price": 5.71,
      "change_price": -0.17,
      "volume": 456667,
      "day_high_price": 5.98,
      "day_low_price": 5.71,
      "change_in_percent": "-2.891%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-31T00:00:00+1100",
      "close_price": 5.88,
      "change_price": 0.07,
      "volume": 135225,
      "day_high_price": 5.9,
      "day_low_price": 5.76,
      "change_in_percent": "1.205%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-30T00:00:00+1100",
      "close_price": 5.81,
      "change_price": -0.14,
      "volume": 318454,
      "day_high_price": 5.95,
      "day_low_price": 5.79,
      "change_in_percent": "-2.353%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-29T00:00:00+1100",
      "close_price": 5.95,
      "change_price": 0.12,
      "volume": 430623,
      "day_high_price": 5.98,
      "day_low_price": 5.75,
      "change_in_percent": "2.058%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-28T00:00:00+1100",
      "close_price": 5.83,
      "change_price": 0.17,
      "volume": 369440,
      "day_high_price": 5.87,
      "day_low_price": 5.65,
      "change_in_percent": "3.004%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-27T00:00:00+1100",
      "close_price": 5.66,
      "change_price": 0,
      "volume": 276269,
      "day_high_price": 5.77,
      "day_low_price": 5.6,
      "change_in_percent": "0%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-24T00:00:00+1100",
      "close_price": 5.66,
      "change_price": 0.05,
      "volume": 249195,
      "day_high_price": 5.7,
      "day_low_price": 5.52,
      "change_in_percent": "0.891%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-23T00:00:00+1100",
      "close_price": 5.61,
      "change_price": 0.1,
      "volume": 176959,
      "day_high_price": 5.65,
      "day_low_price": 5.52,
      "change_in_percent": "1.815%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-22T00:00:00+1100",
      "close_price": 5.51,
      "change_price": -0.12,
      "volume": 489382,
      "day_high_price": 5.62,
      "day_low_price": 5.47,
      "change_in_percent": "-2.131%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-21T00:00:00+1100",
      "close_price": 5.63,
      "change_price": -0.02,
      "volume": 303184,
      "day_high_price": 5.71,
      "day_low_price": 5.58,
      "change_in_percent": "-0.354%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-20T00:00:00+1100",
      "close_price": 5.65,
      "change_price": 0.07,
      "volume": 183840,
      "day_high_price": 5.65,
      "day_low_price": 5.57,
      "change_in_percent": "1.254%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-17T00:00:00+1100",
      "close_price": 5.58,
      "change_price": -0.07,
      "volume": 299806,
      "day_high_price": 5.72,
      "day_low_price": 5.55,
      "change_in_percent": "-1.239%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-16T00:00:00+1100",
      "close_price": 5.65,
      "change_price": -0.06,
      "volume": 614934,
      "day_high_price": 5.77,
      "day_low_price": 5.52,
      "change_in_percent": "-1.051%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-15T00:00:00+1100",
      "close_price": 5.71,
      "change_price": -0.07,
      "volume": 571986,
      "day_high_price": 5.8,
      "day_low_price": 5.61,
      "change_in_percent": "-1.211%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-14T00:00:00+1100",
      "close_price": 5.78,
      "change_price": 0,
      "volume": 289695,
      "day_high_price": 5.88,
      "day_low_price": 5.72,
      "change_in_percent": "0%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-13T00:00:00+1100",
      "close_price": 5.78,
      "change_price": -0.06,
      "volume": 426821,
      "day_high_price": 5.98,
      "day_low_price": 5.66,
      "change_in_percent": "-1.027%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-10T00:00:00+1100",
      "close_price": 5.84,
      "change_price": 0.01,
      "volume": 482750,
      "day_high_price": 5.99,
      "day_low_price": 5.8,
      "change_in_percent": "0.172%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-09T00:00:00+1100",
      "close_price": 5.83,
      "change_price": 0.03,
      "volume": 313439,
      "day_high_price": 5.92,
      "day_low_price": 5.78,
      "change_in_percent": "0.517%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-08T00:00:00+1100",
      "close_price": 5.8,
      "change_price": -0.1,
      "volume": 729071,
      "day_high_price": 5.87,
      "day_low_price": 5.62,
      "change_in_percent": "-1.695%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-07T00:00:00+1100",
      "close_price": 5.9,
      "change_price": -0.05,
      "volume": 544289,
      "day_high_price": 5.91,
      "day_low_price": 5.61,
      "change_in_percent": "-0.84%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-06T00:00:00+1100",
      "close_price": 5.95,
      "change_price": -0.05,
      "volume": 376987,
      "day_high_price": 6.04,
      "day_low_price": 5.85,
      "change_in_percent": "-0.833%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-03T00:00:00+1100",
      "close_price": 6,
      "change_price": 0.39,
      "volume": 955787,
      "day_high_price": 6.16,
      "day_low_price": 5.65,
      "change_in_percent": "6.952%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-02T00:00:00+1100",
      "close_price": 5.61,
      "change_price": 0.31,
      "volume": 580723,
      "day_high_price": 5.71,
      "day_low_price": 5.38,
      "change_in_percent": "5.849%"
    },
    {
      "code": "SHV",
      "close_date": "2017-03-01T00:00:00+1100",
      "close_price": 5.3,
      "change_price": 0.09,
      "volume": 452253,
      "day_high_price": 5.4,
      "day_low_price": 5.13,
      "change_in_percent": "1.727%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-28T00:00:00+1100",
      "close_price": 5.21,
      "change_price": -0.23,
      "volume": 923317,
      "day_high_price": 5.37,
      "day_low_price": 5.1,
      "change_in_percent": "-4.228%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-27T00:00:00+1100",
      "close_price": 5.44,
      "change_price": -0.01,
      "volume": 277598,
      "day_high_price": 5.57,
      "day_low_price": 5.39,
      "change_in_percent": "-0.183%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-24T00:00:00+1100",
      "close_price": 5.45,
      "change_price": -0.14,
      "volume": 184301,
      "day_high_price": 5.63,
      "day_low_price": 5.44,
      "change_in_percent": "-2.504%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-23T00:00:00+1100",
      "close_price": 5.59,
      "change_price": -0.05,
      "volume": 319583,
      "day_high_price": 5.6,
      "day_low_price": 5.39,
      "change_in_percent": "-0.887%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-22T00:00:00+1100",
      "close_price": 5.64,
      "change_price": 0.13,
      "volume": 234257,
      "day_high_price": 5.66,
      "day_low_price": 5.54,
      "change_in_percent": "2.359%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-21T00:00:00+1100",
      "close_price": 5.51,
      "change_price": -0.07,
      "volume": 181407,
      "day_high_price": 5.65,
      "day_low_price": 5.51,
      "change_in_percent": "-1.254%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-20T00:00:00+1100",
      "close_price": 5.58,
      "change_price": 0.06,
      "volume": 254738,
      "day_high_price": 5.69,
      "day_low_price": 5.52,
      "change_in_percent": "1.087%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-17T00:00:00+1100",
      "close_price": 5.52,
      "change_price": -0.1,
      "volume": 259171,
      "day_high_price": 5.66,
      "day_low_price": 5.47,
      "change_in_percent": "-1.779%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-16T00:00:00+1100",
      "close_price": 5.62,
      "change_price": 0.08,
      "volume": 292724,
      "day_high_price": 5.68,
      "day_low_price": 5.56,
      "change_in_percent": "1.444%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-15T00:00:00+1100",
      "close_price": 5.54,
      "change_price": 0.08,
      "volume": 434857,
      "day_high_price": 5.62,
      "day_low_price": 5.51,
      "change_in_percent": "1.465%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-14T00:00:00+1100",
      "close_price": 5.46,
      "change_price": -0.14,
      "volume": 452494,
      "day_high_price": 5.68,
      "day_low_price": 5.4,
      "change_in_percent": "-2.5%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-13T00:00:00+1100",
      "close_price": 5.6,
      "change_price": 0.32,
      "volume": 578783,
      "day_high_price": 5.61,
      "day_low_price": 5.31,
      "change_in_percent": "6.061%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-10T00:00:00+1100",
      "close_price": 5.28,
      "change_price": 0,
      "volume": 270751,
      "day_high_price": 5.35,
      "day_low_price": 5.25,
      "change_in_percent": "0%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-09T00:00:00+1100",
      "close_price": 5.28,
      "change_price": -0.06,
      "volume": 188638,
      "day_high_price": 5.35,
      "day_low_price": 5.27,
      "change_in_percent": "-1.124%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-08T00:00:00+1100",
      "close_price": 5.34,
      "change_price": 0.09,
      "volume": 428490,
      "day_high_price": 5.42,
      "day_low_price": 5.27,
      "change_in_percent": "1.714%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-07T00:00:00+1100",
      "close_price": 5.25,
      "change_price": -0.05,
      "volume": 299997,
      "day_high_price": 5.38,
      "day_low_price": 5.2,
      "change_in_percent": "-0.943%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-06T00:00:00+1100",
      "close_price": 5.3,
      "change_price": 0.13,
      "volume": 311242,
      "day_high_price": 5.36,
      "day_low_price": 5.2,
      "change_in_percent": "2.515%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-03T00:00:00+1100",
      "close_price": 5.17,
      "change_price": -0.21,
      "volume": 922381,
      "day_high_price": 5.35,
      "day_low_price": 5.17,
      "change_in_percent": "-3.903%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-02T00:00:00+1100",
      "close_price": 5.38,
      "change_price": -0.09,
      "volume": 422631,
      "day_high_price": 5.6,
      "day_low_price": 5.35,
      "change_in_percent": "-1.645%"
    },
    {
      "code": "SHV",
      "close_date": "2017-02-01T00:00:00+1100",
      "close_price": 5.47,
      "change_price": -0.12,
      "volume": 762676,
      "day_high_price": 5.65,
      "day_low_price": 5.42,
      "change_in_percent": "-2.147%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-31T00:00:00+1100",
      "close_price": 5.59,
      "change_price": -0.18,
      "volume": 418193,
      "day_high_price": 5.77,
      "day_low_price": 5.55,
      "change_in_percent": "-3.12%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-30T00:00:00+1100",
      "close_price": 5.77,
      "change_price": -0.15,
      "volume": 336702,
      "day_high_price": 5.98,
      "day_low_price": 5.7,
      "change_in_percent": "-2.534%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-27T00:00:00+1100",
      "close_price": 5.92,
      "change_price": 0.05,
      "volume": 280808,
      "day_high_price": 5.99,
      "day_low_price": 5.84,
      "change_in_percent": "0.852%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-25T00:00:00+1100",
      "close_price": 5.87,
      "change_price": -0.09,
      "volume": 214916,
      "day_high_price": 5.97,
      "day_low_price": 5.83,
      "change_in_percent": "-1.51%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-24T00:00:00+1100",
      "close_price": 5.96,
      "change_price": 0.21,
      "volume": 317518,
      "day_high_price": 6.04,
      "day_low_price": 5.71,
      "change_in_percent": "3.652%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-23T00:00:00+1100",
      "close_price": 5.75,
      "change_price": -0.18,
      "volume": 698995,
      "day_high_price": 6.03,
      "day_low_price": 5.74,
      "change_in_percent": "-3.035%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-20T00:00:00+1100",
      "close_price": 5.93,
      "change_price": -0.15,
      "volume": 508067,
      "day_high_price": 6.08,
      "day_low_price": 5.92,
      "change_in_percent": "-2.467%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-19T00:00:00+1100",
      "close_price": 6.08,
      "change_price": 0.04,
      "volume": 498487,
      "day_high_price": 6.185,
      "day_low_price": 6.01,
      "change_in_percent": "0.662%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-18T00:00:00+1100",
      "close_price": 6.04,
      "change_price": -0.32,
      "volume": 547079,
      "day_high_price": 6.35,
      "day_low_price": 6.02,
      "change_in_percent": "-5.031%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-17T00:00:00+1100",
      "close_price": 6.36,
      "change_price": -0.04,
      "volume": 201820,
      "day_high_price": 6.44,
      "day_low_price": 6.32,
      "change_in_percent": "-0.625%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-16T00:00:00+1100",
      "close_price": 6.4,
      "change_price": 0.02,
      "volume": 70621,
      "day_high_price": 6.46,
      "day_low_price": 6.35,
      "change_in_percent": "0.313%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-13T00:00:00+1100",
      "close_price": 6.38,
      "change_price": 0,
      "volume": 162606,
      "day_high_price": 6.41,
      "day_low_price": 6.35,
      "change_in_percent": "0%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-12T00:00:00+1100",
      "close_price": 6.38,
      "change_price": -0.03,
      "volume": 190294,
      "day_high_price": 6.45,
      "day_low_price": 6.33,
      "change_in_percent": "-0.468%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-11T00:00:00+1100",
      "close_price": 6.41,
      "change_price": -0.03,
      "volume": 122541,
      "day_high_price": 6.5,
      "day_low_price": 6.4,
      "change_in_percent": "-0.466%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-10T00:00:00+1100",
      "close_price": 6.44,
      "change_price": -0.16,
      "volume": 188882,
      "day_high_price": 6.62,
      "day_low_price": 6.43,
      "change_in_percent": "-2.424%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-09T00:00:00+1100",
      "close_price": 6.6,
      "change_price": -0.01,
      "volume": 139426,
      "day_high_price": 6.7,
      "day_low_price": 6.6,
      "change_in_percent": "-0.151%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-06T00:00:00+1100",
      "close_price": 6.61,
      "change_price": -0.06,
      "volume": 196678,
      "day_high_price": 6.67,
      "day_low_price": 6.61,
      "change_in_percent": "-0.9%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-05T00:00:00+1100",
      "close_price": 6.67,
      "change_price": 0,
      "volume": 212518,
      "day_high_price": 6.74,
      "day_low_price": 6.6,
      "change_in_percent": "0%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-04T00:00:00+1100",
      "close_price": 6.67,
      "change_price": -0.07,
      "volume": 153460,
      "day_high_price": 6.75,
      "day_low_price": 6.63,
      "change_in_percent": "-1.039%"
    },
    {
      "code": "SHV",
      "close_date": "2017-01-03T00:00:00+1100",
      "close_price": 6.74,
      "change_price": 0.1,
      "volume": 305993,
      "day_high_price": 6.815,
      "day_low_price": 6.51,
      "change_in_percent": "1.506%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-30T00:00:00+1100",
      "close_price": 6.64,
      "change_price": -0.22,
      "volume": 137384,
      "day_high_price": 6.84,
      "day_low_price": 6.64,
      "change_in_percent": "-3.207%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-29T00:00:00+1100",
      "close_price": 6.86,
      "change_price": 0.32,
      "volume": 259147,
      "day_high_price": 6.86,
      "day_low_price": 6.52,
      "change_in_percent": "4.893%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-28T00:00:00+1100",
      "close_price": 6.54,
      "change_price": 0.05,
      "volume": 129891,
      "day_high_price": 6.63,
      "day_low_price": 6.46,
      "change_in_percent": "0.77%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-23T00:00:00+1100",
      "close_price": 6.49,
      "change_price": -0.01,
      "volume": 71116,
      "day_high_price": 6.59,
      "day_low_price": 6.48,
      "change_in_percent": "-0.154%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-22T00:00:00+1100",
      "close_price": 6.5,
      "change_price": -0.08,
      "volume": 142798,
      "day_high_price": 6.6,
      "day_low_price": 6.465,
      "change_in_percent": "-1.216%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-21T00:00:00+1100",
      "close_price": 6.58,
      "change_price": 0.06,
      "volume": 244080,
      "day_high_price": 6.59,
      "day_low_price": 6.44,
      "change_in_percent": "0.92%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-20T00:00:00+1100",
      "close_price": 6.52,
      "change_price": 0.12,
      "volume": 177372,
      "day_high_price": 6.57,
      "day_low_price": 6.34,
      "change_in_percent": "1.875%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-19T00:00:00+1100",
      "close_price": 6.4,
      "change_price": 0.12,
      "volume": 240900,
      "day_high_price": 6.54,
      "day_low_price": 6.26,
      "change_in_percent": "1.911%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-16T00:00:00+1100",
      "close_price": 6.28,
      "change_price": -0.13,
      "volume": 402238,
      "day_high_price": 6.47,
      "day_low_price": 6.27,
      "change_in_percent": "-2.028%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-15T00:00:00+1100",
      "close_price": 6.41,
      "change_price": -0.25,
      "volume": 237975,
      "day_high_price": 6.6,
      "day_low_price": 6.4,
      "change_in_percent": "-3.754%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-14T00:00:00+1100",
      "close_price": 6.66,
      "change_price": 0.02,
      "volume": 247432,
      "day_high_price": 6.71,
      "day_low_price": 6.57,
      "change_in_percent": "0.301%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-13T00:00:00+1100",
      "close_price": 6.64,
      "change_price": 0.02,
      "volume": 420620,
      "day_high_price": 6.94,
      "day_low_price": 6.61,
      "change_in_percent": "0.302%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-12T00:00:00+1100",
      "close_price": 6.62,
      "change_price": 0.08,
      "volume": 180507,
      "day_high_price": 6.73,
      "day_low_price": 6.54,
      "change_in_percent": "1.223%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-09T00:00:00+1100",
      "close_price": 6.54,
      "change_price": 0,
      "volume": 289662,
      "day_high_price": 6.59,
      "day_low_price": 6.48,
      "change_in_percent": "0%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-08T00:00:00+1100",
      "close_price": 6.54,
      "change_price": 0.09,
      "volume": 111313,
      "day_high_price": 6.59,
      "day_low_price": 6.45,
      "change_in_percent": "1.395%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-07T00:00:00+1100",
      "close_price": 6.45,
      "change_price": 0.08,
      "volume": 206891,
      "day_high_price": 6.51,
      "day_low_price": 6.33,
      "change_in_percent": "1.256%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-06T00:00:00+1100",
      "close_price": 6.37,
      "change_price": -0.05,
      "volume": 330071,
      "day_high_price": 6.51,
      "day_low_price": 6.27,
      "change_in_percent": "-0.779%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-05T00:00:00+1100",
      "close_price": 6.42,
      "change_price": 0.19,
      "volume": 250033,
      "day_high_price": 6.48,
      "day_low_price": 6.25,
      "change_in_percent": "3.05%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-02T00:00:00+1100",
      "close_price": 6.23,
      "change_price": -0.3,
      "volume": 394340,
      "day_high_price": 6.62,
      "day_low_price": 6.21,
      "change_in_percent": "-4.594%"
    },
    {
      "code": "SHV",
      "close_date": "2016-12-01T00:00:00+1100",
      "close_price": 6.53,
      "change_price": 0.22,
      "volume": 403469,
      "day_high_price": 6.63,
      "day_low_price": 6.41,
      "change_in_percent": "3.487%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-30T00:00:00+1100",
      "close_price": 6.31,
      "change_price": -0.23,
      "volume": 331538,
      "day_high_price": 6.68,
      "day_low_price": 6.31,
      "change_in_percent": "-3.517%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-29T00:00:00+1100",
      "close_price": 6.54,
      "change_price": -0.27,
      "volume": 486283,
      "day_high_price": 6.78,
      "day_low_price": 6.51,
      "change_in_percent": "-3.965%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-28T00:00:00+1100",
      "close_price": 6.81,
      "change_price": -0.2,
      "volume": 211993,
      "day_high_price": 6.99,
      "day_low_price": 6.74,
      "change_in_percent": "-2.853%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-25T00:00:00+1100",
      "close_price": 7.01,
      "change_price": 0.14,
      "volume": 343007,
      "day_high_price": 7.1,
      "day_low_price": 6.8,
      "change_in_percent": "2.038%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-24T00:00:00+1100",
      "close_price": 6.87,
      "change_price": -0.12,
      "volume": 180397,
      "day_high_price": 6.99,
      "day_low_price": 6.77,
      "change_in_percent": "-1.717%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-23T00:00:00+1100",
      "close_price": 6.99,
      "change_price": 0.04,
      "volume": 202651,
      "day_high_price": 7.01,
      "day_low_price": 6.88,
      "change_in_percent": "0.576%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-22T00:00:00+1100",
      "close_price": 6.95,
      "change_price": 0.05,
      "volume": 201017,
      "day_high_price": 6.99,
      "day_low_price": 6.89,
      "change_in_percent": "0.725%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-21T00:00:00+1100",
      "close_price": 6.9,
      "change_price": 0.08,
      "volume": 208244,
      "day_high_price": 6.99,
      "day_low_price": 6.72,
      "change_in_percent": "1.173%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-18T00:00:00+1100",
      "close_price": 6.82,
      "change_price": -0.08,
      "volume": 466531,
      "day_high_price": 7.1,
      "day_low_price": 6.77,
      "change_in_percent": "-1.159%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-17T00:00:00+1100",
      "close_price": 6.9,
      "change_price": 0.13,
      "volume": 356981,
      "day_high_price": 6.96,
      "day_low_price": 6.57,
      "change_in_percent": "1.92%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-16T00:00:00+1100",
      "close_price": 6.77,
      "change_price": -0.04,
      "volume": 452320,
      "day_high_price": 6.82,
      "day_low_price": 6.54,
      "change_in_percent": "-0.587%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-15T00:00:00+1100",
      "close_price": 6.81,
      "change_price": 0.11,
      "volume": 326844,
      "day_high_price": 6.87,
      "day_low_price": 6.65,
      "change_in_percent": "1.642%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-14T00:00:00+1100",
      "close_price": 6.7,
      "change_price": 0.06,
      "volume": 556977,
      "day_high_price": 6.77,
      "day_low_price": 6.52,
      "change_in_percent": "0.904%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-11T00:00:00+1100",
      "close_price": 6.64,
      "change_price": 0.09,
      "volume": 386437,
      "day_high_price": 6.67,
      "day_low_price": 6.42,
      "change_in_percent": "1.374%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-10T00:00:00+1100",
      "close_price": 6.55,
      "change_price": 0.5,
      "volume": 372735,
      "day_high_price": 6.58,
      "day_low_price": 6.25,
      "change_in_percent": "8.264%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-09T00:00:00+1100",
      "close_price": 6.05,
      "change_price": -0.33,
      "volume": 394020,
      "day_high_price": 6.53,
      "day_low_price": 5.88,
      "change_in_percent": "-5.172%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-08T00:00:00+1100",
      "close_price": 6.38,
      "change_price": 0.16,
      "volume": 233714,
      "day_high_price": 6.42,
      "day_low_price": 6.23,
      "change_in_percent": "2.572%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-07T00:00:00+1100",
      "close_price": 6.22,
      "change_price": 0.17,
      "volume": 356856,
      "day_high_price": 6.22,
      "day_low_price": 6.01,
      "change_in_percent": "2.81%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-04T00:00:00+1100",
      "close_price": 6.05,
      "change_price": 0.12,
      "volume": 182312,
      "day_high_price": 6.1,
      "day_low_price": 5.88,
      "change_in_percent": "2.024%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-03T00:00:00+1100",
      "close_price": 5.93,
      "change_price": -0.13,
      "volume": 178970,
      "day_high_price": 6.09,
      "day_low_price": 5.89,
      "change_in_percent": "-2.145%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-02T00:00:00+1100",
      "close_price": 6.06,
      "change_price": -0.02,
      "volume": 284813,
      "day_high_price": 6.17,
      "day_low_price": 5.99,
      "change_in_percent": "-0.329%"
    },
    {
      "code": "SHV",
      "close_date": "2016-11-01T00:00:00+1100",
      "close_price": 6.08,
      "change_price": -0.04,
      "volume": 126725,
      "day_high_price": 6.21,
      "day_low_price": 6.03,
      "change_in_percent": "-0.654%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-31T00:00:00+1100",
      "close_price": 6.12,
      "change_price": 0.03,
      "volume": 303420,
      "day_high_price": 6.25,
      "day_low_price": 6.02,
      "change_in_percent": "0.493%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-28T00:00:00+1100",
      "close_price": 6.09,
      "change_price": -0.16,
      "volume": 517020,
      "day_high_price": 6.25,
      "day_low_price": 5.88,
      "change_in_percent": "-2.56%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-27T00:00:00+1100",
      "close_price": 6.25,
      "change_price": -0.14,
      "volume": 258891,
      "day_high_price": 6.49,
      "day_low_price": 6.19,
      "change_in_percent": "-2.191%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-26T00:00:00+1100",
      "close_price": 6.39,
      "change_price": -0.23,
      "volume": 380831,
      "day_high_price": 6.6,
      "day_low_price": 6.32,
      "change_in_percent": "-3.474%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-25T00:00:00+1100",
      "close_price": 6.62,
      "change_price": 0.18,
      "volume": 390430,
      "day_high_price": 6.67,
      "day_low_price": 6.35,
      "change_in_percent": "2.795%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-24T00:00:00+1100",
      "close_price": 6.44,
      "change_price": -0.03,
      "volume": 241871,
      "day_high_price": 6.49,
      "day_low_price": 6.31,
      "change_in_percent": "-0.464%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-21T00:00:00+1100",
      "close_price": 6.47,
      "change_price": 0.06,
      "volume": 258069,
      "day_high_price": 6.47,
      "day_low_price": 6.28,
      "change_in_percent": "0.936%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-20T00:00:00+1100",
      "close_price": 6.41,
      "change_price": 0.06,
      "volume": 261220,
      "day_high_price": 6.47,
      "day_low_price": 6.27,
      "change_in_percent": "0.945%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-19T00:00:00+1100",
      "close_price": 6.35,
      "change_price": 0.1,
      "volume": 286068,
      "day_high_price": 6.42,
      "day_low_price": 6.22,
      "change_in_percent": "1.6%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-18T00:00:00+1100",
      "close_price": 6.25,
      "change_price": -0.09,
      "volume": 252597,
      "day_high_price": 6.34,
      "day_low_price": 6.16,
      "change_in_percent": "-1.42%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-17T00:00:00+1100",
      "close_price": 6.34,
      "change_price": -0.01,
      "volume": 668277,
      "day_high_price": 6.47,
      "day_low_price": 6.3,
      "change_in_percent": "-0.157%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-14T00:00:00+1100",
      "close_price": 6.35,
      "change_price": 0.21,
      "volume": 744648,
      "day_high_price": 6.47,
      "day_low_price": 6.13,
      "change_in_percent": "3.42%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-13T00:00:00+1100",
      "close_price": 6.14,
      "change_price": -0.17,
      "volume": 781741,
      "day_high_price": 6.36,
      "day_low_price": 6.13,
      "change_in_percent": "-2.694%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-12T00:00:00+1100",
      "close_price": 6.31,
      "change_price": 0.02,
      "volume": 378976,
      "day_high_price": 6.35,
      "day_low_price": 6.2,
      "change_in_percent": "0.318%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-11T00:00:00+1100",
      "close_price": 6.29,
      "change_price": 0.21,
      "volume": 709457,
      "day_high_price": 6.37,
      "day_low_price": 6.13,
      "change_in_percent": "3.454%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-10T00:00:00+1100",
      "close_price": 6.08,
      "change_price": 0.04,
      "volume": 453439,
      "day_high_price": 6.12,
      "day_low_price": 5.96,
      "change_in_percent": "0.662%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-07T00:00:00+1100",
      "close_price": 6.04,
      "change_price": 0.16,
      "volume": 525911,
      "day_high_price": 6.115,
      "day_low_price": 5.85,
      "change_in_percent": "2.721%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-06T00:00:00+1100",
      "close_price": 5.88,
      "change_price": 0.18,
      "volume": 544896,
      "day_high_price": 5.94,
      "day_low_price": 5.67,
      "change_in_percent": "3.158%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-05T00:00:00+1100",
      "close_price": 5.7,
      "change_price": 0.1,
      "volume": 655127,
      "day_high_price": 5.72,
      "day_low_price": 5.51,
      "change_in_percent": "1.786%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-04T00:00:00+1100",
      "close_price": 5.6,
      "change_price": -0.14,
      "volume": 564326,
      "day_high_price": 5.79,
      "day_low_price": 5.53,
      "change_in_percent": "-2.439%"
    },
    {
      "code": "SHV",
      "close_date": "2016-10-03T00:00:00+1100",
      "close_price": 5.74,
      "change_price": 0.07,
      "volume": 431632,
      "day_high_price": 5.84,
      "day_low_price": 5.67,
      "change_in_percent": "1.235%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-30T00:00:00+1000",
      "close_price": 5.67,
      "change_price": 0.05,
      "volume": 449787,
      "day_high_price": 5.78,
      "day_low_price": 5.52,
      "change_in_percent": "0.89%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-29T00:00:00+1000",
      "close_price": 5.62,
      "change_price": -0.11,
      "volume": 557763,
      "day_high_price": 5.7,
      "day_low_price": 5.55,
      "change_in_percent": "-1.92%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-28T00:00:00+1000",
      "close_price": 5.73,
      "change_price": -0.11,
      "volume": 421575,
      "day_high_price": 5.8,
      "day_low_price": 5.62,
      "change_in_percent": "-1.884%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-27T00:00:00+1000",
      "close_price": 5.84,
      "change_price": -0.06,
      "volume": 518965,
      "day_high_price": 5.88,
      "day_low_price": 5.71,
      "change_in_percent": "-1.017%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-26T00:00:00+1000",
      "close_price": 5.9,
      "change_price": 0,
      "volume": 220193,
      "day_high_price": 5.95,
      "day_low_price": 5.82,
      "change_in_percent": "0%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-23T00:00:00+1000",
      "close_price": 5.9,
      "change_price": 0.03,
      "volume": 433549,
      "day_high_price": 5.95,
      "day_low_price": 5.83,
      "change_in_percent": "0.511%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-22T00:00:00+1000",
      "close_price": 5.87,
      "change_price": 0.23,
      "volume": 388610,
      "day_high_price": 5.97,
      "day_low_price": 5.69,
      "change_in_percent": "4.078%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-21T00:00:00+1000",
      "close_price": 5.64,
      "change_price": 0.12,
      "volume": 809737,
      "day_high_price": 5.78,
      "day_low_price": 5.51,
      "change_in_percent": "2.174%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-20T00:00:00+1000",
      "close_price": 5.52,
      "change_price": -0.32,
      "volume": 712865,
      "day_high_price": 5.92,
      "day_low_price": 5.52,
      "change_in_percent": "-5.479%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-19T00:00:00+1000",
      "close_price": 5.84,
      "change_price": -0.04,
      "volume": 102470,
      "day_high_price": 5.97,
      "day_low_price": 5.79,
      "change_in_percent": "-0.68%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-16T00:00:00+1000",
      "close_price": 5.88,
      "change_price": -0.05,
      "volume": 1980467,
      "day_high_price": 5.93,
      "day_low_price": 5.8,
      "change_in_percent": "-0.843%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-15T00:00:00+1000",
      "close_price": 5.93,
      "change_price": 0.13,
      "volume": 523313,
      "day_high_price": 6.015,
      "day_low_price": 5.74,
      "change_in_percent": "2.241%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-14T00:00:00+1000",
      "close_price": 5.8,
      "change_price": 0.08,
      "volume": 537827,
      "day_high_price": 5.84,
      "day_low_price": 5.625,
      "change_in_percent": "1.399%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-13T00:00:00+1000",
      "close_price": 5.72,
      "change_price": -0.11,
      "volume": 449529,
      "day_high_price": 6.07,
      "day_low_price": 5.685,
      "change_in_percent": "-1.887%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-12T00:00:00+1000",
      "close_price": 5.83,
      "change_price": -0.21,
      "volume": 599863,
      "day_high_price": 5.92,
      "day_low_price": 5.73,
      "change_in_percent": "-3.477%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-09T00:00:00+1000",
      "close_price": 6.04,
      "change_price": -0.19,
      "volume": 548039,
      "day_high_price": 6.28,
      "day_low_price": 6.015,
      "change_in_percent": "-3.05%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-08T00:00:00+1000",
      "close_price": 6.23,
      "change_price": -0.33,
      "volume": 537929,
      "day_high_price": 6.6,
      "day_low_price": 6.185,
      "change_in_percent": "-5.03%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-07T00:00:00+1000",
      "close_price": 6.56,
      "change_price": 0.25,
      "volume": 734579,
      "day_high_price": 6.64,
      "day_low_price": 6.34,
      "change_in_percent": "3.962%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-06T00:00:00+1000",
      "close_price": 6.31,
      "change_price": 0.21,
      "volume": 500010,
      "day_high_price": 6.38,
      "day_low_price": 6.1,
      "change_in_percent": "3.443%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-05T00:00:00+1000",
      "close_price": 6.1,
      "change_price": -0.19,
      "volume": 802303,
      "day_high_price": 6.41,
      "day_low_price": 6.02,
      "change_in_percent": "-3.021%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-02T00:00:00+1000",
      "close_price": 6.29,
      "change_price": -0.62,
      "volume": 1092433,
      "day_high_price": 6.65,
      "day_low_price": 6.1,
      "change_in_percent": "-8.973%"
    },
    {
      "code": "SHV",
      "close_date": "2016-09-01T00:00:00+1000",
      "close_price": 6.91,
      "change_price": 0.21,
      "volume": 748240,
      "day_high_price": 6.98,
      "day_low_price": 6.62,
      "change_in_percent": "3.134%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-31T00:00:00+1000",
      "close_price": 6.7,
      "change_price": -0.21,
      "volume": 746384,
      "day_high_price": 6.97,
      "day_low_price": 6.59,
      "change_in_percent": "-3.039%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-30T00:00:00+1000",
      "close_price": 6.91,
      "change_price": 0.42,
      "volume": 873491,
      "day_high_price": 7.02,
      "day_low_price": 6.52,
      "change_in_percent": "6.471%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-29T00:00:00+1000",
      "close_price": 6.49,
      "change_price": 0.24,
      "volume": 692970,
      "day_high_price": 6.59,
      "day_low_price": 6.29,
      "change_in_percent": "3.84%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-26T00:00:00+1000",
      "close_price": 6.25,
      "change_price": -0.48,
      "volume": 1763227,
      "day_high_price": 6.58,
      "day_low_price": 5.75,
      "change_in_percent": "-7.132%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-25T00:00:00+1000",
      "close_price": 6.73,
      "change_price": -0.08,
      "volume": 393770,
      "day_high_price": 6.86,
      "day_low_price": 6.6,
      "change_in_percent": "-1.175%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-24T00:00:00+1000",
      "close_price": 6.81,
      "change_price": 0.02,
      "volume": 363207,
      "day_high_price": 6.9,
      "day_low_price": 6.76,
      "change_in_percent": "0.295%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-23T00:00:00+1000",
      "close_price": 6.79,
      "change_price": -0.12,
      "volume": 420600,
      "day_high_price": 6.96,
      "day_low_price": 6.77,
      "change_in_percent": "-1.737%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-22T00:00:00+1000",
      "close_price": 6.91,
      "change_price": 0.11,
      "volume": 421900,
      "day_high_price": 7.02,
      "day_low_price": 6.81,
      "change_in_percent": "1.618%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-19T00:00:00+1000",
      "close_price": 6.8,
      "change_price": 0.28,
      "volume": 681395,
      "day_high_price": 6.84,
      "day_low_price": 6.51,
      "change_in_percent": "4.294%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-18T00:00:00+1000",
      "close_price": 6.52,
      "change_price": -0.34,
      "volume": 830298,
      "day_high_price": 6.87,
      "day_low_price": 6.46,
      "change_in_percent": "-4.956%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-17T00:00:00+1000",
      "close_price": 6.86,
      "change_price": -0.26,
      "volume": 472053,
      "day_high_price": 7.16,
      "day_low_price": 6.73,
      "change_in_percent": "-3.652%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-16T00:00:00+1000",
      "close_price": 7.12,
      "change_price": -0.07,
      "volume": 349227,
      "day_high_price": 7.24,
      "day_low_price": 7.03,
      "change_in_percent": "-0.974%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-15T00:00:00+1000",
      "close_price": 7.19,
      "change_price": -0.05,
      "volume": 249122,
      "day_high_price": 7.25,
      "day_low_price": 7.15,
      "change_in_percent": "-0.691%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-12T00:00:00+1000",
      "close_price": 7.24,
      "change_price": 0,
      "volume": 461873,
      "day_high_price": 7.4,
      "day_low_price": 7.19,
      "change_in_percent": "0%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-11T00:00:00+1000",
      "close_price": 7.24,
      "change_price": 0.01,
      "volume": 333892,
      "day_high_price": 7.26,
      "day_low_price": 7.12,
      "change_in_percent": "0.138%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-10T00:00:00+1000",
      "close_price": 7.23,
      "change_price": -0.09,
      "volume": 265813,
      "day_high_price": 7.34,
      "day_low_price": 7.19,
      "change_in_percent": "-1.23%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-09T00:00:00+1000",
      "close_price": 7.32,
      "change_price": -0.09,
      "volume": 245380,
      "day_high_price": 7.42,
      "day_low_price": 7.32,
      "change_in_percent": "-1.215%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-08T00:00:00+1000",
      "close_price": 7.41,
      "change_price": 0.05,
      "volume": 331167,
      "day_high_price": 7.43,
      "day_low_price": 7.32,
      "change_in_percent": "0.679%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-05T00:00:00+1000",
      "close_price": 7.36,
      "change_price": 0.18,
      "volume": 415688,
      "day_high_price": 7.4,
      "day_low_price": 7.16,
      "change_in_percent": "2.507%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-04T00:00:00+1000",
      "close_price": 7.18,
      "change_price": 0.11,
      "volume": 392491,
      "day_high_price": 7.29,
      "day_low_price": 7.09,
      "change_in_percent": "1.556%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-03T00:00:00+1000",
      "close_price": 7.07,
      "change_price": -0.45,
      "volume": 759493,
      "day_high_price": 7.47,
      "day_low_price": 7,
      "change_in_percent": "-5.984%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-02T00:00:00+1000",
      "close_price": 7.52,
      "change_price": -0.12,
      "volume": 517376,
      "day_high_price": 7.77,
      "day_low_price": 7.42,
      "change_in_percent": "-1.571%"
    },
    {
      "code": "SHV",
      "close_date": "2016-08-01T00:00:00+1000",
      "close_price": 7.64,
      "change_price": 0.03,
      "volume": 358784,
      "day_high_price": 7.75,
      "day_low_price": 7.62,
      "change_in_percent": "0.394%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-29T00:00:00+1000",
      "close_price": 7.61,
      "change_price": 0.01,
      "volume": 549771,
      "day_high_price": 7.74,
      "day_low_price": 7.52,
      "change_in_percent": "0.132%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-28T00:00:00+1000",
      "close_price": 7.6,
      "change_price": -0.02,
      "volume": 521053,
      "day_high_price": 7.78,
      "day_low_price": 7.59,
      "change_in_percent": "-0.262%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-27T00:00:00+1000",
      "close_price": 7.62,
      "change_price": -0.18,
      "volume": 494028,
      "day_high_price": 7.84,
      "day_low_price": 7.59,
      "change_in_percent": "-2.308%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-26T00:00:00+1000",
      "close_price": 7.8,
      "change_price": 0.21,
      "volume": 615142,
      "day_high_price": 7.85,
      "day_low_price": 7.59,
      "change_in_percent": "2.767%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-25T00:00:00+1000",
      "close_price": 7.59,
      "change_price": 0.04,
      "volume": 247433,
      "day_high_price": 7.68,
      "day_low_price": 7.48,
      "change_in_percent": "0.53%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-22T00:00:00+1000",
      "close_price": 7.55,
      "change_price": -0.07,
      "volume": 511826,
      "day_high_price": 7.67,
      "day_low_price": 7.48,
      "change_in_percent": "-0.919%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-21T00:00:00+1000",
      "close_price": 7.62,
      "change_price": -0.02,
      "volume": 533075,
      "day_high_price": 7.7,
      "day_low_price": 7.55,
      "change_in_percent": "-0.262%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-20T00:00:00+1000",
      "close_price": 7.64,
      "change_price": 0.12,
      "volume": 536883,
      "day_high_price": 7.75,
      "day_low_price": 7.48,
      "change_in_percent": "1.596%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-19T00:00:00+1000",
      "close_price": 7.52,
      "change_price": 0.02,
      "volume": 363760,
      "day_high_price": 7.7,
      "day_low_price": 7.47,
      "change_in_percent": "0.267%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-18T00:00:00+1000",
      "close_price": 7.5,
      "change_price": 0.05,
      "volume": 526537,
      "day_high_price": 7.56,
      "day_low_price": 7.15,
      "change_in_percent": "0.671%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-15T00:00:00+1000",
      "close_price": 7.45,
      "change_price": -0.22,
      "volume": 405742,
      "day_high_price": 7.66,
      "day_low_price": 7.41,
      "change_in_percent": "-2.868%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-14T00:00:00+1000",
      "close_price": 7.67,
      "change_price": 0.05,
      "volume": 563519,
      "day_high_price": 7.75,
      "day_low_price": 7.5,
      "change_in_percent": "0.656%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-13T00:00:00+1000",
      "close_price": 7.62,
      "change_price": 0.01,
      "volume": 459096,
      "day_high_price": 7.76,
      "day_low_price": 7.56,
      "change_in_percent": "0.131%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-12T00:00:00+1000",
      "close_price": 7.61,
      "change_price": -0.02,
      "volume": 681942,
      "day_high_price": 7.83,
      "day_low_price": 7.54,
      "change_in_percent": "-0.262%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-11T00:00:00+1000",
      "close_price": 7.63,
      "change_price": 0.24,
      "volume": 722380,
      "day_high_price": 7.65,
      "day_low_price": 7.4,
      "change_in_percent": "3.248%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-08T00:00:00+1000",
      "close_price": 7.39,
      "change_price": 0.14,
      "volume": 494471,
      "day_high_price": 7.41,
      "day_low_price": 7.15,
      "change_in_percent": "1.931%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-07T00:00:00+1000",
      "close_price": 7.25,
      "change_price": 0,
      "volume": 529498,
      "day_high_price": 7.41,
      "day_low_price": 7.12,
      "change_in_percent": "0%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-06T00:00:00+1000",
      "close_price": 7.25,
      "change_price": -0.13,
      "volume": 612864,
      "day_high_price": 7.35,
      "day_low_price": 6.98,
      "change_in_percent": "-1.762%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-05T00:00:00+1000",
      "close_price": 7.38,
      "change_price": -0.15,
      "volume": 664665,
      "day_high_price": 7.65,
      "day_low_price": 7.33,
      "change_in_percent": "-1.992%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-04T00:00:00+1000",
      "close_price": 7.53,
      "change_price": 0.6,
      "volume": 871983,
      "day_high_price": 7.55,
      "day_low_price": 6.97,
      "change_in_percent": "8.658%"
    },
    {
      "code": "SHV",
      "close_date": "2016-07-01T00:00:00+1000",
      "close_price": 6.93,
      "change_price": 0.19,
      "volume": 775464,
      "day_high_price": 6.95,
      "day_low_price": 6.74,
      "change_in_percent": "2.819%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-30T00:00:00+1000",
      "close_price": 6.74,
      "change_price": 0.04,
      "volume": 566110,
      "day_high_price": 6.97,
      "day_low_price": 6.72,
      "change_in_percent": "0.597%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-29T00:00:00+1000",
      "close_price": 6.7,
      "change_price": 0.02,
      "volume": 501060,
      "day_high_price": 7.02,
      "day_low_price": 6.7,
      "change_in_percent": "0.299%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-28T00:00:00+1000",
      "close_price": 6.68,
      "change_price": -0.04,
      "volume": 499387,
      "day_high_price": 6.73,
      "day_low_price": 6.5,
      "change_in_percent": "-0.595%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-27T00:00:00+1000",
      "close_price": 6.72,
      "change_price": -0.05,
      "volume": 575122,
      "day_high_price": 6.86,
      "day_low_price": 6.52,
      "change_in_percent": "-0.739%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-24T00:00:00+1000",
      "close_price": 6.77,
      "change_price": -0.3,
      "volume": 767479,
      "day_high_price": 7.14,
      "day_low_price": 6.63,
      "change_in_percent": "-4.243%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-23T00:00:00+1000",
      "close_price": 7.07,
      "change_price": -0.02,
      "volume": 683632,
      "day_high_price": 7.15,
      "day_low_price": 6.93,
      "change_in_percent": "-0.282%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-22T00:00:00+1000",
      "close_price": 7.09,
      "change_price": 0.04,
      "volume": 636139,
      "day_high_price": 7.2,
      "day_low_price": 7.01,
      "change_in_percent": "0.567%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-21T00:00:00+1000",
      "close_price": 7.05,
      "change_price": 0.15,
      "volume": 633536,
      "day_high_price": 7.26,
      "day_low_price": 6.965,
      "change_in_percent": "2.174%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-20T00:00:00+1000",
      "close_price": 6.9,
      "change_price": 0.43,
      "volume": 796506,
      "day_high_price": 6.92,
      "day_low_price": 6.48,
      "change_in_percent": "6.646%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-17T00:00:00+1000",
      "close_price": 6.47,
      "change_price": -0.16,
      "volume": 1052827,
      "day_high_price": 6.73,
      "day_low_price": 6.4,
      "change_in_percent": "-2.413%"
    },
    {
      "code": "SHV",
      "close_date": "2016-06-16T00:00:00+1000",
      "close_price": 6.63,
      "change_price": 0.01,
      "volume": 1091738,
      "day_high_price": 6.92,
      "day_low_price": 6.54,
      "change_in_percent": "0.151%"
    }
  ]
};