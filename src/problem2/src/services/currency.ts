import axios, { type AxiosInstance } from "axios";

class CurrencyApi {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://v1.apiplugin.io/v1/currency/FIHvQooF",
    });
  }

  convert({ amount, from, to }: { amount: number; from: string; to: string }) {
    return this.instance.get("/convert", {
      params: { amount, from, to },
    });
  }
}

const currencyApi = new CurrencyApi();
export default currencyApi;
