import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { TransactionDetail } from '@/lib/types';

interface TransactionFormProps {
  data: TransactionDetail;
  onChange: (field: keyof TransactionDetail, value: string) => void;
}

const paymentOptions = [
  { value: 'tunai', label: 'Tunai' },
  { value: 'debit', label: 'Kartu Debit' },
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'ewallet', label: 'E-Wallet' },
];

export default function TransactionForm({
  data,
  onChange,
}: TransactionFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
        Detail Transaksi
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Tanggal"
          type="date"
          value={data.date}
          onChange={(e) => onChange('date', e.target.value)}
        />
        <Input
          label="Waktu"
          type="time"
          value={data.time}
          onChange={(e) => onChange('time', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Metode Pembayaran"
          options={paymentOptions}
          value={data.paymentMethod}
          onChange={(e) => onChange('paymentMethod', e.target.value)}
        />
        <Input
          label="ID Pesanan"
          value={data.orderId}
          onChange={(e) => onChange('orderId', e.target.value)}
        />
      </div>
    </div>
  );
}
