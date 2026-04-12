import { useState, useRef, useEffect, type ReactNode } from 'react';
import html2canvas from 'html2canvas';

interface Props {
  children: ReactNode;
  cardName: string;
}

export function PreviewPanel({ children, cardName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardMeasureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current || !cardMeasureRef.current) return;
      
      const pw = containerRef.current.clientWidth;
      const ph = containerRef.current.clientHeight;
      const cw = cardMeasureRef.current.offsetWidth;
      const ch = cardMeasureRef.current.offsetHeight;
      
      if (cw === 0 || ch === 0) return;
      
      const padding = 64; 
      const availableW = pw - padding;
      const availableH = ph - padding;
      
      const scaleW = availableW / cw;
      const scaleH = availableH / ch;
      
      let newScale = Math.min(scaleW, scaleH);
      newScale = Math.max(0.3, Math.min(newScale, 2.5)); // Cap scale
      
      setScale(newScale);
    };

    const observer = new ResizeObserver(() => {
      calculateScale();
    });

    if (containerRef.current) observer.observe(containerRef.current);
    if (cardMeasureRef.current) observer.observe(cardMeasureRef.current);
    
    // Fallback recalculation on window resize
    window.addEventListener('resize', calculateScale);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculateScale);
    };
  }, [children]);

  const exportPng = async () => {
    const card = document.getElementById('the-card');
    if (!card) return;

    setExporting(true);

    try {
      // Temporarily remove scaling for crisp export
      const originalTransform = card.parentElement!.style.transform;
      card.parentElement!.style.transform = 'none';
      
      const canvas = await html2canvas(card, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      
      // Restore scale
      card.parentElement!.style.transform = originalTransform;

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
    <div 
      ref={containerRef} 
      className="w-full h-full overflow-hidden flex items-center justify-center relative bg-[var(--surface2)]"
      style={{
        backgroundImage: 'radial-gradient(var(--border) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      <div 
        ref={cardMeasureRef}
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'center center', 
          transition: 'transform 0.15s ease-out' 
        }}
      >
        {children}
      </div>

      <button 
        onClick={exportPng} 
        disabled={exporting}
        className="absolute bottom-8 right-8 px-6 py-3 text-[14px] font-semibold shadow-lg border border-[var(--border2)] rounded-full bg-[var(--surface)] text-[var(--text)] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {exporting ? 'Exporting...' : 'Export PNG'}
      </button>
    </div>
  );
}
