<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->

<a name="page-header"></a>
# Page Header

<a name="page-header-io"></a>
## IO

**@Input (title):** `string` - The title header

**@Input (fallbackSeed):** `string` - A seed value used to select the background svg

**@Input (fallbackColor):** [`FALLBACK_COLORS`](https://github.com/jamesbrobb/portfolio/blob/main/src/app/components/media/image/fallback/fallback-image.component.ts#L8) - If supplied overrides seed value to explicitly select background color

**@Input (overlayColor):** [`OVERLAY_COLORS`](https://github.com/jamesbrobb/portfolio/blob/main/src/app/components/common/overlay/color/color-overlay.component.ts#L5)

**@Input (imageUrl):** `string` - An optional image url

**@Input (imageSize):** `string` - An optional image size to be appended to the end of the image url

<a name="page-header-usage"></a>
## Usage

```html

<page-header
  [title]="title"
  [fallbackSeed]="fallbackSeed"
  [fallbackColor]="fallbackColor"
  [overlayColor]="overlayColor"
  [imageUrl]="imageUrl">

  <ng-container class="page-header-top-slot">

    <div class="slot-content"
         [style.height.px]="topSlotContentHeight"
         [style.border-width.px]="topSlotBorderWidth">
    </div>

  </ng-container>

  <ng-container class="page-header-content-slot">

    <div *ngIf="contentSlotBorderWidth"
         class="slot-content"
         [style.height.px]="contentSlotContentHeight"
         [style.border-width.px]="contentSlotBorderWidth">
    </div>

    <div *ngIf="contentSlotBorderWidth"
         class="slot-content"
         [style.height.px]="contentSlotContentHeight"
         [style.border-width.px]="contentSlotBorderWidth">
    </div>

    <div *ngIf="contentSlotBorderWidth"
         class="slot-content"
         [style.height.px]="contentSlotContentHeight"
         [style.border-width.px]="contentSlotBorderWidth">
    </div>

  </ng-container>

</page-header>

```

```scss
:host {
  display: block;

  .slot-content {
    width: 100%;
    background-color: rgba(#ffffff, 0.2);
    border-color: rgba(#ffffff, 0.6);
    border-style: solid;
    box-sizing: border-box;
  }
}

```

