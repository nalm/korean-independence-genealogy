import React, { useState, useMemo } from 'react';
import { Organization, Period, Category } from '../data/types';
import { LINEAGE_STREAMS, LineageStream } from '../data/lineages';
import { RELATION_DEFINITIONS } from '../data/relations';
import { ArrowRight, Sparkles, MapPin, Users, Calendar, Milestone, ShieldCheck } from 'lucide-react';

interface LineageFlowViewProps {
  periods: Period[];
  categories: Category[];
  organizations: Organization[];
  onSelectOrg: (org: Organization) => void;
  selectedOrgId: string | null;
}

export const LineageFlowView: React.FC<LineageFlowViewProps> = ({
  periods,
  categories,
  organizations,
  onSelectOrg,
  selectedOrgId,
}) => {
  const [activeStreamId, setActiveStreamId] = useState<string>(LINEAGE_STREAMS[0].id);

  const orgMap = useMemo(() => {
    const map = new Map<string, Organization>();
    organizations.forEach((org) => map.set(org.id, org));
    return map;
  }, [organizations]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, Category>();
    categories.forEach((cat) => map.set(cat.id, cat));
    return map;
  }, [categories]);

  const activeStream = useMemo(() => {
    return LINEAGE_STREAMS.find((s) => s.id === activeStreamId) || LINEAGE_STREAMS[0];
  }, [activeStreamId]);

  // Group stream organizations by period
  const streamOrgsByPeriod = useMemo(() => {
    const streamNodes = activeStream.nodeIds
      .map((id) => orgMap.get(id))
      .filter((org): org is Organization => Boolean(org));

    const map: Record<string, Organization[]> = {};
    periods.forEach((p) => {
      map[p.id] = [];
    });

    streamNodes.forEach((org) => {
      if (map[org.periodId]) {
        map[org.periodId].push(org);
      }
    });

    return map;
  }, [activeStream, orgMap, periods]);

  return (
    <div className="max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
      {/* Stream Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {LINEAGE_STREAMS.map((stream, idx) => {
          const isSelected = stream.id === activeStreamId;
          return (
            <button
              key={stream.id}
              onClick={() => setActiveStreamId(stream.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-xs ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-md scale-[1.01]'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: stream.color }}
              />
              <span>{idx + 1}. {stream.title.split(' ')[0]} {stream.title.split(' ')[1] || ''}</span>
            </button>
          );
        })}
      </div>

      {/* Stream Overview Card */}
      <div
        className="p-6 rounded-2xl border bg-white dark:bg-[#111622] shadow-sm relative overflow-hidden"
        style={{ borderLeftColor: activeStream.color, borderLeftWidth: '6px' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                주요 핵심 계보 스트림
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                총 {activeStream.nodeIds.length}개 핵심 단체 연결
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white mb-1.5">
              {activeStream.title}
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
              {activeStream.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeStream.description}
            </p>
          </div>

          {/* Key Turning Points Sidebar */}
          <div className="lg:w-96 shrink-0 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-3">
              <Milestone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>계보의 역사적 대전환점</span>
            </h4>
            <div className="space-y-2.5">
              {activeStream.keyTurningPoints.map((tp, i) => (
                <div key={i} className="text-xs border-l-2 border-indigo-400 pl-2.5 py-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{tp.year}</span>
                    <span>{tp.title}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 leading-snug">
                    {tp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Flow Diagram */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>시대별 조직 전개 및 통합·분화 경로</span>
          </h3>
          <span className="text-xs text-slate-400">
            ※ 카드를 클릭하면 상세 아카이브와 직전/직후 단체 이동 링크가 열립니다.
          </span>
        </div>

        {/* Periods Pipeline Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4" style={{ minWidth: '1200px' }}>
          {periods.map((period) => {
            const orgs = streamOrgsByPeriod[period.id] || [];

            return (
              <div
                key={period.id}
                className="flex flex-col bg-slate-50/70 dark:bg-slate-800/30 rounded-xl p-3 border border-slate-200/60 dark:border-slate-700/60"
              >
                {/* Column Period Header */}
                <div className="pb-2.5 mb-3 border-b border-slate-200 dark:border-slate-700/70 text-center">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {period.range}
                  </span>
                  <h4 className="font-serif font-black text-xs text-slate-900 dark:text-white mt-1.5">
                    {period.name}
                  </h4>
                </div>

                {/* Nodes Stack */}
                <div className="flex-1 flex flex-col gap-3">
                  {orgs.map((org) => {
                    const isSelected = selectedOrgId === org.id;
                    const cat = categoryMap.get(org.category);

                    return (
                      <div
                        key={org.id}
                        onClick={() => onSelectOrg(org)}
                        className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/90 border-indigo-500 dark:border-indigo-400 shadow-md ring-2 ring-indigo-500/20'
                            : 'bg-white dark:bg-[#161d2b] border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:shadow-md'
                        }`}
                      >
                        {/* Category & Year Tag */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.2 rounded"
                            style={{
                              backgroundColor: `${cat?.color}18`,
                              color: cat?.color,
                            }}
                          >
                            {cat?.shortName}
                          </span>
                          <span className="text-[10px] font-mono font-semibold text-slate-400">
                            {org.startYear}{org.endYear ? `~${org.endYear}` : ''}
                          </span>
                        </div>

                        {/* Org Name */}
                        <h5 className="font-serif font-bold text-sm text-slate-900 dark:text-white leading-snug">
                          {org.name}
                        </h5>

                        {/* Summary */}
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {org.summary}
                        </p>

                        {/* Key Figures */}
                        {org.figures.length > 0 && (
                          <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500 dark:text-slate-400">
                            <Users className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{org.figures.slice(0, 2).join(', ')}</span>
                          </div>
                        )}

                        {/* Outgoing Relations Chips */}
                        {org.relations.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                            {org.relations.map((rel, rIdx) => {
                              const targetOrg = orgMap.get(rel.targetId);
                              const relDef = RELATION_DEFINITIONS[rel.type];
                              return (
                                <div
                                  key={rIdx}
                                  className="flex items-center justify-between text-[10px] font-medium"
                                  style={{ color: relDef?.color }}
                                >
                                  <span className="flex items-center gap-1">
                                    <span className="font-bold">{relDef?.symbol}</span>
                                    <span>{rel.label || relDef?.name}</span>
                                  </span>
                                  <span className="truncate max-w-[80px] text-slate-500 dark:text-slate-400">
                                    {targetOrg?.name || rel.targetId}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {orgs.length === 0 && (
                    <div className="h-28 flex items-center justify-center text-xs text-slate-300 dark:text-slate-700 italic border border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl">
                      (해당 시기 조직 없음)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
