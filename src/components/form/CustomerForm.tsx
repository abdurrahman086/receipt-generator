import Input from '@/components/ui/Input';
import { CustomerInfo } from '@/lib/types';

interface CustomerFormProps {
  data: CustomerInfo;
  onChange: (field: keyof CustomerInfo, value: string) => void;
}

export default function CustomerForm({ data, onChange }: CustomerFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
        Informasi Pelanggan{' '}
        <span className="font-normal normal-case">(Opsional)</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nama Pelanggan"
          placeholder="Contoh: Budi Santoso"
          value={data.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
        />
        <Input
          label="No. Telepon / Email"
          placeholder="Contoh: 0812xxxx atau email@domain.com"
          value={data.contact || ''}
          onChange={(e) => onChange('contact', e.target.value)}
        />
      </div>
    </div>
  );
}
