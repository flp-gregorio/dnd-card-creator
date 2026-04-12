import { useState } from 'react';
import type { CardData } from './types';
import { themes } from './themes';
import { FormPanel } from './components/FormPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { Card } from './components/Card';

const DEFAULT_DATA: CardData = {
  name: 'Solenne',
  type: 'Longsword',
  customType: '',
  rarity: 'Very Rare',
  attune: true,
  dmg: '1d8 + 1d4 Slashing / Radiant',
  props: 'Versatile, Magical',
  req: 'Dual Wielder',
  flavor: 'White marble, threaded with veins of gold that have not tarnished in an age no historian can name. It is colder than the stone explains.',
  abilities: [
    { name: 'Gilded Verdict', desc: 'Deals an additional <strong>1d4 Radiant</strong> damage on hit.' },
    { name: 'Shattering Light', desc: 'On hit, the target must succeed a <strong>DC 16 Constitution saving throw</strong> or suffer <strong>Sundered by Light</strong>: their vision narrows and their aim falters — <strong>Disadvantage on Attack Rolls and reduced sight range</strong> until the end of their turn.' }
  ],
  setNote: 'Part of the set The Twin Verdicts — equip with Umbrale to unlock The Eternal Balance.'
};

function App() {
  const [data, setData] = useState<CardData>(DEFAULT_DATA);
  const [themeIndex, setThemeIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(true);

  return (
    <div className="h-screen max-h-screen bg-[var(--bg)] text-[var(--text)] text-sm flex overflow-hidden relative w-full">
      {/* Floating Edit Button */}
      {!isFormOpen && (
        <button
          onClick={() => setIsFormOpen(true)}
          className="absolute top-6 left-6 z-40 px-5 py-3 rounded-full bg-[var(--surface)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-[var(--border)] text-[var(--text)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit Card
        </button>
      )}

      {/* Left Sidebar Drawer / 50% Pane on Desktop */}
      <div 
        className={`absolute lg:relative top-0 left-0 h-full w-[380px] lg:w-1/2 max-w-[90vw] shrink-0 z-50 bg-[var(--surface)] shadow-[4px_0_24px_rgba(0,0,0,0.1)] lg:shadow-none transition-all duration-300 ease-in-out border-r border-[var(--border)] flex flex-col ${isFormOpen ? 'translate-x-0 lg:ml-0' : '-translate-x-full lg:-ml-[50%] lg:translate-x-0'}`}
      >
        <FormPanel 
          data={data} 
          onChange={setData} 
          currentThemeIndex={themeIndex}
          onSelectTheme={setThemeIndex}
          onClose={() => setIsFormOpen(false)}
        />
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 min-w-0 w-full h-full relative z-0 flex bg-[var(--surface2)]">
        <PreviewPanel cardName={data.name}>
          <Card data={data} theme={themes[themeIndex]} />
        </PreviewPanel>
      </div>

      {/* Mobile Backdrop */}
      {isFormOpen && (
        <div 
          className="lg:hidden absolute inset-0 bg-black/40 z-40 transition-opacity" 
          onClick={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
