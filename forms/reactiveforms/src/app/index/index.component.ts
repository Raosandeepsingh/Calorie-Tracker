import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  selectTab: number = 2;
  constructor() { }

  ngOnInit(): void { }
  image: string = 'assets/images/bg.jpg'
}
