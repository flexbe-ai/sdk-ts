# Данные страницы

JSON макета версии страницы: макет, сущности, коды, текстовые стили и анимация.

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
}
```

### `PageABTest`

| Поле       | Тип       | Описание      |
| ---------- | --------- | ------------- |
| `id`       | `number`  | Id теста      |
| `a`        | `string`  | Id варианта A |
| `b`        | `string`  | Id варианта B |
| `isActive` | `boolean` | Тест включён  |

### `PageLayoutData`

| Поле         | Тип                     | Описание      |
| ------------ | ----------------------- | ------------- |
| `background` | `PageBackground`        | Необязательно |
| `responsive` | `'auto' \| false`       | Необязательно |
| `container`  | `PageContainerSettings` | Необязательно |
| `visualGrid` | `PageVisualGrid`        | Необязательно |

### `PageBackground`

| Поле     | Тип                    | Описание |
| -------- | ---------------------- | -------- |
| `image`  | `ImageObj \| null`     | Картинка |
| `styles` | `PageBackgroundStyles` | Стили    |

### `PageBackgroundStyles`

| Поле                 | Тип                                                   | Описание              |
| -------------------- | ----------------------------------------------------- | --------------------- |
| `backgroundColor`    | `string`                                              | Цвет или градиент CSS |
| `backgroundFixed`    | `boolean`                                             | Фон зафиксирован      |
| `backgroundRepeat`   | `'repeat' \| 'repeat-x' \| 'repeat-y' \| 'no-repeat'` | Повтор фона           |
| `backgroundPosition` | `string`                                              | Позиция фона          |
| `backgroundSize`     | `'cover' \| 'contain' \| 'auto'`                      | Размер фона           |
| `contrast`           | `'dark' \| 'light'`                                   | Контраст              |

### `ImageObj`

Загруженная картинка из раздела [Изображения](images.md) — отдельный тип.

| Поле          | Тип                                            | Описание      |
| ------------- | ---------------------------------------------- | ------------- |
| `id`          | `number`                                       | Id картинки   |
| `ext`         | `string`                                       | Расширение    |
| `name`        | `string`                                       | Необязательно |
| `average`     | `string`                                       | Необязательно |
| `preview`     | `string`                                       | Необязательно |
| `width`       | `number`                                       | Необязательно |
| `height`      | `number`                                       | Необязательно |
| `proportion`  | `number`                                       | Необязательно |
| `border`      | `'none' \| 'transparent' \| 'mixed' \| string` | Необязательно |
| `animated`    | `boolean`                                      | Необязательно |
| `transparent` | `number`                                       | Необязательно |

### `PageContainerSettings`

| Поле      | Тип                       | Описание  |
| --------- | ------------------------- | --------- |
| `desktop` | `PageContainerBreakpoint` | Десктоп   |
| `mobile`  | `PageContainerBreakpoint` | Мобильный |

### `PageContainerBreakpoint`

| Поле          | Тип                | Описание              |
| ------------- | ------------------ | --------------------- |
| `width`       | `number`           | Ширина                |
| `gutter`      | `number`           | Отступ                |
| `minViewport` | `number \| 'auto'` | Минимальный viewport  |
| `viewport`    | `number \| 'auto'` | Viewport              |
| `maxViewport` | `number \| 'auto'` | Максимальный viewport |

### `PageVisualGrid`

| Поле      | Тип                  | Описание      |
| --------- | -------------------- | ------------- |
| `color`   | `string`             | Необязательно |
| `desktop` | `PageVisualGridItem` | Десктоп       |
| `mobile`  | `PageVisualGridItem` | Мобильный     |

### `PageVisualGridItem`

| Поле          | Тип              | Описание       |
| ------------- | ---------------- | -------------- |
| `columns`     | `number`         | Колонки        |
| `columnWidth` | `number \| null` | Ширина колонки |
| `gap`         | `number \| null` | Промежуток     |

## Сущности

### `PageEntityType`

| Значение  | Описание |
| --------- | -------- |
| `block`   | Блок     |
| `modal`   | Модалка  |
| `element` | Элемент  |
| `widget`  | Виджет   |
| `layout`  | Макет    |

### `PageEntity`

| Поле           | Тип                                          | Описание                                                        |
| -------------- | -------------------------------------------- | --------------------------------------------------------------- |
| `id`           | `string`                                     | Id сущности                                                     |
| `is`           | `PageEntityType`                             | Вид: блок, элемент, модалка, виджет или макет                   |
| `template_id`  | `string`                                     | Шаблон                                                          |
| `mod_id`       | `string`, необязательно                      | Вариант шаблона                                                 |
| `source_id`    | `string`, необязательно                      | Id исходной сущности                                            |
| `update_time`  | `number`                                     | Когда сущность меняли                                           |
| `data`         | объект                                       | Данные шаблона и другие ключи, которые он сохранил              |
| `p_id`         | `number`, необязательно                      | Id родителя                                                     |
| `untouched`    | `boolean`, необязательно                     | Сущность ещё не редактировали после вставки                     |
| `hidden`       | `'none' \| 'mobile' \| 'desktop'`            | Где скрыта: нигде, на мобильном или на десктопе. Необязательно  |
| `className`    | `string`, необязательно                      | CSS-класс                                                       |
| `modals`       | `PageModal[]`, необязательно                 | Модалки этой сущности                                           |
| `animation`    | `PageEntityAnimation`, необязательно         | Анимация                                                        |
| `events`       | `PageEntityEvent[]`, необязательно           | События                                                         |
| `multidata`    | `{ enabled, vars }`, необязательно           | Несколько наборов данных. У переменной есть `data`              |
| `refPageId`    | `number`, необязательно                      | Только у блока. Страница, на которую ссылается блок             |
| `aboveTheFold` | `boolean`, необязательно                     | Только у блока и элемента. Сущность в первом экране             |
| `children`     | массив, необязательно                        | Только у блока, элемента, виджета и модалки. Вложенные сущности |
| `multisection` | `{ enabled, main_var, vars }`, необязательно | Только у блока. Варианты секции                                 |
| `geolanding`   | `{ enabled, vars }`, необязательно           | Только у блока. Варианты по городу. У переменной есть `city`    |
| `screenshot`   | `ImageObj \| null`                           | Только у модалки. Превью                                        |

### `PageEntityEvent`

| Поле          | Тип                      | Описание          |
| ------------- | ------------------------ | ----------------- |
| `event`       | `string`                 | Событие           |
| `action`      | `string`                 | Действие          |
| `action_code` | `string`                 | Код действия      |
| `onlyFirst`   | `boolean`                | Только первый раз |
| `state`       | `'all' \| 'in' \| 'out'` | Состояние         |

## Коды

Содержит код, вставленный на страницу.

### `PageCodeWithMeta`

| Поле        | Тип       | Описание                      |
| ----------- | --------- | ----------------------------- |
| `id`        | `string`  | Id кода                       |
| `name`      | `string`  | Название                      |
| `show_code` | `boolean` | Показывать код на странице    |
| `is_body`   | `boolean` | Код в конце body, а не в head |

### `PageCode`

| Поле              | Тип                                | Описание                           |
| ----------------- | ---------------------------------- | ---------------------------------- |
| `html`            | `string`                           | Разметка                           |
| `js`              | `string`                           | Скрипт                             |
| `css`             | `string`                           | Стили                              |
| `utilities`       | `string`, необязательно            | Служебные классы после сборки      |
| `files`           | `PageCodeImage` или `PageCodeFile` | Картинка или файл, вложенные в код |
| `sources`         | объект                             | Исходники до сборки                |
| `sources.html`    | `string`                           | Исходный HTML                      |
| `sources.js`      | `string`                           | Исходный скрипт                    |
| `sources.css`     | `string`                           | Исходные стили                     |
| `sources.modules` | `{ id, path, content }[]`          | Модули                             |

### `PageCodeImage`

| Поле         | Тип      | Описание   |
| ------------ | -------- | ---------- |
| `type`       | `'img'`  |            |
| `id`         | `number` | Id         |
| `name`       | `string` | Название   |
| `ext`        | `string` | Расширение |
| `average`    | `string` |            |
| `proportion` | `number` |            |

### `PageCodeFile`

| Поле   | Тип      | Описание |
| ------ | -------- | -------- |
| `type` | `'file'` |          |
| `id`   | `number` | Id       |
| `name` | `string` | Название |

### `PageCodeModule`

| Поле      | Тип      | Описание   |
| --------- | -------- | ---------- |
| `id`      | `string` | Id         |
| `path`    | `string` | Путь       |
| `content` | `string` | Содержимое |

Для сборки исходников смотрите [Сайты](sites.md#buildhtml).

## Текстовые стили

### `TextStyleItem`

| Поле        | Тип                   | Описание                                                                               |
| ----------- | --------------------- | -------------------------------------------------------------------------------------- |
| `uid`       | `string`              | Id шрифта                                                                              |
| `id`        | `string`              | Роль, например content или title                                                       |
| `title`     | `string`              | Название                                                                               |
| `protected` | `boolean`             | Необязательно                                                                          |
| `source`    | `'project' \| 'page'` | Необязательно                                                                          |
| `style`     | `TextStyleProperties` | Стиль                                                                                  |
| `mobile`    | объект                | Необязательно. Может переопределить `size`, `weight`, `line_height` и `letter_spacing` |

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

### `PageEntityAnimation`

| Поле         | Тип                             | Описание            |
| ------------ | ------------------------------- | ------------------- |
| `id`         | `string \| number`              | Необязательно       |
| `responsive` | `PageEntityAnimationResponsive` | Десктоп и мобильный |

### `PageEntityAnimationResponsive`

| Поле      | Тип                                        | Описание                                   |
| --------- | ------------------------------------------ | ------------------------------------------ |
| `desktop` | `PageEntityAnimationDeviceConfig`          | Конфиг десктопа. Необязательно             |
| `mobile`  | `Partial<PageEntityAnimationDeviceConfig>` | Частичный конфиг мобильного. Необязательно |

### `PageEntityAnimationDeviceConfig`

| Поле                  | Тип                                                                                       | Описание                         |
| --------------------- | ----------------------------------------------------------------------------------------- | -------------------------------- |
| `enabled`             | `boolean`                                                                                 | Включена                         |
| `inherit`             | `boolean \| string`                                                                       | Наследование                     |
| `animationType`       | `string`                                                                                  | Тип анимации. Необязательно      |
| `interactionType`     | `'none' \| 'screen' \| 'scroll' \| 'click' \| 'hover' \| 'hold' \| 'trigger' \| 'custom'` | Как запускается. Необязательно   |
| `interactionSettings` | `PageEntityAnimationInteractionSettings`                                                  | Настройки запуска. Необязательно |
| `steps`               | `PageEntityAnimationStep[]`                                                               | Шаги                             |

### `PageEntityAnimationInteractionSettings`

| Поле                     | Тип                                                                              | Описание                             |
| ------------------------ | -------------------------------------------------------------------------------- | ------------------------------------ |
| `intersectionLine`       | `'top' \| 'center' \| 'bottom'`                                                  | Линия пересечения. Необязательно     |
| `intersectionLineOffset` | `string`                                                                         | Смещение линии. Необязательно        |
| `retriggerBehavior`      | `'reverse' \| 'restart' \| 'pause' \| 'reset' \| 'none'`                         | Повторный запуск. Необязательно      |
| `loop`                   | `number`                                                                         | Число повторов. Необязательно        |
| `playMode`               | `'normal' \| 'bounce'`                                                           | Режим воспроизведения. Необязательно |
| `seekMode`               | `string`                                                                         | Режим прокрутки. Необязательно       |
| `seekAxis`               | `'x' \| 'y'`                                                                     | Ось прокрутки. Необязательно         |
| `seekSmoothing`          | `number`                                                                         | Сглаживание. Необязательно           |
| `triggerElements`        | `string[]`                                                                       | Элементы-триггеры. Необязательно     |
| `triggerAnimationItem`   | `string`                                                                         | Анимация-триггер. Необязательно      |
| `triggerEvent`           | `'start' \| 'complete' \| 'loopstart' \| 'loopcomplete' \| 'pause' \| 'unpause'` | Событие триггера. Необязательно      |
| `fixed`                  | `boolean`                                                                        | Зафиксирована. Необязательно         |

### `PageEntityAnimationStep`

| Поле              | Тип      | Описание       |
| ----------------- | -------- | -------------- |
| `id`              | `string` | Id             |
| `name`            | `string` | Название       |
| `distance`        | `number` | Дистанция      |
| `animationParams` | объект   | Параметры шага |

Поля `animationParams`:

| Поле              | Тип                | Описание      |
| ----------------- | ------------------ | ------------- |
| `clipPath`        | `string`           | Необязательно |
| `clipPathEnabled` | `boolean`          | Необязательно |
| `skewEnabled`     | `boolean`          | Необязательно |
| `seekEasing`      | `string`           | Необязательно |
| `opacity`         | `string \| number` | Необязательно |
| `duration`        | `number`           | Необязательно |
| `rotate`          | `number`           | Необязательно |
| `easing`          | `string`           | Необязательно |
| `translateX`      | `string`           | Необязательно |
| `translateY`      | `string`           | Необязательно |
| `scaleX`          | `number`           | Необязательно |
| `scaleY`          | `number`           | Необязательно |
| `skewX`           | `string`           | Необязательно |
| `skewY`           | `string`           | Необязательно |
