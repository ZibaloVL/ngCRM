import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef;
  isNew = true;
  form: FormGroup;
  image: File;
  imagePreview = null;

  category: Category;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup ( {
      name: new FormControl( null, Validators.required )
    });
    // this.form.disable();
    this.route.params
      .pipe(
        switchMap(
          ( params: Params ) => {
            if (params.id) {
              this.isNew = false;
              return this.categoriesService.getById(params.id);
            }
            return of( null );
          }
        )
      )
      .subscribe(
        (category: Category ) => {
          if ( category ) {
            this.category = category;
            this.form.patchValue( {
              name: category.name
            } );
            this.imagePreview = category.imageSrc;
            MaterialService.updateTextInputs();
            // this.form.enable();
          }
        },
        error => MaterialService.toast( error.error.message )
      );
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload( event: any ) {
    const file = (event.target).files[0];
    this.image = file;
    const reader = new FileReader(); //  разобраться с этим классом
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.form.disable();
    let obs$;
    if (this.isNew) {
      // create
      obs$ = this.categoriesService.create( this.form.value.name, this.image );
    } else {
      // update
      console.log( 'update' );
      obs$ = this.categoriesService.update( this.category._id, this.form.value.name, this.image );
    }

    obs$.subscribe(
      category => {
        this.form.enable();
        MaterialService.toast( 'Данные сохранены' );
      },
      error => {
        this.form.enable();
        MaterialService.toast( error.error.message );
      }
    );
  }

  deleteCategory() {
    const decision = window.confirm(
      `Вы уверены, что хотите удалить категорию ${this.category.name}?`
    );
    if ( decision ) {
      this.categoriesService.delete( this.category._id )
        .subscribe(
          response => MaterialService.toast(response.message ),
          error => MaterialService.toast( error.error.message ),
          () => this.router.navigate(['/categories'])
        );
    }
  }
}
