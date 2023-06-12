import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionCollectionComponent } from './accordion-collection.component';

describe('AccordionCollectionComponent', () => {
  let component: AccordionCollectionComponent;
  let fixture: ComponentFixture<AccordionCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
