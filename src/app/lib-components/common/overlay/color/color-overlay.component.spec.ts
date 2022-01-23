import {By} from '@angular/platform-browser';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ColorOverlayComponent, OVERLAY_COLORS} from './color-overlay.component';


describe('ColorOverlayComponent', () => {

    let component: ColorOverlayComponent,
      fixture: ComponentFixture<ColorOverlayComponent>,
      element: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ ColorOverlayComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorOverlayComponent);
        component = fixture.componentInstance;
        component.ngOnChanges();
        fixture.detectChanges();

        element = fixture.debugElement.query(By.css('.color-overlay')).nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should default to blue', () => {
        expect(element.classList.contains('blue')).toBeTrue();
    });

    it('should add supplied color as class', () => {

        expect(element.classList.contains('blue')).toBeTrue();

        component.color = OVERLAY_COLORS.GREEN;
        component.ngOnChanges();

        fixture.detectChanges();

        expect(element.classList.contains('blue')).toBeFalse();
        expect(element.classList.contains('green')).toBeTrue();
    });

    it('should add allow transition by default', () => {
        expect(element.classList.contains('allow-transition')).toBeTrue();
    });

    it('should remove allow transition when set to false', () => {

        expect(element.classList.contains('allow-transition')).toBeTrue();

        component.ioAllowTransition = false;
        component.ngOnChanges();

        fixture.detectChanges();

        expect(element.classList.contains('allow-transition')).toBeFalse();
    });
});
