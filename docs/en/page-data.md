# site > Pages > Data

`PageDataStructure` is the JSON stored on a page version. Read it from `getVersion` and send it to `createVersion`. Both calls are on [Pages](pages.md). The card around that JSON (`name`, `uri`, `status`) is a `Page`.

When you write a version back, keep keys you do not use. A template can store more fields on `entity.data` and on the layout `data` object than the ones listed here. Which keys exist depends on `template_id`.

## Layout

```typescript
interface PageDataStructure {
  id?: string;
  is: PageEntityType.Layout; // 'layout'
  template_id: string;
  blocks: PageBlock[];
  modals: PageModal[];
  widgets: PageWidget[];
  abtests?: PageABTest[];
  codes?: PageCodeWithMeta[];
  textStyles?: TextStyleItem[];
  data?: PageLayoutData;
  /** @deprecated Use data.background */
  background?: PageBackground;
  /** @deprecated Use data.responsive */
  responsive?: "auto" | false | boolean;
}
```

`PageABTest` is `{ id, a, b, isActive }`. `a` and `b` are strings.

`PageLayoutData` is the layout `data` object: optional `background`, `responsive` (`'auto' | false`), `container`, and `visualGrid`, plus any other keys the template stored. Prefer `data.background` and `data.responsive`. The same two fields on the root of `PageDataStructure` are the older place for them.

`PageBackground` is `{ image: ImageObj | null, styles }`. `styles` carries `backgroundColor`, `backgroundFixed`, `backgroundRepeat` (`repeat`, `repeat-x`, `repeat-y`, `no-repeat`), `backgroundPosition`, `backgroundSize` (`cover`, `contain`, `auto`), and `contrast` (`dark` | `light`).

`ImageObj` is `{ id, ext, name?, average?, preview?, width?, height?, proportion?, border?, animated?, transparent? }`. `transparent` is a number. The uploaded image from [Images](images.md) is a separate type.

`container` has `desktop` and `mobile`. Each breakpoint is `{ width, gutter, minViewport, viewport, maxViewport }`. A viewport value is a number or `'auto'`.

`visualGrid` is `{ color?, desktop, mobile }`. Each side is `{ columns, columnWidth, gap }`. `columnWidth` and `gap` are `number | null`.

## Entities

`PageEntityType`: `block`, `modal`, `element`, `widget`, `layout`.

Every entity shares `PageEntity`:

| Field         | Type                                 | Description                                           |
| ------------- | ------------------------------------ | ----------------------------------------------------- |
| `id`          | `string`                             | Entity id                                             |
| `is`          | `PageEntityType`                     | Kind: block, element, modal, widget, or layout        |
| `template_id` | `string`                             | Template                                              |
| `mod_id`      | `string`, optional                   | Template variant                                      |
| `source_id`   | `string`, optional                   | Id of the source entity                               |
| `update_time` | `number`                             | When the entity was last changed                      |
| `data`        | object                               | Template payload and any other keys it stored         |
| `p_id`        | `number`, optional                   | Parent id                                             |
| `untouched`   | `boolean`, optional                  | Not edited since it was inserted                      |
| `hidden`      | `'none' \| 'mobile' \| 'desktop'`    | Hidden nowhere, on mobile, or on desktop              |
| `className`   | `string`, optional                   | CSS class                                             |
| `modals`      | `PageModal[]`, optional              | Modals of this entity                                 |
| `animation`   | `PageEntityAnimation`, optional      | Animation                                             |
| `events`      | `PageEntityEvent[]`, optional        | Events                                                |
| `multidata`   | `{ enabled, vars }`, optional        | Several data sets. A var has `data`                   |

`hidden` is `'none'`, `'mobile'`, or `'desktop'`.

`PageEntityEvent` is `{ event, action, action_code, onlyFirst, state }`, and can carry other keys. `state` is `'all' | 'in' | 'out'`.

Specializations:

