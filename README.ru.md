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

Подставьте свой id сайта вместо `123`. `getPages` возвращает `{ list, pagination }`. Установка, `getMe()` и аккаунт описаны в разделе [С чего начать](docs/ru/getting-started.md).

## Документация

1. [С чего начать](docs/ru/getting-started.md) — установка, клиент, сайт или аккаунт
2. [Запросы и ошибки](docs/ru/requests.md) — заголовки, query, коды ответа, таймаут
3. [Сайты](docs/ru/sites.md) — список и создание проектов, чтение и правка сайта, сборка HTML
4. [Страницы](docs/ru/pages.md) — страницы, папки, версии
5. [Данные страницы](docs/ru/page-data.md) — JSON версии: макет, сущности, коды, анимации
6. [Заявки](docs/ru/leads.md) — карточка заявки, строки заказа, доставка, резервы
7. [Магазин](docs/ru/ecommerce.md) — товары, категории, акции
8. [Изображения](docs/ru/images.md)
9. [Файлы](docs/ru/files.md)
10. [Домены](docs/ru/domains.md) — домены сайта и аккаунта
11. [Редиректы](docs/ru/redirects.md)
12. [Настройки](docs/ru/settings.md)
13. [Статистика](docs/ru/statistics.md) — A/B-тесты
14. [Справочники](docs/ru/catalogs.md) — языки и валюты

## Разработка

```bash
npm install
npm run build
npm test
npm run lint
```

## Лицензия

MIT
