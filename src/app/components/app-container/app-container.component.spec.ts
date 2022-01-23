import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContainerComponent } from './app-container.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {SideMenuComponent} from "../side-menu/side-menu.component";
import {AnalyticsEventDirective} from "../../ng/core";
import {AnalyticsModuleMock} from "../../ng/core/analytics/analytics.module.mock";



describe('RootComponent', () => {
  let component: AppContainerComponent;
  let fixture: ComponentFixture<AppContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule,
        MatTreeModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        AnalyticsModuleMock
      ],
      declarations: [
        AppContainerComponent,
        SideMenuComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
