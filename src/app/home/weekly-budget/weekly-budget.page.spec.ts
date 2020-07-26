import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeeklyBudgetPage } from './weekly-budget.page';

describe('WeeklyBudgetPage', () => {
  let component: WeeklyBudgetPage;
  let fixture: ComponentFixture<WeeklyBudgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyBudgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
