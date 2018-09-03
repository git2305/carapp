import { tab2 } from './tab2/tab2';
import { tab1 } from './tab1/tab1';
import { Component } from "@angular/core";


@Component({
  templateUrl: 'searchOption.html'
})
export class SearchOptionPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = tab1;
  tab2Root: any = tab2;

}