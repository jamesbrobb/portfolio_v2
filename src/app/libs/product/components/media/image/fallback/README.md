# Fallback Image

Renders a fallback image.

## IO

**@Input(seed):** `string` - A seed value used to select the background svg

**@Input(color):** [`FALLBACK_COLORS`](https://github.com/jamesbrobb/portfolio/blob/main/src/app/components/media/image/fallback/fallback-image.component.ts#L8) - If supplied overrides seed value to explicitly select background color

## Usage

```html
<fallback-image
    [seed]="seed"
    [color]="color">
</fallback-image>
```
