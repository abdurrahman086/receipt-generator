'use client';

import { useState, useCallback } from 'react';
import {
  MerchantInfo,
  TransactionDetail,
  ProductItem,
  CustomerInfo,
  AdditionalFee,
  ReceiptData,
} from '@/lib/types';
import {
  generateOrderId,
  calculateSubtotal,
  calculateTax,
  calculateTotalFees,
  calculateTotal,
} from '@/lib/utils';

const createEmptyProduct = (): ProductItem => ({
  id: crypto.randomUUID(),
  description: '',
  quantity: 1,
  price: 0,
});

const initialMerchant: MerchantInfo = {
  name: '',
  city: '',
  address: '',
};

function createInitialTransaction(): TransactionDetail {
  return {
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    paymentMethod: 'tunai',
    orderId: generateOrderId(),
  };
}

const initialCustomer: CustomerInfo = {
  name: '',
  contact: '',
};

export function useReceiptForm() {
  const [merchant, setMerchant] = useState<MerchantInfo>(initialMerchant);
  const [transaction, setTransaction] =
    useState<TransactionDetail>(createInitialTransaction);
  const [products, setProducts] = useState<ProductItem[]>([
    createEmptyProduct(),
  ]);
  const [customer, setCustomer] = useState<CustomerInfo>(initialCustomer);
  const [taxRate, setTaxRate] = useState<number>(11);
  const [additionalFees, setAdditionalFees] = useState<AdditionalFee[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = calculateSubtotal(products);
  const tax = calculateTax(subtotal, taxRate);
  const totalFees = calculateTotalFees(additionalFees);
  const total = calculateTotal(subtotal, tax, totalFees);

  const updateMerchant = useCallback(
    (field: keyof MerchantInfo, value: string) => {
      setMerchant((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`merchant.${field}`];
        return next;
      });
    },
    []
  );

  const updateTransaction = useCallback(
    (field: keyof TransactionDetail, value: string) => {
      setTransaction((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addProduct = useCallback(() => {
    setProducts((prev) => [...prev, createEmptyProduct()]);
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const updateProduct = useCallback(
    (id: string, field: keyof ProductItem, value: string | number) => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          let sanitized = value;
          if (field === 'quantity') {
            sanitized = Math.max(1, Math.floor(Number(value) || 1));
          }
          return { ...p, [field]: sanitized };
        })
      );
    },
    []
  );

  const updateCustomer = useCallback(
    (field: keyof CustomerInfo, value: string) => {
      setCustomer((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addFee = useCallback(() => {
    setAdditionalFees((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: '', amount: 0 },
    ]);
  }, []);

  const removeFee = useCallback((id: string) => {
    setAdditionalFees((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const updateFee = useCallback(
    (id: string, field: keyof AdditionalFee, value: string | number) => {
      setAdditionalFees((prev) =>
        prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
      );
    },
    []
  );

  const resetForm = useCallback(() => {
    setMerchant(initialMerchant);
    setTransaction(createInitialTransaction());
    setProducts([createEmptyProduct()]);
    setCustomer(initialCustomer);
    setTaxRate(11);
    setAdditionalFees([]);
    setErrors({});
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!merchant.name.trim())
      newErrors['merchant.name'] = 'Nama toko wajib diisi';
    if (!merchant.city.trim())
      newErrors['merchant.city'] = 'Kota wajib diisi';
    if (!merchant.address.trim())
      newErrors['merchant.address'] = 'Alamat wajib diisi';

    const validProducts = products.filter(
      (p) => p.description.trim() && p.price > 0
    );
    if (validProducts.length === 0) {
      newErrors['products'] = 'Minimal harus ada 1 item produk';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [merchant, products]);

  const getReceiptData = useCallback((): ReceiptData => {
    return {
      merchant,
      transaction,
      products: products.filter((p) => p.description.trim()),
      customer:
        customer.name || customer.contact ? customer : undefined,
      taxRate,
      additionalFees: additionalFees.filter((f) => f.name.trim()),
      subtotal,
      tax,
      totalFees,
      total,
    };
  }, [
    merchant,
    transaction,
    products,
    customer,
    taxRate,
    additionalFees,
    subtotal,
    tax,
    totalFees,
    total,
  ]);

  return {
    merchant,
    transaction,
    products,
    customer,
    taxRate,
    additionalFees,
    errors,
    subtotal,
    tax,
    totalFees,
    total,
    updateMerchant,
    updateTransaction,
    addProduct,
    removeProduct,
    updateProduct,
    updateCustomer,
    setTaxRate,
    addFee,
    removeFee,
    updateFee,
    resetForm,
    validate,
    getReceiptData,
  };
}
