# @flexbe/sdk

## 0.2.47

### Patch Changes

- 22cf881: Add container, font and page-code types

## 0.2.46

### Patch Changes

- 93be8bd: Add new types

## 0.2.45

### Patch Changes

- b44042e: Add Schema types

## 0.2.45

### Patch Changes

- Add `PageSchemaMarkup` and `schemaMarkup` to `PageMeta`
- Add `PageLayoutData` (`data.background`, `data.responsive`); mark root `background` / `responsive` on `PageDataStructure` as deprecated
- Fix `PageDataStructure`: `is` is `PageEntityType.Layout`, `codes` is `PageCodeWithMeta[]`
- Add page code types (`PageCode`, `PageCodeWithMeta`, …)
- Extend `FontFamilyItem`: `flexbe` source, optional `cssPath`

## 0.2.44

### Patch Changes

- 17fc773: Disable cache for all get requests
