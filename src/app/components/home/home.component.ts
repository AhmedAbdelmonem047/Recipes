import { Component } from '@angular/core';
import { MealsAPIService } from '../../services/meals-api.service';
import { AllMealsList } from '../../interfaces/all-meals-list';
import { CategoriesList } from '../../interfaces/categories-list';
import { CategoryMealsList } from '../../interfaces/category-meals-list';
import { CategoriesComponent } from "../categories/categories.component";
import { CardComponent } from "../card/card.component";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-home',
  imports: [CategoriesComponent, CardComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private api: MealsAPIService) { }

  allMealsList: AllMealsList[] = [];
  categoryList: CategoriesList[] = [];
  categoryMealList: CategoryMealsList[] = [];
  selectedCategory: string = "All";
  selectedID:number = -1;

  ngOnInit(): void {
    this.getAllMeals()
  }

  onCategoryChange(catName: string) {
    console.log('Received category catName from child:', catName);
    this.selectedCategory = catName;
    if (catName == "All")
      this.getAllMeals()
    else
      this.getCatMeals(catName);
  }

  getSelectedID(ID: number) {
    this.selectedID = ID;
    console.log(this.selectedID);
    
  }

  getAllMeals() {
    this.api.getAllMeals().subscribe({
      next: (res) => {
        this.allMealsList = res.meals;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCatMeals(query: string) {
    this.api.getCatMeals(query).subscribe({
      next: (res) => {
        this.categoryMealList = res.meals;        
        console.log(this.categoryMealList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
