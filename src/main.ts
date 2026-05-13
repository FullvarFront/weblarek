import "./scss/styles.scss";
import { IProduct } from "./types";
import { Products } from "./components/models/Products";
import { Basket } from "./components/models/Basket";
import { Buyer } from "./components/models/Buyer";
import { WebLarekApi } from "./components/Communication";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { API_URL } from "./utils/constants";
import { Gallery } from "./components/views/Gallery";
import { CardCatalog } from "./components/views/CardCatalog";
import { categoryMap, CDN_URL } from "./utils/constants";
import { CardPreview } from "./components/views/CardPreview";
import { Modal } from "./components/views/Modal";
import { Header } from "./components/views/Header";
import { Basket as BasketView } from "./components/views/Basket";
import { CardBasket } from "./components/views/CardBasket";
import { FormOrder } from "./components/views/FormOrder";
import { FormContacts } from "./components/views/FormContacts";
import { Success } from "./components/views/Success";

const events = new EventEmitter();

const productsModel = new Products(events);
const basketModel = new Basket(events);
const buyerModel = new Buyer(events);
const api = new WebLarekApi(new Api(API_URL));

api
  .getProducts()
  .then((data) => {
    productsModel.setItems(data.items);
  })
  .catch((err) => console.error("Ошибка запроса:", err));

const galleryElement = document.querySelector(".gallery") as HTMLElement;
const catalogTemplate = document.querySelector(
  "#card-catalog",
) as HTMLTemplateElement;

const gallery = new Gallery(galleryElement);

const modalElement = document.querySelector("#modal-container") as HTMLElement;
const previewTemplate = document.querySelector(
  "#card-preview",
) as HTMLTemplateElement;
const modal = new Modal(modalElement, events);

const headerElement = document.querySelector(".header") as HTMLElement;
const header = new Header(headerElement, events);

const basketTemplate = document.querySelector("#basket") as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(
  "#card-basket",
) as HTMLTemplateElement;

const basketElement = basketTemplate.content.firstElementChild!.cloneNode(
  true,
) as HTMLElement;
const basketView = new BasketView(basketElement, events);

const orderTemplate = document.querySelector("#order") as HTMLTemplateElement;
const orderElement = orderTemplate.content.firstElementChild!.cloneNode(
  true,
) as HTMLFormElement;
const orderForm = new FormOrder(orderElement, events);

const contactsTemplate = document.querySelector(
  "#contacts",
) as HTMLTemplateElement;
const contactsElement = contactsTemplate.content.firstElementChild!.cloneNode(
  true,
) as HTMLFormElement;
const contactsForm = new FormContacts(contactsElement, events);

const successTemplate = document.querySelector(
  "#success",
) as HTMLTemplateElement;
const successElement = successTemplate.content.firstElementChild!.cloneNode(
  true,
) as HTMLElement;
const success = new Success(successElement, events);

events.on("catalog:changed", (items: IProduct[]) => {
  const cards = items.map((item) => {
    const cardElement = catalogTemplate.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;

    const card = new CardCatalog(cardElement, events);

    card.setId(item.id);
    card.setTitle(item.title);
    card.setPrice(item.price);
    card.setImage(CDN_URL + item.image, item.title);
    card.setCategory(item.category as keyof typeof categoryMap);

    return card.render();
  });
  gallery.setCatalog(cards);
});

events.on("card:select", (data: { id: string }) => {
  const product = productsModel.getItemById(data.id);
  if (product) {
    productsModel.setSelectedItem(product);
  }
});

events.on("preview:changed", (item: IProduct | null) => {
  if (!item) return;

  const previewElement = previewTemplate.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;
  const preview = new CardPreview(previewElement, events);

  preview.setId(item.id);
  preview.setTitle(item.title);
  preview.setPrice(item.price);
  preview.setImage(CDN_URL + item.image, item.title);
  preview.setCategory(item.category as keyof typeof categoryMap);
  preview.setDescription(item.description);

  if (item.price === null) {
    preview.setButton("unavailable");
  } else if (basketModel.hasItem(item.id)) {
    preview.setButton("remove");
  } else {
    preview.setButton("buy");
  }

  modal.setContent(preview.render());
  modal.open();
});

events.on("card:button-click", (data: { id: string }) => {
  const product = productsModel.getItemById(data.id);
  if (!product) return;

  if (basketModel.hasItem(product.id)) {
    basketModel.removeItem(product);
  } else {
    basketModel.addItem(product);
  }

  modal.close();
});

function renderBasket(): void {
  const items = basketModel.getItems();

  const cards = items.map((item, index) => {
    const cardElement = cardBasketTemplate.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;
    const card = new CardBasket(cardElement, events);
    card.setId(item.id);
    card.setTitle(item.title);
    card.setPrice(item.price);
    card.setIndex(index + 1);
    return card.render();
  });

  basketView.setItems(cards);
  basketView.setTotal(basketModel.getTotal());
  basketView.setValid(items.length > 0);
}

events.on("basket:changed", (items: IProduct[]) => {
  header.setCounter(items.length);
  renderBasket();
});

events.on("basket:open", () => {
  renderBasket();
  modal.setContent(basketView.render());
  modal.open();
});

events.on("basket:remove", (data: { id: string }) => {
  const product = productsModel.getItemById(data.id);
  if (product) {
    basketModel.removeItem(product);
  }
});

events.on("order:open", () => {
  modal.setContent(orderForm.render());
  modal.open();
});

events.on("form:input", (data: { field: string; value: string }) => {
  buyerModel.setData({ [data.field]: data.value });
});

events.on("buyer:changed", () => {
  const errors = buyerModel.validate();
  const data = buyerModel.getData();

  orderForm.setPayment(data.payment);

  const orderErrors = [errors.payment, errors.address]
    .filter(Boolean)
    .join("; ");
  orderForm.setErrors(orderErrors);
  orderForm.setValid(!errors.payment && !errors.address);

  const contactsErrors = [errors.email, errors.phone]
    .filter(Boolean)
    .join("; ");
  contactsForm.setErrors(contactsErrors);
  contactsForm.setValid(!errors.email && !errors.phone);
});

events.on("form:submit", (data: { form: string }) => {
  if (data.form === "order") {
    modal.setContent(contactsForm.render());
    return;
  }

  if (data.form === "contacts") {
    const buyer = buyerModel.getData();
    const order = {
      ...buyer,
      total: basketModel.getTotal(),
      items: basketModel.getItems().map((item) => item.id),
    };

    api
      .orderProducts(order)
      .then((response) => {
        success.setTotal(response.total);
        modal.setContent(success.render());
        basketModel.clear();
        buyerModel.clear();
        orderForm.clear();
        contactsForm.clear();
      })
      .catch((err) => console.error("Ошибка оформления заказа:", err));
  }
});

events.on("success:close", () => {
  modal.close();
});
