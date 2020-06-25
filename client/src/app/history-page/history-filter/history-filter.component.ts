import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

import { Filter } from 'src/app/shared/interfaces';
import { MaterialService, MaterialDatepicker } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  order: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.start =  MaterialService.initDatepicer(
      this.startRef, this.validate.bind(this)
    );
    this.end =  MaterialService.initDatepicer(
      this.endRef, this.validate.bind(this)
    );
  }

  validate() {}

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();
  }

  submitFilter() {
    const filter: Filter = {};

    if ( this.order ) {
      filter.order = this.order;
    }

    this.onFilter.emit( filter );
  }
}
