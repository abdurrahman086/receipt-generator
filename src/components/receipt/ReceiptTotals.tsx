import { TemplateConfig, AdditionalFee } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';

interface ReceiptTotalsProps {
  subtotal: number;
  taxRate: number;
  tax: number;
  additionalFees: AdditionalFee[];
  totalFees: number;
  total: number;
  template: TemplateConfig;
}

export default function ReceiptTotals({
  subtotal,
  taxRate,
  tax,
  additionalFees,
  totalFees,
  total,
  template,
}: ReceiptTotalsProps) {
  const isThermal = template.id === 'thermal';

  return (
    <div className={isThermal ? 'space-y-1 text-xs' : 'space-y-1.5 text-sm'}>
      <div className="flex justify-between">
        <span className="text-secondary">Subtotal</span>
        <span className="font-mono text-right whitespace-nowrap ml-4">{formatRupiah(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-secondary">Pajak ({taxRate}%)</span>
        <span className="font-mono text-right whitespace-nowrap ml-4">{formatRupiah(tax)}</span>
      </div>

      {additionalFees.length > 0 && (
        <>
          {additionalFees.map((fee) => (
            <div key={fee.id} className="flex justify-between">
              <span className="text-secondary">{fee.name}</span>
              <span className="font-mono text-right whitespace-nowrap ml-4">{formatRupiah(fee.amount)}</span>
            </div>
          ))}
          {totalFees > 0 && (
            <div className="flex justify-between">
              <span className="text-secondary">Total Biaya Tambahan</span>
              <span className="font-mono text-right whitespace-nowrap ml-4">{formatRupiah(totalFees)}</span>
            </div>
          )}
        </>
      )}

      <div
        className={
          isThermal
            ? 'border-t border-dashed border-gray-300 pt-1.5 mt-1.5'
            : 'border-t border-outline-light pt-2 mt-2'
        }
      />

      <div
        className={
          isThermal
            ? 'flex justify-between font-bold text-sm'
            : 'flex justify-between font-bold text-lg'
        }
      >
        <span>TOTAL</span>
        <span className="font-mono text-primary text-right whitespace-nowrap ml-4">{formatRupiah(total)}</span>
      </div>
    </div>
  );
}
