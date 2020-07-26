import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() Title: string;
  @Input() Menu: boolean;
  @Input() Actions: boolean;
  @Input() openCalendar: () => void;
  @Input() addNewBudget: () => void;
  constructor() {}

  ngOnInit() {}
}
