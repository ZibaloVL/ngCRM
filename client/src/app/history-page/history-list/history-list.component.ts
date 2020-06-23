import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() orders: Order[];
  @ViewChild('modal') modalRef: ElementRef;

  modal: MaterialInstance;
  selectedOrder: Order;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(){
    this.modal.destroy();
  }

  closeModal() {
    this.modal.close();
  }

  computerPrice( order: Order ): number {
    return order.list.reduce(( total, item ) => {
      return total += item.cost * item.quantity;
    }, 0 );
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.modal.open();
  }

}
