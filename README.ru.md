[English](README.md) · **Русский**

# Flexbe TypeScript SDK

TypeScript-клиент к API Flexbe. Работает в Node.js 20 и новее и в браузере, ходит в API через `fetch`.

```bash
npm install @flexbe/sdk
```

```typescript
import { FlexbeClient } from "@flexbe/sdk";

const client = new FlexbeClient({
  apiKey: "your-api-key",
});

const site = client.getSiteApi(123);
const pages = await site.pages.getPages({
  limit: 10,
  offset: 0,
  type: "page",
  status: "published",
});

console.log(pages.list);
```

Подставьте свой id сайта вместо `123`. `getPages` возвращает `{ list, pagination }`. Установка, `getMe()` и аккаунт описаны в разделе [С чего начать](docs/ru/README.md).

## Документация

1. [С чего начать](docs/ru/README.md) — установка, клиент, сайт или аккаунт
2. [Запросы и ошибки](docs/ru/requests.md) — заголовки, query, коды ответа, таймаут
3. [Сайты](docs/ru/sites.md) — список и создание проектов, чтение и правка сайта, сборка HTML
4. [Страницы](docs/ru/pages.md) — страницы и папки
5. [Версии страниц](docs/ru/page-versions.md) — читать и сохранять версии
6. [Данные страницы](docs/ru/page-data.md) — JSON версии: макет, сущности, коды, анимации
7. [Заявки](docs/ru/leads.md) — карточка заявки, строки заказа, доставка, резервы
8. [Магазин](docs/ru/ecommerce.md) — товары и категории
9. [Акции](docs/ru/promotions.md)
10. [Изображения](docs/ru/images.md)
11. [Файлы](docs/ru/files.md)
12. [Домены](docs/ru/domains.md) — домены сайта и аккаунта
13. [Редиректы](docs/ru/redirects.md)
14. [Настройки](docs/ru/settings.md)
15. [Статистика](docs/ru/statistics.md)
16. [Справочники](docs/ru/catalogs.md) — языки и валюты

## Разработка

```bash
npm install
npm run build
npm test
npm run lint
```

## Лицензия

MIT
