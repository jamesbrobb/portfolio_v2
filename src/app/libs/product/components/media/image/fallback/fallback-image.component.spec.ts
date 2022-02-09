import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {FALLBACK_COLORS, FallbackImageComponent} from "./fallback-image.component";


describe('FallbackImageComponent', () => {

  let component: FallbackImageComponent,
    fixture: ComponentFixture<FallbackImageComponent>,
    element: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FallbackImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(FallbackImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    element = fixture.debugElement.query(By.css('.fallback-image')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default background image', () => {
    expect(element.style.backgroundImage).toContain('url');
  });

  it('should change background image when seed value changes', () => {

    component.seed = '1';
    component.ngOnChanges();

    fixture.detectChanges();

    const backgroundImage = element.style.backgroundImage;

    component.seed = '2';
    component.ngOnChanges();

    fixture.detectChanges();

    expect(backgroundImage).not.toEqual(element.style.backgroundImage);
  });

  it('should change background image when color value changes', () => {

    component.color = FALLBACK_COLORS.BLUE;
    component.ngOnChanges();

    fixture.detectChanges();

    const backgroundImage = element.style.backgroundImage;

    expect(backgroundImage).toContain(FALLBACK_COLORS.BLUE);

    component.color = FALLBACK_COLORS.ORANGE;
    component.ngOnChanges();

    fixture.detectChanges();

    expect(element.style.backgroundImage).toContain(FALLBACK_COLORS.ORANGE);
    expect(backgroundImage).not.toEqual(element.style.backgroundImage);
  });
});