| Field           | Where                         | Description                                      |
| --------------- | ----------------------------- | ------------------------------------------------ |
| `refPageId`     | block                         | Page the block points at                         |
| `aboveTheFold`  | block, element                | The entity is in the first screen                |
| `children`      | block, element, widget, modal | Nested entities                                  |
| `multisection`  | block                         | Section variants: `{ enabled, main_var, vars }`  |
| `geolanding`    | block                         | City variants: `{ enabled, vars }`. A var has `city` |
| `screenshot`    | modal                         | Preview, `ImageObj` or `null`                    |

## Codes

`codes` items are `PageCodeWithMeta`: the meta fields plus `PageCode`.

| Field        | Description                       |
| ------------ | --------------------------------- |
| `id`         | Code id                           |
| `name`       | Name                              |
| `show_code`  | Show the code on the page         |
| `is_body`    | Code at the end of body, not head |

`PageCode`:

| Field             | Type                         | Description                    |
| ----------------- | ---------------------------- | ------------------------------ |
| `html`            | `string`                     | Markup                         |
| `js`              | `string`                     | Script                         |
| `css`             | `string`                     | Styles                         |
| `utilities`       | `string`, optional           | Utility classes after the build |
| `files`           | `PageCodeImage` or `PageCodeFile` | An image or a file embedded in the code |
| `sources`         | object                       | Sources before the build       |
| `sources.html`    | `string`                     | Source HTML                    |
| `sources.js`      | `string`                     | Source script                  |
| `sources.css`     | `string`                     | Source styles                  |
| `sources.modules` | `{ id, path, content }[]`    | Modules                        |

`PageCodeImage` is `{ type: 'img', id, name, ext, average, proportion }`. `PageCodeFile` is `{ type: 'file', id, name }`. A module is `{ id, path, content }`.

`site.buildHtml` takes those source fields and returns `utilities` as a string. See [Sites](sites.md).

## Text styles

`TextStyleItem`: `uid`, `id` (a role such as content or title), `title`, optional `protected`, optional `source` (`'project' | 'page'`), `style`, and optional `mobile`.

`mobile` may override `size`, `weight`, `line_height`, and `letter_spacing`.

`TextStyleProperties`:

| Field               | Values                                                                            |
| ------------------- | --------------------------------------------------------------------------------- |
| `fontId`            | Font id, optional                                                                 |
| `family`            | Font family, optional                                                             |
| `size`              | `'inherit'`, a number, or a string such as `'16px'`. A bare number means pixels   |
| `weight`            | `'inherit'` or `100` through `900`                                                |
| `line_height`       | `'inherit'` or a number. The number is a percent: `150` means 1.5                 |
| `letter_spacing`    | `'inherit'`, a number, or a string such as `'0.05em'`. A bare number means pixels |
| `registry`          | `'inherit' \| 'none' \| 'capitalize' \| 'uppercase' \| 'lowercase'`               |
| `decoration_italic` | `'inherit' \| 'italic' \| 'normal' \| false`                                      |
| `color`             | `'auto'` or a CSS color                                                           |
| `contrast`          | `'light' \| 'dark'`                                                               |

## Animation

`PageEntityAnimation` is `{ id?, responsive }` and can include other keys. Keep them when you write the version back. `responsive.desktop` is a device config. `responsive.mobile` is a partial one.

A device config is `{ enabled, inherit, animationType?, interactionType?, interactionSettings?, steps }`.

`interactionType`: `none`, `screen`, `scroll`, `click`, `hover`, `hold`, `trigger`, `custom`.

`interactionSettings` may set `intersectionLine` (`top`, `center`, `bottom`), `intersectionLineOffset`, `retriggerBehavior` (`reverse`, `restart`, `pause`, `reset`, `none`), `loop`, `playMode` (`normal`, `bounce`), `seekMode`, `seekAxis` (`x`, `y`), `seekSmoothing`, `triggerElements`, `triggerAnimationItem`, `triggerEvent` (`start`, `complete`, `loopstart`, `loopcomplete`, `pause`, `unpause`), and `fixed`.

A step is `{ id, name, distance, animationParams }`. `animationParams` may include `clipPath`, `clipPathEnabled`, `skewEnabled`, `seekEasing`, `opacity`, `duration`, `rotate`, `easing`, `translateX`, `translateY`, `scaleX`, `scaleY`, `skewX`, and `skewY`.
