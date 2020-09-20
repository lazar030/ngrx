import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-map-switch',
  templateUrl: './map-switch.component.html',
  styleUrls: ['./map-switch.component.scss'],
})
export class MapSwitchComponent implements OnInit {
  @Input() toggleState = false;
  @Input() image = '';
  @Input() size = 22;
  @Input() width = 42;
  @Output() toggle = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  onToggle() {
    this.toggleState = !this.toggleState;
    this.toggle.emit(this.toggleState);
  }
}
