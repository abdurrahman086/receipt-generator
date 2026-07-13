import { MerchantInfo, TransactionDetail, TemplateConfig } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Store } from 'lucide-react';

interface ReceiptHeaderProps {
  merchant: MerchantInfo;
  transaction: TransactionDetail;
  template: TemplateConfig;
}

export default function ReceiptHeader({
  merchant,
  transaction,
  template,
}: ReceiptHeaderProps) {
  const isThermal = template.id === 'thermal';
  const isProfessional = template.id === 'professional';

  return (
    <div className="text-center">
      {isProfessional && (
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Store className="w-6 h-6 text-primary" />
          </div>
        </div>
      )}

      <h2
        className={
          isThermal
            ? 'font-bold text-base'
            : isProfessional
            ? 'font-bold text-lg'
            : 'font-bold text-lg'
        }
      >
        {merchant.name || 'NAMA TOKO'}
      </h2>

      {merchant.city && (
        <p className="text-secondary mt-0.5">{merchant.city}</p>
      )}
      {merchant.address && (
        <p className="text-secondary text-xs">{merchant.address}</p>
      )}

      {isProfessional && (
        <div className="mt-2 inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary rounded">
          Digital Receipt
        </div>
      )}

      <div
        className={
          isThermal
            ? 'mt-3 space-y-0.5 text-xs text-secondary'
            : 'mt-3 space-y-1 text-sm text-secondary'
        }
      >
        <p>
          {formatDate(transaction.date)} {transaction.time}
        </p>
        <p>Order: {transaction.orderId}</p>
        <p className="capitalize">Pembayaran: {transaction.paymentMethod}</p>
      </div>
    </div>
  );
}
