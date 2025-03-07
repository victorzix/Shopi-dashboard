import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarHeaderComponent } from './side-bar-header.component';

describe('SideBarHeaderComponent', () => {
  let component: SideBarHeaderComponent;
  let fixture: ComponentFixture<SideBarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
