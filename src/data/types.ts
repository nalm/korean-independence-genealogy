export type RelationType = 'succession' | 'ideology' | 'merge' | 'split' | 'support';

export interface RelationDefinition {
  type: RelationType;
  symbol: string;
  name: string;
  description: string;
  color: string;
  strokeDash?: string;
}

export interface Period {
  id: string;
  name: string;
  range: string;
  startYear: number;
  endYear: number;
  subtitle: string;
  summary: string;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  shortName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  accentColor: string;
  description: string;
  representative: string;
}

export interface OrganizationRelation {
  targetId: string;
  type: RelationType;
  label?: string;
  description?: string;
}

export interface Organization {
  id: string;
  name: string;
  koreanHanja?: string;
  aliases?: string[];
  periodId: string;
  category: string;
  startYear: number;
  endYear?: number | null;
  region: string;
  figures: string[];
  summary: string;
  background: string;
  manifesto?: string;
  activities: string[];
  significance: string;
  cautionNotes?: string;
  lineageGroup: string;
  relations: OrganizationRelation[];
}

export interface KeyFigure {
  name: string;
  role: string;
  lifetime: string;
  description: string;
  orgIds: string[];
}
