import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { MatrixView } from './components/MatrixView';
import { LineageFlowView } from './components/LineageFlowView';
import { DetailDrawer } from './components/DetailDrawer';
import { LegendModal } from './components/LegendModal';

import { ORGANIZATIONS } from './data/organizations';
import { PERIODS } from './data/periods';
import { CATEGORIES } from './data/categories';
import { RELATION_DEFINITIONS } from './data/relations';
import { KEY_FIGURES } from './data/figures';
import { Organization, RelationType } from './data/types';
import { ExternalLink, Heart } from 'lucide-react';

export function App() {
  // 1. View & Theme State
  const [currentView, setCurrentView] = useState<'matrix' | 'flow'>('matrix');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);

  // 2. Active Selection State
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  // 3. Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [activeRelationTypes, setActiveRelationTypes] = useState<Set<RelationType>>(
    () => new Set(Object.keys(RELATION_DEFINITIONS) as RelationType[])
  );

  // Sync Dark mode with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Relation line toggle handler
  const handleToggleRelationType = useCallback((type: RelationType) => {
    setActiveRelationTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  // Filter Reset Handler
  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedFigure(null);
    setSelectedYear(null);
    setActiveRelationTypes(new Set(Object.keys(RELATION_DEFINITIONS) as RelationType[]));
  }, []);

  // Filtered organizations calculation
  const filteredOrgIds = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // If figure is selected, resolve their related orgs
    let figureMatchedOrgIds: Set<string> | null = null;
    if (selectedFigure) {
      const figObj = KEY_FIGURES.find((f) => f.name === selectedFigure);
      figureMatchedOrgIds = new Set<string>();
      if (figObj) {
        figObj.orgIds.forEach((id) => figureMatchedOrgIds!.add(id));
      }
    }

    const matched = new Set<string>();

    ORGANIZATIONS.forEach((org) => {
      // 1. Search Query filter
      if (q) {
        const textToSearch = [
          org.name,
          org.koreanHanja || '',
          org.summary,
          org.background,
          org.region,
          org.manifesto || '',
          org.significance,
          ...org.figures,
          ...org.activities,
        ].join(' ').toLowerCase();

        if (!textToSearch.includes(q)) return;
      }

      // 2. Category filter
      if (selectedCategory && org.category !== selectedCategory) {
        return;
      }

      // 3. Figure filter
      if (selectedFigure) {
        const hasFigureDirectly = org.figures.some((f) => f.includes(selectedFigure));
        const hasFigureInMapping = figureMatchedOrgIds?.has(org.id);
        if (!hasFigureDirectly && !hasFigureInMapping) return;
      }

      // 4. Year / Timeline filter
      if (selectedYear !== null) {
        const orgEnd = org.endYear || 1945;
        if (selectedYear < org.startYear || selectedYear > orgEnd) {
          return;
        }
      }

      matched.add(org.id);
    });

    return matched;
  }, [searchQuery, selectedCategory, selectedFigure, selectedYear]);

  // Direct select org by ID (for internal links in Drawer)
  const handleSelectOrgById = useCallback((orgId: string) => {
    const found = ORGANIZATIONS.find((o) => o.id === orgId);
    if (found) {
      setSelectedOrg(found);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f5] dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onOpenLegend={() => setIsLegendOpen(true)}
        totalOrgCount={ORGANIZATIONS.length}
        filteredCount={filteredOrgIds.size}
      />

      {/* Filter and Control Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedFigure={selectedFigure}
        onSelectFigure={setSelectedFigure}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        activeRelationTypes={activeRelationTypes}
        onToggleRelationType={handleToggleRelationType}
        onResetFilters={handleResetFilters}
      />

      {/* Main Visualizer Area */}
      <main className="flex-1 w-full">
        {currentView === 'matrix' ? (
          <MatrixView
            periods={PERIODS}
            categories={CATEGORIES}
            organizations={ORGANIZATIONS}
            selectedOrgId={selectedOrg?.id || null}
            onSelectOrg={setSelectedOrg}
            filteredOrgIds={filteredOrgIds}
            activeRelationTypes={activeRelationTypes}
          />
        ) : (
          <LineageFlowView
            periods={PERIODS}
            categories={CATEGORIES}
            organizations={ORGANIZATIONS}
            onSelectOrg={setSelectedOrg}
            selectedOrgId={selectedOrg?.id || null}
          />
        )}
      </main>

      {/* Detail Sliding Drawer */}
      <DetailDrawer
        org={selectedOrg}
        onClose={() => setSelectedOrg(null)}
        onSelectOrgById={handleSelectOrgById}
        allOrgs={ORGANIZATIONS}
        periods={PERIODS}
        categories={CATEGORIES}
      />

      {/* Legend & Guide Modal */}
      <LegendModal
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
      />

      {/* Academic Citation Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] py-6 px-4 transition-colors">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <p className="font-serif font-bold text-slate-700 dark:text-slate-300">
              일제강점기 항일·독립운동 단체 분류 및 계보 디지털 아카이브 (1905~1945)
            </p>
            <p className="mt-1 text-[11px]">
              자료 출처: 국사편찬위원회 한국독립운동사편찬위원회, 한국학중앙연구원 한국민족문화대백과사전, 독립기념관 한국독립운동사연구소
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://encykorea.aks.ac.kr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
            >
              <span>한국민족문화대백과</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.i815.or.kr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
            >
              <span>독립기념관</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <span>기억과 계승</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
