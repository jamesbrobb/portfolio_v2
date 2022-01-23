# Color Overlay

Renders a transparent color overlay.

## IO

**@Input (color):** [`OVERLAY_COLORS`](https://github.com/jamesbrobb/portfolio/blob/main/src/app/components/common/overlay/color/color-overlay.component.ts#L5) - The overlay color. Defaults to blue.

**@Input (allowTransition):** `boolean` - Whether the overlay color should animate when changed. Defaults to true.

## Usage

```html
<color-overlay
    [color]="color"
    [allowTransition]="allowTransition">
</color-overlay>
```


