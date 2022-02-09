import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {ImageComponent} from "./image.component";
import {FallbackImageComponent} from "../fallback/fallback-image.component";



describe('ImageComponent', () => {

  let component: ImageComponent,
    fixture: ComponentFixture<ImageComponent>,
    element: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImageComponent,
        FallbackImageComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    element = fixture.debugElement.query(By.css('.image-component')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have blur by default', () => {
    expect(element.className).not.toContain('blur');
  })

  it('should set blur on the component', () => {

    expect(element.className).not.toContain('blur');

    component.ioBlur = true;
    component.ngOnChanges();
    fixture.detectChanges();

    expect(element.className).toContain('blur');
  });

  it('should set the image url', () => {

    const imgUrl = 'media/image.jpg';

    component.ioUrl = imgUrl;
    component.ngOnChanges();
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('.image-component img')).nativeElement;

    expect(img.src).toContain(imgUrl);
  });

  it('should set a default image size of 1044w when the url contains {size}', () => {

    const imgUrl = 'media/image.jpg?size={size}';

    component.ioUrl = imgUrl;
    component.ngOnChanges();
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('.image-component img')).nativeElement;

    expect(img.src).toContain(imgUrl.replace('{size}', '1044w'));
  });

  it('should set image size to the supplied value when the url contains {size}', () => {

    const imgUrl = 'media/image.jpg?size={size}',
      size = '2000h';

    component.ioSize = size;
    component.ioUrl = imgUrl;
    component.ngOnChanges();
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('.image-component img')).nativeElement;

    expect(img.src).toContain(imgUrl.replace('{size}', size));
  });
});
