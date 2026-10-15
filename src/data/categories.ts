import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'c1',
    code: '①',
    name: '애국계몽·교육',
    shortName: '계몽·교육',
    color: '#0d9488', // teal-600
    badgeBg: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    borderClass: 'border-teal-400 dark:border-teal-600',
    accentColor: 'border-teal-500',
    description: '교육과 산업 진흥, 청년 인재 양성, 실력양성을 통한 민족의 역량 강화 및 자립 운동',
    representative: '대한자강회, 신민회, 흥사단, 수양동우회',
  },
  {
    id: 'c2',
    code: '②',
    name: '언어·문화',
    shortName: '언어·문화',
    color: '#0284c7', // sky-600
    badgeBg: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    badgeText: 'text-sky-700 dark:text-sky-300',
    borderClass: 'border-sky-400 dark:border-sky-600',
    accentColor: 'border-sky-500',
    description: '한글 맞춤법 통일, 표준어 사정, 사전 편찬, 역사·문화 연구를 통한 민족혼 및 정체성 수호',
    representative: '국어연구학회, 조선어연구회, 조선어학회, 진단학회',
  },
  {
    id: 'c3',
    code: '③',
    name: '정치·임시정부',
    shortName: '정치·임정',
    color: '#4338ca', // indigo-700
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    borderClass: 'border-indigo-400 dark:border-indigo-600',
    accentColor: 'border-indigo-500',
    description: '대한민국 임시정부 수립, 외교 독립운동, 해외 한인 자치정부 및 독립정당 결성',
    representative: '대한민국 임시정부, 신한청년당, 대한인국민회, 한국독립당',
  },
  {
    id: 'c4',
    code: '④',
    name: '무장독립운동',
    shortName: '무장투쟁',
    color: '#b91c1c', // red-700
    badgeBg: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    badgeText: 'text-red-700 dark:text-red-300',
    borderClass: 'border-red-400 dark:border-red-600',
    accentColor: 'border-red-500',
    description: '만주·연해주 독립군 기지 건설, 봉오동·청산리 전투, 만주 3부, 한국광복군 및 조선의용군 군사작전',
    representative: '북로군정서, 서로군정서, 대한독립군단, 참의부·정의부·신민부, 한국광복군',
  },
  {
    id: 'c5',
    code: '⑤',
    name: '비밀결사·의열·혁명',
    shortName: '의열·혁명',
    color: '#d97706', // amber-600
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    borderClass: 'border-amber-400 dark:border-amber-600',
    accentColor: 'border-amber-500',
    description: '국내외 지하 비밀결사, 일제 식민통치기관 파괴 및 요인 처단, 과감한 의열 항쟁과 무장봉기 준비',
    representative: '대한광복회, 독립의군부, 의열단, 한인애국단, 조선의용대',
  },
  {
    id: 'c6',
    code: '⑥',
    name: '사회·경제·민족협동',
    shortName: '사회·협동',
    color: '#7e22ce', // purple-700
    badgeBg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    borderClass: 'border-purple-400 dark:border-purple-600',
    accentColor: 'border-purple-500',
    description: '노동·농민·청년·여성·학생·형평운동 및 국산품 장려와 좌우 민족협동전선 결성',
    representative: '신간회, 근우회, 조선물산장려회, 조선노농총동맹, 성진회·독서회',
  },
];
