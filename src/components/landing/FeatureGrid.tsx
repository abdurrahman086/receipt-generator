import { Zap, FileDown, Monitor, Calculator } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instan',
    description:
      'Buat struk digital dalam hitungan detik tanpa proses yang rumit.',
  },
  {
    icon: FileDown,
    title: 'Ekspor PDF',
    description:
      'Hasilkan file PDF berkualitas tinggi yang siap dicetak atau dibagikan.',
  },
  {
    icon: Monitor,
    title: 'Multi-Platform',
    description:
      'Akses dari mana saja, di perangkat apa saja tanpa perlu instalasi.',
  },
  {
    icon: Calculator,
    title: 'Kalkulasi Otomatis',
    description:
      'Subtotal, pajak 11%, dan total akhir dihitung secara otomatis.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Kenapa ReceiptViewer?
          </h2>
          <p className="text-secondary">
            Solusi sederhana untuk kebutuhan struk digital Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-lg border border-outline-light hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center mb-3">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-base mb-1">{feature.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
