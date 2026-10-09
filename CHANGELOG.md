# @flexbe/sdk

## 0.13.0

### Minor Changes

- bb9c7c2: Add `dependencies` to `BuildHtmlParams` and `chunks` to `BuildHtmlResult`. `dependencies` overrides the built-in package pins for one HTML build. `chunks` is the compiled package files, kept out of the island script. `external` is still accepted and does not change the build.

## 0.12.0

### Minor Changes

- 9f09049: Remove `site.sandbox`. The sandbox API is no longer part of Flexbe.

## 0.11.0

### Minor Changes

- eaecd65: Add `description`, `createdAt`, and `payLink` on `LeadPayment`, `custom` on `Lead`, and `payment.description` on `UpdateLeadParams`.

## 0.10.0

### Minor Changes

- 5231c53: Add `utilities` to `BuildHtmlResult` and `PageCode` for generated Tailwind CSS.
- aa289c3: Add `client.sites.create()` for an empty project on the current account.
  `Site` now includes `domainUrl`, `domainTitle`, and `domainIsTech`.

## 0.9.0

### Minor Changes

- 7536c88: Add `ecommerce.globalCart` with `enabled` and `pageId`, and `PageType.CART` for the unified cart page.

## 0.8.0

### Minor Changes

- ad1c0c0: Add `SiteApi.buildHtml` for compiling HTML element sources.
- 243acea: Add `SiteApi.leads` for the lead list, card, field patch, order, and reservations.

## 0.7.0

### Minor Changes

- 4f7b221: Add `ecommerce.globalCart` (`enabled` + opaque `data`) to site settings types.

## 0.6.0

### Minor Changes

- a91c5c5: Add `removedProductCount` on category list and bulk action `purge` for hard-deleting removed products.
- 972731f: Add promotion methods on `SiteApi.ecommerce`: list, create, update, delete, and find a promocode by code.
- 972731f: Add catalog batch upsert and list filters for variant priceMin/priceMax.

## 0.5.0

### Minor Changes

- 15637b9: Add catalog methods on `SiteApi.ecommerce`: read products, categories and variants; create and update products; create, update, delete and sort categories; bulk hide/show/remove/restore, move a product, and bind or unbind categories.

## 0.4.0

### Minor Changes

- bd71a17: Add account and site domains clients (`account().domains`, `getSiteApi().domains`).

## 0.3.1

### Patch Changes

- 1b700f7: Add `getMe`, `sites.list()`, `sites.getApi(id)`, and site meta on `SiteApi` (`get` / `update`).

## 0.3.0

### Minor Changes

- 600df60: Add site images and files media client
- 31dce9d: Add page create/copy/from-ai client methods (global via createPage type)
- 6876092: Add site redirects client (CRUD + replace by type) with public camelCase redirect types.
- 1f19ca0: Add site settings client (`getSettings` / `updateSettings`) with public camelCase section types.

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
