import React from 'react';
import { X, BookOpen, AlertCircle, GitMerge, ArrowRight, Compass } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { RELATION_DEFINITIONS } from '../data/relations';
import { RelationType } from '../data/types';

interface LegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegendModal: React.FC<LegendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#111622] text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl z-10 border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#141b29]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg text-slate-900 dark:text-white">
                계보 아카이브 범례 및 탐색 가이드
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                1905~1945년 일제강점기 항일·독립운동 단체의 분류 기준과 연결 기호
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm scrollbar-thin">
          {/* Section 1: 5 Relation Types */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <GitMerge className="w-4 h-4 text-indigo-500" />
              <span>1. 조직 간 5대 연결 유형 (계보선 범례)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(RELATION_DEFINITIONS) as RelationType[]).map((type) => {
                const def = RELATION_DEFINITIONS[type];
                return (
                  <div
                    key={type}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-start gap-3"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 shadow-xs"
                      style={{ backgroundColor: `${def.color}20`, color: def.color }}
                    >
                      {def.symbol}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {def.name}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {def.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: 6 Activity Categories */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-teal-500" />
              <span>2. 6대 활동 분야별 분류 기준</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-bold text-slate-900 dark:text-white">
                      {cat.code} {cat.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-1.5 leading-snug">
                    {cat.description}
                  </p>
                  <div className="text-[10px] text-slate-400">
                    <strong className="text-slate-500 dark:text-slate-400">대표 단체: </strong>
                    {cat.representative}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Essential Historical Distinctions */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
            <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-2 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>3. 계보를 이해할 때 꼭 주의할 점 (오개념 방지)</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-950 dark:text-amber-200 leading-relaxed list-disc list-inside">
              <li>
                <strong>조선어연구회 ➔ 조선어학회</strong>: 동일한 학회의 명칭 변경 및 전문화 발전 계보입니다.
              </li>
              <li>
                <strong>신민회 ⇒ 흥사단</strong>: 안창호 선생을 매개로 한 인적·사상적 계승이며 동일 조직의 개칭이 아닙니다.
              </li>
              <li>
                <strong>의열단 ⇒ 조선의용대</strong>: 직접 개칭된 것이 아니라 1935년 조선민족혁명당(정당)을 결성한 뒤 1938년 정규 군사조직으로 창설되었습니다.
              </li>
              <li>
                <strong>의열단 vs 한인애국단</strong>: 의열투쟁 방식은 유사하나, 의열단은 김원봉 중심, 한인애국단은 임시정부 김구 주석 중심의 별개 결사입니다.
              </li>
              <li>
                <strong>신민회(1907) vs 신간회(1927)</strong>: 이름이 비슷하나 시기와 이념(비밀결사 vs 좌우합작 공개정당)이 완전히 다른 별개 조직입니다.
              </li>
              <li>
                <strong>대한독립군 vs 대한독립군단</strong>: 홍범도의 개별 독립군 부대와 1920년 밀산에서 결집한 10여 개 부대의 총연합군단의 차이입니다.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141b29] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
