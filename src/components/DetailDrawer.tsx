import React, { useEffect } from 'react';
import { Organization, Period, Category } from '../data/types';
import { RELATION_DEFINITIONS } from '../data/relations';
import { KEY_FIGURES } from '../data/figures';
import {
  X,
  MapPin,
  Users,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ScrollText,
  History,
  Award,
  BookOpen,
  Share2,
} from 'lucide-react';

interface DetailDrawerProps {
  org: Organization | null;
  onClose: () => void;
  onSelectOrgById: (orgId: string) => void;
  allOrgs: Organization[];
  periods: Period[];
  categories: Category[];
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  org,
  onClose,
  onSelectOrgById,
  allOrgs,
  periods,
  categories,
}) => {
  // ESC key handler to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!org) return null;

  const orgMap = new Map<string, Organization>();
  allOrgs.forEach((o) => orgMap.set(o.id, o));

  const currentCategory = categories.find((c) => c.id === org.category);
  const currentPeriod = periods.find((p) => p.id === org.periodId);

  // Upstream organizations (where targetId === org.id)
  const upstreamRelations: { sourceOrg: Organization; type: string; label?: string }[] = [];
  allOrgs.forEach((o) => {
    o.relations.forEach((rel) => {
      if (rel.targetId === org.id) {
        upstreamRelations.push({
          sourceOrg: o,
          type: rel.type,
          label: rel.label,
        });
      }
    });
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over Content Drawer */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111622] text-slate-800 dark:text-slate-100 shadow-2xl z-10 flex flex-col h-full border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#141b29] shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Category & Period Badges */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {currentCategory && (
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${currentCategory.color}15`,
                      color: currentCategory.color,
                      border: `1px solid ${currentCategory.color}40`,
                    }}
                  >
                    {currentCategory.code} {currentCategory.name}
                  </span>
                )}
                {currentPeriod && (
                  <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {currentPeriod.range} ({currentPeriod.name})
                  </span>
                )}
              </div>

              {/* Title & Hanja */}
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                <span>{org.name}</span>
                {org.koreanHanja && (
                  <span className="text-lg font-normal text-slate-400 font-serif">
                    ({org.koreanHanja})
                  </span>
                )}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="닫기 (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Meta Row */}
          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5 font-medium">활동 시기</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                {org.startYear}년 {org.endYear ? `~ ${org.endYear}년` : '~ 현재'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5 font-medium">활동 거점</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate">{org.region}</span>
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block mb-0.5 font-medium">핵심 계보</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{org.lineageGroup}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60">
            <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>개요 및 핵심 정체성</span>
            </h4>
            <p className="text-sm font-serif font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              "{org.summary}"
            </p>
          </div>

          {/* Key Figures */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-500" />
              <span>주요 핵심 인물</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {org.figures.map((fig) => {
                const figureInfo = KEY_FIGURES.find((f) => f.name === fig);
                return (
                  <div
                    key={fig}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex-1 min-w-[140px]"
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{fig}</span>
                      {figureInfo && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {figureInfo.lifetime}
                        </span>
                      )}
                    </div>
                    {figureInfo && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {figureInfo.role}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected Lineage Navigator (Predecessors & Successors) */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#131924]/60">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>조직 계보 이동 경로 (클릭 시 이동)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Upstream / Predecessors */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-2 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3 text-slate-400" />
                  <span>이전 기원·통합 전 조직 ({upstreamRelations.length})</span>
                </span>
                <div className="space-y-1.5">
                  {upstreamRelations.map((up, i) => {
                    const relDef = RELATION_DEFINITIONS[up.type as keyof typeof RELATION_DEFINITIONS];
                    return (
                      <button
                        key={i}
                        onClick={() => onSelectOrgById(up.sourceOrg.id)}
                        className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {up.sourceOrg.name}
                          </span>
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.2 rounded"
                            style={{
                              backgroundColor: `${relDef?.color}15`,
                              color: relDef?.color,
                            }}
                          >
                            {relDef?.symbol} {up.label || relDef?.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {up.sourceOrg.startYear}년
                        </span>
                      </button>
                    );
                  })}
                  {upstreamRelations.length === 0 && (
                    <p className="text-xs text-slate-400 italic p-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      (직계 기원 조직 없음 / 초기 창립)
                    </p>
                  )}
                </div>
              </div>

              {/* Downstream / Successors */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-2 flex items-center gap-1">
                  <span>후속 계승·통합·분화 조직 ({org.relations.length})</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </span>
                <div className="space-y-1.5">
                  {org.relations.map((rel, i) => {
                    const target = orgMap.get(rel.targetId);
                    const relDef = RELATION_DEFINITIONS[rel.type];
                    return (
                      <button
                        key={i}
                        onClick={() => onSelectOrgById(rel.targetId)}
                        className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {target?.name || rel.targetId}
                          </span>
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.2 rounded"
                            style={{
                              backgroundColor: `${relDef?.color}15`,
                              color: relDef?.color,
                            }}
                          >
                            {relDef?.symbol} {rel.label || relDef?.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {target?.startYear}년
                        </span>
                      </button>
                    );
                  })}
                  {org.relations.length === 0 && (
                    <p className="text-xs text-slate-400 italic p-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      (후속 계승 조직 없음 / 최종 발전)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Background */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <History className="w-4 h-4 text-indigo-500" />
              <span>결성 배경 및 시대적 맥락</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              {org.background}
            </p>
          </div>

          {/* Manifesto / Slogans */}
          {org.manifesto && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ScrollText className="w-4 h-4 text-amber-500" />
                <span>행동 강령 및 선언문</span>
              </h3>
              <div className="bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs sm:text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">
                {org.manifesto}
              </div>
            </div>
          )}

          {/* Activities List */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>주요 역사적 활동 및 의거</span>
            </h3>
            <ul className="space-y-2">
              {org.activities.map((act, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Significance */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>역사적 의의 및 학술적 평가</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-emerald-50/40 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60">
              {org.significance}
            </p>
          </div>

          {/* Caution / Fact Check Notes */}
          {org.cautionNotes && (
            <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs mb-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>계보 이해 시 주의할 점 & 오개념 팩트체크</span>
              </div>
              <p className="text-xs text-rose-950 dark:text-rose-200 leading-relaxed">
                {org.cautionNotes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
