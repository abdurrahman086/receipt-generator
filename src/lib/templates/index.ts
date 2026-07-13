import { TemplateConfig, TemplateType } from '../types';

export const templates: TemplateConfig[] = [
  {
    id: 'minimalis',
    name: 'Minimalis',
    description: 'Struk sederhana tanpa border, cocok untuk toko kecil',
    fontFamily: "'Hanken Grotesk', sans-serif",
    showBorder: false,
    showLogo: false,
    showQrCode: true,
    headerStyle: 'simple',
    footerText: 'Terima kasih atas kunjungan Anda!',
    bgClass: 'bg-white',
    textClass: 'text-gray-900',
    borderClass: '',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Struk dengan header logo, border, dan QR code',
    fontFamily: "'Hanken Grotesk', sans-serif",
    showBorder: true,
    showLogo: true,
    showQrCode: true,
    headerStyle: 'decorated',
    footerText: 'Thank you for your purchase!',
    bgClass: 'bg-white',
    textClass: 'text-gray-900',
    borderClass: 'border-2 border-gray-900',
  },
  {
    id: 'thermal',
    name: 'Thermal Paper',
    description: 'Tampilan mirip struk kasir thermal asli',
    fontFamily: "'JetBrains Mono', monospace",
    showBorder: false,
    showLogo: false,
    showQrCode: true,
    headerStyle: 'thermal',
    footerText: 'Terima kasih! :)',
    bgClass: 'bg-[#fefefe]',
    textClass: 'text-gray-900',
    borderClass: '',
  },
];

export function getTemplate(id: TemplateType): TemplateConfig {
  return templates.find((t) => t.id === id) || templates[0];
}
