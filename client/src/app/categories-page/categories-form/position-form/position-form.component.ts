import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('categoryId') categoryId: string;
  positions: Position[] = [];
  loading = false;
  @ViewChild ('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  constructor(
    private positionsService: PositionsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.positionsService.fetch( this.categoryId )
      .subscribe ( positions => {
        this.positions = positions;
        this.loading = false;
      });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal( this.modalRef );
  }
  ngOnDestroy() {
    this.modal.destroy();
  }
  onSelectPosition( position: Position ) {
    this.modal.open();
  }
  onAddPosition() {
    this.modal.open();
  }
  onCansel() {
    this.modal.close();
  }
}
