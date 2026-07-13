import { ProductItem, AdditionalFee, ReceiptData } from './types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderId(): string {
  const random = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, '0');
  return `TRX-${random}`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(time: string): string {
  if (!time) return '-';
  return time;
}

export function calculateSubtotal(products: ProductItem[]): number {
  return products.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

export function calculateTax(subtotal: number, rate: number = 11): number {
  return Math.round(subtotal * (rate / 100));
}

export function calculateTotalFees(fees: AdditionalFee[]): number {
  return fees.reduce((sum, fee) => sum + fee.amount, 0);
}

export function calculateTotal(subtotal: number, tax: number, totalFees: number = 0): number {
  return subtotal + tax + totalFees;
}

export function cn(
  ...inputs: (string | Record<string, boolean> | undefined | null | false)[]
): string {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === 'string') return [input];
      return Object.entries(input)
        .filter(([, v]) => v)
        .map(([k]) => k);
    })
    .join(' ');
}

export function generateReceiptText(data: ReceiptData): string {
  const lines: string[] = [];
  const line = '─'.repeat(28);

  lines.push('*Struk Belanja*');
  lines.push('');
  lines.push(`*${data.merchant.name || 'TOKO'}*`);
  if (data.merchant.city || data.merchant.address) {
    lines.push(
      `${[data.merchant.city, data.merchant.address].filter(Boolean).join(', ')}`
    );
  }
  lines.push('');
  lines.push(`${formatDate(data.transaction.date)} ${data.transaction.time}`);
  lines.push(`Order: ${data.transaction.orderId}`);
  lines.push(`Pembayaran: ${data.transaction.paymentMethod}`);
  lines.push(line);

  for (const item of data.products) {
    const itemTotal = item.quantity * item.price;
    lines.push(`${item.quantity}x ${item.description}  ${formatRupiah(itemTotal)}`);
  }

  lines.push(line);
  lines.push(`Subtotal  ${formatRupiah(data.subtotal)}`);
  lines.push(`Pajak (${data.taxRate}%)  ${formatRupiah(data.tax)}`);

  if (data.additionalFees.length > 0) {
    for (const fee of data.additionalFees) {
      lines.push(`${fee.name}  ${formatRupiah(fee.amount)}`);
    }
  }

  lines.push(line);
  lines.push(`*TOTAL  ${formatRupiah(data.total)}*`);
  lines.push('');
  lines.push('Terima kasih!');

  return lines.join('\n');
}
