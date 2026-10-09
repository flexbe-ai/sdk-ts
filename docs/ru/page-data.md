# site > Страницы > Данные

`PageDataStructure` — JSON, который хранится в версии страницы. Его читают через `getVersion` и отправляют в `createVersion`. Оба вызова описаны в разделе [Страницы](pages.md). Карточка вокруг этого JSON (`name`, `uri`, `status`) — это `Page`.

Когда отправляете версию обратно, оставляйте ключи, которые сами не используете. Шаблон может хранить в `entity.data` и в объекте `data` макета больше полей, чем перечислено здесь. Какие ключи есть, зависит от `template_id`.

## Макет

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

`PageABTest` — это `{ id, a, b, isActive }`. `a` и `b` — строки.

`PageLayoutData` — объект `data` макета: необязательные `background`, `responsive` (`'auto' | false`), `container` и `visualGrid`, плюс любые другие ключи, которые сохранил шаблон. Берите `data.background` и `data.responsive`. Те же два поля в корне `PageDataStructure` — старое место для них.

`PageBackground` — это `{ image: ImageObj | null, styles }`. В `styles` лежат `backgroundColor`, `backgroundFixed`, `backgroundRepeat` (`repeat`, `repeat-x`, `repeat-y`, `no-repeat`), `backgroundPosition`, `backgroundSize` (`cover`, `contain`, `auto`) и `contrast` (`dark` | `light`).

`ImageObj` — это `{ id, ext, name?, average?, preview?, width?, height?, proportion?, border?, animated?, transparent? }`. `transparent` — число. Загруженная картинка из раздела [Изображения](images.md) — отдельный тип.

У `container` есть `desktop` и `mobile`. Каждый брейкпоинт — `{ width, gutter, minViewport, viewport, maxViewport }`. Значение viewport — число или `'auto'`.

`visualGrid` — это `{ color?, desktop, mobile }`. Каждая сторона — `{ columns, columnWidth, gap }`. `columnWidth` и `gap` имеют тип `number | null`.

## Сущности

`PageEntityType`: `block`, `modal`, `element`, `widget`, `layout`.

У каждой сущности общая база `PageEntity`:

| Поле          | Тип                                      | Описание                                              |
| ------------- | ---------------------------------------- | ----------------------------------------------------- |
| `id`          | `string`                                 | Id сущности                                           |
| `is`          | `PageEntityType`                         | Вид: блок, элемент, модалка, виджет или макет         |
| `template_id` | `string`                                 | Шаблон                                                |
| `mod_id`      | `string`, необязательно                  | Вариант шаблона                                       |
| `source_id`   | `string`, необязательно                  | Id исходной сущности                                  |
| `update_time` | `number`                                 | Когда сущность меняли                                 |
| `data`        | объект                                   | Данные шаблона и другие ключи, которые он сохранил    |
| `p_id`        | `number`, необязательно                  | Id родителя                                           |
| `untouched`   | `boolean`, необязательно                 | Сущность ещё не редактировали после вставки           |
| `hidden`      | `'none' \| 'mobile' \| 'desktop'`        | Где скрыта: нигде, на мобильном или на десктопе       |
| `className`   | `string`, необязательно                  | CSS-класс                                             |
| `modals`      | `PageModal[]`, необязательно             | Модалки этой сущности                                 |
| `animation`   | `PageEntityAnimation`, необязательно     | Анимация                                              |
| `events`      | `PageEntityEvent[]`, необязательно       | События                                               |
| `multidata`   | `{ enabled, vars }`, необязательно       | Несколько наборов данных. У переменной есть `data`    |

`hidden` принимает `'none'`, `'mobile'` или `'desktop'`.

`PageEntityEvent` — это `{ event, action, action_code, onlyFirst, state }`, и у него могут быть другие ключи. `state` — `'all' | 'in' | 'out'`.

Специализации:

| Поле            | Где                    | Описание                                      |
| --------------- | ---------------------- | --------------------------------------------- |
| `refPageId`     | блок                   | Страница, на которую ссылается блок           |
| `aboveTheFold`  | блок, элемент          | Сущность в первом экране                      |
| `children`      | блок, элемент, виджет, модалка | Вложенные сущности                  |
| `multisection`  | блок                   | Варианты секции: `{ enabled, main_var, vars }` |
| `geolanding`    | блок                   | Варианты по городу: `{ enabled, vars }`, у переменной есть `city` |
| `screenshot`    | модалка                | Превью, `ImageObj` или `null`                 |

