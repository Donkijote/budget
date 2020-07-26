import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonthlyBudgetPage } from './monthly-budget.page';

describe('MonthlyBudgetPage', () => {
  let component: MonthlyBudgetPage;
  let fixture: ComponentFixture<MonthlyBudgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyBudgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
