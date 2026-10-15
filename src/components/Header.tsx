import React from 'react';
import { Network, Grid3X3, Moon, Sun, Info, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentView: 'matrix' | 'flow';
  onViewChange: (view: 'matrix' | 'flow') => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenLegend: () => void;
  totalOrgCount: number;
  filteredCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  darkMode,
  onToggleDarkMode,
  onOpenLegend,
  totalOrgCount,
  filteredCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#111622]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-700 via-blue-800 to-red-700 flex items-center justify-center text-white shadow-md shadow-indigo-900/20 font-bold text-lg select-none">
            光
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                일제강점기 항일·독립운동 단체 계보 아카이브
              </h1>
              <span className="hidden lg:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
                1905 ~ 1945
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
              <span>시기(행) × 활동 분야(열) 통합·분화·계승 인터랙티브 네트워크</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {filteredCount === totalOrgCount
                  ? `총 ${totalOrgCount}개 단체 수록`
                  : `${filteredCount} / ${totalOrgCount}개 단체 표시 중`}
              </span>
            </p>
          </div>
        </div>

        {/* View switcher & Action controls */}
        <div className="flex items-center gap-2.5 self-end md:self-center">
          {/* View Mode Toggle Buttons */}
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl flex items-center border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => onViewChange('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentView === 'matrix'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>매트릭스 격자 뷰</span>
            </button>
            <button
              onClick={() => onViewChange('flow')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentView === 'flow'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>계보 플로우 뷰</span>
            </button>
          </div>

          {/* Guide / Legend Button */}
          <button
            onClick={onOpenLegend}
            title="범례 및 사용 가이드"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">계보 범례·가이드</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
