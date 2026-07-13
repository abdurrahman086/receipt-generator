import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FooterCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
          Siap Membuat Struk Digital?
        </h2>
        <p className="text-secondary mb-8 max-w-[480px] mx-auto">
          Mulai sekarang tanpa registrasi. Gratis, cepat, dan profesional.
        </p>
        <Link href="/form">
          <Button size="lg">
            Mulai Sekarang
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
