'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Printer,
  Download,
  MessageCircle,
  FileText,
  FileImage,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import ReceiptPreview from '@/components/receipt/ReceiptPreview';
import { ReceiptData, TemplateType } from '@/lib/types';
import { templates, getTemplate } from '@/lib/templates';
import { generateReceiptText } from '@/lib/utils';
import type { toPng } from 'html-to-image';

function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function captureReceipt(
  node: HTMLElement,
  toPngFn: typeof toPng
): Promise<string> {
  return toPngFn(node, {
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    cacheBust: true,
    style: {
      transform: 'none',
    },
  });
}

export default function PreviewPage() {
  const router = useRouter();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ReceiptData | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>('minimalis');
  const [parseError, setParseError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('receiptData');
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch {
      setParseError('Data struk tidak valid. Silakan isi form kembali.');
    }
  }, []);

  const handlePrint = useCallback(async () => {
    const receiptInner = receiptRef.current?.querySelector(
      '[data-receipt-inner]'
    ) as HTMLElement | null;
    if (!receiptInner) return;

    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await captureReceipt(receiptInner, toPng);

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Popup diblokir browser. Izinkan popup untuk mencetak.');
        return;
      }

      printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Struk - ${escapeHTML(data?.transaction.orderId || 'receipt')}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { display: flex; justify-content: center; align-items: flex-start; padding: 16px; background: white; }
    img { max-width: 100%; height: auto; }
    @media print { body { padding: 0; } img { max-width: 100%; } }
  </style>
</head>
<body>
  <img src="${dataUrl}" alt="Struk" />
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); window.close(); }, 400);
    };
  </script>
</body>
</html>`);
      printWindow.document.close();
    } catch (err) {
      console.error('Print failed:', err);
      alert('Gagal mencetak. Silakan coba lagi.');
    }
  }, [data]);

  const handleExportPNG = useCallback(async () => {
    const receiptInner = receiptRef.current?.querySelector(
      '[data-receipt-inner]'
    ) as HTMLElement | null;
    if (!receiptInner || isExporting) return;
    setIsExporting(true);

    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await captureReceipt(receiptInner, toPng);

      const link = document.createElement('a');
      link.download = `Struk-${data?.transaction.orderId || 'receipt'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export PNG failed:', err);
      alert('Gagal export PNG. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
    }
  }, [data, isExporting]);

  const handleExportPDF = useCallback(async () => {
    const receiptInner = receiptRef.current?.querySelector(
      '[data-receipt-inner]'
    ) as HTMLElement | null;
    if (!receiptInner || isExporting) return;
    setIsExporting(true);

    try {
      const [{ toPng }, { default: jsPDF }] = await Promise.all([
        import('html-to-image'),
        import('jspdf'),
      ]);

      const dataUrl = await captureReceipt(receiptInner, toPng);

      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });

      const pxW = img.width;
      const pxH = img.height;

      const pdfW = 80;
      const pdfH = (pxH / pxW) * pdfW;

      const pdf = new jsPDF({
        orientation: pdfH > pdfW ? 'portrait' : 'portrait',
        unit: 'mm',
        format: [pdfW, pdfH],
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`Struk-${data?.transaction.orderId || 'receipt'}.pdf`);
    } catch (err) {
      console.error('Export PDF failed:', err);
      alert('Gagal export PDF. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
    }
  }, [data, isExporting]);

  const handleWhatsApp = useCallback(() => {
    if (!data) return;
    const text = generateReceiptText(data);
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  }, [data]);

  if (parseError) {
    return (
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-[800px] mx-auto text-center py-20">
          <FileText className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Terjadi Kesalahan</h1>
          <p className="text-secondary mb-6">{parseError}</p>
          <Button onClick={() => router.push('/form')}>
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Form
          </Button>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-[800px] mx-auto text-center py-20">
          <FileText className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Belum Ada Data</h1>
          <p className="text-secondary mb-6">
            Silakan isi form terlebih dahulu untuk membuat struk.
          </p>
          <Button onClick={() => router.push('/form')}>
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Form
          </Button>
        </div>
      </main>
    );
  }

  const template = getTemplate(selectedTemplate);

  return (
    <main className="min-h-screen py-8 px-4 no-print">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => router.push('/form')}
              className="text-sm text-secondary hover:text-primary mb-1 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
            <h1 className="text-2xl font-bold tracking-tight">
              Preview Struk
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePrint} size="sm">
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button
              onClick={handleExportPNG}
              variant="secondary"
              size="sm"
              disabled={isExporting}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isExporting ? 'Exporting...' : 'PNG'}
              </span>
            </Button>
            <Button
              onClick={handleExportPDF}
              variant="secondary"
              size="sm"
              disabled={isExporting}
            >
              <FileImage className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isExporting ? 'Exporting...' : 'PDF'}
              </span>
            </Button>
            <Button onClick={handleWhatsApp} variant="secondary" size="sm">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>
          </div>
        </div>

        {/* Template Selector */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">
            Pilih Template
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {templates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedTemplate === tmpl.id
                    ? 'border-primary bg-blue-50'
                    : 'border-outline-light hover:border-outline bg-white'
                }`}
              >
                <span className="text-sm font-bold block">{tmpl.name}</span>
                <span className="text-xs text-secondary hidden sm:block mt-1">
                  {tmpl.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Receipt Preview */}
        <div className="flex justify-center py-4">
          <div ref={receiptRef} data-receipt>
            <ReceiptPreview data={data} template={template} />
          </div>
        </div>
      </div>
    </main>
  );
}
