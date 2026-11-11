import { useState, type FormEvent } from 'react'
import {
  Briefcase,
  Send,
  GraduationCap,
  Shirt,
  Wallet,
  X,
  Check,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react'
import { InstagramIcon } from './InstagramIcon'
import { formatDram } from '../data/uborkaData'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'

interface CareersSectionProps {
  isSubpageOpen: boolean
  onOpenSubpage: () => void
  onCloseSubpage: () => void
}

export function CareersSection({
  isSubpageOpen,
  onOpenSubpage,
  onCloseSubpage,
}: CareersSectionProps) {
  const [shiftsPerWeek, setShiftsPerWeek] = useState(5)
  const [applicantName, setApplicantName] = useState('')
  const [applicantPhone, setApplicantPhone] = useState('')
  const [applicantRole, setApplicantRole] = useState('Специалист клининга (Бро)')
  const [appliedSuccess, setAppliedSuccess] = useState(false)

  const monthlyIncome = shiftsPerWeek * 56000
  const animatedIncome = useAnimatedNumber(monthlyIncome)

  const handleCandidateSubmit = (e: FormEvent) => {
    e.preventDefault()
    setAppliedSuccess(true)
    setTimeout(() => {
      setAppliedSuccess(false)
      onCloseSubpage()
    }, 3500)
  }

  return (
    <>
      <section
        id="careers"
        className="scroll-mt-20 border-b border-violet-100 bg-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-violet-100 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100/80 px-3.5 py-1 text-xs font-extrabold tracking-wider text-violet-800 uppercase">
              <Briefcase className="h-3.5 w-3.5 text-violet-600" />
              <span>Блок 6 • Работа у нас (Вакансии)</span>
            </div>

            <button
              type="button"
              onClick={onOpenSubpage}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-violet-200 bg-violet-50/70 px-4 py-2 text-xs font-extrabold text-violet-700 transition hover:bg-violet-100"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Открыть подстраницу вакансий и анкету HR</span>
            </button>
          </div>

          <div className="grid items-stretch gap-8 lg:grid-cols-12">
            {/* Left 7 cols: Exact TZ Heading, Text & CTA Buttons */}
            <div className="lavender-sky-card flex flex-col justify-between rounded-3xl border border-violet-200/80 p-6 shadow-xl shadow-indigo-950/5 sm:p-10 lg:col-span-7">
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-extrabold text-slate-950 sm:text-4xl">
                  Хочешь стать частью команды{' '}
                  <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                    «Уборка Бро»?
                  </span>
                </h2>

                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  Мы всегда рады аккуратным, ответственным и трудолюбивым
                  специалистам. Обучаем, предоставляем форму, инвентарь и
                  гарантируем стабильные выплаты.
                </p>

                <div className="grid gap-3 pt-2 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xs">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 sm:text-sm">
                      Обучаем с нуля
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      Покажем стандарты работы с техникой Karcher и проф. химией
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xs">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                      <Shirt className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 sm:text-sm">
                      Форма и инвентарь
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      Выдаём фирменную удобную форму и доставляем оборудование
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xs">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Wallet className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 sm:text-sm">
                      Стабильные выплаты
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      Честная оплата без задержек + чаевые и бонусы за 5★
                    </div>
                  </div>
                </div>
              </div>

              {/* Exact CTA from TZ */}
              <div className="mt-8 space-y-4 border-t border-violet-200/70 pt-6">
                <div className="text-xs font-extrabold text-slate-900 sm:text-sm">
                  Напиши нам в мессенджеры с пометкой{' '}
                  <span className="rounded-lg bg-violet-600 px-2.5 py-0.5 text-white">
                    «Работа»
                  </span>
                  :
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://t.me/?text=%D0%A0%D0%B0%D0%B1%D0%BE%D1%82%D0%B0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center gap-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:text-sm"
                  >
                    <Send className="h-4 w-4" />
                    <span>Telegram (HR)</span>
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:text-sm"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    <span>Instagram (Direct)</span>
                  </a>

                  <button
                    type="button"
                    onClick={onOpenSubpage}
                    className="flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 text-xs font-extrabold text-slate-800 transition hover:border-violet-400 hover:text-violet-700 sm:text-sm"
                  >
                    <span>Заполнить экспресс-анкету</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Interactive Cleaner Income Estimator */}
            <div className="flex flex-col justify-between rounded-3xl border border-violet-200/80 bg-white p-6 shadow-xl shadow-indigo-950/5 sm:p-8 lg:col-span-5">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-[11px] font-extrabold tracking-wider text-violet-600 uppercase">
                      Калькулятор для кандидатов
                    </div>
                    <h3 className="font-display text-lg font-extrabold text-slate-950">
                      Рассчитай свой доход в «Уборка Бро»
                    </h3>
                  </div>
                  <span className="t-nums rounded-xl bg-violet-100 px-3 py-1 text-xs font-extrabold text-violet-700">
                    {shiftsPerWeek} смен / нед.
                  </span>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="shifts-slider"
                    className="block text-xs font-bold text-slate-600"
                  >
                    Выбери удобный график (от подработки до полной занятости):
                  </label>
                  <input
                    id="shifts-slider"
                    type="range"
                    min={2}
                    max={6}
                    value={shiftsPerWeek}
                    onChange={(e) =>
                      setShiftsPerWeek(parseInt(e.target.value, 10) || 5)
                    }
                    className="bro-range"
                  />
                  <div className="t-nums flex justify-between text-[11px] font-semibold text-slate-400">
                    <span>2 смены</span>
                    <span>3 смены</span>
                    <span>4 смены</span>
                    <span>5 смен</span>
                    <span>6 смен</span>
                  </div>
                </div>

                <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Оформление:</span>
                    <span className="font-bold text-slate-900">
                      Официальный договор
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Трансфер с тяжёлой техникой:</span>
                    <span className="font-bold text-slate-900">
                      За счёт компании
                    </span>
                  </div>
                </div>
              </div>

              <div className="t-nums mt-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 p-5 text-white shadow-lg">
                <div className="text-xs text-sky-200">
                  Ориентировочный доход в месяц:
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="font-display text-3xl font-extrabold text-white">
                    {formatDram(animatedIncome)}{' '}
                    <span className="text-sky-400">֏</span>
                  </div>
                  <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                    + Бонусы за 5★
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Service Subpage Modal for "Работа у нас" (per TZ Section 1) */}
      {isSubpageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-violet-200 bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={onCloseSubpage}
              aria-label="Закрыть окно вакансий"
              className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-violet-100 hover:text-violet-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-extrabold text-violet-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Служебная подстраница HR • Uborka Bro Ереван</span>
                </div>
                <h3 className="font-display text-2xl font-extrabold text-slate-950">
                  Открытые вакансии и экспресс-отклик
                </h3>
                <p className="text-xs text-slate-600 sm:text-sm">
                  Оставьте свои контакты или напишите в наш HR-отдел в Telegram /
                  Instagram Direct с пометкой «Работа».
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-4">
                  <div className="text-sm font-extrabold text-slate-950">
                    1. Специалист клининга (Бро)
                  </div>
                  <div className="t-nums mt-1 text-xs font-bold text-violet-700">
                    от 220 000 до 340 000 ֏ / мес.
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600">
                    Уборка квартир и домов в составе бригады. Опыт не обязателен
                    — обучаем в собственном центре.
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
                  <div className="text-sm font-extrabold text-slate-950">
                    2. Мастер выездной химчистки / Бригадир
                  </div>
                  <div className="t-nums mt-1 text-xs font-bold text-sky-700">
                    от 300 000 до 420 000 ֏ / мес.
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600">
                    Работа с экстракторами Santoemma / Karcher, контроль качества
                    и сдача объектов заказчикам.
                  </p>
                </div>
              </div>

              <form onSubmit={handleCandidateSubmit} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Например: Армен"
                      className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-xs font-semibold text-slate-900 focus:border-violet-500 focus:outline-none sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      Телефон для связи
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+374 (__) __-__-__"
                      className="t-nums h-11 w-full rounded-xl border border-slate-200 px-3.5 text-xs font-semibold text-slate-900 focus:border-violet-500 focus:outline-none sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Желаемая позиция
                  </label>
                  <select
                    value={applicantRole}
                    onChange={(e) => setApplicantRole(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-900 focus:border-violet-500 focus:outline-none sm:text-sm"
                  >
                    <option>Специалист клининга (Бро)</option>
                    <option>Мастер выездной химчистки</option>
                    <option>Бригадир-технолог</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-sky-500 text-xs font-extrabold text-white shadow-lg transition hover:opacity-95 sm:text-sm"
                >
                  <Check className="h-4 w-4" />
                  <span>Отправить анкету с пометкой «Работа»</span>
                </button>
              </form>

              {appliedSuccess && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-center text-xs font-bold text-emerald-900">
                  Анкета отправлена в HR-отдел «Уборка Бро»! Мы свяжемся с тобой
                  сегодня.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
