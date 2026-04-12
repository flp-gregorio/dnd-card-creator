import type { CardData } from '../types';
import type { ReactNode } from 'react';
import { AbilitiesForm } from './AbilitiesForm';
import { ThemeSelector } from './ThemeSelector';

interface Props {
  data: CardData;
  onChange: (data: CardData) => void;
  currentThemeIndex: number;
  onSelectTheme: (i: number) => void;
}

export function FormPanel({ data, onChange, currentThemeIndex, onSelectTheme }: Props) {
  const setField = (field: keyof CardData, value: any) => {
    onChange({ ...data, [field]: value });
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
    <div className="bg-[var(--surface)] border-r border-[var(--border)] overflow-y-auto p-6 h-full">
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
  );
}
