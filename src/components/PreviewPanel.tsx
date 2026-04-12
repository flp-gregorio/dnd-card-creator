import { useState, type ReactNode } from 'react';
import html2canvas from 'html2canvas';

interface Props {
  children: ReactNode;
  cardName: string;
}

export function PreviewPanel({ children, cardName }: Props) {
  const [scale, setScale] = useState(100);
  const [exporting, setExporting] = useState(false);

  const exportPng = async () => {
    const card = document.getElementById('the-card');
    if (!card) return;

    setExporting(true);

    try {
      const canvas = await html2canvas(card, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const name = (cardName || 'card').toLowerCase().replace(/\s+/g, '-');
      const link = document.createElement('a');
      link.download = `${name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e: any) {
      alert('Export failed: ' + e.message);
    }

    setExporting(false);
  };

  return (
    <div className="overflow-y-auto p-8 flex flex-col items-center gap-6 h-full">
      <div className="text-[11px] uppercase tracking-[0.1em] text-[var(--text3)] self-start">
        Preview
      </div>
      
      <div className="flex items-center gap-2.5 self-start">
        <label className="text-xs text-[var(--text2)]">Scale</label>
        <input 
          type="range" 
          min="50" 
          max="150" 
          value={scale} 
          step="5" 
          className="w-24"
          onChange={(e) => setScale(Number(e.target.value))} 
        />
        <span className="text-xs text-[var(--text2)] min-w-[30px]">{scale}%</span>
      </div>

      <div style={{ transform: `scale(${scale / 100})`, transformOrigin: 'top center' }}>
        {children}
      </div>

      <button 
        onClick={exportPng} 
        disabled={exporting}
        className="px-5 py-2 text-[13px] font-medium cursor-pointer border border-[var(--border2)] rounded-lg bg-[var(--surface)] text-[var(--text)] transition-colors hover:bg-[var(--surface2)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
      >
        {exporting ? 'Exporting...' : 'Export PNG'}
      </button>
    </div>
  );
}
