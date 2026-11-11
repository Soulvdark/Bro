import { useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  Layers,
} from 'lucide-react'
import {
  CLEANING_TARIFFS,
  SERVICE_REGULATIONS,
  ROOM_VIEW_IMAGES,
  type CleaningServiceId,
} from '../data/uborkaData'

interface ServiceChecklistsSectionProps {
  onSelectInCalculator: (serviceId: CleaningServiceId) => void
}

export function ServiceChecklistsSection({
  onSelectInCalculator,
}: ServiceChecklistsSectionProps) {
  const [activeTab, setActiveTab] = useState<CleaningServiceId>('regular')
  const [openAccordions, setOpenAccordions] = useState<number[]>([0, 1])
  const [roomView, setRoomView] = useState<'rooms' | 'kitchen' | 'bath'>('rooms')
  const [activeHotspotIdx, setActiveHotspotIdx] = useState(0)

  const currentReg = SERVICE_REGULATIONS[activeTab]
  const currentHotspot =
    currentReg.hotspots[activeHotspotIdx] ?? currentReg.hotspots[0]

  const handleTabSwitch = (id: CleaningServiceId) => {
    setActiveTab(id)
    setOpenAccordions([0])
    setActiveHotspotIdx(0)
  }

  const toggleAccordion = (idx: number) => {
    setOpenAccordions((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    )
  }

  return (
    <section
      id="services"
      className="scroll-mt-20 border-b border-violet-100 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-violet-100 pb-8 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100/80 px-3.5 py-1 text-xs font-extrabold tracking-wider text-sky-800 uppercase">
              <Layers className="h-3.5 w-3.5 text-sky-600" />
              <span>Блок 2 • Что входит в уборку (Чек-листы по типам услуг)</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Прозрачные чек-листы:{' '}
              <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                что именно делает Бро
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
            Переключайте вкладки ниже, чтобы увидеть подробный список работ в
            комнатах, на кухне и в санузле для каждого из 6 видов уборки.
          </p>
        </div>

        {/* 6 Tabs Bar */}
        <div className="no-scrollbar flex items-center gap-2.5 overflow-x-auto py-6">
          {CLEANING_TARIFFS.map((t, index) => {
            const active = t.id === activeTab
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleTabSwitch(t.id)}
                className={`cursor-pointer rounded-2xl px-4 py-3 text-xs font-extrabold whitespace-nowrap transition-all sm:text-sm ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 text-white shadow-lg shadow-violet-500/25'
                    : 'border border-slate-200/90 bg-slate-50/70 text-slate-700 hover:border-violet-300 hover:bg-violet-50/60 hover:text-violet-700'
                }`}
              >
                <span className="t-nums mr-1.5 opacity-75">0{index + 1}.</span>
                {t.short}
              </button>
            )
          })}
        </div>

        {/* 2-Column Content: Left = Accordions per TZ, Right = Interactive Room Control Map */}
        <div className="mt-4 grid items-start gap-8 lg:grid-cols-12">
          {/* Left 6 cols: Service Header + Accordions */}
          <div className="space-y-5 lg:col-span-6">
            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-50/90 via-white to-sky-50/80 p-6 shadow-sm sm:flex-row sm:items-center">
              <div className="space-y-1">
                <div className="t-nums text-xs font-extrabold text-violet-700">
                  {currentReg.rateInfo}
                </div>
                <h3 className="font-display text-xl font-extrabold text-slate-950 sm:text-2xl">
                  {currentReg.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {currentReg.broTip}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectInCalculator(activeTab)
                  document
                    .getElementById('calculator')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-xs font-extrabold text-white shadow-md transition hover:bg-violet-600"
              >
                <span>Рассчитать этот тип</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Expandable Accordions */}
            <div className="space-y-3.5">
              {currentReg.accordions.map((acc, idx) => {
                const isOpen = openAccordions.includes(idx)
                return (
                  <div
                    key={acc.zone}
                    className={`overflow-hidden rounded-2xl border transition-all ${
                      isOpen
                        ? 'border-violet-300 bg-white shadow-md shadow-violet-500/5'
                        : 'border-slate-200/80 bg-slate-50/60 hover:border-violet-200 hover:bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <div>
                        <div className="font-display text-sm font-extrabold text-slate-950 sm:text-base">
                          {acc.zone}
                        </div>
                        <div className="text-xs text-slate-500">
                          {acc.subtitle}
                        </div>
                      </div>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 ${
                          isOpen
                            ? 'rotate-180 bg-violet-600 text-white'
                            : 'bg-white text-slate-700 ring-1 ring-slate-200'
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-violet-100/80 bg-gradient-to-b from-violet-50/30 to-white px-5 pt-3 pb-5">
                        <ul className="space-y-2.5">
                          {acc.items.map((line, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-700 sm:text-sm"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right 6 cols: Interactive Visual Inspection Card */}
          <div className="overflow-hidden rounded-3xl border border-violet-200/80 bg-slate-50/60 shadow-xl shadow-indigo-950/5 lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-100 bg-white px-5 py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-600" />
                <span className="text-xs font-extrabold tracking-wider text-slate-900 uppercase">
                  Интерактивная схема точек внимания Бро
                </span>
              </div>

              <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1">
                {[
                  { id: 'rooms', label: 'Комнаты' },
                  { id: 'kitchen', label: 'Кухня' },
                  { id: 'bath', label: 'Санузел' },
                ].map((view) => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() =>
                      setRoomView(view.id as 'rooms' | 'kitchen' | 'bath')
                    }
                    className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-bold transition ${
                      roomView === view.id
                        ? 'bg-white text-violet-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Stage */}
            <div className="relative h-72 bg-slate-900 sm:h-80">
              <img
                src={ROOM_VIEW_IMAGES[roomView]}
                alt="Зона контроля чистоты Uborka Bro"
                className="h-full w-full object-cover opacity-90 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

              {currentReg.hotspots.map((spot, idx) => {
                const isSelected = idx === activeHotspotIdx
                return (
                  <button
                    key={spot.title}
                    type="button"
                    onClick={() => setActiveHotspotIdx(idx)}
                    style={{ top: spot.top, left: spot.left }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl border px-3 py-1.5 text-xs font-extrabold shadow-lg transition-all duration-200 ${
                      isSelected
                        ? 'scale-105 border-white bg-gradient-to-r from-violet-600 to-sky-500 text-white ring-4 ring-violet-500/30'
                        : 'border-white/80 bg-white/95 text-slate-900 hover:scale-105 hover:bg-violet-600 hover:text-white'
                    }`}
                  >
                    <span className="t-nums mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-md bg-slate-950/20 text-[10px]">
                      0{idx + 1}
                    </span>
                    <span>{spot.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Hotspot Description Footer */}
            <div className="flex flex-col justify-between gap-4 border-t border-violet-100 bg-white p-5 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="t-nums rounded-lg bg-violet-100 px-2.5 py-0.5 text-[11px] font-extrabold text-violet-700">
                    Точка 0{activeHotspotIdx + 1}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {currentHotspot.title}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  {currentHotspot.desc}
                </p>
              </div>

              <span className="shrink-0 rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2 text-xs font-extrabold text-sky-800">
                {currentHotspot.chem}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
