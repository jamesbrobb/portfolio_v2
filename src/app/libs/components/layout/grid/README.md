<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->

<a name="grid-layout"></a>
# Grid Layout

A simple grid layout component for rendering an `auto-fill` grid.

Content projection is used to render the supplied UI component repeatedly within the grid. A flex based responsive grid fallback is used if `display:grid` is not supported.

<a name="grid-layout-io"></a>
## IO

**@Input (dataProvider):** `Array<unknown>` - An array of data objects to be rendered

<a name="grid-layout-usage"></a>
## Usage

```html

<grid-layout class="grid-layout" [dataProvider]="data.dataProvider">

  <ng-template let-item="item">

    <div class="item">
      <div>{{item.title}}</div>
    </div>

  </ng-template>

</grid-layout>


```

```scss
:host {
  display: block;
  width: 100%;

  .grid-layout {
    overflow: hidden;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-color: #c2185b;
  }
}

```

