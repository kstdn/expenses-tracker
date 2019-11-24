import { Injectable } from '@angular/core';
import { Portal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  portal: Portal<any>;

  constructor() { }
}
