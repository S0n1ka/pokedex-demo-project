import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PokedexItemComponent } from './pokedex-item.component';

describe('PokedexItemComponent', () => {
  let component: PokedexItemComponent;
  let fixture: ComponentFixture<PokedexItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PokedexItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
