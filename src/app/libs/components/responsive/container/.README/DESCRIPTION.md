# Responsive Container Directive

A directive that manages the addition and removal of CSS classes to/from a component, depending on the supplied breakpoint values, through the use of [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

Optional CSS variables (`--XS`, `--SM`, `--MD` etc) are added to the component styles, which are then retrieved by the directive during `onNgInit`.
