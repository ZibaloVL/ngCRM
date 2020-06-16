import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Position } from 'src/app/shared/interfaces';

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
  form: FormGroup;
  positionId = null;

  constructor(
    private positionsService: PositionsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      cost: new FormControl( null , [ Validators.required, Validators.min(1)])
    });
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
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    MaterialService.updateTextInputs();
    this.modal.open();
  }
  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: '',
      cost: 1
    });
    MaterialService.updateTextInputs();
    this.modal.open();
  }
  onCansel() {
    this.modal.close();
  }
  onSubmit() {
    this.form.disable();
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId

    };
    if ( this.positionId ) {
      newPosition._id = this.positionId;
      this.positionsService.update( newPosition )
      .subscribe( position => {
        const indx =  this.positions.findIndex( p => p._id === this.positionId);
        this.positions[ indx ] = position;
        MaterialService.toast('позиция изменена');
      },
      error => MaterialService.toast( error.error.message),
      () => {
        this.modal.close();
        this.form.reset({name: '', cost: 1} );
        this.form.enable();
      }
    );

    } else {
      this.positionsService.create( newPosition )
      .subscribe( pos => {
          MaterialService.toast('позиция создана');
          this.positions.push( pos );
        },
        error => MaterialService.toast( error.error.message),
        () => {
          this.modal.close();
          this.form.reset({name: '', cost: 1} );
          this.form.enable();
        }
      );
    }
  }

  onDeletePosition( event: Event, position: Position) {
    event.stopPropagation();
    const destroy = window.confirm( `Вы действительно хотите удалить ${position.name}?`);
    if ( destroy ) {
      this.positionsService.delete(position)
    .subscribe(
      mess => {
        const indx = this.positions.findIndex( pos => pos._id === position._id);
        this.positions.splice( indx, 1 );
        MaterialService.toast('позиция удалена');
      },
      error => MaterialService.toast( error.error.message)
    );
    }
   }
}
