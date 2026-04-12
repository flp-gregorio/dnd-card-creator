import type { CardData } from '../types';
import { useRef, type ReactNode } from 'react';
import { AbilitiesForm } from './AbilitiesForm';
import { ThemeSelector } from './ThemeSelector';
import { themes } from '../themes';

interface Props {
  data: CardData;
  onChange: (data: CardData) => void;
  currentThemeIndex: number;
  onSelectTheme: (i: number) => void;
  onClose?: () => void;
}

export function FormPanel({ data, onChange, currentThemeIndex, onSelectTheme, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setField = (field: keyof CardData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        
        if (json.schema === 'card-generator-v1') {
          const stdTypes = ['Longsword', 'Shortsword', 'Greatsword', 'Dagger', 'Handaxe', 'Greataxe', 'Rapier', 'Mace', 'Staff', 'Wondrous Item', 'Ring', 'Amulet', 'Shield', 'Armor'];
          const isStdType = stdTypes.includes(json.type);
          
          const newData: CardData = {
            name: json.name || '',
            type: isStdType ? json.type : 'custom',
            customType: isStdType ? '' : (json.type || ''),
            rarity: json.rarity || 'Common',
            attune: !!json.requires_attunement,
            dmg: json.stats?.damage || '',
            props: json.stats?.properties || '',
            req: json.stats?.requirement || '',
            flavor: json.flavor || '',
            abilities: json.abilities || [],
            setNote: json.set_note || ''
          };
          onChange(newData);

          if (json.theme) {
            const tIndex = themes.findIndex(t => t.name.toLowerCase() === json.theme.toLowerCase());
            if (tIndex >= 0) onSelectTheme(tIndex);
          }
        } else {
          alert("Invalid JSON format. Expected schema 'card-generator-v1'");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const SectionHead = ({ children }: { children: ReactNode }) => (
    <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text3)] mt-5 mb-2.5 pb-1 border-b border-[var(--border)] first:mt-0">
      {children}
    </div>
  );

  const Label = ({ children }: { children: ReactNode }) => (
    <label className="block text-xs text-[var(--text2)] mb-1">{children}</label>
  );

  const inputClass = "w-full px-2.5 py-1.5 text-[13px] border border-[var(--border2)] rounded-lg bg-[var(--surface2)] text-[var(--text)] outline-none focus:border-gray-400 transition-colors";

  return (
    <div className="bg-[var(--surface)] border-r border-[var(--border)] h-full flex flex-col overflow-hidden">
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-6 pb-4 border-b border-[var(--border)] shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold m-0">Card Editor</h2>
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="text-[10px] font-medium uppercase tracking-[0.05em] px-2 py-1 rounded bg-[var(--surface2)] hover:bg-[var(--border)] transition-colors text-[var(--text2)] cursor-pointer border border-[var(--border2)] shadow-sm"
              title="Import from JSON"
            >
              Import JSON
            </button>
            <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
          </div>
          <span className="text-[11px] text-[var(--text3)] block mt-1">Update details automatically</span>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-[var(--surface2)] text-[var(--text2)] transition-colors cursor-pointer"
            title="Close Editor"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-2">
        <SectionHead>Identity</SectionHead>
      
      <div className="mb-2.5">
        <Label>Item name</Label>
        <input type="text" className={inputClass} value={data.name} onChange={e => setField('name', e.target.value)} />
      </div>

      <div className="flex gap-2 mb-2.5">
        <div className="flex-1">
          <Label>Item type</Label>
          <select className={inputClass} value={data.type} onChange={e => setField('type', e.target.value)}>
            <option>Longsword</option>
            <option>Shortsword</option>
            <option>Greatsword</option>
            <option>Dagger</option>
            <option>Handaxe</option>
            <option>Greataxe</option>
            <option>Rapier</option>
            <option>Mace</option>
            <option>Staff</option>
            <option>Wondrous Item</option>
            <option>Ring</option>
            <option>Amulet</option>
            <option>Shield</option>
            <option>Armor</option>
            <option value="custom">Custom...</option>
          </select>
        </div>
        {data.type === 'custom' && (
          <div className="flex-1">
            <Label>Custom type</Label>
            <input type="text" className={inputClass} placeholder="e.g. Marble Cleaver" value={data.customType} onChange={e => setField('customType', e.target.value)} />
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-2.5">
        <div className="flex-1">
          <Label>Rarity</Label>
          <select className={inputClass} value={data.rarity} onChange={e => setField('rarity', e.target.value)}>
            <option>Common</option>
            <option>Uncommon</option>
            <option>Rare</option>
            <option>Very Rare</option>
            <option>Legendary</option>
            <option>Artifact</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 py-1.5 mb-2.5">
        <input id="attune-check" type="checkbox" className="w-4 h-4 cursor-pointer" checked={data.attune} onChange={e => setField('attune', e.target.checked)} />
        <label htmlFor="attune-check" className="text-[13px] text-[var(--text2)] cursor-pointer m-0">Requires attunement</label>
      </div>

      <SectionHead>Stats</SectionHead>
      <div className="mb-2.5">
        <Label>Damage / primary stat</Label>
        <input type="text" className={inputClass} value={data.dmg} onChange={e => setField('dmg', e.target.value)} />
      </div>
      <div className="flex gap-2 mb-2.5">
        <div className="flex-1">
          <Label>Properties</Label>
          <input type="text" className={inputClass} value={data.props} onChange={e => setField('props', e.target.value)} />
        </div>
        <div className="flex-1">
          <Label>Requirement</Label>
          <input type="text" className={inputClass} value={data.req} onChange={e => setField('req', e.target.value)} />
        </div>
      </div>

      <SectionHead>Flavour</SectionHead>
      <div className="mb-2.5">
        <Label>Flavour text</Label>
        <textarea className={`${inputClass} min-h-[60px] resize-y`} value={data.flavor} onChange={e => setField('flavor', e.target.value)} />
      </div>

      <SectionHead>Abilities</SectionHead>
      <AbilitiesForm abilities={data.abilities} onChange={a => setField('abilities', a)} />

      <SectionHead>Set note <span className="font-normal text-[var(--text3)]">(optional)</span></SectionHead>
      <div className="mb-2.5">
        <textarea className={`${inputClass} min-h-[60px] resize-y`} value={data.setNote} onChange={e => setField('setNote', e.target.value)} />
      </div>

      <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text3)] mt-5 mb-6 pb-1 border-b border-[var(--border)]">Theme</div>
      <ThemeSelector currentThemeIndex={currentThemeIndex} onSelectTheme={onSelectTheme} />
      </div>
    </div>
  );
}
