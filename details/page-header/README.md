## Demonstrates

Composition of components
- [Image component](/components/media/image/image-component)
- [Color overlay](/components/common/overlay/color-overlay)

Use of directives
- [responsive container](/components/layout/responsive-container) 
  
Content projection using `ng-content`
- has two slots - one above and one below the title - to project content. These can be seen by increasing the **Top slot content height** and **Content slot content height** input values.
  
Responsive component layout: The layout of a component should change in a predictable, uniform manner regardless of the context in which it's placed
- for the standard component:
  - the content slot above the title is not displayed
  - the content slot below the title displays it's content at full width and stacked vertical
- above 710px width:
  - the title font size increases
  - the content slot above the title is displayed
  - the content slot below the title displays it's content horizontally

Use of css variables to keep style definition DRY
