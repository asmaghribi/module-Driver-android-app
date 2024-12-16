import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanningTripPage } from './planning-trip.page';

describe('PlanningTripPage', () => {
  let component: PlanningTripPage;
  let fixture: ComponentFixture<PlanningTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningTripPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanningTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
