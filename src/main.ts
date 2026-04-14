import "./scss/styles.scss";
import { Products } from "./components/models/Products";
import { Basket } from "./components/models/Basket";
import { Buyer } from "./components/models/Buyer";
import { WebLarekApi } from "./components/Communication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

const productsModel = new Products();
const basketModel = new Basket();
const buyerModel = new Buyer();
const api = new WebLarekApi(new Api(API_URL));

// --- Products ---
console.log("--- Products ---");

productsModel.setItems(apiProducts.items);
console.log("Все товары каталога:", productsModel.getItems());

const firstId = apiProducts.items[0].id;
console.log("Товар по id:", productsModel.getItemById(firstId));

productsModel.setSelectedItem(apiProducts.items[1]);
console.log("Выбранный товар:", productsModel.getSelectedItem());

// --- Basket ---
console.log("--- Basket ---");

const first = apiProducts.items[0];
const second = apiProducts.items[1];

basketModel.addItem(first);
basketModel.addItem(second);
console.log("Товары в корзине:", basketModel.getItems());
console.log("Количество:", basketModel.getCount());
console.log("Итоговая стоимость:", basketModel.getTotal());
console.log("Есть ли first в корзине:", basketModel.hasItem(first.id));

basketModel.removeItem(first);
console.log("После удаления first:", basketModel.getItems());

basketModel.clear();
console.log("После очистки:", basketModel.getItems());

// --- Buyer ---
console.log("--- Buyer ---");

console.log("Валидация пустого покупателя:", buyerModel.validate());

buyerModel.setData({ email: "test@test.ru" });
console.log("После ввода email:", buyerModel.getData());
console.log("Валидация после email:", buyerModel.validate());

buyerModel.setData({
  payment: "card",
  address: "Москва",
  phone: "+79990000000",
});
console.log("После заполнения остального:", buyerModel.getData());
console.log("Валидация полная:", buyerModel.validate());

buyerModel.clear();
console.log("После очистки:", buyerModel.getData());

// --- Запрос к серверу ---
console.log("--- Запрос к серверу ---");

api
  .getProducts()
  .then((data) => {
    productsModel.setItems(data.items);
    console.log("Каталог с сервера:", productsModel.getItems());
  })
  .catch((err) => console.error("Ошибка запроса:", err));
