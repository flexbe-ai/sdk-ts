# Site → Pages → Data

When you write a version back, keep keys you do not use. A template can store more of them than the ones listed here.

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
}
```

### `PageABTest`

| Field      | Type      | Description    |
| ---------- | --------- | -------------- |
| `id`       | `number`  | Test id        |
| `a`        | `string`  | Variant A id   |
| `b`        | `string`  | Variant B id   |
| `isActive` | `boolean` | The test is on |

### `PageLayoutData`

| Field        | Type                    | Description |
| ------------ | ----------------------- | ----------- |
| `background` | `PageBackground`        | Optional    |
| `responsive` | `'auto' \| false`       | Optional    |
| `container`  | `PageContainerSettings` | Optional    |
| `visualGrid` | `PageVisualGrid`        | Optional    |

### `PageBackground`

| Field    | Type                   | Description |
| -------- | ---------------------- | ----------- |
| `image`  | `ImageObj \| null`     | Image       |
| `styles` | `PageBackgroundStyles` | Styles      |

### `PageBackgroundStyles`

| Field                | Type                                                   | Description                    |
| -------------------- | ------------------------------------------------------ | ------------------------------ |
| `backgroundColor`    | `string`                                               | CSS color or gradient          |
| `backgroundFixed`    | `boolean`                                              | Background is fixed            |
| `backgroundRepeat`   | `'repeat' \| 'repeat-x' \| 'repeat-y' \| 'no-repeat'`  | How the background repeats     |
| `backgroundPosition` | `string`                                               | Background position            |
| `backgroundSize`     | `'cover' \| 'contain' \| 'auto'`                       | Background size                |
| `contrast`           | `'dark' \| 'light'`                                    | Contrast                       |

### `ImageObj`

The uploaded image from [Images](images.md) is a separate type.

| Field         | Type                                           | Description |
| ------------- | ---------------------------------------------- | ----------- |
| `id`          | `number`                                       | Image id    |
| `ext`         | `string`                                       | Extension   |
| `name`        | `string`                                       | Optional    |
| `average`     | `string`                                       | Optional    |
| `preview`     | `string`                                       | Optional    |
| `width`       | `number`                                       | Optional    |
| `height`      | `number`                                       | Optional    |
| `proportion`  | `number`                                       | Optional    |
| `border`      | `'none' \| 'transparent' \| 'mixed' \| string` | Optional    |
| `animated`    | `boolean`                                      | Optional    |
| `transparent` | `number`                                       | Optional    |

### `PageContainerSettings`

| Field     | Type                      | Description |
| --------- | ------------------------- | ----------- |
| `desktop` | `PageContainerBreakpoint` | Desktop     |
| `mobile`  | `PageContainerBreakpoint` | Mobile      |

### `PageContainerBreakpoint`

| Field         | Type               | Description      |
| ------------- | ------------------ | ---------------- |
| `width`       | `number`           | Width            |
| `gutter`      | `number`           | Gutter           |
| `minViewport` | `number \| 'auto'` | Minimum viewport |
| `viewport`    | `number \| 'auto'` | Viewport         |
| `maxViewport` | `number \| 'auto'` | Maximum viewport |

### `PageVisualGrid`

| Field     | Type                 | Description |
| --------- | -------------------- | ----------- |
| `color`   | `string`             | Optional    |
| `desktop` | `PageVisualGridItem` | Desktop     |
| `mobile`  | `PageVisualGridItem` | Mobile      |

### `PageVisualGridItem`

| Field         | Type             | Description  |
| ------------- | ---------------- | ------------ |
| `columns`     | `number`         | Columns      |
| `columnWidth` | `number \| null` | Column width |
| `gap`         | `number \| null` | Gap          |

## Entities

### `PageEntityType`

| Value     | Description |
| --------- | ----------- |
| `block`   | Block       |
| `modal`   | Modal       |
| `element` | Element     |
| `widget`  | Widget      |
| `layout`  | Layout      |

### `PageEntity`

| Field          | Type                                     | Description                                           |
| -------------- | ---------------------------------------- | ----------------------------------------------------- |
| `id`           | `string`                                 | Entity id                                             |
| `is`           | `PageEntityType`                         | Kind: block, element, modal, widget, or layout        |
| `template_id`  | `string`                                 | Template                                              |
| `mod_id`       | `string`, optional                       | Template variant                                      |
| `source_id`    | `string`, optional                       | Id of the source entity                               |
| `update_time`  | `number`                                 | When the entity was last changed                      |
| `data`         | object                                   | Template payload and any other keys it stored         |
| `p_id`         | `number`, optional                       | Parent id                                             |
| `untouched`    | `boolean`, optional                      | Not edited since it was inserted                      |
| `hidden`       | `'none' \| 'mobile' \| 'desktop'`        | Hidden nowhere, on mobile, or on desktop. Optional    |
| `className`    | `string`, optional                       | CSS class                                             |
| `modals`       | `PageModal[]`, optional                  | Modals of this entity                                 |
| `animation`    | `PageEntityAnimation`, optional          | Animation                                             |
| `events`       | `PageEntityEvent[]`, optional            | Events                                                |
| `multidata`    | `{ enabled, vars }`, optional            | Several data sets. A var has `data`                   |
| `refPageId`    | `number`, optional                       | Block only. Page the block points at                  |
| `aboveTheFold` | `boolean`, optional                      | Block and element only. The entity is in the first screen |
| `children`     | array, optional                          | Block, element, widget, and modal only. Nested entities |
| `multisection` | `{ enabled, main_var, vars }`, optional  | Block only. Section variants                          |
| `geolanding`   | `{ enabled, vars }`, optional            | Block only. City variants. A var has `city`           |
| `screenshot`   | `ImageObj \| null`                       | Modal only. Preview                                   |

### `PageEntityEvent`

| Field         | Type                     | Description     |
| ------------- | ------------------------ | --------------- |
| `event`       | `string`                 | Event           |
| `action`      | `string`                 | Action          |
| `action_code` | `string`                 | Action code     |
| `onlyFirst`   | `boolean`                | First time only |
| `state`       | `'all' \| 'in' \| 'out'` | State           |

## Codes

Contains code inserted on the page.

### `PageCodeWithMeta`

| Field       | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| `id`        | `string`  | Code id                        |
| `name`      | `string`  | Name                           |
| `show_code` | `boolean` | Show the code on the page      |
| `is_body`   | `boolean` | Code at the end of body, not head |

### `PageCode`

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

### `PageCodeImage`

| Field        | Type     | Description |
| ------------ | -------- | ----------- |
| `type`       | `'img'`  |             |
| `id`         | `number` | Id          |
| `name`       | `string` | Name        |
| `ext`        | `string` | Extension   |
| `average`    | `string` |             |
| `proportion` | `number` |             |

### `PageCodeFile`

| Field  | Type     | Description |
| ------ | -------- | ----------- |
| `type` | `'file'` |             |
| `id`   | `number` | Id          |
| `name` | `string` | Name        |

### `PageCodeModule`

| Field     | Type     | Description |
| --------- | -------- | ----------- |
| `id`      | `string` | Id          |
| `path`    | `string` | Path        |
| `content` | `string` | Content     |

To build the sources, see [Sites](sites.md#buildhtml).

## Text styles

### `TextStyleItem`

| Field       | Type                   | Description |
| ----------- | ---------------------- | ----------- |
| `uid`       | `string`               | Font id     |
| `id`        | `string`               | Role, such as content or title |
| `title`     | `string`               | Name        |
| `protected` | `boolean`              | Optional    |
| `source`    | `'project' \| 'page'`  | Optional    |
| `style`     | `TextStyleProperties`  | Style       |
| `mobile`    | object                 | Optional. May override `size`, `weight`, `line_height`, and `letter_spacing` |

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

### `PageEntityAnimation`

| Field        | Type                            | Description          |
| ------------ | ------------------------------- | -------------------- |
| `id`         | `string \| number`              | Optional             |
| `responsive` | `PageEntityAnimationResponsive` | Desktop and mobile   |

### `PageEntityAnimationResponsive`

| Field     | Type                                       | Description                              |
| --------- | ------------------------------------------ | ---------------------------------------- |
| `desktop` | `PageEntityAnimationDeviceConfig`          | Desktop config. Optional                 |
| `mobile`  | `Partial<PageEntityAnimationDeviceConfig>` | Partial mobile config. Optional          |

### `PageEntityAnimationDeviceConfig`

| Field                 | Type                                                                                       | Description                 |
| --------------------- | ------------------------------------------------------------------------------------------ | --------------------------- |
| `enabled`             | `boolean`                                                                                  | Enabled                     |
| `inherit`             | `boolean \| string`                                                                        | Inheritance                 |
| `animationType`       | `string`                                                                                   | Animation type. Optional    |
| `interactionType`     | `'none' \| 'screen' \| 'scroll' \| 'click' \| 'hover' \| 'hold' \| 'trigger' \| 'custom'`  | How it starts. Optional     |
| `interactionSettings` | `PageEntityAnimationInteractionSettings`                                                   | Start settings. Optional    |
| `steps`               | `PageEntityAnimationStep[]`                                                                | Steps                       |

### `PageEntityAnimationInteractionSettings`

| Field                    | Type                                                                             | Description                    |
| ------------------------ | -------------------------------------------------------------------------------- | ------------------------------ |
| `intersectionLine`       | `'top' \| 'center' \| 'bottom'`                                                  | Intersection line. Optional    |
| `intersectionLineOffset` | `string`                                                                         | Line offset. Optional          |
| `retriggerBehavior`      | `'reverse' \| 'restart' \| 'pause' \| 'reset' \| 'none'`                         | Restart behavior. Optional     |
| `loop`                   | `number`                                                                         | Repeat count. Optional         |
| `playMode`               | `'normal' \| 'bounce'`                                                           | Play mode. Optional            |
| `seekMode`               | `string`                                                                         | Seek mode. Optional            |
| `seekAxis`               | `'x' \| 'y'`                                                                     | Seek axis. Optional            |
| `seekSmoothing`          | `number`                                                                         | Smoothing. Optional            |
| `triggerElements`        | `string[]`                                                                       | Trigger elements. Optional     |
| `triggerAnimationItem`   | `string`                                                                         | Trigger animation. Optional    |
| `triggerEvent`           | `'start' \| 'complete' \| 'loopstart' \| 'loopcomplete' \| 'pause' \| 'unpause'` | Trigger event. Optional        |
| `fixed`                  | `boolean`                                                                        | Fixed. Optional                |

### `PageEntityAnimationStep`

| Field             | Type     | Description   |
| ----------------- | -------- | ------------- |
| `id`              | `string` | Id            |
| `name`            | `string` | Name          |
| `distance`        | `number` | Distance      |
| `animationParams` | object   | Step settings |

`animationParams` fields:

| Field             | Type               | Description |
| ----------------- | ------------------ | ----------- |
| `clipPath`        | `string`           | Optional    |
| `clipPathEnabled` | `boolean`          | Optional    |
| `skewEnabled`     | `boolean`          | Optional    |
| `seekEasing`      | `string`           | Optional    |
| `opacity`         | `string \| number` | Optional    |
| `duration`        | `number`           | Optional    |
| `rotate`          | `number`           | Optional    |
| `easing`          | `string`           | Optional    |
| `translateX`      | `string`           | Optional    |
| `translateY`      | `string`           | Optional    |
| `scaleX`          | `number`           | Optional    |
| `scaleY`          | `number`           | Optional    |
| `skewX`           | `string`           | Optional    |
| `skewY`           | `string`           | Optional    |

