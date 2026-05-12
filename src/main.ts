import "./scss/styles.scss";
import { Products } from "./components/models/Products";
import { Basket } from "./components/models/Basket";
import { Buyer } from "./components/models/Buyer";
import { WebLarekApi } from "./components/Communication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";
import { EventEmitter } from "./components/base/Events";
import { CardCatalog } from "./components/views/CardCatalog";
import { CardPreview } from "./components/views/CardPreview";
import { CardBasket } from "./components/views/CardBasket";
import { categoryMap } from "./utils/constants";
const events = new EventEmitter();

const gallery = document.querySelector(".gallery") as HTMLElement;
const catalogTemplate = document.querySelector(
  "#card-catalog",
) as HTMLTemplateElement;
const previewTemplate = document.querySelector(
  "#card-preview",
) as HTMLTemplateElement;
const basketCardTemplate = document.querySelector(
  "#card-basket",
) as HTMLTemplateElement;

const productsModel = new Products();
const basketModel = new Basket();
const buyerModel = new Buyer();
const api = new WebLarekApi(new Api(API_URL));

const cardElement = catalogTemplate.content.firstElementChild!.cloneNode(
  true,
) as HTMLElement;

const cardCatalog = new CardCatalog(cardElement, events);

const product = apiProducts.items[0];

cardCatalog.setId(product.id);
cardCatalog.setTitle(product.title);
cardCatalog.setPrice(product.price);
cardCatalog.setImage(product.image, product.title);
cardCatalog.setCategory(product.category as keyof typeof categoryMap);

gallery.replaceChildren(cardCatalog.render());
