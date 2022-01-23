import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, EventEmitter, Input, Output} from "@angular/core";

import {githubConfigService, PageContainerComponent} from './page-container.component';




@Component({
  selector: 'markdown',
  template: '<div></div>'
})
export class MarkdownComponentMock {
  @Input() src: string | undefined;
  @Output() load = new EventEmitter();
  @Output() error = new EventEmitter();
}


describe('PageContainerComponent', () => {
  let component: PageContainerComponent;
  let fixture: ComponentFixture<PageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MarkdownComponentMock,
        PageContainerComponent
      ],
      providers: [{
        provide: githubConfigService,
        useValue: {}
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should not display details or docs until markdown has loaded', () => {

  });

  it('should not display details if none supplied', () => {

  });

  it('should display details if supplied', () => {

  });

  it('should not display github icon if no github link supplied', () => {

  });

  it('should display github icon if github link supplied', () => {

  });

  it('should display an error message if supplied markdown fails to load', () => {

  });

  it('should not display an error message if markdown loads successuly', () => {

  });

  it('should display the number of markdown files supplied', () => {

  });

  it('should hide the controls section if no example is supplied', () => {

  });

  it('should hide the example section if no example is supplied', () => {

  });*/
});
