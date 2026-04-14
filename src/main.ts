import "./scss/styles.scss";
import { Products } from "./components/base/models/Products";
import { Basket } from "./components/base/models/Basket";
import { Buyer } from "./components/base/models/Buyer";
import { WebLarekApi } from "./components/base/Communication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

const productsModel = new Products();
const basketModel = new Basket();
const buyerModel = new Buyer();
const api = new WebLarekApi(new Api(API_URL));
