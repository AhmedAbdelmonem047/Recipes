import { FlowbiteService } from './../../services/flowbite.service';
import { CategoriesList } from './../../interfaces/categories-list';
import { MealsAPIService } from './../../services/meals-api.service';
import { Component, EventEmitter, Output } from '@angular/core';;

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private api: MealsAPIService, private flowbiteService: FlowbiteService) { }

  @Output() categorySelected = new EventEmitter<string>();

  categoryList: CategoriesList[] = [];
  activeIndex: number = -1;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.api.getCategories().subscribe({
      next: (res) => {
        this.categoryList = res.meals;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCatName(index: number) {
    let name: string = "";
    if (this.activeIndex == -1)
      name = "All";
    else
      name = this.categoryList[this.activeIndex].strCategory;
    return name
  }

  toggleClass(index: number) {
    console.log('Clicked index:', index);
    this.activeIndex = index;
    this.categorySelected.emit(this.getCatName(this.activeIndex));
  }

  selectAllCategories() {
    console.log('All Categories clicked');
    this.activeIndex = -1;
    this.categorySelected.emit(this.getCatName(this.activeIndex));
  }

  onSelectChange(event: Event) {
    this.activeIndex = Number((event.target as HTMLSelectElement).value);
    console.log('Selected index:', this.activeIndex);
    this.categorySelected.emit(this.getCatName(this.activeIndex));
  }
}
