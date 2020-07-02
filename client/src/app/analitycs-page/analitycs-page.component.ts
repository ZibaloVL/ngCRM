import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticPage } from '../shared/interfaces';
import { Subscription } from 'rxjs';

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
    this.aSub = this.service.getAnalytics()
      .subscribe( (data: AnalyticPage) => {
        this.average = data.average;
        this.pending = false;
      });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
