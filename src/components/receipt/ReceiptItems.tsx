import { ProductItem, TemplateConfig } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';

interface ReceiptItemsProps {
  products: ProductItem[];
  template: TemplateConfig;
}

export default function ReceiptItems({ products, template }: ReceiptItemsProps) {
  const isThermal = template.id === 'thermal';

  return (
    <div className={isThermal ? 'space-y-1.5' : 'space-y-2'}>
      {products.map((product) => (
        <div
          key={product.id}
          className={
            isThermal
              ? 'flex justify-between items-start text-xs'
              : 'flex justify-between items-start text-sm'
          }
        >
          <span className="flex-1">
            {product.quantity}x {product.description}
          </span>
          <span className="font-mono text-right whitespace-nowrap ml-4">{formatRupiah(product.price * product.quantity)}</span>
        </div>
      ))}
    </div>
  );
}
