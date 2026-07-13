import Link from 'next/link';
import { Receipt, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 px-4">
      <div className="max-w-[800px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold uppercase tracking-wider text-primary bg-blue-50 rounded-full border border-blue-100">
          <Sparkles className="w-3.5 h-3.5" />
          Gratis & Tanpa Registrasi
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight tracking-tight mb-6">
          Buat Struk Digital
          <br />
          <span className="text-primary">dalam Hitungan Detik</span>
        </h1>

        <p className="text-lg text-secondary max-w-[540px] mx-auto mb-10">
          Ubah data belanja Anda menjadi struk digital profesional yang siap
          dicetak atau dibagikan. Kalkulasi otomatis, ekspor PDF instan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/form">
            <Button size="lg" className="w-full sm:w-auto">
              <Receipt className="w-5 h-5" />
              Buat Struk Sekarang
            </Button>
          </Link>
          <Link href="/preview">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Lihat Contoh
            </Button>
          </Link>
        </div>

        {/* Preview Card */}
        <div className="mt-16 mx-auto max-w-[360px] bg-white rounded-lg border border-outline-light shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6 text-left">
          <div className="text-center mb-4">
            <p className="font-bold text-base">TOKO SERBA JAYA</p>
            <p className="text-xs text-secondary">Jl. Merdeka No. 123</p>
          </div>
          <div className="border-t border-dashed border-outline-light pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>3x Kopi Susu</span>
              <span className="font-mono">Rp 45.000</span>
            </div>
            <div className="flex justify-between">
              <span>1x Roti Bakar</span>
              <span className="font-mono">Rp 15.000</span>
            </div>
          </div>
          <div className="border-t border-dashed border-outline-light mt-3 pt-3">
            <div className="flex justify-between font-bold">
              <span>TOTAL</span>
              <span className="font-mono text-primary">Rp 66.600</span>
            </div>
          </div>
          <p className="text-center text-xs text-secondary mt-4">
            Terima kasih atas kunjungan Anda!
          </p>
        </div>
      </div>
    </section>
  );
}
