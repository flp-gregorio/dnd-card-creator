export interface Ability {
  name: string;
  desc: string;
}

export interface CardData {
  name: string;
  type: string;
  customType: string;
  rarity: string;
  attune: boolean;
  dmg: string;
  props: string;
  req: string;
  flavor: string;
  abilities: Ability[];
  setNote: string;
}

export interface Theme {
  name: string;
  swatch: string;
  bg: string;
  border: string;
  text: string;
  accent: string;
  muted: string;
  flavorBg: string;
  flavorBorder: string;
  flavorText: string;
  setBg: string;
  pip: string;
  divider: string;
  abilityMarker: string;
}
