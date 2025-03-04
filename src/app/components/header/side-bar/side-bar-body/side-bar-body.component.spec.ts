import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarBodyComponent } from './side-bar-body.component';

describe('SideBarBodyComponent', () => {
  let component: SideBarBodyComponent;
  let fixture: ComponentFixture<SideBarBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
