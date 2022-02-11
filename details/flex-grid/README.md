<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->

<a name="responsive-flex-grid"></a>
# Responsive Flex Grid

Two scss mixins, the first of which works in conjunction with the [`responsiveContainer`](components/layout/responsive-container) directive, to turn an element into a responsive flex grid.

Breakpoint values are calculated from the supplied `$min-column-width` and `$gap` values.

<a name="responsive-flex-grid-usage"></a>
## Usage

```html

<div class="grid-layout" responsiveContainer>

  <div class="grid-layout-item" *ngFor="let item of dataProvider; trackBy: trackById">

    <div class="item">
      <div>{{item.title}}</div>
    </div>

  </div>

</div>

```

```scss
@import "~@styles/flex";

$grid_class_name:'grid-layout';
$grid_item_class_name:'grid-layout-item';
$min-column-width: 200px;
$gap: 10px;


:host {
  display: block;
  width: 100%;

  @include responsive-flex-grid($grid_class_name, $min-column-width, $gap);

  @include flex-grid($grid_class_name, $grid_item_class_name, $min-column-width, $gap, $gap);

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

