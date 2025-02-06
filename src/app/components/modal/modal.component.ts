import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MealsAPIService } from '../../services/meals-api.service';
import { MealDetails } from '../../interfaces/meal-details';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(private api: MealsAPIService) { }

  @Input() mealID!: number;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<number>();
  mealDetails!: any;
  mealIngredients: { ingredient: string, measure: string }[] = [];


  ngOnInit(): void {
    this.getMealDetails(this.mealID);
  }

  getMealDetails(mealID: number) {
    this.api.getMealDetails(mealID).subscribe({
      next: (res) => {
        this.mealDetails = res.meals[0];
        this.getIngredients();
        console.log(this.mealDetails);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getIngredients() {
    for (let i = 1; i <= 20; i++) {
      const ingredient = this.mealDetails[`strIngredient${i}`];
      const measurement = this.mealDetails[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        this.mealIngredients.push({ ingredient, measure: measurement?.trim() || "" });
      }
    }
  }

  closeModal() {
    this.close.emit(-1);
  }
}
