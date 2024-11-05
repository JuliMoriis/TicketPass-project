import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEventosListComponent } from './page-eventos-list.component';

describe('PageEventosListComponent', () => {
  let component: PageEventosListComponent;
  let fixture: ComponentFixture<PageEventosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEventosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEventosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
