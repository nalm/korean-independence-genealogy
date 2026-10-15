import React, { useState } from 'react';
import { Search, RotateCcw, Filter, User, Calendar, ChevronDown, ChevronUp, Link as LinkIcon } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { KEY_FIGURES } from '../data/figures';
import { RELATION_DEFINITIONS } from '../data/relations';
import { RelationType } from '../data/types';
import { PERIODS } from '../data/periods';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  selectedFigure: string | null;
  onSelectFigure: (figure: string | null) => void;
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
  activeRelationTypes: Set<RelationType>;
  onToggleRelationType: (type: RelationType) => void;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedFigure,
  onSelectFigure,
  selectedYear,
  onSelectYear,
  activeRelationTypes,
  onToggleRelationType,
  onResetFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== null ||
    selectedFigure !== null ||
    selectedYear !== null ||
    activeRelationTypes.size < Object.keys(RELATION_DEFINITIONS).length;

  return (
    <div className="bg-white dark:bg-[#111622] border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-3">
        {/* Top Search & Primary Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="단체명, 인물, 지역, 강령, 사건 검색 (예: 김구, 청산리, 임정)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Quick Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => onSelectCategory(null)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              전 분야 (6)
            </button>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{cat.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Toggle Advanced Controls Button & Reset */}
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors border border-rose-200 dark:border-rose-900/60"
                title="모든 필터 초기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>필터 초기화</span>
              </button>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-indigo-500" />
              <span>{isExpanded ? '탐색도구 접기' : '인물·연도 탐색도구'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expandable Advanced Controls: Time Slider + Figures + Relation Toggles */}
        {isExpanded && (
          <div className="mt-3.5 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Timeline Slider Section (5 cols) */}
            <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>시대 타임슬라이더</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {selectedYear ? `${selectedYear}년 활동 단체` : '전체 시대 (1905~1945)'}
                  </span>
                  {selectedYear && (
                    <button
                      onClick={() => onSelectYear(null)}
                      className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
                    >
                      전체보기
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400">1905</span>
                <input
                  type="range"
                  min="1905"
                  max="1945"
                  step="1"
                  value={selectedYear || 1925}
                  onChange={(e) => onSelectYear(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="text-[11px] font-mono text-slate-400">1945</span>
              </div>

              {/* Major Milestone Shortcuts */}
              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 overflow-x-auto text-[11px]">
                <button
                  onClick={() => onSelectYear(1907)}
                  className="px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap"
                >
                  1907 신민회
                </button>
                <button
                  onClick={() => onSelectYear(1919)}
                  className="px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap font-medium text-indigo-600 dark:text-indigo-400"
                >
                  1919 3·1운동/임정
                </button>
                <button
                  onClick={() => onSelectYear(1927)}
                  className="px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap"
                >
                  1927 신간회
                </button>
                <button
                  onClick={() => onSelectYear(1932)}
                  className="px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap"
                >
                  1932 한인애국단
                </button>
                <button
                  onClick={() => onSelectYear(1940)}
                  className="px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap font-medium text-red-600 dark:text-red-400"
                >
                  1940 광복군
                </button>
              </div>
            </div>

            {/* Figures Quick Filter (4 cols) */}
            <div className="lg:col-span-4 bg-slate-50/80 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>주요 인물 퀵 필터</span>
                </span>
                {selectedFigure && (
                  <button
                    onClick={() => onSelectFigure(null)}
                    className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
                  >
                    선택 해제
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-1">
                {KEY_FIGURES.map((fig) => {
                  const isSelected = selectedFigure === fig.name;
                  return (
                    <button
                      key={fig.name}
                      onClick={() => onSelectFigure(isSelected ? null : fig.name)}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded-full border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-indigo-400'
                      }`}
                    >
                      {fig.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Relation Lines Filter (3 cols) */}
            <div className="lg:col-span-3 bg-slate-50/80 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>계보 관계선 토글</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {activeRelationTypes.size}/{Object.keys(RELATION_DEFINITIONS).length}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(RELATION_DEFINITIONS) as RelationType[]).map((type) => {
                  const def = RELATION_DEFINITIONS[type];
                  const isActive = activeRelationTypes.has(type);
                  return (
                    <button
                      key={type}
                      onClick={() => onToggleRelationType(type)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border text-left transition-all ${
                        isActive
                          ? 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-medium shadow-xs'
                          : 'bg-slate-100/60 dark:bg-slate-800/60 border-transparent text-slate-400 dark:text-slate-500 line-through'
                      }`}
                    >
                      <span
                        className="font-bold text-xs"
                        style={{ color: isActive ? def.color : '#94a3b8' }}
                      >
                        {def.symbol}
                      </span>
                      <span className="truncate">{def.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
