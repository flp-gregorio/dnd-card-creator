import { themes } from '../themes';
import type { Theme } from '../types';

interface Props {
  currentThemeIndex: number;
  onSelectTheme: (index: number) => void;
}

export function ThemeSelector({ currentThemeIndex, onSelectTheme }: Props) {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {themes.map((t: Theme, i: number) => {
        const isSelected = i === currentThemeIndex;
        return (
          <div
            key={t.name}
            className={`h-8 rounded-lg cursor-pointer border-2 transition-all relative group
              ${isSelected ? 'border-[var(--text)]' : 'border-transparent hover:scale-105'}`}
            style={{ background: t.swatch }}
            title={t.name}
            onClick={() => onSelectTheme(i)}
          >
            <span className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 text-[10px] text-[var(--text3)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {t.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
