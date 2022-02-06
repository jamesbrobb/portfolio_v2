import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from "@angular/platform-browser";

import { GridLayoutComponent } from './grid-layout.component';
import {ResponsiveContainerDirectiveMock} from "../responsive/container/responsive-container.directive.mock";

describe('GridLayoutComponent', () => {
  let component: GridLayoutComponent;
  let fixture: ComponentFixture<GridLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GridLayoutComponent,
        ResponsiveContainerDirectiveMock
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the number of supplied data items', () => {

    const dataProvider = [0, 1, 2, 3, 4];

    component.dataProvider = dataProvider;

    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.grid-layout-item')).length).toBe(dataProvider.length)
  });
});
