import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCommandComponent } from './search-command.component';

describe('SearchCommandComponent', () => {
  let component: SearchCommandComponent;
  let fixture: ComponentFixture<SearchCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCommandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
