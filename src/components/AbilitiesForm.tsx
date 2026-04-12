import type { Ability } from '../types';

interface Props {
  abilities: Ability[];
  onChange: (abilities: Ability[]) => void;
}

export function AbilitiesForm({ abilities, onChange }: Props) {
  const addAbility = () => {
    onChange([...abilities, { name: '', desc: '' }]);
  };

  const removeAbility = (index: number) => {
    onChange(abilities.filter((_, i) => i !== index));
  };

  const updateAbility = (index: number, field: keyof Ability, value: string) => {
    const next = [...abilities];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2">
      {abilities.map((a, i) => (
        <div key={i} className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-2.5 relative">
          <button
            onClick={() => removeAbility(i)}
            className="absolute top-2 right-2 text-[11px] px-2 py-0.5 cursor-pointer border border-[var(--border2)] rounded-lg bg-transparent text-[var(--text3)] hover:text-red-500 hover:border-red-500 transition-colors"
          >
            remove
          </button>
          <div className="mb-1.5 pr-14">
            <label className="block text-xs text-[var(--text2)] mb-1">Ability name</label>
            <input
              type="text"
              className="w-full px-2.5 py-1.5 text-[13px] border border-[var(--border2)] rounded-lg bg-[var(--surface2)] text-[var(--text)] outline-none focus:border-gray-400 transition-colors"
              value={a.name}
              onChange={(e) => updateAbility(i, 'name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--text2)] mb-1">Description (HTML allowed: &lt;strong&gt;, &lt;em&gt;)</label>
            <textarea
              className="w-full px-2.5 py-1.5 text-[13px] border border-[var(--border2)] rounded-lg bg-[var(--surface2)] text-[var(--text)] outline-none focus:border-gray-400 transition-colors min-h-[60px] resize-y"
              value={a.desc}
              onChange={(e) => updateAbility(i, 'desc', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button
        onClick={addAbility}
        className="w-full p-1.5 text-xs cursor-pointer border border-dashed border-[var(--border2)] rounded-lg bg-transparent text-[var(--text2)] hover:bg-[var(--surface2)] transition-colors mt-0.5"
      >
        + Add ability
      </button>
    </div>
  );
}
