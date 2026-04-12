import type { CardData, Theme } from '../types';

interface Props {
  data: CardData;
  theme: Theme;
}

export function Card({ data, theme }: Props) {
  const isCustom = data.type === 'custom';
  const typeText = isCustom ? data.customType : data.type;
  
  const typeParts = [
    typeText, 
    data.rarity, 
    data.attune ? 'Requires Attunement' : ''
  ].filter(Boolean).join(' — ');

  const divStyle = {
    height: '1px',
    margin: '10px 0',
    border: 'none',
    background: theme.divider
  };

  return (
    <div className="dnd-card" id="the-card">
      <div 
        className="dnd-card-inner" 
        style={{ background: theme.bg, borderColor: theme.border, color: theme.text }}
      >
        <div className="dnd-corner tl" style={{ borderColor: theme.border }}></div>
        <div className="dnd-corner tr" style={{ borderColor: theme.border }}></div>
        <div className="dnd-corner bl" style={{ borderColor: theme.border }}></div>
        <div className="dnd-corner br" style={{ borderColor: theme.border }}></div>

        <p className="dnd-name" style={{ color: theme.accent }}>
          {data.name || 'Unnamed'}
        </p>
        <p className="dnd-type" style={{ color: theme.muted }}>
          <span className="dnd-pip" style={{ background: theme.pip }}></span>
          {typeParts}
        </p>

        {/* Stats */}
        <hr className="dnd-divider" style={divStyle} />
        <div className="dnd-stats">
          {data.dmg && (
            <div>
              <span className="dnd-stat-lbl" style={{ color: theme.muted }}>Damage</span>
              <span className="dnd-stat-val">{data.dmg}</span>
            </div>
          )}
          {data.props && (
            <div>
              <span className="dnd-stat-lbl" style={{ color: theme.muted }}>Properties</span>
              <span className="dnd-stat-val">{data.props}</span>
            </div>
          )}
          {data.req && (
            <div>
              <span className="dnd-stat-lbl" style={{ color: theme.muted }}>Requirement</span>
              <span className="dnd-stat-val">{data.req}</span>
            </div>
          )}
        </div>

        {/* Flavor */}
        {data.flavor && (
          <>
            <hr className="dnd-divider" style={divStyle} />
            <p 
              className="dnd-flavor" 
              style={{ borderColor: theme.flavorBorder, background: theme.flavorBg, color: theme.flavorText }}
            >
              {data.flavor}
            </p>
          </>
        )}

        {/* Abilities */}
        {data.abilities.length > 0 && (
          <>
            <hr className="dnd-divider" style={divStyle} />
            <ul className="dnd-abilities">
              {data.abilities.map((a, i) => (
                <li key={i}>
                  <span className="dnd-ability-name" style={{ color: theme.accent }}>{a.name ? `${a.name}. ` : ''}</span>
                  <span dangerouslySetInnerHTML={{ __html: a.desc }} />
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Set Note */}
        {data.setNote && (
          <div 
            className="dnd-set" 
            style={{ borderColor: theme.border, background: theme.setBg, color: theme.muted }}
          >
            {data.setNote}
          </div>
        )}
      </div>
    </div>
  );
}
