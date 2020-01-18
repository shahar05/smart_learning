import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent implements OnInit {
  @Input() max: number = 5;
  @Input() rating: number;
  barsAmount:number[] =[];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.max; i++) {
        this.barsAmount.push(i);
    }
  }

}
