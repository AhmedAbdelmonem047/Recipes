import { Component, Input } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(private flowbiteService: FlowbiteService) { }
  
  @Input(({ required: true })) mealImgSrc!: string;
  @Input(({ required: true })) mealName!: string;
  @Input() mealArea: string = "";
}
