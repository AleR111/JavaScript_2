## Shop app
___
### Overview
___
Приложение "магазин" реализовано по типу SPA с использование Vue CDN.
Для запросов на сервер используется AJAX, сервер написан на node.js.
Проект собран при помощи WebPack, имеется три конфига - один для сборки серверной части и два для фронтенда в режиме development и production.

В приложении реализованы функции:
___
* Добавление/удаление товара в корзину
* Подсчет стоимости корзины
* Очистка корзины
* Поиск товара по каталогу

### Available Scripts
___
In the project directory, you can run:

`npn run buildDev`

Builds the app for development to the dist folder.                                     
It correctly bundles app in production mode and optimizes the build for the best performance.

#### Attention!

This script clean the dist folder before new build


`npn run buildProd`

Builds the app for production to the dist folder.                    
It's the fastest build for app in development mode without optimization

#### Attention!

This script clean the dist folder before new build

`npn run start`

Runs the app in the development mode.             
Open http://localhost:8888 to view it in the browser.

The page will reload if you make edits.                                
You will also see any lint errors in the console.
