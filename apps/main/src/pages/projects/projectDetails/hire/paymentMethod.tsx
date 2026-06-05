import React, { useState } from "react";
import CardPaymentForm from "./CardPaymentForm";
import BankTransferForm from "./BankTransferForm";
import USDTPaymentForm from "./USDTPaymentForm";

type PaymentMethod = "card" | "bank" | "usdt";

const options = [
  { label: "Debit/Credit Card", value: "card" },
  { label: "Bank Transfer", value: "bank" },
  { label: "USDT (Tether)", value: "usdt" },
];

const PaymentMethodForm = () => {
  const [method, setMethod] = useState<PaymentMethod>("card");

  return (
    <div className='rounded-lg border border-input p-6'>
      <h3 className='mb-4 font-medium'>Payment Method</h3>
      <div className='space-y-3'>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${method === opt.value ? "border-red-400 bg-red-50/10" : "border-gray-100 hover:bg-gray-50"}`}
          >
            <input
              type='radio'
              checked={method === opt.value}
              onChange={() => setMethod(opt.value as PaymentMethod)}
              className='hidden'
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === opt.value ? "border-[#F85656]" : "border-gray-200"}`}
            >
              {method === opt.value && (
                <div className='w-2.5 h-2.5 bg-[#F85656] rounded-full' />
              )}
            </div>
            <span className='text-sm font-medium text-gray-700'>
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      {method === "card" && <CardPaymentForm />}
      {method === "bank" && <BankTransferForm />}
      {method === "usdt" && <USDTPaymentForm />}
    </div>
  );
};

export default PaymentMethodForm;
