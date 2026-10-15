import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Organization, Period, Category, RelationType } from '../data/types';
import { RELATION_DEFINITIONS } from '../data/relations';
import { MapPin, Users, ArrowRight, ExternalLink } from 'lucide-react';

interface MatrixViewProps {
  periods: Period[];
  categories: Category[];
  organizations: Organization[];
  selectedOrgId: string | null;
  onSelectOrg: (org: Organization) => void;
  filteredOrgIds: Set<string>;
  activeRelationTypes: Set<RelationType>;
}

interface ConnectionLine {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationType;
  label?: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isHighlighted: boolean;
  color: string;
  dash?: string;
}

export const MatrixView: React.FC<MatrixViewProps> = ({
  periods,
  categories,
  organizations,
  selectedOrgId,
  onSelectOrg,
  filteredOrgIds,
  activeRelationTypes,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredOrgId, setHoveredOrgId] = useState<string | null>(null);
  const [lines, setLines] = useState<ConnectionLine[]>([]);

  // Create an org map for quick lookup
  const orgMap = useMemo(() => {
    const map = new Map<string, Organization>();
    organizations.forEach((org) => map.set(org.id, org));
    return map;
  }, [organizations]);

  // Find all directly connected IDs (upstream and downstream)
  const activeFocusId = hoveredOrgId || selectedOrgId;

  const connectedIds = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    const set = new Set<string>();
    set.add(activeFocusId);

    // Direct downstream
    const focusOrg = orgMap.get(activeFocusId);
    if (focusOrg) {
      focusOrg.relations.forEach((rel) => set.add(rel.targetId));
    }

    // Direct upstream
    organizations.forEach((org) => {
      org.relations.forEach((rel) => {
        if (rel.targetId === activeFocusId) {
          set.add(org.id);
        }
      });
    });

    return set;
  }, [activeFocusId, orgMap, organizations]);

  // Group organizations by [periodId][categoryId]
  const matrixData = useMemo(() => {
    const data: Record<string, Record<string, Organization[]>> = {};
    periods.forEach((p) => {
      data[p.id] = {};
      categories.forEach((c) => {
        data[p.id][c.id] = [];
      });
    });

    organizations.forEach((org) => {
      if (data[org.periodId] && data[org.periodId][org.category]) {
        data[org.periodId][org.category].push(org);
      }
    });

    return data;
  }, [periods, categories, organizations]);

  // Recalculate SVG connection lines based on DOM coordinates
  const updateConnections = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;

    const newLines: ConnectionLine[] = [];

    organizations.forEach((sourceOrg) => {
      sourceOrg.relations.forEach((rel, idx) => {
        if (!activeRelationTypes.has(rel.type)) return;

        const targetOrg = orgMap.get(rel.targetId);
        if (!targetOrg) return;

        const sourceEl = container.querySelector(`[data-org-id="${sourceOrg.id}"]`);
        const targetEl = container.querySelector(`[data-org-id="${targetOrg.id}"]`);

        if (sourceEl && targetEl) {
          const sRect = sourceEl.getBoundingClientRect();
          const tRect = targetEl.getBoundingClientRect();

          // Calculate start and end anchors relative to container content
          const x1 = sRect.left - containerRect.left + scrollLeft + sRect.width / 2;
          const y1 = sRect.top - containerRect.top + scrollTop + sRect.height;
          const x2 = tRect.left - containerRect.left + scrollLeft + tRect.width / 2;
          const y2 = tRect.top - containerRect.top + scrollTop;

          const isHighlighted =
            activeFocusId === sourceOrg.id ||
            activeFocusId === targetOrg.id ||
            (activeFocusId ? connectedIds.has(sourceOrg.id) && connectedIds.has(targetOrg.id) : false);

          const relDef = RELATION_DEFINITIONS[rel.type];

          newLines.push({
            id: `${sourceOrg.id}->${targetOrg.id}-${idx}`,
            sourceId: sourceOrg.id,
            targetId: targetOrg.id,
            type: rel.type,
            label: rel.label || relDef.name,
            x1,
            y1,
            x2,
            y2,
            isHighlighted,
            color: relDef.color,
            dash: relDef.strokeDash,
          });
        }
      });
    });

    setLines(newLines);
  };

  useEffect(() => {
    updateConnections();
    const handleResize = () => updateConnections();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => {
      updateConnections();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [organizations, matrixData, activeRelationTypes, activeFocusId, connectedIds]);

  return (
    <div className="relative w-full overflow-hidden bg-slate-50/50 dark:bg-[#0d121c] p-4 sm:p-6">
      {/* Active Selection Breadcrumb Banner */}
      {selectedOrgId && orgMap.get(selectedOrgId) && (
        <div className="mb-4 p-3 bg-indigo-50/90 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
            <div className="text-xs sm:text-sm">
              <span className="text-slate-500 dark:text-slate-400">선택된 단체: </span>
              <strong className="text-indigo-900 dark:text-indigo-200 font-serif font-bold text-sm sm:text-base">
                {orgMap.get(selectedOrgId)?.name}
              </strong>
              <span className="ml-2 text-xs text-indigo-700 dark:text-indigo-300">
                ({orgMap.get(selectedOrgId)?.startYear}
                {orgMap.get(selectedOrgId)?.endYear ? `~${orgMap.get(selectedOrgId)?.endYear}` : '~현재'})
              </span>
              <span className="ml-3 hidden md:inline text-xs text-slate-500 dark:text-slate-400">
                ※ 연결된 전후 계보선 및 단체가 하이라이트 표시됩니다.
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelectOrg(orgMap.get(selectedOrgId)!)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <span>상세정보 열기</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Scrollable Matrix Grid Container */}
      <div
        ref={containerRef}
        onScroll={updateConnections}
        className="relative overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] shadow-sm scrollbar-thin"
        style={{ minHeight: '700px' }}
      >
        {/* SVG Curve Connectors Overlay */}
        <svg
          className="absolute inset-0 pointer-events-none z-10 w-full h-full"
          style={{ minWidth: '1500px' }}
        >
          <defs>
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
            </marker>
            <marker
              id="arrow-highlighted"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
            </marker>
          </defs>

          {lines.map((line) => {
            const dx = line.x2 - line.x1;
            const dy = line.y2 - line.y1;
            // Generate smooth cubic bezier curve
            const controlY1 = line.y1 + Math.max(30, dy * 0.4);
            const controlY2 = line.y2 - Math.max(30, dy * 0.4);
            const pathData = `M ${line.x1} ${line.y1} C ${line.x1} ${controlY1}, ${line.x2} ${controlY2}, ${line.x2} ${line.y2}`;

            const opacity = activeFocusId ? (line.isHighlighted ? 0.95 : 0.1) : 0.4;
            const strokeWidth = line.isHighlighted ? 3 : 1.5;

            return (
              <g key={line.id} className="transition-all duration-300">
                <path
                  d={pathData}
                  fill="none"
                  stroke={line.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={line.dash}
                  opacity={opacity}
                  markerEnd={line.isHighlighted ? 'url(#arrow-highlighted)' : 'url(#arrow-default)'}
                  className={line.isHighlighted ? 'animated-line' : ''}
                />
                {line.isHighlighted && (
                  <text
                    x={(line.x1 + line.x2) / 2}
                    y={(line.y1 + line.y2) / 2}
                    fill={line.color}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="select-none bg-white font-sans"
                    style={{
                      paintOrder: 'stroke',
                      stroke: '#ffffff',
                      strokeWidth: '4px',
                      strokeLinecap: 'butt',
                      strokeLinejoin: 'miter',
                    }}
                  >
                    {line.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Matrix Table */}
        <table className="w-full border-collapse text-left" style={{ minWidth: '1500px' }}>
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141b29] sticky top-0 z-20">
              <th className="p-4 w-56 min-w-[220px] font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141b29]">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-900 dark:text-white font-serif text-sm">시기 / 활동 분야</span>
                  <span className="text-[11px] font-normal text-slate-400">1905~1945년 6대 시대구분</span>
                </div>
              </th>
              {categories.map((cat) => (
                <th
                  key={cat.id}
                  className="p-3.5 font-bold text-xs text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800 last:border-r-0 min-w-[210px] w-1/6"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-serif text-sm font-black text-slate-900 dark:text-white">
                      {cat.code} {cat.name}
                    </span>
                  </div>
                  <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 line-clamp-1">
                    {cat.description}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {periods.map((period) => (
              <tr
                key={period.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
              >
                {/* Period Header Row Cell (Leftmost) */}
                <td className="p-4 align-top border-r border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#131924]/60 sticky left-0 z-10 backdrop-blur-xs">
                  <div className="sticky top-20">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {period.range}
                      </span>
                    </div>
                    <h3 className="font-serif font-black text-sm text-slate-900 dark:text-white mb-1">
                      {period.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {period.subtitle}
                    </p>
                  </div>
                </td>

                {/* Category Cells */}
                {categories.map((cat) => {
                  const orgs = matrixData[period.id][cat.id] || [];

                  return (
                    <td
                      key={cat.id}
                      className="p-3 align-top border-r border-slate-200/80 dark:border-slate-800/80 last:border-r-0 min-w-[210px]"
                    >
                      <div className="flex flex-col gap-2.5">
                        {orgs.map((org) => {
                          const isSelected = selectedOrgId === org.id;
                          const isHovered = hoveredOrgId === org.id;
                          const isConnected = connectedIds.has(org.id);
                          const isMatchedFilter = filteredOrgIds.has(org.id);

                          // Dim card if not matched by search or if focus active and not connected
                          const isDimmed =
                            !isMatchedFilter || (activeFocusId ? !isConnected && !isHovered : false);

                          return (
                            <div
                              key={org.id}
                              data-org-id={org.id}
                              onClick={() => onSelectOrg(org)}
                              onMouseEnter={() => setHoveredOrgId(org.id)}
                              onMouseLeave={() => setHoveredOrgId(null)}
                              className={`group relative p-3 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                                isSelected
                                  ? 'bg-indigo-50 dark:bg-indigo-950/90 border-indigo-500 dark:border-indigo-400 shadow-md ring-2 ring-indigo-500/20 active-pulse'
                                  : isHovered
                                  ? 'bg-white dark:bg-slate-800 border-indigo-400 dark:border-indigo-500 shadow-md translate-y-[-1px]'
                                  : isConnected
                                  ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/80 shadow-xs'
                                  : 'bg-white dark:bg-[#161d2b] border-slate-200 dark:border-slate-800/90 hover:border-slate-300 hover:shadow-xs'
                              } ${isDimmed ? 'opacity-25 filter grayscale-[50%]' : 'opacity-100'}`}
                            >
                              {/* Card Header: Year & Region */}
                              <div className="flex items-center justify-between gap-1 mb-1.5">
                                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                                  {org.startYear}
                                  {org.endYear ? `~${org.endYear}` : '~현재'}
                                </span>
                                <span className="flex items-center gap-0.5 text-[10px] text-slate-400 dark:text-slate-400 max-w-[100px] truncate">
                                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                                  <span className="truncate">{org.region.split(' ')[0]}</span>
                                </span>
                              </div>

                              {/* Org Name */}
                              <h4 className="font-serif font-black text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                                {org.name}
                              </h4>

                              {/* Summary / Tagline */}
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                {org.summary}
                              </p>

                              {/* Key Figures Chips */}
                              {org.figures.length > 0 && (
                                <div className="flex items-center gap-1 mt-2 flex-wrap">
                                  <Users className="w-2.5 h-2.5 text-slate-400" />
                                  {org.figures.slice(0, 3).map((f) => (
                                    <span
                                      key={f}
                                      className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                                    >
                                      {f}
                                    </span>
                                  ))}
                                  {org.figures.length > 3 && (
                                    <span className="text-[9px] text-slate-400">
                                      +{org.figures.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Relation Indicator Chips */}
                              {org.relations.length > 0 && (
                                <div className="mt-2.5 pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                                  <span className="flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400">
                                    <span>계보 연결</span>
                                    <ArrowRight className="w-2.5 h-2.5" />
                                  </span>
                                  <span className="font-mono">
                                    {org.relations.map((r) => RELATION_DEFINITIONS[r.type]?.symbol).join(' ')}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {orgs.length === 0 && (
                          <div className="h-16 flex items-center justify-center text-[11px] text-slate-300 dark:text-slate-700 select-none">
                            -
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
