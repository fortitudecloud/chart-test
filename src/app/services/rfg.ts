import { Injectable } from '@angular/core';

@Injectable()
export class RFGData {
    
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
        return {
            data: [],
            series: 'Not Implemented'
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
      "code": "RFG",
      "close_date": "2017-07-28T00:00:00+1000",
      "close_price": 4.78,
      "change_price": -0.04,
      "volume": 628672,
      "day_high_price": 4.82,
      "day_low_price": 4.75,
      "change_in_percent": "-0.83%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-27T00:00:00+1000",
      "close_price": 4.82,
      "change_price": 0.14,
      "volume": 1073687,
      "day_high_price": 4.83,
      "day_low_price": 4.67,
      "change_in_percent": "2.991%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-26T00:00:00+1000",
      "close_price": 4.68,
      "change_price": 0.22,
      "volume": 1216106,
      "day_high_price": 4.695,
      "day_low_price": 4.485,
      "change_in_percent": "4.933%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-25T00:00:00+1000",
      "close_price": 4.46,
      "change_price": 0.09,
      "volume": 604962,
      "day_high_price": 4.46,
      "day_low_price": 4.39,
      "change_in_percent": "2.059%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-24T00:00:00+1000",
      "close_price": 4.37,
      "change_price": 0.05,
      "volume": 904626,
      "day_high_price": 4.43,
      "day_low_price": 4.28,
      "change_in_percent": "1.157%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-21T00:00:00+1000",
      "close_price": 4.32,
      "change_price": 0.11,
      "volume": 879325,
      "day_high_price": 4.36,
      "day_low_price": 4.22,
      "change_in_percent": "2.613%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-20T00:00:00+1000",
      "close_price": 4.21,
      "change_price": -0.14,
      "volume": 2155140,
      "day_high_price": 4.34,
      "day_low_price": 4.14,
      "change_in_percent": "-3.218%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-19T00:00:00+1000",
      "close_price": 4.35,
      "change_price": -0.07,
      "volume": 766541,
      "day_high_price": 4.45,
      "day_low_price": 4.34,
      "change_in_percent": "-1.584%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-18T00:00:00+1000",
      "close_price": 4.42,
      "change_price": -0.04,
      "volume": 615673,
      "day_high_price": 4.49,
      "day_low_price": 4.41,
      "change_in_percent": "-0.897%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-17T00:00:00+1000",
      "close_price": 4.46,
      "change_price": 0.03,
      "volume": 830312,
      "day_high_price": 4.49,
      "day_low_price": 4.4,
      "change_in_percent": "0.677%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-14T00:00:00+1000",
      "close_price": 4.43,
      "change_price": 0,
      "volume": 749533,
      "day_high_price": 4.44,
      "day_low_price": 4.38,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-13T00:00:00+1000",
      "close_price": 4.43,
      "change_price": 0.05,
      "volume": 810469,
      "day_high_price": 4.465,
      "day_low_price": 4.38,
      "change_in_percent": "1.142%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-12T00:00:00+1000",
      "close_price": 4.38,
      "change_price": -0.04,
      "volume": 1407141,
      "day_high_price": 4.48,
      "day_low_price": 4.33,
      "change_in_percent": "-0.905%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-11T00:00:00+1000",
      "close_price": 4.42,
      "change_price": -0.1,
      "volume": 1641648,
      "day_high_price": 4.52,
      "day_low_price": 4.38,
      "change_in_percent": "-2.212%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-10T00:00:00+1000",
      "close_price": 4.52,
      "change_price": 0.01,
      "volume": 1277824,
      "day_high_price": 4.55,
      "day_low_price": 4.5,
      "change_in_percent": "0.222%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-07T00:00:00+1000",
      "close_price": 4.51,
      "change_price": -0.05,
      "volume": 994368,
      "day_high_price": 4.565,
      "day_low_price": 4.5,
      "change_in_percent": "-1.096%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-06T00:00:00+1000",
      "close_price": 4.56,
      "change_price": -0.19,
      "volume": 1758387,
      "day_high_price": 4.695,
      "day_low_price": 4.55,
      "change_in_percent": "-4%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-05T00:00:00+1000",
      "close_price": 4.75,
      "change_price": -0.01,
      "volume": 542286,
      "day_high_price": 4.82,
      "day_low_price": 4.73,
      "change_in_percent": "-0.21%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-04T00:00:00+1000",
      "close_price": 4.76,
      "change_price": 0.13,
      "volume": 651494,
      "day_high_price": 4.8,
      "day_low_price": 4.66,
      "change_in_percent": "2.808%"
    },
    {
      "code": "RFG",
      "close_date": "2017-07-03T00:00:00+1000",
      "close_price": 4.63,
      "change_price": -0.07,
      "volume": 869436,
      "day_high_price": 4.7,
      "day_low_price": 4.6,
      "change_in_percent": "-1.489%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-30T00:00:00+1000",
      "close_price": 4.7,
      "change_price": -0.07,
      "volume": 1218321,
      "day_high_price": 4.76,
      "day_low_price": 4.65,
      "change_in_percent": "-1.468%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-29T00:00:00+1000",
      "close_price": 4.77,
      "change_price": 0,
      "volume": 820915,
      "day_high_price": 4.82,
      "day_low_price": 4.74,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-28T00:00:00+1000",
      "close_price": 4.77,
      "change_price": 0.09,
      "volume": 970935,
      "day_high_price": 4.78,
      "day_low_price": 4.63,
      "change_in_percent": "1.923%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-27T00:00:00+1000",
      "close_price": 4.68,
      "change_price": -0.03,
      "volume": 670304,
      "day_high_price": 4.7,
      "day_low_price": 4.61,
      "change_in_percent": "-0.637%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-26T00:00:00+1000",
      "close_price": 4.71,
      "change_price": 0.04,
      "volume": 770557,
      "day_high_price": 4.71,
      "day_low_price": 4.66,
      "change_in_percent": "0.857%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-23T00:00:00+1000",
      "close_price": 4.67,
      "change_price": 0.08,
      "volume": 836880,
      "day_high_price": 4.73,
      "day_low_price": 4.6,
      "change_in_percent": "1.743%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-22T00:00:00+1000",
      "close_price": 4.59,
      "change_price": 0.03,
      "volume": 2502971,
      "day_high_price": 4.65,
      "day_low_price": 4.47,
      "change_in_percent": "0.658%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-21T00:00:00+1000",
      "close_price": 4.56,
      "change_price": -0.53,
      "volume": 4778608,
      "day_high_price": 4.92,
      "day_low_price": 4.55,
      "change_in_percent": "-10.413%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-20T00:00:00+1000",
      "close_price": 5.09,
      "change_price": 0.03,
      "volume": 590300,
      "day_high_price": 5.13,
      "day_low_price": 5.04,
      "change_in_percent": "0.593%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-19T00:00:00+1000",
      "close_price": 5.06,
      "change_price": -0.1,
      "volume": 828580,
      "day_high_price": 5.18,
      "day_low_price": 5.03,
      "change_in_percent": "-1.938%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-16T00:00:00+1000",
      "close_price": 5.16,
      "change_price": 0.09,
      "volume": 787336,
      "day_high_price": 5.17,
      "day_low_price": 5.07,
      "change_in_percent": "1.775%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-15T00:00:00+1000",
      "close_price": 5.07,
      "change_price": 0,
      "volume": 1048768,
      "day_high_price": 5.1,
      "day_low_price": 4.99,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-14T00:00:00+1000",
      "close_price": 5.07,
      "change_price": 0.12,
      "volume": 992904,
      "day_high_price": 5.11,
      "day_low_price": 4.98,
      "change_in_percent": "2.424%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-13T00:00:00+1000",
      "close_price": 4.95,
      "change_price": -0.04,
      "volume": 1141135,
      "day_high_price": 5.03,
      "day_low_price": 4.87,
      "change_in_percent": "-0.802%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-09T00:00:00+1000",
      "close_price": 4.99,
      "change_price": 0.03,
      "volume": 715890,
      "day_high_price": 5,
      "day_low_price": 4.925,
      "change_in_percent": "0.605%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-08T00:00:00+1000",
      "close_price": 4.96,
      "change_price": 0.09,
      "volume": 881782,
      "day_high_price": 4.98,
      "day_low_price": 4.87,
      "change_in_percent": "1.848%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-07T00:00:00+1000",
      "close_price": 4.87,
      "change_price": 0.09,
      "volume": 1079865,
      "day_high_price": 4.89,
      "day_low_price": 4.81,
      "change_in_percent": "1.883%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-06T00:00:00+1000",
      "close_price": 4.78,
      "change_price": 0.15,
      "volume": 4892537,
      "day_high_price": 4.94,
      "day_low_price": 4.55,
      "change_in_percent": "3.24%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-05T00:00:00+1000",
      "close_price": 4.63,
      "change_price": -0.59,
      "volume": 5749775,
      "day_high_price": 5.16,
      "day_low_price": 4.59,
      "change_in_percent": "-11.303%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-02T00:00:00+1000",
      "close_price": 5.22,
      "change_price": 0.04,
      "volume": 432334,
      "day_high_price": 5.27,
      "day_low_price": 5.21,
      "change_in_percent": "0.772%"
    },
    {
      "code": "RFG",
      "close_date": "2017-06-01T00:00:00+1000",
      "close_price": 5.18,
      "change_price": 0.04,
      "volume": 745500,
      "day_high_price": 5.285,
      "day_low_price": 5.155,
      "change_in_percent": "0.778%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-31T00:00:00+1000",
      "close_price": 5.14,
      "change_price": 0.01,
      "volume": 494225,
      "day_high_price": 5.2,
      "day_low_price": 5.13,
      "change_in_percent": "0.195%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-30T00:00:00+1000",
      "close_price": 5.13,
      "change_price": -0.14,
      "volume": 550015,
      "day_high_price": 5.27,
      "day_low_price": 5.13,
      "change_in_percent": "-2.657%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-29T00:00:00+1000",
      "close_price": 5.27,
      "change_price": -0.02,
      "volume": 665879,
      "day_high_price": 5.35,
      "day_low_price": 5.25,
      "change_in_percent": "-0.378%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-26T00:00:00+1000",
      "close_price": 5.29,
      "change_price": 0,
      "volume": 486904,
      "day_high_price": 5.32,
      "day_low_price": 5.26,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-25T00:00:00+1000",
      "close_price": 5.29,
      "change_price": 0.01,
      "volume": 556258,
      "day_high_price": 5.32,
      "day_low_price": 5.24,
      "change_in_percent": "0.189%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-24T00:00:00+1000",
      "close_price": 5.28,
      "change_price": -0.04,
      "volume": 817865,
      "day_high_price": 5.35,
      "day_low_price": 5.25,
      "change_in_percent": "-0.752%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-23T00:00:00+1000",
      "close_price": 5.32,
      "change_price": 0.04,
      "volume": 559775,
      "day_high_price": 5.4,
      "day_low_price": 5.26,
      "change_in_percent": "0.758%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-22T00:00:00+1000",
      "close_price": 5.28,
      "change_price": 0.12,
      "volume": 931357,
      "day_high_price": 5.415,
      "day_low_price": 5.19,
      "change_in_percent": "2.326%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-19T00:00:00+1000",
      "close_price": 5.16,
      "change_price": 0.05,
      "volume": 767243,
      "day_high_price": 5.21,
      "day_low_price": 5.11,
      "change_in_percent": "0.978%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-18T00:00:00+1000",
      "close_price": 5.11,
      "change_price": 0.02,
      "volume": 1121061,
      "day_high_price": 5.11,
      "day_low_price": 4.96,
      "change_in_percent": "0.393%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-17T00:00:00+1000",
      "close_price": 5.09,
      "change_price": -0.12,
      "volume": 1170958,
      "day_high_price": 5.2,
      "day_low_price": 5.08,
      "change_in_percent": "-2.303%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-16T00:00:00+1000",
      "close_price": 5.21,
      "change_price": -0.05,
      "volume": 789372,
      "day_high_price": 5.29,
      "day_low_price": 5.19,
      "change_in_percent": "-0.951%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-15T00:00:00+1000",
      "close_price": 5.26,
      "change_price": -0.14,
      "volume": 738635,
      "day_high_price": 5.42,
      "day_low_price": 5.25,
      "change_in_percent": "-2.593%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-12T00:00:00+1000",
      "close_price": 5.4,
      "change_price": -0.23,
      "volume": 1028834,
      "day_high_price": 5.61,
      "day_low_price": 5.365,
      "change_in_percent": "-4.085%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-11T00:00:00+1000",
      "close_price": 5.63,
      "change_price": 0.06,
      "volume": 623932,
      "day_high_price": 5.67,
      "day_low_price": 5.58,
      "change_in_percent": "1.077%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-10T00:00:00+1000",
      "close_price": 5.57,
      "change_price": 0.03,
      "volume": 410622,
      "day_high_price": 5.57,
      "day_low_price": 5.52,
      "change_in_percent": "0.542%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-09T00:00:00+1000",
      "close_price": 5.54,
      "change_price": 0,
      "volume": 687850,
      "day_high_price": 5.59,
      "day_low_price": 5.51,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-08T00:00:00+1000",
      "close_price": 5.54,
      "change_price": 0.11,
      "volume": 471740,
      "day_high_price": 5.54,
      "day_low_price": 5.45,
      "change_in_percent": "2.026%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-05T00:00:00+1000",
      "close_price": 5.43,
      "change_price": -0.08,
      "volume": 597426,
      "day_high_price": 5.56,
      "day_low_price": 5.41,
      "change_in_percent": "-1.452%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-04T00:00:00+1000",
      "close_price": 5.51,
      "change_price": -0.04,
      "volume": 675610,
      "day_high_price": 5.595,
      "day_low_price": 5.5,
      "change_in_percent": "-0.721%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-03T00:00:00+1000",
      "close_price": 5.55,
      "change_price": 0.05,
      "volume": 678282,
      "day_high_price": 5.57,
      "day_low_price": 5.5,
      "change_in_percent": "0.909%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-02T00:00:00+1000",
      "close_price": 5.5,
      "change_price": 0,
      "volume": 603191,
      "day_high_price": 5.54,
      "day_low_price": 5.45,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2017-05-01T00:00:00+1000",
      "close_price": 5.5,
      "change_price": 0.04,
      "volume": 660591,
      "day_high_price": 5.5,
      "day_low_price": 5.46,
      "change_in_percent": "0.733%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-28T00:00:00+1000",
      "close_price": 5.46,
      "change_price": -0.02,
      "volume": 946573,
      "day_high_price": 5.49,
      "day_low_price": 5.405,
      "change_in_percent": "-0.365%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-27T00:00:00+1000",
      "close_price": 5.48,
      "change_price": 0.12,
      "volume": 1141471,
      "day_high_price": 5.48,
      "day_low_price": 5.35,
      "change_in_percent": "2.239%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-26T00:00:00+1000",
      "close_price": 5.36,
      "change_price": -0.08,
      "volume": 1348613,
      "day_high_price": 5.5,
      "day_low_price": 5.34,
      "change_in_percent": "-1.471%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-24T00:00:00+1000",
      "close_price": 5.44,
      "change_price": 0.1,
      "volume": 828790,
      "day_high_price": 5.46,
      "day_low_price": 5.34,
      "change_in_percent": "1.873%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-21T00:00:00+1000",
      "close_price": 5.34,
      "change_price": 0.03,
      "volume": 863277,
      "day_high_price": 5.38,
      "day_low_price": 5.33,
      "change_in_percent": "0.565%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-20T00:00:00+1000",
      "close_price": 5.31,
      "change_price": 0.17,
      "volume": 948723,
      "day_high_price": 5.32,
      "day_low_price": 5.14,
      "change_in_percent": "3.307%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-19T00:00:00+1000",
      "close_price": 5.14,
      "change_price": -0.01,
      "volume": 1322012,
      "day_high_price": 5.17,
      "day_low_price": 5.11,
      "change_in_percent": "-0.194%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-18T00:00:00+1000",
      "close_price": 5.15,
      "change_price": 0.09,
      "volume": 1017804,
      "day_high_price": 5.17,
      "day_low_price": 5.07,
      "change_in_percent": "1.779%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-13T00:00:00+1000",
      "close_price": 5.06,
      "change_price": -0.11,
      "volume": 1160520,
      "day_high_price": 5.165,
      "day_low_price": 5.05,
      "change_in_percent": "-2.128%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-12T00:00:00+1000",
      "close_price": 5.17,
      "change_price": -0.02,
      "volume": 887189,
      "day_high_price": 5.25,
      "day_low_price": 5.13,
      "change_in_percent": "-0.385%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-11T00:00:00+1000",
      "close_price": 5.19,
      "change_price": -0.04,
      "volume": 836695,
      "day_high_price": 5.26,
      "day_low_price": 5.18,
      "change_in_percent": "-0.765%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-10T00:00:00+1000",
      "close_price": 5.23,
      "change_price": -0.01,
      "volume": 739948,
      "day_high_price": 5.27,
      "day_low_price": 5.21,
      "change_in_percent": "-0.191%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-07T00:00:00+1000",
      "close_price": 5.24,
      "change_price": 0.13,
      "volume": 1243693,
      "day_high_price": 5.26,
      "day_low_price": 5.15,
      "change_in_percent": "2.544%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-06T00:00:00+1000",
      "close_price": 5.11,
      "change_price": 0,
      "volume": 1005898,
      "day_high_price": 5.15,
      "day_low_price": 5.08,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-05T00:00:00+1000",
      "close_price": 5.11,
      "change_price": -0.06,
      "volume": 1007342,
      "day_high_price": 5.21,
      "day_low_price": 5.11,
      "change_in_percent": "-1.161%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-04T00:00:00+1000",
      "close_price": 5.17,
      "change_price": -0.06,
      "volume": 1203425,
      "day_high_price": 5.25,
      "day_low_price": 5.17,
      "change_in_percent": "-1.147%"
    },
    {
      "code": "RFG",
      "close_date": "2017-04-03T00:00:00+1000",
      "close_price": 5.23,
      "change_price": -0.1,
      "volume": 1209264,
      "day_high_price": 5.35,
      "day_low_price": 5.22,
      "change_in_percent": "-1.876%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-31T00:00:00+1100",
      "close_price": 5.33,
      "change_price": -0.01,
      "volume": 680288,
      "day_high_price": 5.38,
      "day_low_price": 5.33,
      "change_in_percent": "-0.187%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-30T00:00:00+1100",
      "close_price": 5.34,
      "change_price": -0.04,
      "volume": 1150777,
      "day_high_price": 5.47,
      "day_low_price": 5.33,
      "change_in_percent": "-0.743%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-29T00:00:00+1100",
      "close_price": 5.38,
      "change_price": 0.08,
      "volume": 777459,
      "day_high_price": 5.4,
      "day_low_price": 5.28,
      "change_in_percent": "1.509%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-28T00:00:00+1100",
      "close_price": 5.3,
      "change_price": 0.05,
      "volume": 693061,
      "day_high_price": 5.32,
      "day_low_price": 5.25,
      "change_in_percent": "0.952%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-27T00:00:00+1100",
      "close_price": 5.25,
      "change_price": -0.12,
      "volume": 705087,
      "day_high_price": 5.37,
      "day_low_price": 5.24,
      "change_in_percent": "-2.235%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-24T00:00:00+1100",
      "close_price": 5.37,
      "change_price": 0.17,
      "volume": 1086251,
      "day_high_price": 5.39,
      "day_low_price": 5.19,
      "change_in_percent": "3.269%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-23T00:00:00+1100",
      "close_price": 5.2,
      "change_price": -0.1,
      "volume": 1824551,
      "day_high_price": 5.3,
      "day_low_price": 5.13,
      "change_in_percent": "-1.887%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-22T00:00:00+1100",
      "close_price": 5.3,
      "change_price": -0.05,
      "volume": 1187724,
      "day_high_price": 5.34,
      "day_low_price": 5.28,
      "change_in_percent": "-0.935%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-21T00:00:00+1100",
      "close_price": 5.35,
      "change_price": -0.06,
      "volume": 1185614,
      "day_high_price": 5.44,
      "day_low_price": 5.28,
      "change_in_percent": "-1.109%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-20T00:00:00+1100",
      "close_price": 5.41,
      "change_price": -0.06,
      "volume": 988983,
      "day_high_price": 5.51,
      "day_low_price": 5.39,
      "change_in_percent": "-1.097%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-17T00:00:00+1100",
      "close_price": 5.47,
      "change_price": -0.17,
      "volume": 2084412,
      "day_high_price": 5.56,
      "day_low_price": 5.4,
      "change_in_percent": "-3.014%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-16T00:00:00+1100",
      "close_price": 5.64,
      "change_price": 0.02,
      "volume": 1106915,
      "day_high_price": 5.65,
      "day_low_price": 5.61,
      "change_in_percent": "0.356%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-15T00:00:00+1100",
      "close_price": 5.62,
      "change_price": 0.02,
      "volume": 1727889,
      "day_high_price": 5.64,
      "day_low_price": 5.58,
      "change_in_percent": "0.357%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-14T00:00:00+1100",
      "close_price": 5.6,
      "change_price": 0.01,
      "volume": 1141158,
      "day_high_price": 5.64,
      "day_low_price": 5.58,
      "change_in_percent": "0.179%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-13T00:00:00+1100",
      "close_price": 5.59,
      "change_price": 0.02,
      "volume": 904621,
      "day_high_price": 5.63,
      "day_low_price": 5.57,
      "change_in_percent": "0.359%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-10T00:00:00+1100",
      "close_price": 5.57,
      "change_price": 0.15,
      "volume": 1196745,
      "day_high_price": 5.58,
      "day_low_price": 5.45,
      "change_in_percent": "2.768%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-09T00:00:00+1100",
      "close_price": 5.42,
      "change_price": 0.05,
      "volume": 1006334,
      "day_high_price": 5.48,
      "day_low_price": 5.36,
      "change_in_percent": "0.931%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-08T00:00:00+1100",
      "close_price": 5.37,
      "change_price": 0.03,
      "volume": 2658033,
      "day_high_price": 5.45,
      "day_low_price": 5.34,
      "change_in_percent": "0.562%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-07T00:00:00+1100",
      "close_price": 5.34,
      "change_price": -0.28,
      "volume": 4764978,
      "day_high_price": 5.64,
      "day_low_price": 5.33,
      "change_in_percent": "-4.982%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-06T00:00:00+1100",
      "close_price": 5.62,
      "change_price": 0.08,
      "volume": 1699179,
      "day_high_price": 5.67,
      "day_low_price": 5.515,
      "change_in_percent": "1.444%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-03T00:00:00+1100",
      "close_price": 5.54,
      "change_price": 0.06,
      "volume": 1685323,
      "day_high_price": 5.59,
      "day_low_price": 5.46,
      "change_in_percent": "1.095%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-02T00:00:00+1100",
      "close_price": 5.48,
      "change_price": 0,
      "volume": 1789456,
      "day_high_price": 5.59,
      "day_low_price": 5.46,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2017-03-01T00:00:00+1100",
      "close_price": 5.48,
      "change_price": -0.07,
      "volume": 2684471,
      "day_high_price": 5.64,
      "day_low_price": 5.44,
      "change_in_percent": "-1.261%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-28T00:00:00+1100",
      "close_price": 5.55,
      "change_price": -0.17,
      "volume": 2865444,
      "day_high_price": 5.735,
      "day_low_price": 5.515,
      "change_in_percent": "-2.972%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-27T00:00:00+1100",
      "close_price": 5.72,
      "change_price": -0.41,
      "volume": 3212213,
      "day_high_price": 6.17,
      "day_low_price": 5.72,
      "change_in_percent": "-6.688%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-24T00:00:00+1100",
      "close_price": 6.13,
      "change_price": -0.27,
      "volume": 1403497,
      "day_high_price": 6.42,
      "day_low_price": 6.13,
      "change_in_percent": "-4.219%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-23T00:00:00+1100",
      "close_price": 6.4,
      "change_price": 0.22,
      "volume": 1617001,
      "day_high_price": 6.54,
      "day_low_price": 6.31,
      "change_in_percent": "3.56%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-22T00:00:00+1100",
      "close_price": 6.18,
      "change_price": 0.03,
      "volume": 866895,
      "day_high_price": 6.23,
      "day_low_price": 6.135,
      "change_in_percent": "0.488%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-21T00:00:00+1100",
      "close_price": 6.15,
      "change_price": 0.04,
      "volume": 649292,
      "day_high_price": 6.205,
      "day_low_price": 6.1,
      "change_in_percent": "0.655%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-20T00:00:00+1100",
      "close_price": 6.11,
      "change_price": -0.04,
      "volume": 739333,
      "day_high_price": 6.26,
      "day_low_price": 6.11,
      "change_in_percent": "-0.65%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-17T00:00:00+1100",
      "close_price": 6.15,
      "change_price": -0.04,
      "volume": 839391,
      "day_high_price": 6.23,
      "day_low_price": 6.115,
      "change_in_percent": "-0.646%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-16T00:00:00+1100",
      "close_price": 6.19,
      "change_price": -0.11,
      "volume": 1262877,
      "day_high_price": 6.34,
      "day_low_price": 6.16,
      "change_in_percent": "-1.746%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-15T00:00:00+1100",
      "close_price": 6.3,
      "change_price": 0.04,
      "volume": 849859,
      "day_high_price": 6.4,
      "day_low_price": 6.27,
      "change_in_percent": "0.639%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-14T00:00:00+1100",
      "close_price": 6.26,
      "change_price": -0.1,
      "volume": 1183546,
      "day_high_price": 6.425,
      "day_low_price": 6.26,
      "change_in_percent": "-1.572%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-13T00:00:00+1100",
      "close_price": 6.36,
      "change_price": -0.04,
      "volume": 705098,
      "day_high_price": 6.46,
      "day_low_price": 6.32,
      "change_in_percent": "-0.625%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-10T00:00:00+1100",
      "close_price": 6.4,
      "change_price": 0.14,
      "volume": 1240370,
      "day_high_price": 6.43,
      "day_low_price": 6.23,
      "change_in_percent": "2.236%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-09T00:00:00+1100",
      "close_price": 6.26,
      "change_price": -0.13,
      "volume": 852843,
      "day_high_price": 6.35,
      "day_low_price": 6.21,
      "change_in_percent": "-2.034%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-08T00:00:00+1100",
      "close_price": 6.39,
      "change_price": 0.05,
      "volume": 591158,
      "day_high_price": 6.41,
      "day_low_price": 6.28,
      "change_in_percent": "0.789%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-07T00:00:00+1100",
      "close_price": 6.34,
      "change_price": -0.03,
      "volume": 557454,
      "day_high_price": 6.4,
      "day_low_price": 6.23,
      "change_in_percent": "-0.471%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-06T00:00:00+1100",
      "close_price": 6.37,
      "change_price": 0.07,
      "volume": 477035,
      "day_high_price": 6.455,
      "day_low_price": 6.34,
      "change_in_percent": "1.111%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-03T00:00:00+1100",
      "close_price": 6.3,
      "change_price": 0.08,
      "volume": 833209,
      "day_high_price": 6.39,
      "day_low_price": 6.21,
      "change_in_percent": "1.286%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-02T00:00:00+1100",
      "close_price": 6.22,
      "change_price": -0.17,
      "volume": 853523,
      "day_high_price": 6.37,
      "day_low_price": 6.215,
      "change_in_percent": "-2.66%"
    },
    {
      "code": "RFG",
      "close_date": "2017-02-01T00:00:00+1100",
      "close_price": 6.39,
      "change_price": -0.05,
      "volume": 708984,
      "day_high_price": 6.465,
      "day_low_price": 6.34,
      "change_in_percent": "-0.776%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-31T00:00:00+1100",
      "close_price": 6.44,
      "change_price": -0.04,
      "volume": 541330,
      "day_high_price": 6.52,
      "day_low_price": 6.39,
      "change_in_percent": "-0.617%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-30T00:00:00+1100",
      "close_price": 6.48,
      "change_price": -0.16,
      "volume": 467102,
      "day_high_price": 6.66,
      "day_low_price": 6.48,
      "change_in_percent": "-2.41%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-27T00:00:00+1100",
      "close_price": 6.64,
      "change_price": 0.07,
      "volume": 320178,
      "day_high_price": 6.67,
      "day_low_price": 6.56,
      "change_in_percent": "1.065%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-25T00:00:00+1100",
      "close_price": 6.57,
      "change_price": 0.04,
      "volume": 336243,
      "day_high_price": 6.62,
      "day_low_price": 6.52,
      "change_in_percent": "0.613%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-24T00:00:00+1100",
      "close_price": 6.53,
      "change_price": -0.03,
      "volume": 514424,
      "day_high_price": 6.6,
      "day_low_price": 6.45,
      "change_in_percent": "-0.457%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-23T00:00:00+1100",
      "close_price": 6.56,
      "change_price": -0.03,
      "volume": 636477,
      "day_high_price": 6.65,
      "day_low_price": 6.485,
      "change_in_percent": "-0.455%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-20T00:00:00+1100",
      "close_price": 6.59,
      "change_price": -0.03,
      "volume": 508815,
      "day_high_price": 6.64,
      "day_low_price": 6.515,
      "change_in_percent": "-0.453%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-19T00:00:00+1100",
      "close_price": 6.62,
      "change_price": -0.09,
      "volume": 782948,
      "day_high_price": 6.71,
      "day_low_price": 6.575,
      "change_in_percent": "-1.341%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-18T00:00:00+1100",
      "close_price": 6.71,
      "change_price": -0.09,
      "volume": 603023,
      "day_high_price": 6.8,
      "day_low_price": 6.65,
      "change_in_percent": "-1.324%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-17T00:00:00+1100",
      "close_price": 6.8,
      "change_price": -0.16,
      "volume": 612186,
      "day_high_price": 6.97,
      "day_low_price": 6.76,
      "change_in_percent": "-2.299%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-16T00:00:00+1100",
      "close_price": 6.96,
      "change_price": 0.03,
      "volume": 371389,
      "day_high_price": 6.99,
      "day_low_price": 6.92,
      "change_in_percent": "0.433%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-13T00:00:00+1100",
      "close_price": 6.93,
      "change_price": -0.02,
      "volume": 492595,
      "day_high_price": 7.01,
      "day_low_price": 6.91,
      "change_in_percent": "-0.288%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-12T00:00:00+1100",
      "close_price": 6.95,
      "change_price": 0.03,
      "volume": 541282,
      "day_high_price": 7,
      "day_low_price": 6.88,
      "change_in_percent": "0.434%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-11T00:00:00+1100",
      "close_price": 6.92,
      "change_price": -0.06,
      "volume": 437432,
      "day_high_price": 7.05,
      "day_low_price": 6.92,
      "change_in_percent": "-0.86%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-10T00:00:00+1100",
      "close_price": 6.98,
      "change_price": -0.11,
      "volume": 392891,
      "day_high_price": 7.07,
      "day_low_price": 6.96,
      "change_in_percent": "-1.551%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-09T00:00:00+1100",
      "close_price": 7.09,
      "change_price": 0.11,
      "volume": 562868,
      "day_high_price": 7.09,
      "day_low_price": 6.94,
      "change_in_percent": "1.576%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-06T00:00:00+1100",
      "close_price": 6.98,
      "change_price": -0.07,
      "volume": 486166,
      "day_high_price": 7.12,
      "day_low_price": 6.96,
      "change_in_percent": "-0.993%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-05T00:00:00+1100",
      "close_price": 7.05,
      "change_price": -0.07,
      "volume": 403594,
      "day_high_price": 7.14,
      "day_low_price": 7.02,
      "change_in_percent": "-0.983%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-04T00:00:00+1100",
      "close_price": 7.12,
      "change_price": -0.03,
      "volume": 464690,
      "day_high_price": 7.18,
      "day_low_price": 7.08,
      "change_in_percent": "-0.42%"
    },
    {
      "code": "RFG",
      "close_date": "2017-01-03T00:00:00+1100",
      "close_price": 7.15,
      "change_price": 0.13,
      "volume": 499596,
      "day_high_price": 7.15,
      "day_low_price": 7.03,
      "change_in_percent": "1.852%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-30T00:00:00+1100",
      "close_price": 7.02,
      "change_price": -0.07,
      "volume": 360122,
      "day_high_price": 7.11,
      "day_low_price": 6.985,
      "change_in_percent": "-0.987%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-29T00:00:00+1100",
      "close_price": 7.09,
      "change_price": 0.09,
      "volume": 474297,
      "day_high_price": 7.145,
      "day_low_price": 6.995,
      "change_in_percent": "1.286%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-28T00:00:00+1100",
      "close_price": 7,
      "change_price": 0.05,
      "volume": 747802,
      "day_high_price": 7.08,
      "day_low_price": 6.95,
      "change_in_percent": "0.719%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-23T00:00:00+1100",
      "close_price": 6.95,
      "change_price": 0.06,
      "volume": 278131,
      "day_high_price": 6.98,
      "day_low_price": 6.875,
      "change_in_percent": "0.871%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-22T00:00:00+1100",
      "close_price": 6.89,
      "change_price": 0.03,
      "volume": 439998,
      "day_high_price": 6.94,
      "day_low_price": 6.84,
      "change_in_percent": "0.437%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-21T00:00:00+1100",
      "close_price": 6.86,
      "change_price": 0.08,
      "volume": 446534,
      "day_high_price": 6.9,
      "day_low_price": 6.82,
      "change_in_percent": "1.18%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-20T00:00:00+1100",
      "close_price": 6.78,
      "change_price": 0,
      "volume": 490508,
      "day_high_price": 6.83,
      "day_low_price": 6.73,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-19T00:00:00+1100",
      "close_price": 6.78,
      "change_price": 0.02,
      "volume": 395272,
      "day_high_price": 6.84,
      "day_low_price": 6.74,
      "change_in_percent": "0.296%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-16T00:00:00+1100",
      "close_price": 6.76,
      "change_price": 0.09,
      "volume": 1884923,
      "day_high_price": 6.785,
      "day_low_price": 6.62,
      "change_in_percent": "1.349%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-15T00:00:00+1100",
      "close_price": 6.67,
      "change_price": 0.08,
      "volume": 1044886,
      "day_high_price": 6.77,
      "day_low_price": 6.65,
      "change_in_percent": "1.214%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-14T00:00:00+1100",
      "close_price": 6.59,
      "change_price": 0.13,
      "volume": 1066796,
      "day_high_price": 6.66,
      "day_low_price": 6.49,
      "change_in_percent": "2.012%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-13T00:00:00+1100",
      "close_price": 6.46,
      "change_price": 0.07,
      "volume": 499989,
      "day_high_price": 6.5,
      "day_low_price": 6.4,
      "change_in_percent": "1.095%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-12T00:00:00+1100",
      "close_price": 6.39,
      "change_price": -0.1,
      "volume": 620216,
      "day_high_price": 6.5,
      "day_low_price": 6.39,
      "change_in_percent": "-1.541%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-09T00:00:00+1100",
      "close_price": 6.49,
      "change_price": 0.06,
      "volume": 841965,
      "day_high_price": 6.49,
      "day_low_price": 6.43,
      "change_in_percent": "0.933%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-08T00:00:00+1100",
      "close_price": 6.43,
      "change_price": 0.2,
      "volume": 484499,
      "day_high_price": 6.44,
      "day_low_price": 6.26,
      "change_in_percent": "3.21%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-07T00:00:00+1100",
      "close_price": 6.23,
      "change_price": 0.04,
      "volume": 574884,
      "day_high_price": 6.25,
      "day_low_price": 6.115,
      "change_in_percent": "0.646%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-06T00:00:00+1100",
      "close_price": 6.19,
      "change_price": 0.02,
      "volume": 601803,
      "day_high_price": 6.25,
      "day_low_price": 6.19,
      "change_in_percent": "0.324%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-05T00:00:00+1100",
      "close_price": 6.17,
      "change_price": -0.13,
      "volume": 624669,
      "day_high_price": 6.35,
      "day_low_price": 6.15,
      "change_in_percent": "-2.063%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-02T00:00:00+1100",
      "close_price": 6.3,
      "change_price": 0.01,
      "volume": 624491,
      "day_high_price": 6.475,
      "day_low_price": 6.3,
      "change_in_percent": "0.159%"
    },
    {
      "code": "RFG",
      "close_date": "2016-12-01T00:00:00+1100",
      "close_price": 6.29,
      "change_price": 0.1,
      "volume": 842036,
      "day_high_price": 6.32,
      "day_low_price": 6.2,
      "change_in_percent": "1.616%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-30T00:00:00+1100",
      "close_price": 6.19,
      "change_price": -0.11,
      "volume": 912253,
      "day_high_price": 6.36,
      "day_low_price": 6.16,
      "change_in_percent": "-1.746%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-29T00:00:00+1100",
      "close_price": 6.3,
      "change_price": 0.01,
      "volume": 407533,
      "day_high_price": 6.32,
      "day_low_price": 6.24,
      "change_in_percent": "0.159%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-28T00:00:00+1100",
      "close_price": 6.29,
      "change_price": -0.01,
      "volume": 509542,
      "day_high_price": 6.34,
      "day_low_price": 6.29,
      "change_in_percent": "-0.159%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-25T00:00:00+1100",
      "close_price": 6.3,
      "change_price": -0.01,
      "volume": 440662,
      "day_high_price": 6.33,
      "day_low_price": 6.25,
      "change_in_percent": "-0.158%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-24T00:00:00+1100",
      "close_price": 6.31,
      "change_price": -0.02,
      "volume": 571618,
      "day_high_price": 6.45,
      "day_low_price": 6.3,
      "change_in_percent": "-0.316%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-23T00:00:00+1100",
      "close_price": 6.33,
      "change_price": 0.08,
      "volume": 610865,
      "day_high_price": 6.37,
      "day_low_price": 6.23,
      "change_in_percent": "1.28%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-22T00:00:00+1100",
      "close_price": 6.25,
      "change_price": 0.11,
      "volume": 444071,
      "day_high_price": 6.285,
      "day_low_price": 6.16,
      "change_in_percent": "1.792%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-21T00:00:00+1100",
      "close_price": 6.14,
      "change_price": 0.04,
      "volume": 462431,
      "day_high_price": 6.19,
      "day_low_price": 6.09,
      "change_in_percent": "0.656%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-18T00:00:00+1100",
      "close_price": 6.1,
      "change_price": -0.02,
      "volume": 779731,
      "day_high_price": 6.19,
      "day_low_price": 6.08,
      "change_in_percent": "-0.327%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-17T00:00:00+1100",
      "close_price": 6.12,
      "change_price": 0.02,
      "volume": 824730,
      "day_high_price": 6.19,
      "day_low_price": 6.06,
      "change_in_percent": "0.328%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-16T00:00:00+1100",
      "close_price": 6.1,
      "change_price": -0.31,
      "volume": 1637081,
      "day_high_price": 6.43,
      "day_low_price": 6.07,
      "change_in_percent": "-4.836%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-15T00:00:00+1100",
      "close_price": 6.41,
      "change_price": -0.03,
      "volume": 697595,
      "day_high_price": 6.63,
      "day_low_price": 6.4,
      "change_in_percent": "-0.466%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-14T00:00:00+1100",
      "close_price": 6.44,
      "change_price": -0.18,
      "volume": 521623,
      "day_high_price": 6.65,
      "day_low_price": 6.41,
      "change_in_percent": "-2.719%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-11T00:00:00+1100",
      "close_price": 6.62,
      "change_price": 0.03,
      "volume": 468015,
      "day_high_price": 6.65,
      "day_low_price": 6.55,
      "change_in_percent": "0.455%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-10T00:00:00+1100",
      "close_price": 6.59,
      "change_price": 0.18,
      "volume": 728551,
      "day_high_price": 6.7,
      "day_low_price": 6.57,
      "change_in_percent": "2.808%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-09T00:00:00+1100",
      "close_price": 6.41,
      "change_price": -0.18,
      "volume": 1032297,
      "day_high_price": 6.76,
      "day_low_price": 6.36,
      "change_in_percent": "-2.731%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-08T00:00:00+1100",
      "close_price": 6.59,
      "change_price": 0.18,
      "volume": 1012733,
      "day_high_price": 6.67,
      "day_low_price": 6.43,
      "change_in_percent": "2.808%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-07T00:00:00+1100",
      "close_price": 6.41,
      "change_price": -0.01,
      "volume": 737621,
      "day_high_price": 6.45,
      "day_low_price": 6.37,
      "change_in_percent": "-0.156%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-04T00:00:00+1100",
      "close_price": 6.42,
      "change_price": 0.04,
      "volume": 678526,
      "day_high_price": 6.48,
      "day_low_price": 6.38,
      "change_in_percent": "0.627%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-03T00:00:00+1100",
      "close_price": 6.38,
      "change_price": 0.01,
      "volume": 540902,
      "day_high_price": 6.455,
      "day_low_price": 6.28,
      "change_in_percent": "0.157%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-02T00:00:00+1100",
      "close_price": 6.37,
      "change_price": -0.39,
      "volume": 1104397,
      "day_high_price": 6.75,
      "day_low_price": 6.35,
      "change_in_percent": "-5.769%"
    },
    {
      "code": "RFG",
      "close_date": "2016-11-01T00:00:00+1100",
      "close_price": 6.76,
      "change_price": -0.01,
      "volume": 356328,
      "day_high_price": 6.8,
      "day_low_price": 6.7,
      "change_in_percent": "-0.148%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-31T00:00:00+1100",
      "close_price": 6.77,
      "change_price": 0.07,
      "volume": 441385,
      "day_high_price": 6.785,
      "day_low_price": 6.68,
      "change_in_percent": "1.045%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-28T00:00:00+1100",
      "close_price": 6.7,
      "change_price": -0.01,
      "volume": 583942,
      "day_high_price": 6.83,
      "day_low_price": 6.67,
      "change_in_percent": "-0.149%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-27T00:00:00+1100",
      "close_price": 6.71,
      "change_price": -0.01,
      "volume": 585095,
      "day_high_price": 6.785,
      "day_low_price": 6.68,
      "change_in_percent": "-0.149%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-26T00:00:00+1100",
      "close_price": 6.72,
      "change_price": -0.18,
      "volume": 644727,
      "day_high_price": 6.91,
      "day_low_price": 6.7,
      "change_in_percent": "-2.609%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-25T00:00:00+1100",
      "close_price": 6.9,
      "change_price": 0.13,
      "volume": 510404,
      "day_high_price": 6.92,
      "day_low_price": 6.74,
      "change_in_percent": "1.92%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-24T00:00:00+1100",
      "close_price": 6.77,
      "change_price": -0.03,
      "volume": 670585,
      "day_high_price": 6.81,
      "day_low_price": 6.72,
      "change_in_percent": "-0.441%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-21T00:00:00+1100",
      "close_price": 6.8,
      "change_price": 0.02,
      "volume": 589160,
      "day_high_price": 6.85,
      "day_low_price": 6.76,
      "change_in_percent": "0.295%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-20T00:00:00+1100",
      "close_price": 6.78,
      "change_price": -0.21,
      "volume": 693585,
      "day_high_price": 7,
      "day_low_price": 6.76,
      "change_in_percent": "-3.004%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-19T00:00:00+1100",
      "close_price": 6.99,
      "change_price": 0.16,
      "volume": 803701,
      "day_high_price": 7,
      "day_low_price": 6.83,
      "change_in_percent": "2.343%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-18T00:00:00+1100",
      "close_price": 6.83,
      "change_price": -0.04,
      "volume": 416864,
      "day_high_price": 6.93,
      "day_low_price": 6.83,
      "change_in_percent": "-0.582%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-17T00:00:00+1100",
      "close_price": 6.87,
      "change_price": -0.13,
      "volume": 550968,
      "day_high_price": 7,
      "day_low_price": 6.85,
      "change_in_percent": "-1.857%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-14T00:00:00+1100",
      "close_price": 7,
      "change_price": 0.13,
      "volume": 599117,
      "day_high_price": 7.01,
      "day_low_price": 6.85,
      "change_in_percent": "1.892%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-13T00:00:00+1100",
      "close_price": 6.87,
      "change_price": -0.08,
      "volume": 480449,
      "day_high_price": 7,
      "day_low_price": 6.83,
      "change_in_percent": "-1.151%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-12T00:00:00+1100",
      "close_price": 6.95,
      "change_price": 0.04,
      "volume": 589160,
      "day_high_price": 6.95,
      "day_low_price": 6.85,
      "change_in_percent": "0.579%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-11T00:00:00+1100",
      "close_price": 6.91,
      "change_price": 0.02,
      "volume": 627828,
      "day_high_price": 6.96,
      "day_low_price": 6.87,
      "change_in_percent": "0.29%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-10T00:00:00+1100",
      "close_price": 6.89,
      "change_price": 0.01,
      "volume": 552977,
      "day_high_price": 6.985,
      "day_low_price": 6.87,
      "change_in_percent": "0.145%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-07T00:00:00+1100",
      "close_price": 6.88,
      "change_price": -0.06,
      "volume": 1023632,
      "day_high_price": 6.93,
      "day_low_price": 6.86,
      "change_in_percent": "-0.865%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-06T00:00:00+1100",
      "close_price": 6.94,
      "change_price": -0.1,
      "volume": 982624,
      "day_high_price": 7.11,
      "day_low_price": 6.93,
      "change_in_percent": "-1.42%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-05T00:00:00+1100",
      "close_price": 7.04,
      "change_price": -0.06,
      "volume": 695949,
      "day_high_price": 7.15,
      "day_low_price": 7.03,
      "change_in_percent": "-0.845%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-04T00:00:00+1100",
      "close_price": 7.1,
      "change_price": -0.02,
      "volume": 862116,
      "day_high_price": 7.23,
      "day_low_price": 7.09,
      "change_in_percent": "-0.281%"
    },
    {
      "code": "RFG",
      "close_date": "2016-10-03T00:00:00+1100",
      "close_price": 7.12,
      "change_price": 0.15,
      "volume": 826667,
      "day_high_price": 7.22,
      "day_low_price": 7.02,
      "change_in_percent": "2.152%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-30T00:00:00+1000",
      "close_price": 6.97,
      "change_price": -0.14,
      "volume": 833391,
      "day_high_price": 7.11,
      "day_low_price": 6.945,
      "change_in_percent": "-1.969%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-29T00:00:00+1000",
      "close_price": 7.11,
      "change_price": -0.15,
      "volume": 1380075,
      "day_high_price": 7.21,
      "day_low_price": 6.92,
      "change_in_percent": "-2.066%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-28T00:00:00+1000",
      "close_price": 7.26,
      "change_price": -0.07,
      "volume": 616587,
      "day_high_price": 7.35,
      "day_low_price": 7.185,
      "change_in_percent": "-0.955%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-27T00:00:00+1000",
      "close_price": 7.33,
      "change_price": 0,
      "volume": 687001,
      "day_high_price": 7.35,
      "day_low_price": 7.27,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-26T00:00:00+1000",
      "close_price": 7.33,
      "change_price": 0.05,
      "volume": 498577,
      "day_high_price": 7.37,
      "day_low_price": 7.29,
      "change_in_percent": "0.687%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-23T00:00:00+1000",
      "close_price": 7.28,
      "change_price": 0.08,
      "volume": 964208,
      "day_high_price": 7.28,
      "day_low_price": 7.15,
      "change_in_percent": "1.111%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-22T00:00:00+1000",
      "close_price": 7.2,
      "change_price": 0.16,
      "volume": 897571,
      "day_high_price": 7.2,
      "day_low_price": 7.07,
      "change_in_percent": "2.273%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-21T00:00:00+1000",
      "close_price": 7.04,
      "change_price": 0.14,
      "volume": 624253,
      "day_high_price": 7.05,
      "day_low_price": 6.92,
      "change_in_percent": "2.029%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-20T00:00:00+1000",
      "close_price": 6.9,
      "change_price": -0.09,
      "volume": 693157,
      "day_high_price": 7,
      "day_low_price": 6.87,
      "change_in_percent": "-1.288%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-19T00:00:00+1000",
      "close_price": 6.99,
      "change_price": -0.01,
      "volume": 145304,
      "day_high_price": 7.03,
      "day_low_price": 6.95,
      "change_in_percent": "-0.143%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-16T00:00:00+1000",
      "close_price": 7,
      "change_price": 0.12,
      "volume": 1625431,
      "day_high_price": 7.07,
      "day_low_price": 6.89,
      "change_in_percent": "1.744%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-15T00:00:00+1000",
      "close_price": 6.88,
      "change_price": -0.01,
      "volume": 823100,
      "day_high_price": 6.93,
      "day_low_price": 6.8,
      "change_in_percent": "-0.145%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-14T00:00:00+1000",
      "close_price": 6.89,
      "change_price": 0.12,
      "volume": 901266,
      "day_high_price": 6.9,
      "day_low_price": 6.77,
      "change_in_percent": "1.773%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-13T00:00:00+1000",
      "close_price": 6.77,
      "change_price": 0.22,
      "volume": 806422,
      "day_high_price": 6.81,
      "day_low_price": 6.65,
      "change_in_percent": "3.359%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-12T00:00:00+1000",
      "close_price": 6.55,
      "change_price": -0.23,
      "volume": 824897,
      "day_high_price": 6.7,
      "day_low_price": 6.51,
      "change_in_percent": "-3.392%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-09T00:00:00+1000",
      "close_price": 6.78,
      "change_price": -0.16,
      "volume": 1043754,
      "day_high_price": 6.88,
      "day_low_price": 6.65,
      "change_in_percent": "-2.305%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-08T00:00:00+1000",
      "close_price": 6.94,
      "change_price": -0.08,
      "volume": 1084664,
      "day_high_price": 7.1,
      "day_low_price": 6.91,
      "change_in_percent": "-1.14%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-07T00:00:00+1000",
      "close_price": 7.02,
      "change_price": 0.13,
      "volume": 1227534,
      "day_high_price": 7.17,
      "day_low_price": 6.89,
      "change_in_percent": "1.887%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-06T00:00:00+1000",
      "close_price": 6.89,
      "change_price": 0.06,
      "volume": 855890,
      "day_high_price": 6.94,
      "day_low_price": 6.82,
      "change_in_percent": "0.878%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-05T00:00:00+1000",
      "close_price": 6.83,
      "change_price": 0,
      "volume": 676836,
      "day_high_price": 6.92,
      "day_low_price": 6.77,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-02T00:00:00+1000",
      "close_price": 6.83,
      "change_price": 0.05,
      "volume": 812081,
      "day_high_price": 6.87,
      "day_low_price": 6.73,
      "change_in_percent": "0.737%"
    },
    {
      "code": "RFG",
      "close_date": "2016-09-01T00:00:00+1000",
      "close_price": 6.78,
      "change_price": -0.09,
      "volume": 952764,
      "day_high_price": 6.92,
      "day_low_price": 6.76,
      "change_in_percent": "-1.31%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-31T00:00:00+1000",
      "close_price": 6.87,
      "change_price": 0.16,
      "volume": 1291060,
      "day_high_price": 7.04,
      "day_low_price": 6.76,
      "change_in_percent": "2.385%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-30T00:00:00+1000",
      "close_price": 6.71,
      "change_price": 0.13,
      "volume": 865391,
      "day_high_price": 6.84,
      "day_low_price": 6.56,
      "change_in_percent": "1.976%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-29T00:00:00+1000",
      "close_price": 6.58,
      "change_price": -0.03,
      "volume": 1052556,
      "day_high_price": 6.63,
      "day_low_price": 6.42,
      "change_in_percent": "-0.454%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-26T00:00:00+1000",
      "close_price": 6.61,
      "change_price": 0.19,
      "volume": 1302339,
      "day_high_price": 6.72,
      "day_low_price": 6.48,
      "change_in_percent": "2.96%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-25T00:00:00+1000",
      "close_price": 6.42,
      "change_price": 0.45,
      "volume": 2460300,
      "day_high_price": 6.62,
      "day_low_price": 6.09,
      "change_in_percent": "7.538%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-24T00:00:00+1000",
      "close_price": 5.97,
      "change_price": -0.01,
      "volume": 295117,
      "day_high_price": 5.99,
      "day_low_price": 5.95,
      "change_in_percent": "-0.167%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-23T00:00:00+1000",
      "close_price": 5.98,
      "change_price": 0.01,
      "volume": 492096,
      "day_high_price": 6,
      "day_low_price": 5.96,
      "change_in_percent": "0.168%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-22T00:00:00+1000",
      "close_price": 5.97,
      "change_price": 0.01,
      "volume": 506726,
      "day_high_price": 6,
      "day_low_price": 5.95,
      "change_in_percent": "0.168%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-19T00:00:00+1000",
      "close_price": 5.96,
      "change_price": 0.1,
      "volume": 703150,
      "day_high_price": 5.98,
      "day_low_price": 5.86,
      "change_in_percent": "1.706%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-18T00:00:00+1000",
      "close_price": 5.86,
      "change_price": -0.04,
      "volume": 550954,
      "day_high_price": 5.93,
      "day_low_price": 5.86,
      "change_in_percent": "-0.678%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-17T00:00:00+1000",
      "close_price": 5.9,
      "change_price": 0.06,
      "volume": 549970,
      "day_high_price": 5.9,
      "day_low_price": 5.85,
      "change_in_percent": "1.027%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-16T00:00:00+1000",
      "close_price": 5.84,
      "change_price": -0.02,
      "volume": 324221,
      "day_high_price": 5.87,
      "day_low_price": 5.84,
      "change_in_percent": "-0.341%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-15T00:00:00+1000",
      "close_price": 5.86,
      "change_price": 0.01,
      "volume": 319473,
      "day_high_price": 5.88,
      "day_low_price": 5.83,
      "change_in_percent": "0.171%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-12T00:00:00+1000",
      "close_price": 5.85,
      "change_price": 0.05,
      "volume": 521114,
      "day_high_price": 5.87,
      "day_low_price": 5.8,
      "change_in_percent": "0.862%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-11T00:00:00+1000",
      "close_price": 5.8,
      "change_price": -0.02,
      "volume": 352607,
      "day_high_price": 5.86,
      "day_low_price": 5.785,
      "change_in_percent": "-0.344%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-10T00:00:00+1000",
      "close_price": 5.82,
      "change_price": 0.04,
      "volume": 432897,
      "day_high_price": 5.86,
      "day_low_price": 5.75,
      "change_in_percent": "0.692%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-09T00:00:00+1000",
      "close_price": 5.78,
      "change_price": -0.09,
      "volume": 352288,
      "day_high_price": 5.87,
      "day_low_price": 5.76,
      "change_in_percent": "-1.533%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-08T00:00:00+1000",
      "close_price": 5.87,
      "change_price": 0.02,
      "volume": 488056,
      "day_high_price": 5.9,
      "day_low_price": 5.86,
      "change_in_percent": "0.342%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-05T00:00:00+1000",
      "close_price": 5.85,
      "change_price": 0.07,
      "volume": 550399,
      "day_high_price": 5.89,
      "day_low_price": 5.8,
      "change_in_percent": "1.211%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-04T00:00:00+1000",
      "close_price": 5.78,
      "change_price": 0.02,
      "volume": 509016,
      "day_high_price": 5.865,
      "day_low_price": 5.78,
      "change_in_percent": "0.347%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-03T00:00:00+1000",
      "close_price": 5.76,
      "change_price": -0.1,
      "volume": 510345,
      "day_high_price": 5.87,
      "day_low_price": 5.75,
      "change_in_percent": "-1.706%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-02T00:00:00+1000",
      "close_price": 5.86,
      "change_price": 0.03,
      "volume": 370462,
      "day_high_price": 5.9,
      "day_low_price": 5.82,
      "change_in_percent": "0.515%"
    },
    {
      "code": "RFG",
      "close_date": "2016-08-01T00:00:00+1000",
      "close_price": 5.83,
      "change_price": 0.06,
      "volume": 479124,
      "day_high_price": 5.85,
      "day_low_price": 5.79,
      "change_in_percent": "1.04%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-29T00:00:00+1000",
      "close_price": 5.77,
      "change_price": -0.01,
      "volume": 396452,
      "day_high_price": 5.81,
      "day_low_price": 5.74,
      "change_in_percent": "-0.173%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-28T00:00:00+1000",
      "close_price": 5.78,
      "change_price": 0.06,
      "volume": 429230,
      "day_high_price": 5.82,
      "day_low_price": 5.74,
      "change_in_percent": "1.049%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-27T00:00:00+1000",
      "close_price": 5.72,
      "change_price": 0.04,
      "volume": 471029,
      "day_high_price": 5.74,
      "day_low_price": 5.67,
      "change_in_percent": "0.704%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-26T00:00:00+1000",
      "close_price": 5.68,
      "change_price": -0.01,
      "volume": 513723,
      "day_high_price": 5.7,
      "day_low_price": 5.655,
      "change_in_percent": "-0.176%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-25T00:00:00+1000",
      "close_price": 5.69,
      "change_price": -0.03,
      "volume": 646651,
      "day_high_price": 5.77,
      "day_low_price": 5.66,
      "change_in_percent": "-0.524%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-22T00:00:00+1000",
      "close_price": 5.72,
      "change_price": -0.05,
      "volume": 197088,
      "day_high_price": 5.77,
      "day_low_price": 5.72,
      "change_in_percent": "-0.867%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-21T00:00:00+1000",
      "close_price": 5.77,
      "change_price": -0.01,
      "volume": 617376,
      "day_high_price": 5.81,
      "day_low_price": 5.76,
      "change_in_percent": "-0.173%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-20T00:00:00+1000",
      "close_price": 5.78,
      "change_price": 0.06,
      "volume": 440793,
      "day_high_price": 5.84,
      "day_low_price": 5.73,
      "change_in_percent": "1.049%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-19T00:00:00+1000",
      "close_price": 5.72,
      "change_price": 0.05,
      "volume": 418945,
      "day_high_price": 5.72,
      "day_low_price": 5.67,
      "change_in_percent": "0.882%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-18T00:00:00+1000",
      "close_price": 5.67,
      "change_price": 0.07,
      "volume": 636767,
      "day_high_price": 5.695,
      "day_low_price": 5.58,
      "change_in_percent": "1.25%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-15T00:00:00+1000",
      "close_price": 5.6,
      "change_price": -0.01,
      "volume": 318940,
      "day_high_price": 5.63,
      "day_low_price": 5.58,
      "change_in_percent": "-0.178%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-14T00:00:00+1000",
      "close_price": 5.61,
      "change_price": 0.02,
      "volume": 330779,
      "day_high_price": 5.64,
      "day_low_price": 5.56,
      "change_in_percent": "0.358%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-13T00:00:00+1000",
      "close_price": 5.59,
      "change_price": 0.1,
      "volume": 718505,
      "day_high_price": 5.68,
      "day_low_price": 5.52,
      "change_in_percent": "1.821%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-12T00:00:00+1000",
      "close_price": 5.49,
      "change_price": -0.01,
      "volume": 823016,
      "day_high_price": 5.57,
      "day_low_price": 5.49,
      "change_in_percent": "-0.182%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-11T00:00:00+1000",
      "close_price": 5.5,
      "change_price": 0.02,
      "volume": 875714,
      "day_high_price": 5.52,
      "day_low_price": 5.48,
      "change_in_percent": "0.365%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-08T00:00:00+1000",
      "close_price": 5.48,
      "change_price": 0,
      "volume": 351602,
      "day_high_price": 5.5,
      "day_low_price": 5.45,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-07T00:00:00+1000",
      "close_price": 5.48,
      "change_price": 0.03,
      "volume": 507159,
      "day_high_price": 5.52,
      "day_low_price": 5.48,
      "change_in_percent": "0.55%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-06T00:00:00+1000",
      "close_price": 5.45,
      "change_price": -0.09,
      "volume": 530496,
      "day_high_price": 5.57,
      "day_low_price": 5.43,
      "change_in_percent": "-1.625%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-05T00:00:00+1000",
      "close_price": 5.54,
      "change_price": -0.04,
      "volume": 326981,
      "day_high_price": 5.59,
      "day_low_price": 5.51,
      "change_in_percent": "-0.717%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-04T00:00:00+1000",
      "close_price": 5.58,
      "change_price": 0,
      "volume": 463168,
      "day_high_price": 5.6,
      "day_low_price": 5.52,
      "change_in_percent": "0%"
    },
    {
      "code": "RFG",
      "close_date": "2016-07-01T00:00:00+1000",
      "close_price": 5.58,
      "change_price": 0.05,
      "volume": 472495,
      "day_high_price": 5.635,
      "day_low_price": 5.54,
      "change_in_percent": "0.904%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-30T00:00:00+1000",
      "close_price": 5.53,
      "change_price": 0.18,
      "volume": 409465,
      "day_high_price": 5.545,
      "day_low_price": 5.41,
      "change_in_percent": "3.364%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-29T00:00:00+1000",
      "close_price": 5.35,
      "change_price": 0.1,
      "volume": 534522,
      "day_high_price": 5.43,
      "day_low_price": 5.33,
      "change_in_percent": "1.905%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-28T00:00:00+1000",
      "close_price": 5.25,
      "change_price": -0.13,
      "volume": 864405,
      "day_high_price": 5.4,
      "day_low_price": 5.25,
      "change_in_percent": "-2.416%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-27T00:00:00+1000",
      "close_price": 5.38,
      "change_price": 0.05,
      "volume": 767849,
      "day_high_price": 5.49,
      "day_low_price": 5.33,
      "change_in_percent": "0.938%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-24T00:00:00+1000",
      "close_price": 5.33,
      "change_price": -0.2,
      "volume": 932989,
      "day_high_price": 5.59,
      "day_low_price": 5.3,
      "change_in_percent": "-3.617%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-23T00:00:00+1000",
      "close_price": 5.53,
      "change_price": 0.02,
      "volume": 208120,
      "day_high_price": 5.54,
      "day_low_price": 5.49,
      "change_in_percent": "0.363%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-22T00:00:00+1000",
      "close_price": 5.51,
      "change_price": 0.01,
      "volume": 475104,
      "day_high_price": 5.58,
      "day_low_price": 5.48,
      "change_in_percent": "0.182%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-21T00:00:00+1000",
      "close_price": 5.5,
      "change_price": 0.06,
      "volume": 309364,
      "day_high_price": 5.54,
      "day_low_price": 5.42,
      "change_in_percent": "1.103%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-20T00:00:00+1000",
      "close_price": 5.44,
      "change_price": 0.09,
      "volume": 486595,
      "day_high_price": 5.49,
      "day_low_price": 5.38,
      "change_in_percent": "1.682%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-17T00:00:00+1000",
      "close_price": 5.35,
      "change_price": -0.05,
      "volume": 680432,
      "day_high_price": 5.47,
      "day_low_price": 5.35,
      "change_in_percent": "-0.926%"
    },
    {
      "code": "RFG",
      "close_date": "2016-06-16T00:00:00+1000",
      "close_price": 5.4,
      "change_price": -0.01,
      "volume": 668078,
      "day_high_price": 5.57,
      "day_low_price": 5.4,
      "change_in_percent": "-0.185%"
    }
  ]
};