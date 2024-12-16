import { TestBed } from '@angular/core/testing';

import { FormulairePlanningService } from './formulaire-planning.service';

describe('FormulairePlanningService', () => {
  let service: FormulairePlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulairePlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
