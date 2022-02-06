# Html Renderer Component

Converts a string into html and place it in the DOM.

Automatic link parsing: Text will be automatically converted to a link if it has one of the following formats:
- http://sometext.without-spaces
- www.sometext.without-spaces

## IO

**@Input(html):** `string` - The text to be transformed

## Usage

```html
<html-renderer
    html="html-text"
    (click)="handleClick($event)">
</html-renderer>
```
