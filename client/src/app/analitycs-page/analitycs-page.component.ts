import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticPage } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analitycs-page',
  templateUrl: './analitycs-page.component.html',
  styleUrls: ['./analitycs-page.component.scss']
})
export class AnalitycsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild( 'gain' ) gainRef: ElementRef;
  @ViewChild( 'order' ) orderRef: ElementRef;

  private aSub: Subscription;

  public average: number;
  pending = true;

  constructor(
    private service: AnalyticsService
  ) { }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    };
    const orderConfig: any = {
      label: 'Заказ',
      color: 'rgb(200, 99, 132)'
    };
    this.aSub = this.service.getAnalytics()
      .subscribe( (data: AnalyticPage) => {
        this.average = data.average;
        gainConfig.labels = data.chart.map( item => item.label );
        gainConfig.data = data.chart.map ( item => item.gain );
        const gainCtx = this.gainRef.nativeElement.getContext('2d');
        gainCtx.canvas.height = '300px';
        // tslint:disable-next-line:no-unused-expression
        new Chart( gainCtx, createChartConfig(gainConfig));

        orderConfig.labels = data.chart.map( item => item.label );
        orderConfig.data = data.chart.map ( item => item.gain );
        const orderCtx = this.orderRef.nativeElement.getContext('2d');
        orderCtx.canvas.height = '300px';
        // tslint:disable-next-line:no-unused-expression
        new Chart( orderCtx, createChartConfig(orderConfig));

        this.pending = false;
      });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}

function createChartConfig({ label, color, labels, data }) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}
