'use client';

import { Plus, Trash2 } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { ProductItem, AdditionalFee } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';

interface ProductTableProps {
  products: ProductItem[];
  errors: Record<string, string>;
  subtotal: number;
  taxRate: number;
  tax: number;
  additionalFees: AdditionalFee[];
  totalFees: number;
  total: number;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof ProductItem, value: string | number) => void;
  onTaxRateChange: (rate: number) => void;
  onAddFee: () => void;
  onRemoveFee: (id: string) => void;
  onUpdateFee: (id: string, field: keyof AdditionalFee, value: string | number) => void;
}

export default function ProductTable({
  products,
  errors,
  subtotal,
  taxRate,
  tax,
  additionalFees,
  totalFees,
  total,
  onAdd,
  onRemove,
  onUpdate,
  onTaxRateChange,
  onAddFee,
  onRemoveFee,
  onUpdateFee,
}: ProductTableProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
        Daftar Produk
      </h3>

      {errors['products'] && (
        <p className="text-xs text-red-600">{errors['products']}</p>
      )}

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-[1fr_80px_120px_40px] gap-2 mb-2 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Deskripsi Item
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary text-center">
            QTY
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary text-right">
            Harga
          </span>
          <span />
        </div>

        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[1fr_80px_120px_40px] gap-2 items-start"
            >
              <Input
                placeholder="Nama item"
                value={product.description}
                onChange={(e) =>
                  onUpdate(product.id, 'description', e.target.value)
                }
              />
              <Input
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) =>
                  onUpdate(product.id, 'quantity', parseInt(e.target.value) || 1)
                }
                className="text-center"
              />
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={product.price || ''}
                onChange={(e) =>
                  onUpdate(product.id, 'price', parseFloat(e.target.value) || 0)
                }
                className="text-right font-mono"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(product.id)}
                disabled={products.length <= 1}
                className="mt-1 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="p-3 rounded-lg border border-outline-light space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-secondary">
                Item #{index + 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(product.id)}
                disabled={products.length <= 1}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Nama item"
              value={product.description}
              onChange={(e) =>
                onUpdate(product.id, 'description', e.target.value)
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="QTY"
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) =>
                  onUpdate(product.id, 'quantity', parseFloat(e.target.value) || 1)
                }
              />
              <Input
                label="Harga (Rp)"
                type="number"
                min="0"
                value={product.price || ''}
                onChange={(e) =>
                  onUpdate(product.id, 'price', parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={onAdd}
        className="w-full"
      >
        <Plus className="w-4 h-4" />
        Tambah Item
      </Button>

      {/* Tax & Fees Section */}
      <div className="border-t border-outline-light pt-4 space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-secondary">Subtotal</span>
          <span className="font-mono">{formatRupiah(subtotal)}</span>
        </div>

        {/* Customizable Tax Rate */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-secondary flex-shrink-0">Pajak</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={taxRate}
              onChange={(e) => onTaxRateChange(parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 text-sm text-right font-mono rounded border border-outline bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <span className="text-sm text-secondary">%</span>
            <span className="text-sm font-mono text-secondary">({formatRupiah(tax)})</span>
          </div>
        </div>

        {/* Additional Fees */}
        <div className="space-y-2">
          {additionalFees.map((fee) => (
            <div key={fee.id} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Nama biaya"
                value={fee.name}
                onChange={(e) => onUpdateFee(fee.id, 'name', e.target.value)}
                className="flex-1 px-2 py-1 text-sm rounded border border-outline bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <input
                type="number"
                min="0"
                placeholder="0"
                value={fee.amount || ''}
                onChange={(e) =>
                  onUpdateFee(fee.id, 'amount', parseFloat(e.target.value) || 0)
                }
                className="w-28 px-2 py-1 text-sm text-right font-mono rounded border border-outline bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFee(fee.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {additionalFees.length > 0 && totalFees > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Total Biaya Tambahan</span>
              <span className="font-mono">{formatRupiah(totalFees)}</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onAddFee}
            className="w-full text-primary hover:bg-blue-50"
          >
            <Plus className="w-4 h-4" />
            Tambah Biaya
          </Button>
        </div>

        {/* Total */}
        <div className="flex justify-between text-base font-bold border-t border-outline-light pt-2">
          <span>Total Akhir</span>
          <span className="font-mono text-primary">{formatRupiah(total)}</span>
        </div>
      </div>
    </div>
  );
}
