import { RelationDefinition, RelationType } from './types';

export const RELATION_DEFINITIONS: Record<RelationType, RelationDefinition> = {
  succession: {
    type: 'succession',
    symbol: '→',
    name: '개칭·조직 계승',
    description: '같은 조직의 명칭 변경 또는 직접적 재편 및 사업 승계',
    color: '#2563eb', // blue-600
  },
  ideology: {
    type: 'ideology',
    symbol: '⇒',
    name: '인적·사상적 계승',
    description: '인물과 활동 노선이 연결되나 별도로 창립된 조직',
    color: '#7c3aed', // violet-600
  },
  merge: {
    type: 'merge',
    symbol: '+',
    name: '통합·연합',
    description: '여러 조직이 합쳐져 단일 통합 조직 또는 연합체 결성',
    color: '#059669', // emerald-600
  },
  split: {
    type: 'split',
    symbol: '↳',
    name: '분화·파생',
    description: '기존 조직에서 일부 세력이나 노선이 분리·독립하여 결성',
    color: '#ea580c', // orange-600
  },
  support: {
    type: 'support',
    symbol: '⇢',
    name: '영향·지원',
    description: '조직적·정치적 영향, 독립운동 기여 또는 재정·군사 지원 관계',
    color: '#64748b', // slate-500
    strokeDash: '4,4',
  },
};
