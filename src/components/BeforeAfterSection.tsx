import { useState, useRef, type PointerEvent } from 'react'
import {
  MoveHorizontal,
  Sparkles,
  Clock,
  Users,
  Wrench,
  ArrowUpRight,
  MapPin,
} from 'lucide-react'
import {
  BA_CASES,
  type BeforeAfterCase,
  type CalcMode,
  type CleaningServiceId,
} from '../data/uborkaData'

interface BeforeAfterSectionProps {
  onLoadCaseToCalculator: (preset: BeforeAfterCase['preset']) => void
}

export function BeforeAfterSection({
  onLoadCaseToCalculator,
}: BeforeAfterSectionProps) {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0)
  const [sliderPct, setSliderPct] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  const currentCase = BA_CASES[activeCaseIdx] ?? BA_CASES[0]

  const updateSliderFromClientX = (clientX: number) => {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rawPct = ((clientX - rect.left) / rect.width) * 100
    setSliderPct(Math.max(5, Math.min(95, rawPct)))
  }

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    updateSliderFromClientX(e.clientX)
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    updateSliderFromClientX(e.clientX)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  return (
    <section
      id="results"
      className="airy-mesh-bg scroll-mt-20 border-b border-violet-100 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + 4 Case Tabs from TZ */}
        <div className="flex flex-col justify-between gap-6 border-b border-violet-100 pb-8 lg:flex-row lg:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100/90 px-3.5 py-1 text-xs font-extrabold tracking-wider text-violet-800 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-violet-600" />
              <span>Блок 3 • Интерактивные результаты «До / После»</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Двигай ползунок:{' '}
              <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                магия чистоты наглядно
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {BA_CASES.map((item, idx) => {
              const active = idx === activeCaseIdx
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveCaseIdx(idx)
                    setSliderPct(50)
                  }}
                  className={`cursor-pointer rounded-2xl px-4 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                    active
                      ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                      : 'border border-violet-200/80 bg-white text-slate-700 hover:border-violet-400 hover:text-violet-700'
                  }`}
                >
                  {idx + 1}. {item.tabLabel}
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Slider + Case Passport */}
        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-12">
          {/* Left 7 cols: Before / After Drag Viewport */}
          <div className="lg:col-span-7">
            <div
              ref={stageRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative h-80 cursor-ew-resize overflow-hidden rounded-3xl border border-violet-200 bg-slate-900 shadow-2xl shadow-indigo-950/10 select-none touch-pan-y sm:h-[430px]"
            >
              {/* AFTER Layer (Full width base) */}
              <img
                src={currentCase.imgAfter}
                alt={currentCase.afterLabel}
                draggable={false}
                className="h-full w-full object-cover"
              />

              {/* BEFORE Layer (Clipped via clip-path so image never stretches) */}
              <div
                style={{
                  clipPath: `inset(0 ${100 - sliderPct}% 0 0)`,
                }}
                className="absolute inset-0"
              >
                <img
                  src={currentCase.imgBefore}
                  alt={currentCase.beforeLabel}
                  draggable={false}
                  className="h-full w-full object-cover brightness-75 contrast-90 sepia-[.45] saturate-75"
                />
                <div className="absolute inset-0 bg-amber-950/20" />
              </div>

              {/* Labels */}
              <div className="pointer-events-none absolute top-4 left-4 z-20 rounded-xl bg-slate-950/85 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md backdrop-blur-md">
                {currentCase.beforeLabel}
              </div>

              <div className="pointer-events-none absolute top-4 right-4 z-20 rounded-xl bg-gradient-to-r from-violet-600 to-sky-500 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md">
                ПОСЛЕ «UBORKA BRO»
              </div>

              {/* Range helper for keyboard accessibility */}
              <input
                type="range"
                min={5}
                max={95}
                value={Math.round(sliderPct)}
                onChange={(e) => setSliderPct(Number(e.target.value))}
                aria-label="Ползунок сравнения До и После"
                className="sr-only"
              />

              {/* Divider Line & Handle */}
              <div
                style={{ left: `${sliderPct}%` }}
                className="pointer-events-none absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)]"
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-white bg-gradient-to-br from-violet-600 to-sky-500 text-white shadow-xl">
                  <MoveHorizontal className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 cols: Case Details Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-violet-200/80 bg-white p-6 shadow-xl shadow-indigo-950/5 sm:p-8 lg:col-span-5">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs">
                <span className="inline-flex items-center gap-1.5 font-extrabold text-violet-700 uppercase">
                  <MapPin className="h-3.5 w-3.5" />
                  {currentCase.location}
                </span>
                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700">
                  Реальный кейс Бро
                </span>
              </div>

              <h3 className="font-display text-xl font-extrabold text-slate-950 sm:text-2xl">
                {currentCase.title}
              </h3>

              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                {currentCase.desc}
              </p>

              <div className="t-nums space-y-2.5 rounded-2xl bg-slate-50/90 p-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <span className="flex items-center gap-2 font-semibold text-slate-500">
                    <Clock className="h-4 w-4 text-violet-600" />
                    Длительность:
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {currentCase.time}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <span className="flex items-center gap-2 font-semibold text-slate-500">
                    <Users className="h-4 w-4 text-sky-600" />
                    Состав команды:
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {currentCase.crew}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold text-slate-500">
                    <Wrench className="h-4 w-4 text-indigo-600" />
                    Техника и химия:
                  </span>
                  <span className="text-right font-extrabold text-slate-900">
                    {currentCase.equip}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3.5 border-t border-slate-100 pt-5">
              <div className="t-nums flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Стоимость такого заказа:
                </span>
                <span className="font-display text-2xl font-extrabold text-slate-950 sm:text-3xl">
                  {currentCase.price}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onLoadCaseToCalculator(currentCase.preset)
                  document
                    .getElementById('calculator')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 text-xs font-extrabold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:text-sm"
              >
                <span>Загрузить этот расчёт в калькулятор</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export type { CalcMode, CleaningServiceId }
