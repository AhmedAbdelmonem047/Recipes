import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { MealsAPIService } from '../../services/meals-api.service';
import { MealDetails } from '../../interfaces/meal-details';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(private api: MealsAPIService) { }

  @Input(({ required: true })) mealID!: number;
  @Input(({ required: true })) mealImgSrc!: string;
  @Input(({ required: true })) mealName!: string;
  @Input() mealArea: string = "";
  @Output() clickedBtn = new EventEmitter<boolean>();

  mealDetails!: MealDetails;

  ngOnInit(): void {
    initFlowbite();
  }

  getMealDetails(mealID: number) {
    this.api.getMealDetails(mealID).subscribe({
      next: (res) => {
        this.mealDetails = res.meals[0];
        console.log(this.mealDetails);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
