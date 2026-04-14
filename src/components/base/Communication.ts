import {
  IApi,
  IProductsList,
  IOrderRequest,
  IOrderResponse,
} from "../../types";

export class WebLarekApi {
  constructor(protected api: IApi) {}

  getProducts(): Promise<IProductsList> {
    return this.api.get<IProductsList>("/product/");
  }

  orderProducts(order: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>("/order/", order);
  }
}
