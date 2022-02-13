<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->

<a name="image-component"></a>
# Image Component

Renders an image component.

<a name="image-component-io"></a>
## IO

**@Input(url):** `string` - The url to the image

**@Input(fallbackSeed):** `string` - A seed to determine the fallback image

**@Input(color):** [`FALLBACK_COLORS`](https://github.com/jamesbrobb/portfolio_v2/blob/main/src/app/components/media/image/fallback/fallback-image.component.ts#L8) - If supplied overrides seed value to explicitly select fallback background color

**@Input(size):** `string` - the image size to request. Defaults to '1044w'

**@Input(blur):** `boolean` - whether to blur the image and fallback

<a name="image-component-usage"></a>
## Usage

```html
<image-component
  [url]="url"
  [fallbackSeed]="fallbackSeed"
  [fallbackColor]="fallbackColor"
  [size]="size"
  [blur]="blur">
</image-component>

```

