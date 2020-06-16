import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrderService } from './order.service';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

  isRoot: boolean;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;

  constructor(
   private router: Router,
   private order: OrderService
  ) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(
      event => {
        if ( event instanceof NavigationEnd ) {
          this.isRoot = this.router.url === '/order';
        }
      }
    );
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal( this.modalRef );
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  open() {
    this.modal.open();
  }
  cancel() {
    this.modal.close();
  }
  submit(){
    this.modal.close();
  }
}
