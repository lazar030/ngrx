import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-expand-map-switch',
  templateUrl: './expand-map-switch.component.html',
  styleUrls: ['./expand-map-switch.component.scss']
})
export class ExpandMapSwitchComponent implements OnInit {
  @Output() toggle = new EventEmitter<null>();

  constructor() {}

  ngOnInit() {}

  onToggle() {
    this.toggle.emit();
  }

}
