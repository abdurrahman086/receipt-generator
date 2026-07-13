import Input from '@/components/ui/Input';
import { MerchantInfo } from '@/lib/types';

interface MerchantFormProps {
  data: MerchantInfo;
  errors: Record<string, string>;
  onChange: (field: keyof MerchantInfo, value: string) => void;
}

export default function MerchantForm({
  data,
  errors,
  onChange,
}: MerchantFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
        Informasi Toko
      </h3>
      <Input
        label="Nama Toko"
        placeholder="Contoh: Toko Serba Jaya"
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
        error={errors['merchant.name']}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Kota"
          placeholder="Contoh: Jakarta"
          value={data.city}
          onChange={(e) => onChange('city', e.target.value)}
          error={errors['merchant.city']}
        />
        <Input
          label="Alamat Lengkap"
          placeholder="Contoh: Jl. Merdeka No. 123"
          value={data.address}
          onChange={(e) => onChange('address', e.target.value)}
          error={errors['merchant.address']}
        />
      </div>
    </div>
  );
}
