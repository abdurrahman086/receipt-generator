'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import MerchantForm from '@/components/form/MerchantForm';
import TransactionForm from '@/components/form/TransactionForm';
import ProductTable from '@/components/form/ProductTable';
import CustomerForm from '@/components/form/CustomerForm';
import { useReceiptForm } from '@/hooks/useReceiptForm';

export default function FormPage() {
  const router = useRouter();
  const {
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
  } = useReceiptForm();

  const handleGenerate = () => {
    if (!validate()) return;
    const data = getReceiptData();
    sessionStorage.setItem('receiptData', JSON.stringify(data));
    router.push('/preview');
  };

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-secondary hover:text-primary mb-3 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </button>
          <h1 className="text-2xl font-bold tracking-tight">
            Input Data Struk
          </h1>
          <p className="text-sm text-secondary mt-1">
            Isi data di bawah ini untuk membuat struk digital Anda.
          </p>
        </header>

        <div className="space-y-8">
          <section className="p-5 rounded-lg border border-outline-light bg-white">
            <MerchantForm
              data={merchant}
              errors={errors}
              onChange={updateMerchant}
            />
          </section>

          <section className="p-5 rounded-lg border border-outline-light bg-white">
            <TransactionForm data={transaction} onChange={updateTransaction} />
          </section>

          <section className="p-5 rounded-lg border border-outline-light bg-white">
            <ProductTable
              products={products}
              errors={errors}
              subtotal={subtotal}
              taxRate={taxRate}
              tax={tax}
              additionalFees={additionalFees}
              totalFees={totalFees}
              total={total}
              onAdd={addProduct}
              onRemove={removeProduct}
              onUpdate={updateProduct}
              onTaxRateChange={setTaxRate}
              onAddFee={addFee}
              onRemoveFee={removeFee}
              onUpdateFee={updateFee}
            />
          </section>

          <section className="p-5 rounded-lg border border-outline-light bg-white">
            <CustomerForm data={customer} onChange={updateCustomer} />
          </section>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            onClick={resetForm}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Form
          </Button>
          <Button onClick={handleGenerate} className="flex-1">
            <Sparkles className="w-4 h-4" />
            Generate Struk
          </Button>
        </div>
      </div>
    </main>
  );
}
