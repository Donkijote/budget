import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodayBudgetPage } from './today-budget.page';

describe('TodayBudgetPage', () => {
  let component: TodayBudgetPage;
  let fixture: ComponentFixture<TodayBudgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayBudgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodayBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
