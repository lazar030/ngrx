import { Injectable } from '@angular/core';
import 'rxjs/add/operator/publishLast';
import { HttpClient } from '@angular/common/http';
import * as SelectionActions from '../../store/actions/selection.actions';

@Injectable()
export class ListService {
  private readonly baseUrl = 'https://app.smartapartmentdata.com/List/json';
  // private subscription$: BehaviorSubject<any> = new BehaviorSubject(null);
  private isDirty: boolean;
  private data: any;
  private listID: number;
  private token: string;
  private receipt = undefined;

  get IsReady(): boolean {
    return this.data;
  }

  get ListID(): number {
    return this.listID;
  }

  get Token(): string {
    return this.token;
  }

  get Records(): Array<object> {
    return this.data.records;
  }

  get AgentInfo(): object {
    return this.data.agentInfo;
  }

  // this is a finite observable so we do not need to worry about unsubscribe
  // get subscription(): Observable<any> {
  //   return this.subscription$.asObservable();
  // }

  constructor(private http: HttpClient) {}

  public toggleFavorite(propertyID: number, isFavorite: boolean) {
    if (isFavorite) {
      SelectionActions.favorite({ propertyID });
    } else {
      SelectionActions.unfavorite({ propertyID });
    }

    this.isDirty = true;

    const payload = {
      listID: this.listID,
      token: this.token,
      propertyID: propertyID,
      isFavorite: isFavorite,
    };

    return this.http.post(
      `${this.baseUrl}/updateListItem.aspx`,
      JSON.stringify(payload)
    );
  }

  // public publish(data: Array<object>) {
  //   this.subscription$.next(data);
  // }

  public load(listID: number, token: string, receipt?: string) {
    this.listID = listID;
    this.token = token;
    if (receipt) this.receipt = receipt;

    if (this.data && !this.isDirty) {
      //this.data = this.subscription$.getValue();
      return;
    }

    return this.http
      .get(
        `${this.baseUrl}/listItems.aspx?listID=${this.listID}&token=${this.token}&receipt=${this.receipt}`
      )
      .publishLast()
      .refCount();
  }
}
