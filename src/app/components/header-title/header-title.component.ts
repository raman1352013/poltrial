import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.css']
})
export class HeaderTitleComponent implements OnInit {
  @Input() headerTitle: any;

  constructor() {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
  }

}
