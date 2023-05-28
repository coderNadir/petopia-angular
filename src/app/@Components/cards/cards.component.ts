import { Component, OnInit, Sanitizer } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  constructor(public cardsService: CardsService) {}

  ngOnInit(): void {}
}
