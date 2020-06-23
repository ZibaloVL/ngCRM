import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrdersService } from '../shared/services/orders.service';
import { Order } from '../shared/interfaces';
import { Subscription } from 'rxjs';


const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  public isFilterVisible = false;
  loading = false;
  reloading = false;
  noMoreOrders = false;

  orders: Order[] = [];

  offset = 0;
  limit = STEP;
  oSub: Subscription;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    };
    this.oSub = this.ordersService.fetch( params )
      .subscribe( (orders) => {
        this.orders = this.orders.concat( orders );
        this.noMoreOrders = orders.length  < STEP;
        if (this.noMoreOrders){
          MaterialService.toast( 'показаны все заказы' );
        }
        this.loading = false;
        this.reloading = false;
      })
    ;
  }

  loadMore() {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initToltip( this.tooltipRef );
  }
  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.oSub.unsubscribe();
  }

}
