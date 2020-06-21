import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  public isFilterVisible = false;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initToltip( this.tooltipRef );
  }
  ngOnDestroy(): void {
    this.tooltip.destroy();
  }

}
