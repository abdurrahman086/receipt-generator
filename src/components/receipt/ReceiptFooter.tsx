'use client';

import { TemplateConfig, ReceiptData } from '@/lib/types';
import { QRCodeSVG } from 'qrcode.react';
import { formatRupiah } from '@/lib/utils';

interface ReceiptFooterProps {
  template: TemplateConfig;
  data?: ReceiptData;
}

export default function ReceiptFooter({ template, data }: ReceiptFooterProps) {
  const isThermal = template.id === 'thermal';
  const isProfessional = template.id === 'professional';

  const qrValue = data
    ? `${data.merchant.name} | ${data.transaction.date} ${data.transaction.time} | ${data.transaction.orderId} | Total: ${formatRupiah(data.total)}`
    : 'ReceiptViewer Digital Receipt';

  const qrSize = isThermal ? 64 : 80;

  return (
    <div className={isThermal ? 'text-center text-xs' : 'text-center text-sm'}>
      {template.showQrCode && (
        <div className="flex justify-center mb-3">
          <QRCodeSVG
            value={qrValue}
            size={qrSize}
            level="M"
            bgColor="transparent"
            fgColor={isThermal ? '#374151' : '#191c1e'}
            marginSize={0}
          />
        </div>
      )}

      <p className="text-secondary">{template.footerText}</p>

      {isProfessional && (
        <p className="text-xs text-secondary mt-2">
          Verified Digital Transaction Record
        </p>
      )}
    </div>
  );
}
