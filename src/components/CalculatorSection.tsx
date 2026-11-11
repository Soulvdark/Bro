import { useState, type FormEvent } from 'react'
import {
  Sparkles,
  Leaf,
  Truck,
  Moon,
  Sofa,
  Check,
  Send,
  MessageSquare,
  Info,
  RotateCcw,
  Users,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import {
  CLEANING_TARIFFS,
  DRYCLEAN_CATALOG,
  formatDram,
  type CalcMode,
  type CleaningServiceId,
} from '../data/uborkaData'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'

export interface ExtrasState {
  eco: boolean
  equip: boolean
  night: boolean
}

interface CalculatorSectionProps {
  mode: CalcMode
  onChangeMode: (mode: CalcMode) => void
  serviceId: CleaningServiceId
  onSelectService: (id: CleaningServiceId) => void
  area: number
  onChangeArea: (area: number) => void
  extras: ExtrasState
  onToggleExtra: (key: keyof ExtrasState) => void
  dryCounts: Record<string, number>
  onChangeDryCount: (id: string, delta: number) => void
  carpetM2: number
  onChangeCarpetM2: (val: number) => void
  onResetDryClean: () => void
  onApplyPreset: (
    serviceId: CleaningServiceId,
    area: number,
    mode: CalcMode,
    withEquip: boolean
  ) => void
}

export function CalculatorSection({
  mode,
  onChangeMode,
  serviceId,
  onSelectService,
  area,
  onChangeArea,
  extras,
  onToggleExtra,
  dryCounts,
  onChangeDryCount,
  carpetM2,
  onChangeCarpetM2,
  onResetDryClean,
  onApplyPreset,
}: CalculatorSectionProps) {
  const [dryFilter, setDryFilter] = useState<'all' | 'sofas' | 'chairs' | 'mattress'>('all')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  const tariff =
    CLEANING_TARIFFS.find((t) => t.id === serviceId) ?? CLEANING_TARIFFS[0]

  // Price Calculation strictly per TZ
  const rawCleaningDram = area * tariff.rate
  const maxCoveredM2 = Math.floor(tariff.min / tariff.rate)
  const isBelowMinimum =
    (mode === 'cleaning' || mode === 'combo') && rawCleaningDram < tariff.min

  let subtotalDram = 0
  let estHours = 0
  const specRows: { name: string; cost: string; sub?: string }[] = []

  if (mode === 'cleaning' || mode === 'combo') {
    const appliedCleanCost = Math.max(rawCleaningDram, tariff.min)
    subtotalDram += appliedCleanCost
    estHours += tariff.baseHours + Math.max(0, (area - 45) * 0.04)

    specRows.push({
      name: `${tariff.title} (${area} м² × ${tariff.rate} ֏)`,
      cost: `${formatDram(appliedCleanCost)} ֏`,
      sub: isBelowMinimum
        ? `Действует минимальная сумма «От» (${formatDram(tariff.min)} ֏)`
        : undefined,
    })

    if (extras.eco) {
      subtotalDram += 5000
      specRows.push({
        name: 'Уборка с эко-химией',
        cost: '+ 5 000 ֏',
      })
    }

    if (extras.equip) {
      subtotalDram += 5000
      specRows.push({
        name: 'Доставка пылесоса и парогенератора',
        cost: '+ 5 000 ֏',
      })
    }
  }

  if (mode === 'dryclean' || mode === 'combo') {
    DRYCLEAN_CATALOG.forEach((item) => {
      const qty = dryCounts[item.id] || 0
      if (qty > 0) {
        const lineCost = qty * item.price
        subtotalDram += lineCost
        estHours += qty * 0.5
        specRows.push({
          name: `Химчистка: ${item.name} (${qty} шт. × ${formatDram(item.price)} ֏)`,
          cost: `${formatDram(lineCost)} ֏`,
        })
      }
    })

    if (carpetM2 > 0) {
      const carpetCost = carpetM2 * 900
      subtotalDram += carpetCost
      estHours += carpetM2 * 0.08
      specRows.push({
        name: `Химчистка: Ковер (${carpetM2} м² × 900 ֏)`,
        cost: `${formatDram(carpetCost)} ֏`,
      })
    }
  }

  // Night cleaning +40% to total cost
  if ((mode === 'cleaning' || mode === 'combo') && extras.night && subtotalDram > 0) {
    const nightSurcharge = Math.round(subtotalDram * 0.4)
    subtotalDram += nightSurcharge
    specRows.push({
      name: 'Ночная уборка (+40% к итоговой стоимости)',
      cost: `+ ${formatDram(nightSurcharge)} ֏`,
    })
  }

  const animatedTotalDram = useAnimatedNumber(subtotalDram)
  const finalHours = Math.max(1.5, Math.round(estHours * 2) / 2)

  let crewText = '1 Бро-специалист'
  if (mode === 'dryclean') {
    crewText = '1 мастер химчистки'
  } else if (area >= 95 || serviceId === 'renovation') {
    crewText = '3 клинера + бригадир'
  } else if (area >= 50 || serviceId === 'general') {
    crewText = '2 специалиста'
  }

  const filteredDryClean = DRYCLEAN_CATALOG.filter(
    (item) => dryFilter === 'all' || item.cat === dryFilter
  )

  const messengerMessage = [
    'Привет, Uborka Bro! Хочу заказать расчёт с сайта (Ереван):',
    ...specRows.map((r) => `• ${r.name}: ${r.cost}`),
    `ИТОГО: ${formatDram(subtotalDram)} ֏ (${crewText}, ~${finalHours} ч.)`,
  ].join('\n')

  const encodedMsg = encodeURIComponent(messengerMessage)
  const waLink = `https://wa.me/37499000000?text=${encodedMsg}`
  const tgLink = `https://t.me/?text=${encodedMsg}`

  const handleOrderSubmit = (e: FormEvent) => {
    e.preventDefault()
    setOrderSubmitted(true)
    setTimeout(() => setOrderSubmitted(false), 6000)
  }

  return (
    <section
      id="calculator"
      className="relative scroll-mt-20 border-b border-violet-100 bg-gradient-to-b from-white via-[#F6F8FF] to-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Mode Tabs */}
        <div className="flex flex-col justify-between gap-6 border-b border-violet-100 pb-8 lg:flex-row lg:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100/80 px-3.5 py-1 text-xs font-extrabold tracking-wider text-violet-800 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-violet-600" />
              <span>Блок 1 • Онлайн-калькулятор и Прайс-лист</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Честный калькулятор{' '}
              <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                в армянских драмах (֏)
              </span>
            </h2>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              Выбирай нужный режим ниже: только уборка, выездная химчистка мебели
              или выгодный комплекс. Никаких скрытых наценок — цена пересчитывается
              вживую!
            </p>
          </div>

          {/* 3 Mode Toggle Tabs per TZ */}
          <div className="inline-flex flex-wrap rounded-2xl border border-violet-200/90 bg-white p-1.5 shadow-md shadow-violet-500/5">
            <button
              type="button"
              onClick={() => onChangeMode('cleaning')}
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                mode === 'cleaning'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25'
                  : 'text-slate-600 hover:bg-violet-50 hover:text-violet-800'
              }`}
            >
              Только Уборка
            </button>
            <button
              type="button"
              onClick={() => onChangeMode('dryclean')}
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                mode === 'dryclean'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25'
                  : 'text-slate-600 hover:bg-violet-50 hover:text-violet-800'
              }`}
            >
              Только Химчистка
            </button>
            <button
              type="button"
              onClick={() => onChangeMode('combo')}
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                mode === 'combo'
                  ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 text-white shadow-md shadow-violet-500/25'
                  : 'text-slate-600 hover:bg-violet-50 hover:text-violet-800'
              }`}
            >
              Уборка + Химчистка (Комплекс)
            </button>
          </div>
        </div>

        {/* Fast Apartment Presets Bar */}
        <div className="t-nums flex flex-wrap items-center justify-between gap-2 border-b border-violet-100/80 py-4 text-xs">
          <span className="font-bold text-slate-500">
            Быстрые пресеты квартир в Ереване:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onApplyPreset('regular', 45, 'cleaning', false)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-bold text-slate-700 transition-all hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
            >
              1-комн. студия (45 м²)
            </button>
            <button
              type="button"
              onClick={() => onApplyPreset('regular', 65, 'cleaning', false)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-bold text-slate-700 transition-all hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
            >
              2-комн. квартира (65 м²)
            </button>
            <button
              type="button"
              onClick={() => onApplyPreset('general', 90, 'cleaning', true)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-bold text-slate-700 transition-all hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
            >
              3-комн. генеральная (90 м²)
            </button>
            <button
              type="button"
              onClick={() => onApplyPreset('renovation', 75, 'cleaning', true)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-bold text-slate-700 transition-all hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
            >
              Новостройка после ремонта (75 м²)
            </button>
            <button
              type="button"
              onClick={() => onApplyPreset('party', 60, 'combo', false)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-bold text-slate-700 transition-all hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
            >
              После вечеринки + диван (60 м²)
            </button>
          </div>
        </div>

        {/* Main 12-column Calculator Workspace */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
          {/* LEFT 7 COLUMNS: Interactive Controls */}
          <div className="space-y-8 lg:col-span-7">
            {/* PART A: CLEANING SERVICES + AREA + EXTRAS */}
            {(mode === 'cleaning' || mode === 'combo') && (
              <div className="space-y-8">
                {/* 1. 6 Main Cleaning Tariffs */}
                <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-lg shadow-indigo-950/5 sm:p-7">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-extrabold tracking-wider text-violet-600 uppercase">
                        Шаг 1 • Основные услуги
                      </span>
                      <h3 className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                        Выберите тип уборки
                      </h3>
                    </div>
                    <span className="t-nums rounded-xl bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      Формула: Площадь (м²) × Цена за м² (не ниже мин. суммы «От»)
                    </span>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                    {CLEANING_TARIFFS.map((t) => {
                      const active = t.id === serviceId
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => onSelectService(t.id)}
                          className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-200 ${
                            active
                              ? 'border-violet-500 bg-gradient-to-br from-violet-50/90 via-white to-sky-50/90 shadow-md shadow-violet-500/10 ring-2 ring-violet-500/30'
                              : 'border-slate-200/80 bg-white hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`inline-block whitespace-nowrap rounded-lg px-2.5 py-0.5 text-[10px] font-extrabold ${
                                  active
                                    ? 'bg-violet-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {t.badge}
                              </span>
                              <span className="t-nums shrink-0 whitespace-nowrap text-xs font-extrabold text-violet-700">
                                {t.rate} ֏/м²
                              </span>
                            </div>

                            <div className="font-display text-sm font-extrabold text-slate-900 group-hover:text-violet-700">
                              {t.short}
                            </div>

                            <p className="text-[11px] leading-relaxed text-slate-500">
                              {t.desc}
                            </p>
                          </div>

                          <div className="t-nums mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-[11px]">
                            <span className="whitespace-nowrap font-medium text-slate-400">
                              Мин. сумма:
                            </span>
                            <span className="whitespace-nowrap font-extrabold text-slate-800">
                              от {formatDram(t.min)} ֏
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 2. Area Slider & Input */}
                <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-lg shadow-indigo-950/5 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-extrabold tracking-wider text-sky-600 uppercase">
                        Шаг 2 • Метраж объекта
                      </span>
                      <h3 className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                        Площадь помещения (м²)
                      </h3>
                    </div>

                    {/* Stepper + Direct Input */}
                    <div className="t-nums flex items-center gap-1.5 rounded-2xl border border-violet-200 bg-violet-50/50 p-1.5">
                      <button
                        type="button"
                        onClick={() => onChangeArea(Math.max(15, area - 5))}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white font-extrabold text-slate-800 shadow-xs transition hover:bg-violet-600 hover:text-white"
                      >
                        −
                      </button>
                      <div className="flex items-center px-2">
                        <input
                          type="number"
                          min={15}
                          max={600}
                          value={area}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10)
                            if (!isNaN(val)) {
                              onChangeArea(Math.min(600, Math.max(15, val)))
                            }
                          }}
                          aria-label="Площадь помещения в квадратных метрах"
                          className="t-nums w-16 bg-transparent text-center font-display text-lg font-extrabold text-slate-950 focus:outline-none"
                        />
                        <span className="text-xs font-bold text-violet-700">
                          м²
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onChangeArea(Math.min(600, area + 5))}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white font-extrabold text-slate-800 shadow-xs transition hover:bg-violet-600 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <input
                      type="range"
                      min={15}
                      max={250}
                      value={Math.min(250, Math.max(15, area))}
                      onChange={(e) =>
                        onChangeArea(parseInt(e.target.value, 10) || 60)
                      }
                      aria-label="Ползунок выбора площади"
                      className="bro-range"
                    />
                    <div className="t-nums flex justify-between text-[11px] font-semibold text-slate-400">
                      <span>15 м²</span>
                      <span>50 м²</span>
                      <span>100 м²</span>
                      <span>150 м²</span>
                      <span>200 м²</span>
                      <span>250+ м²</span>
                    </div>
                  </div>

                  {/* Smart Minimum Threshold Notice */}
                  {isBelowMinimum && (
                    <div className="mt-4 flex flex-col justify-between gap-3 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-sky-50 p-4 sm:flex-row sm:items-center">
                      <div className="flex items-start gap-3 text-xs leading-relaxed text-slate-700">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                        <div className="t-nums">
                          <span className="font-extrabold text-violet-900">
                            Совет от Бро:
                          </span>{' '}
                          для услуги «{tariff.short}» действует минимальная сумма
                          заказа{' '}
                          <strong className="text-violet-700">
                            {formatDram(tariff.min)} ֏
                          </strong>
                          . В эту цену уже входит уборка до{' '}
                          <strong>{maxCoveredM2} м²</strong>!
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onChangeArea(maxCoveredM2)}
                        className="t-nums shrink-0 cursor-pointer rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-extrabold text-white shadow-sm transition hover:bg-violet-700"
                      >
                        Выставить {maxCoveredM2} м² за те же деньги
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Additional Options to Cleaning per TZ */}
                <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-lg shadow-indigo-950/5 sm:p-7">
                  <div className="mb-4">
                    <span className="text-xs font-extrabold tracking-wider text-indigo-600 uppercase">
                      Шаг 3 • Дополнительные опции к уборке
                    </span>
                    <h3 className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                      Усильте уборку нужными опциями
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {/* Option 1: Eco Chemistry +5000 AMD */}
                    <label
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all ${
                        extras.eco
                          ? 'border-violet-500 bg-violet-50/60 shadow-xs'
                          : 'border-slate-200/80 bg-slate-50/40 hover:border-violet-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={extras.eco}
                          onChange={() => onToggleExtra('eco')}
                          className="h-5 w-5 rounded-md border-slate-300 accent-violet-600"
                        />
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <Leaf className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-slate-900">
                            Уборка с эко-химией
                          </div>
                          <div className="text-xs text-slate-500">
                            Биоразлагаемые гипоаллергенные составы (идеально для
                            детей и питомцев)
                          </div>
                        </div>
                      </div>
                      <span className="t-nums shrink-0 rounded-xl bg-white px-3 py-1.5 text-xs font-extrabold text-violet-700 shadow-2xs ring-1 ring-violet-100 sm:text-sm">
                        + 5 000 ֏
                      </span>
                    </label>

                    {/* Option 2: Delivery of vacuum cleaner and steam generator +5000 AMD */}
                    <label
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all ${
                        extras.equip
                          ? 'border-violet-500 bg-violet-50/60 shadow-xs'
                          : 'border-slate-200/80 bg-slate-50/40 hover:border-violet-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={extras.equip}
                          onChange={() => onToggleExtra('equip')}
                          className="h-5 w-5 rounded-md border-slate-300 accent-violet-600"
                        />
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                          <Truck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-slate-900">
                            Доставка пылесоса и парогенератора
                          </div>
                          <div className="text-xs text-slate-500">
                            Фиксированный чекбокс: привозим мощный пылесос и
                            парогенератор Karcher
                          </div>
                        </div>
                      </div>
                      <span className="t-nums shrink-0 rounded-xl bg-white px-3 py-1.5 text-xs font-extrabold text-violet-700 shadow-2xs ring-1 ring-violet-100 sm:text-sm">
                        + 5 000 ֏
                      </span>
                    </label>

                    {/* Option 3: Night cleaning +40% */}
                    <label
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all ${
                        extras.night
                          ? 'border-violet-500 bg-violet-50/60 shadow-xs'
                          : 'border-slate-200/80 bg-slate-50/40 hover:border-violet-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={extras.night}
                          onChange={() => onToggleExtra('night')}
                          className="h-5 w-5 rounded-md border-slate-300 accent-violet-600"
                        />
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                          <Moon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-slate-900">
                            Ночная уборка
                          </div>
                          <div className="text-xs text-slate-500">
                            Выезд бригады в ночное время (с 21:00 до 08:00) без
                            отрыва от ваших дел
                          </div>
                        </div>
                      </div>
                      <span className="t-nums shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-xs">
                        + 40% к итогу
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* PART B: DRY CLEANING OF UPHOLSTERED FURNITURE & TEXTILES (12 ITEMS PER TZ) */}
            {(mode === 'dryclean' || mode === 'combo') && (
              <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-lg shadow-indigo-950/5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-sky-500 text-white">
                      <Sofa className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold tracking-wider text-violet-600 uppercase">
                        Раздел 3 прайс-листа • Выездная экстракторная чистка
                      </span>
                      <h3 className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                        Химчистка мягкой мебели и текстиля
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onResetDryClean}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Сбросить мебель</span>
                  </button>
                </div>

                {/* Category Filter Pills */}
                <div className="no-scrollbar my-4 flex items-center gap-2 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: 'Все позиции (12)' },
                    { id: 'sofas', label: 'Диваны и кресла' },
                    { id: 'chairs', label: 'Стулья, пуфик и подушки' },
                    { id: 'mattress', label: 'Матрасы и ковёр' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() =>
                        setDryFilter(
                          tab.id as 'all' | 'sofas' | 'chairs' | 'mattress'
                        )
                      }
                      className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-extrabold whitespace-nowrap transition-all ${
                        dryFilter === tab.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* 11 Unit Items Grid */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredDryClean.map((item) => {
                    const count = dryCounts[item.id] || 0
                    const active = count > 0
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all ${
                          active
                            ? 'border-violet-400 bg-violet-50/70 shadow-xs'
                            : 'border-slate-200/80 bg-slate-50/40 hover:border-violet-200 hover:bg-white'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-extrabold text-slate-900 sm:text-sm">
                            {item.name}
                          </div>
                          <div className="t-nums text-xs font-bold text-violet-700">
                            {formatDram(item.price)} ֏
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-500">
                            {item.subtitle}
                          </div>
                        </div>

                        <div className="t-nums flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => onChangeDryCount(item.id, -1)}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-slate-50 font-extrabold text-slate-700 hover:bg-violet-100 hover:text-violet-800"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-xs font-extrabold text-slate-950">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={() => onChangeDryCount(item.id, 1)}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-violet-600 font-extrabold text-white hover:bg-violet-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* 12th Item: Carpet — 900 AMD per m2 */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50/90 to-violet-50/80 p-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-sky-600 px-2 py-0.5 text-[10px] font-extrabold text-white uppercase">
                        За м²
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        Ковер — 900 ֏ за м²
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600">
                      Укажите площадь ковра или ковролина для глубокой роторно-экстракторной чистки
                    </p>
                  </div>

                  <div className="t-nums flex items-center gap-2 rounded-2xl border border-sky-200 bg-white p-1.5 shadow-xs">
                    <button
                      type="button"
                      onClick={() => onChangeCarpetM2(Math.max(0, carpetM2 - 2))}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-slate-100 font-extrabold text-slate-800 hover:bg-sky-600 hover:text-white"
                    >
                      −
                    </button>
                    <div className="min-w-[76px] text-center">
                      <span className="font-display text-base font-extrabold text-slate-950">
                        {carpetM2}
                      </span>{' '}
                      <span className="text-xs font-bold text-slate-500">м²</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onChangeCarpetM2(Math.min(150, carpetM2 + 2))
                      }
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-sky-600 font-extrabold text-white hover:bg-sky-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT 5 COLUMNS: STICKY LIVE ESTIMATE RECEIPT */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-violet-200/90 bg-white shadow-2xl shadow-indigo-950/10">
              {/* Top Gradient Receipt Header */}
              <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-sky-600 p-6 text-white">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase backdrop-blur-md">
                    Живая смета «Uborka Bro»
                  </span>
                  <span className="rounded-xl bg-white/20 px-3 py-1 text-xs font-extrabold">
                    {mode === 'cleaning'
                      ? 'Только Уборка'
                      : mode === 'dryclean'
                        ? 'Только Химчистка'
                        : 'Комплекс Бро'}
                  </span>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <div className="text-xs font-medium text-sky-100">
                      Итоговая стоимость работ:
                    </div>
                    <div className="t-nums font-display mt-0.5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                      {formatDram(animatedTotalDram)}{' '}
                      <span className="text-sky-300">֏</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-violet-100">
                    <div className="font-bold text-emerald-300">
                      0 ֏ предоплата
                    </div>
                    <div>Оплата после проверки</div>
                  </div>
                </div>
              </div>

              {/* Crew & Time Bar */}
              <div className="t-nums grid grid-cols-2 divide-x divide-violet-100 border-b border-violet-100 bg-violet-50/50 text-xs">
                <div className="flex items-center gap-2.5 px-5 py-3.5">
                  <Users className="h-4 w-4 text-violet-600" />
                  <div>
                    <div className="text-[11px] text-slate-500">Команда:</div>
                    <div className="font-extrabold text-slate-900">
                      {crewText}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 px-5 py-3.5">
                  <Clock className="h-4 w-4 text-sky-600" />
                  <div>
                    <div className="text-[11px] text-slate-500">
                      Время работы:
                    </div>
                    <div className="font-extrabold text-slate-900">
                      {subtotalDram > 0 ? `~ ${finalHours} часа` : '—'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Itemized Breakdown + Form */}
              <div className="space-y-5 p-6">
                <div>
                  <div className="mb-2.5 text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
                    Что входит в ваш расчёт:
                  </div>

                  {specRows.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/40 p-4 text-center text-xs font-semibold text-slate-500">
                      Выберите предметы мягкой мебели или укажите площадь ковра
                      слева, чтобы Бро посчитал стоимость!
                    </div>
                  ) : (
                    <div className="t-nums max-h-56 divide-y divide-slate-100 overflow-y-auto pr-1 text-xs sm:text-sm">
                      {specRows.map((row, idx) => (
                        <div key={idx} className="py-2.5 first:pt-0 last:pb-0">
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-semibold text-slate-700">
                              {row.name}
                            </span>
                            <span className="shrink-0 font-extrabold text-slate-950">
                              {row.cost}
                            </span>
                          </div>
                          {row.sub && (
                            <div className="mt-0.5 text-[11px] font-bold text-violet-600">
                              {row.sub}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Booking Form */}
                <form
                  onSubmit={handleOrderSubmit}
                  className="space-y-3 border-t border-slate-100 pt-4"
                >
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ваше имя"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 transition focus:border-violet-500 focus:bg-white focus:outline-none sm:text-sm"
                    />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+374 (__) __-__-__"
                      className="t-nums h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs font-semibold text-slate-900 placeholder-slate-400 transition focus:border-violet-500 focus:bg-white focus:outline-none sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 text-xs font-extrabold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:text-sm"
                  >
                    <Check className="h-4 w-4" />
                    <span>Вызвать команду «Уборка Бро»</span>
                  </button>
                </form>

                {orderSubmitted && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-center text-xs font-bold text-emerald-900">
                    Заявка принята, Бро! Менеджер свяжется с вами в течение 3–5
                    минут для подтверждения удобного времени.
                  </div>
                )}

                {/* Send Ready Estimate to Telegram / WhatsApp */}
                <div className="space-y-2 pt-1">
                  <div className="text-center text-[11px] font-semibold text-slate-400">
                    Или отправьте готовую смету в 1 клик в мессенджер:
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={tgLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50/70 text-xs font-extrabold text-sky-800 transition hover:bg-sky-100"
                    >
                      <Send className="h-3.5 w-3.5 text-sky-600" />
                      <span>В Telegram</span>
                    </a>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 text-xs font-extrabold text-emerald-800 transition hover:bg-emerald-100"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                      <span>В WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-semibold text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-violet-500" />
                  <span>100% материальная ответственность по договору</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
