import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-locator-item',
  templateUrl: './locator-item.component.html',
  styleUrls: ['./locator-item.component.scss']
})
export class LocatorItemComponent implements OnInit {
  @Input() dataItem;

  constructor() { }

  ngOnInit(): void {
  }

}
