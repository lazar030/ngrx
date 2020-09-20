import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/interfaces/IAppState';

@Component({
  selector: 'app-tip-service',
  templateUrl: './tip-service.component.html',
  styleUrls: ['./tip-service.component.scss'],
})
export class TipServiceComponent implements OnInit {
  list$;
  agentName;
  agentCompany;
  splash;

  @Output() close = new EventEmitter();

  constructor(private store: Store<AppState>) {}

  ngOnDestroy() {
    this.list$.unsubscribe();
  }

  ngOnInit() {
    this.store.select('resultsState').subscribe((data: any) => {
      if (!data) return;

      this.agentCompany = data.agentInfo.company;
      this.agentName = data.agentInfo.firstname + ' ' + data.agentInfo.lastname;
      this.splash = data.agentInfo.splashMessage;
    });
  }

  onClose() {
    this.close.emit();
  }
}
