import React from "react";
import { ArrowLeftRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SelectCurrency from "./components/SelectCurrency";
import currencyApi from "./services/currency";

const schema = yup.object({
  amount: yup.number().positive().required(),
  fromCurrency: yup.string().required(),
  toCurrency: yup.string().required(),
});

type FormValues = {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
};

export default function App() {
  const [rate, setRate] = React.useState<any>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    defaultValues: { amount: 0, fromCurrency: "", toCurrency: "" },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (values: FormValues) => {
    const { data } = await currencyApi.convert({
      amount: values.amount,
      from: values.fromCurrency,
      to: values.toCurrency,
    });
    setRate(data);
  };

  console.log(errors.amount);

  return (
    <div className="mx-auto flex h-dvh w-full justify-center items-center">
      <div className="fixed inset-0 bg-gradient-to-r from-primary to-info backdrop-blur-xs" />
      <div className="w-sm md:w-xl space-y-5 bg-base-300/30 backdrop-blur-lg p-6 rounded-lg">
        <h2 className="font-bold text-center text-3xl">Currency Converter</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <Controller
            control={control}
            name="amount"
            render={({ field: { value, onChange } }) => (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Amount</legend>
                <input
                  name="amount"
                  className={`input w-full ${errors.amount?.message ? "input-error" : ""}`}
                  value={value.toString().replace(/^0+/, "")}
                  onChange={onChange}
                />
              </fieldset>
            )}
          />

          <div className="flex justify-between items-center gap-5">
            <Controller
              control={control}
              name="fromCurrency"
              render={() => {
                return (
                  <SelectCurrency
                    id="from_currency"
                    onSelect={(item) =>
                      setValue("fromCurrency", item.currency, {
                        shouldValidate: true,
                      })
                    }
                  />
                );
              }}
            />

            <div className="btn btn-square">
              <ArrowLeftRight className="size-4" />
            </div>

            <Controller
              control={control}
              name="toCurrency"
              render={() => {
                return (
                  <SelectCurrency
                    id="to_currency"
                    onSelect={(item) =>
                      setValue("toCurrency", item.currency, {
                        shouldValidate: true,
                      })
                    }
                  />
                );
              }}
            />
          </div>

          <button
            className="btn btn-primary btn-block"
            type="submit"
            disabled={!isValid}
          >
            Get Exchange Rage
          </button>
        </form>

        {rate && <div className="btn btn-soft w-full">{rate.text}</div>}
      </div>
    </div>
  );
}
