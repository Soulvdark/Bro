import {
  Sparkles,
  Calculator,
  Send,
  MessageSquare,
  ShieldCheck,
  Clock,
  FileCheck2,
  Award,
  ArrowRight,
  MapPin,
} from 'lucide-react'
import {
  CLEANING_TARIFFS,
  formatDram,
  type CalcMode,
  type CleaningServiceId,
} from '../data/uborkaData'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'

interface HeroSectionProps {
  area: number
  serviceId: CleaningServiceId
  onChangeArea: (area: number) => void
  onSelectScenario: (
    serviceId: CleaningServiceId,
    area: number,
    mode: CalcMode,
    withEquip: boolean
  ) => void
}

export function HeroSection({
  area,
  serviceId,
  onChangeArea,
  onSelectScenario,
}: HeroSectionProps) {
  const activeTariff =
    CLEANING_TARIFFS.find((t) => t.id === serviceId) ?? CLEANING_TARIFFS[0]
  const rawEstimate = Math.max(area * activeTariff.rate, activeTariff.min)
  const animatedHeroPrice = useAnimatedNumber(rawEstimate)

  return (
    <section
      id="hero"
      className="airy-mesh-bg relative overflow-hidden border-b border-violet-100/80 pt-8 pb-16 sm:pt-12 sm:pb-24"
    >
      {/* Decorative soft glowing blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 right-10 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top pill bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-200/80 bg-white/90 px-4 py-1.5 text-xs font-bold text-violet-900 shadow-xs backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            <span>Дружелюбный и официальный клининг в Ереване</span>
            <span className="hidden text-violet-300 sm:inline">•</span>
            <span className="hidden text-sky-700 sm:inline">
              Выезд по всей Армении
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/80 px-4 py-1.5 text-xs font-bold text-sky-900">
            <ShieldCheck className="h-4 w-4 text-sky-600" />
            <span>Оплата 0 ֏ до проверки результата • Договор для физ. и юр. лиц</span>
          </div>
        </div>

        {/* Main 12-col Hero Grid */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column (7 cols): Hero slogan + subheadline + CTA + quick scenarios */}
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-100/90 to-sky-100/90 px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-violet-800 uppercase">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                <span>Uborka Bro («Уборка Бро») • Yerevan</span>
              </div>

              {/* Exact Hero phrase from TZ */}
              <h1 className="font-display text-3xl leading-[1.12] font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[52px]">
                Бро наводит порядок —{' '}
                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  ты наслаждаешься жизнью!
                </span>
              </h1>

              <p className="font-display text-lg font-bold text-indigo-950/90 sm:text-2xl">
                Идеальная чистота в Ереване без лишних хлопот.
              </p>

              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Современный, понятный и надёжный сервис с лёгким характером, но
                максимальной ответственностью. Приезжаем со своими промышленными
                пылесосами, парогенераторами Karcher и гипоаллергенной химией.
                Ты отдыхаешь — мы делаем квартиру сияющей!
              </p>
            </div>

            {/* Primary CTA Buttons (Calculator + WhatsApp / Telegram) */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#calculator"
                className="group flex h-14 items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 px-7 text-sm font-extrabold text-white shadow-xl shadow-violet-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-600/35"
              >
                <Calculator className="h-5 w-5 transition-transform group-hover:rotate-6" />
                <span>Рассчитать в калькуляторе</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center gap-2.5 rounded-2xl border border-sky-200 bg-white/95 px-5 text-sm font-extrabold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50/60 hover:text-sky-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <Send className="h-4 w-4" />
                </span>
                <span>Telegram</span>
              </a>

              <a
                href="https://wa.me/37499000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center gap-2.5 rounded-2xl border border-emerald-200 bg-white/95 px-5 text-sm font-extrabold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50/60 hover:text-emerald-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Quick Scenario Cards (1-click jump to Calculator) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>БЫСТРЫЙ ВЫБОР СЦЕНАРИЯ (ПЕРЕХОД К КАЛЬКУЛЯТОРУ):</span>
                <span className="t-nums text-violet-700">Честные цены в ֏</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() =>
                    onSelectScenario('regular', 55, 'cleaning', false)
                  }
                  className="group cursor-pointer rounded-2xl border border-violet-100 bg-white/90 p-3.5 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-violet-400 hover:shadow-md"
                >
                  <div className="text-xs font-extrabold text-slate-900 group-hover:text-violet-700">
                    Поддерживающая
                  </div>
                  <div className="t-nums mt-1 text-[11px] font-semibold text-slate-500">
                    350 ֏/м² • от 12 000 ֏
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onSelectScenario('general', 65, 'cleaning', true)
                  }
                  className="group cursor-pointer rounded-2xl border border-violet-100 bg-white/90 p-3.5 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-violet-400 hover:shadow-md"
                >
                  <div className="text-xs font-extrabold text-slate-900 group-hover:text-violet-700">
                    Генеральная
                  </div>
                  <div className="t-nums mt-1 text-[11px] font-semibold text-slate-500">
                    550 ֏/м² • от 20 000 ֏
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onSelectScenario('renovation', 75, 'cleaning', true)
                  }
                  className="group cursor-pointer rounded-2xl border border-violet-100 bg-white/90 p-3.5 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-violet-400 hover:shadow-md"
                >
                  <div className="text-xs font-extrabold text-slate-900 group-hover:text-violet-700">
                    После ремонта
                  </div>
                  <div className="t-nums mt-1 text-[11px] font-semibold text-slate-500">
                    950 ֏/м² • от 40 000 ֏
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectScenario('party', 60, 'combo', false)}
                  className="group cursor-pointer rounded-2xl border border-violet-100 bg-white/90 p-3.5 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-violet-400 hover:shadow-md"
                >
                  <div className="text-xs font-extrabold text-slate-900 group-hover:text-violet-700">
                    После вечеринки
                  </div>
                  <div className="t-nums mt-1 text-[11px] font-semibold text-slate-500">
                    600 ֏/м² • от 25 000 ֏
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Airy Showcase Card + Live Mini-Calculator */}
          <div className="lg:col-span-5">
            <div className="lavender-sky-card relative rounded-3xl border border-violet-200/80 p-5 shadow-2xl shadow-indigo-950/5 sm:p-6">
              {/* Visual Interior Showcase */}
              <div className="relative h-60 overflow-hidden rounded-2xl bg-slate-900 sm:h-64">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"
                  alt="Свежий чистый интерьер в Ереване после работы Уборка Бро"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-slate-900 shadow-md backdrop-blur-md">
                  <MapPin className="h-3.5 w-3.5 text-violet-600" />
                  <span>Ереван, Кентрон • Сданный объект</span>
                </div>

                <div className="absolute top-3.5 right-3.5 rounded-full bg-violet-600/95 px-3 py-1 text-xs font-extrabold text-white shadow-md backdrop-blur-md">
                  5.0 ★ Чистота Бро
                </div>

                <div className="t-nums absolute right-3.5 bottom-3.5 left-3.5 grid grid-cols-3 gap-2 rounded-2xl border border-white/20 bg-slate-950/65 p-3 text-white backdrop-blur-md">
                  <div>
                    <div className="text-[10px] font-semibold text-sky-300 uppercase">
                      Тариф
                    </div>
                    <div className="text-xs font-extrabold">Генеральная 68 м²</div>
                  </div>
                  <div className="border-x border-white/15 px-2.5">
                    <div className="text-[10px] font-semibold text-sky-300 uppercase">
                      Команда
                    </div>
                    <div className="text-xs font-extrabold">2 Бро • 4.5 часа</div>
                  </div>
                  <div className="pl-1">
                    <div className="text-[10px] font-semibold text-sky-300 uppercase">
                      По смете
                    </div>
                    <div className="text-xs font-extrabold text-sky-300">
                      37 400 ֏
                    </div>
                  </div>
                </div>
              </div>

              {/* Express Live Estimator inside Hero */}
              <div className="mt-5 space-y-4 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-extrabold tracking-wider text-violet-600 uppercase">
                      Живая прикидка за 3 секунды
                    </div>
                    <div className="text-sm font-extrabold text-slate-900">
                      Двигай ползунок площади:
                    </div>
                  </div>
                  <span className="t-nums rounded-xl border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800">
                    {activeTariff.short} ({activeTariff.rate} ֏/м²)
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="t-nums flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Площадь квартиры:{' '}
                      <strong className="rounded-lg bg-violet-50 px-2 py-0.5 text-base font-extrabold text-violet-700">
                        {area} м²
                      </strong>
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      От:{' '}
                      <strong className="font-display text-2xl font-extrabold text-slate-950">
                        {formatDram(animatedHeroPrice)}{' '}
                        <span className="text-violet-600">֏</span>
                      </strong>
                    </span>
                  </div>

                  <input
                    type="range"
                    min={20}
                    max={200}
                    value={Math.min(200, Math.max(20, area))}
                    onChange={(e) =>
                      onChangeArea(parseInt(e.target.value, 10) || 60)
                    }
                    aria-label="Площадь квартиры для экспресс-расчета"
                    className="bro-range"
                  />

                  <div className="t-nums flex justify-between text-[11px] font-semibold text-slate-400">
                    <span>20 м²</span>
                    <span>60 м²</span>
                    <span>100 м²</span>
                    <span>150 м²</span>
                    <span>200 м²</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-3.5 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-slate-500">
                    Нужна химчистка мебели или эко-химия?
                  </span>
                  <a
                    href="#calculator"
                    className="inline-flex shrink-0 items-center gap-1.5 self-start whitespace-nowrap rounded-xl bg-violet-50 px-3 py-1.5 font-extrabold text-violet-700 transition hover:bg-violet-100 hover:text-violet-900 sm:self-auto"
                  >
                    <span>В полный калькулятор</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 Trust Badges Bar */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3.5 rounded-2xl border border-violet-100/90 bg-white/85 p-4 shadow-xs backdrop-blur-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 sm:text-sm">
                Официально и по договору
              </div>
              <div className="mt-0.5 text-xs text-slate-500">
                Белая компания, закрывающие документы и 100% мат. ответственность
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-sky-100/90 bg-white/85 p-4 shadow-xs backdrop-blur-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="t-nums text-xs font-extrabold text-slate-900 sm:text-sm">
                Оплата за результат (100%)
              </div>
              <div className="mt-0.5 text-xs text-slate-500">
                Проверяете чистоту и платите только когда всем довольны
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-indigo-100/90 bg-white/85 p-4 shadow-xs backdrop-blur-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="t-nums text-xs font-extrabold text-slate-900 sm:text-sm">
                Подача по Еревану от 45 мин
              </div>
              <div className="mt-0.5 text-xs text-slate-500">
                Выезд в любой регион Армении по индивидуальному расчёту
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-purple-100/90 bg-white/85 p-4 shadow-xs backdrop-blur-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 sm:text-sm">
                Контроль бригадира и Karcher
              </div>
              <div className="mt-0.5 text-xs text-slate-500">
                Привозим мощные пылесосы, парогенераторы и гипоаллергенную химию
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
