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

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] text-sm flex flex-col">
      <header className="px-8 py-5 border-b border-[var(--border)] bg-[var(--surface)] flex items-center gap-4 shrink-0">
        <h1 className="text-base font-medium m-0">D&D Item Card Generator</h1>
        <span className="text-xs text-[var(--text3)]">Live preview — export to PNG when ready</span>
      </header>
      
      <div className="flex-1 grid grid-cols-[380px_1fr] h-[calc(100vh-65px)]">
        <FormPanel 
          data={data} 
          onChange={setData} 
          currentThemeIndex={themeIndex}
          onSelectTheme={setThemeIndex}
        />
        <PreviewPanel cardName={data.name}>
          <Card data={data} theme={themes[themeIndex]} />
        </PreviewPanel>
      </div>
    </div>
  );
}

export default App;
