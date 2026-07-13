import { ReceiptData, TemplateConfig } from '@/lib/types';
import ReceiptHeader from './ReceiptHeader';
import ReceiptItems from './ReceiptItems';
import ReceiptTotals from './ReceiptTotals';
import ReceiptFooter from './ReceiptFooter';

interface ReceiptPreviewProps {
  data: ReceiptData;
  template: TemplateConfig;
}

export default function ReceiptPreview({ data, template }: ReceiptPreviewProps) {
  const isThermal = template.id === 'thermal';
  const isProfessional = template.id === 'professional';

  return (
    <div
      data-receipt-inner
      className={`${template.bgClass} ${template.textClass} ${template.borderClass} ${
        isThermal ? 'max-w-[320px]' : 'max-w-[400px]'
      } mx-auto rounded-lg overflow-hidden`}
      style={{ fontFamily: template.fontFamily }}
    >
      <div className={isThermal ? 'p-4 text-xs' : 'p-6 text-sm'}>
        <ReceiptHeader
          merchant={data.merchant}
          transaction={data.transaction}
          template={template}
        />

        <div
          className={
            isThermal
              ? 'border-t border-dashed border-gray-300 my-3'
              : 'border-t border-outline-light my-4'
          }
        />

        <ReceiptItems products={data.products} template={template} />

        <div
          className={
            isThermal
              ? 'border-t border-dashed border-gray-300 my-3'
              : 'border-t border-outline-light my-4'
          }
        />

        <ReceiptTotals
          subtotal={data.subtotal}
          taxRate={data.taxRate}
          tax={data.tax}
          additionalFees={data.additionalFees}
          totalFees={data.totalFees}
          total={data.total}
          template={template}
        />

        {data.customer && data.customer.name && (
          <>
            <div
              className={
                isThermal
                  ? 'border-t border-dashed border-gray-300 my-3'
                  : 'border-t border-outline-light my-4'
              }
            />
            <div className={isThermal ? 'text-xs' : 'text-sm'}>
              <p className="text-secondary">Pelanggan: {data.customer.name}</p>
              {data.customer.contact && (
                <p className="text-secondary">{data.customer.contact}</p>
              )}
            </div>
          </>
        )}

        <div
          className={
            isThermal
              ? 'border-t border-dashed border-gray-300 my-3'
              : 'border-t border-outline-light my-4'
          }
        />

        <ReceiptFooter template={template} data={data} />
      </div>
    </div>
  );
}
