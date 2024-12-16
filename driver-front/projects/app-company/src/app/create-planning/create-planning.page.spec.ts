import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePlanningPage } from './create-planning.page';

describe('CreatePlanningPage', () => {
  let component: CreatePlanningPage;
  let fixture: ComponentFixture<CreatePlanningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlanningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePlanningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