## Коды

Элементы `codes` имеют тип `PageCodeWithMeta`: мета-поля плюс `PageCode`.

| Поле         | Описание                          |
| ------------ | --------------------------------- |
| `id`         | Id кода                           |
| `name`       | Название                          |
| `show_code`  | Показывать код на странице        |
| `is_body`    | Код в конце body, а не в head     |

`PageCode`:

| Поле              | Тип                          | Описание                          |
| ----------------- | ---------------------------- | --------------------------------- |
| `html`            | `string`                     | Разметка                          |
| `js`              | `string`                     | Скрипт                            |
| `css`             | `string`                     | Стили                             |
| `utilities`       | `string`, необязательно      | Служебные классы после сборки     |
| `files`           | `PageCodeImage` или `PageCodeFile` | Картинка или файл, вложенные в код |
| `sources`         | объект                       | Исходники до сборки               |
| `sources.html`    | `string`                     | Исходный HTML                     |
| `sources.js`      | `string`                     | Исходный скрипт                   |
| `sources.css`     | `string`                     | Исходные стили                    |
| `sources.modules` | `{ id, path, content }[]`    | Модули                            |

`PageCodeImage` — это `{ type: 'img', id, name, ext, average, proportion }`. `PageCodeFile` — это `{ type: 'file', id, name }`. Модуль — `{ id, path, content }`.

`site.buildHtml` принимает эти поля исходников и возвращает `utilities` строкой. См. [Сайты](sites.md).

## Текстовые стили

`TextStyleItem`: `uid`, `id` (роль вроде content или title), `title`, необязательный `protected`, необязательный `source` (`'project' | 'page'`), `style` и необязательный `mobile`.

`mobile` может переопределить `size`, `weight`, `line_height` и `letter_spacing`.

`TextStyleProperties`:

| Поле                | Значения                                                                  |
| ------------------- | ------------------------------------------------------------------------- |
| `fontId`            | Id шрифта, необязательно                                                  |
| `family`            | Семейство шрифта, необязательно                                           |
| `size`              | `'inherit'`, число или строка вроде `'16px'`. Голое число — это пиксели   |
| `weight`            | `'inherit'` или от `100` до `900`                                         |
| `line_height`       | `'inherit'` или число. Число — проценты: `150` значит 1.5                 |
| `letter_spacing`    | `'inherit'`, число или строка вроде `'0.05em'`. Голое число — это пиксели |
| `registry`          | `'inherit' \| 'none' \| 'capitalize' \| 'uppercase' \| 'lowercase'`       |
| `decoration_italic` | `'inherit' \| 'italic' \| 'normal' \| false`                              |
| `color`             | `'auto'` или цвет CSS                                                     |
| `contrast`          | `'light' \| 'dark'`                                                       |

## Анимация

`PageEntityAnimation` — это `{ id?, responsive }`, и у него могут быть другие ключи. Оставляйте их, когда отправляете версию обратно. `responsive.desktop` — конфиг устройства. `responsive.mobile` — его частичный вариант.

Конфиг устройства — `{ enabled, inherit, animationType?, interactionType?, interactionSettings?, steps }`.

`interactionType`: `none`, `screen`, `scroll`, `click`, `hover`, `hold`, `trigger`, `custom`.

В `interactionSettings` могут быть `intersectionLine` (`top`, `center`, `bottom`), `intersectionLineOffset`, `retriggerBehavior` (`reverse`, `restart`, `pause`, `reset`, `none`), `loop`, `playMode` (`normal`, `bounce`), `seekMode`, `seekAxis` (`x`, `y`), `seekSmoothing`, `triggerElements`, `triggerAnimationItem`, `triggerEvent` (`start`, `complete`, `loopstart`, `loopcomplete`, `pause`, `unpause`) и `fixed`.

Шаг — `{ id, name, distance, animationParams }`. В `animationParams` могут быть `clipPath`, `clipPathEnabled`, `skewEnabled`, `seekEasing`, `opacity`, `duration`, `rotate`, `easing`, `translateX`, `translateY`, `scaleX`, `scaleY`, `skewX` и `skewY`.
