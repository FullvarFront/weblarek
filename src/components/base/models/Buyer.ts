import { IBuyer, TPayment } from "../../../types";

type TBuyerErrors = {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export class Buyer {
  protected payment: TPayment = "";
  protected address: string = "";
  protected phone: string = "";
  protected email: string = "";

  setData(data: Partial<IBuyer>): void {
    if (data.email !== undefined) {
      this.email = data.email;
    }
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
    }
    if (data.address !== undefined) {
      this.address = data.address;
    }
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }

  clear(): void {
    this.payment = "";
    this.address = "";
    this.email = "";
    this.phone = "";
  }

  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};

    if (!this.payment) errors.payment = "Выберите метод оплаты";
    if (!this.address) errors.address = "Введите адрес доставки";
    if (!this.email) errors.email = "Введите электронную почту";
    if (!this.phone) errors.phone = "Введите номер телефона";

    return errors;
  }
}
