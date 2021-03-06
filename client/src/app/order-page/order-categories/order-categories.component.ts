import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private categriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categriesService.fetch();
  }

}
