import { useState } from 'react'
import {
  MapPin,
  Phone,
  Send,
  MessageSquare,
  ArrowUpRight,
  Clock,
  Sparkles,
} from 'lucide-react'
import { InstagramIcon } from './InstagramIcon'
import { LOGISTICS_DATA } from '../data/uborkaData'

export function ContactsSection() {
  const [geoTab, setGeoTab] = useState<'yerevan' | 'armenia'>('yerevan')
  const [selectedRowIdx, setSelectedRowIdx] = useState(0)

  const currentRows = LOGISTICS_DATA[geoTab]
  const activeRow = currentRows[selectedRowIdx] ?? currentRows[0]

  return (
    <section
      id="contacts"
      className="airy-mesh-bg scroll-mt-20 border-b border-violet-100 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-violet-100 pb-8 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100/90 px-3.5 py-1 text-xs font-extrabold tracking-wider text-sky-800 uppercase">
              <MapPin className="h-3.5 w-3.5 text-sky-600" />
              <span>Блок 7 • Контакты и Зона обслуживания</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Работаем по всему Еревану{' '}
              <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                + выезд в любой регион Армении
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm">
            Работаем по всему Еревану (бесплатная подача). Возможен выезд в
            любой регион Армении — стоимость выезда рассчитывается
            индивидуально.
          </p>
        </div>

        {/* 2-Column Layout: Left = Interactive Yerevan / Armenia Zones, Right = Direct Fast Chat Buttons */}
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-12">
          {/* Left 7 cols: Interactive Coverage Explorer */}
          <div className="flex flex-col justify-between rounded-3xl border border-violet-200/80 bg-white p-6 shadow-xl shadow-indigo-950/5 sm:p-8 lg:col-span-7">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-display text-lg font-extrabold text-slate-950 sm:text-xl">
                    География выезда бригад «Уборка Бро»
                  </h3>
                  <p className="text-xs text-slate-500">
                    Выберите район Еревана или город Армении для проверки
                    времени подачи
                  </p>
                </div>

                <div className="inline-flex rounded-2xl border border-violet-200/80 bg-violet-50/50 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setGeoTab('yerevan')
                      setSelectedRowIdx(0)
                    }}
                    className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                      geoTab === 'yerevan'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-violet-700'
                    }`}
                  >
                    Ереван (0 ֏)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGeoTab('armenia')
                      setSelectedRowIdx(0)
                    }}
                    className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                      geoTab === 'armenia'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-violet-700'
                    }`}
                  >
                    Вся Армения
                  </button>
                </div>
              </div>

              {/* Interactive Rows */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/80">
                <div className="hidden sm:grid sm:grid-cols-12 border-b border-slate-200/80 bg-slate-50 px-4 py-2.5 text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
                  <div className="col-span-5">Район / Город</div>
                  <div className="col-span-4">Время подачи</div>
                  <div className="col-span-3 text-right">Выезд</div>
                </div>

                <div className="t-nums divide-y divide-slate-100 text-xs sm:text-sm">
                  {currentRows.map((row, idx) => {
                    const active = idx === selectedRowIdx
                    return (
                      <button
                        key={row.name}
                        type="button"
                        onClick={() => setSelectedRowIdx(idx)}
                        className={`flex w-full cursor-pointer flex-col gap-2 px-4 py-3.5 text-left transition-colors sm:grid sm:grid-cols-12 sm:items-center sm:gap-2 ${
                          active
                            ? 'bg-violet-50/90 font-bold text-violet-900'
                            : 'bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 sm:col-span-5">
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${
                              active ? 'bg-violet-600' : 'bg-slate-300'
                            }`}
                          />
                          <span className="font-extrabold text-slate-900">
                            {row.name}
                          </span>
                        </div>
                        <div className="flex w-full items-center justify-between pl-4 sm:col-span-7 sm:grid sm:grid-cols-7 sm:pl-0">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 sm:col-span-4">
                            <Clock className="h-3.5 w-3.5 shrink-0 text-sky-500" />
                            <span className="whitespace-nowrap">{row.time}</span>
                          </div>
                          <div
                            className={`whitespace-nowrap text-right text-xs font-extrabold sm:col-span-3 ${
                              active ? 'text-violet-700' : 'text-slate-900'
                            }`}
                          >
                            {row.fee}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Selected Zone Summary Box */}
            <div className="mt-6 flex flex-col justify-between gap-3 rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-50/90 to-violet-50/80 p-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-[10px] font-extrabold tracking-wider text-sky-700 uppercase">
                  Выбранная локация:
                </div>
                <div className="mt-0.5 text-xs font-extrabold text-slate-900 sm:text-sm">
                  {activeRow.summary}
                </div>
              </div>
              <span className="t-nums shrink-0 self-start rounded-xl bg-white px-3.5 py-1.5 text-xs font-extrabold text-violet-700 shadow-2xs ring-1 ring-violet-200 sm:self-auto">
                {activeRow.badge}
              </span>
            </div>
          </div>

          {/* Right 5 cols: Direct Fast Chat Links (WhatsApp, Telegram, Instagram) + Phone */}
          <div className="flex flex-col justify-between rounded-3xl border border-violet-200/80 bg-white p-6 shadow-xl shadow-indigo-950/5 sm:p-8 lg:col-span-5">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-violet-700 uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Прямая связь с Бро</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Ответ за 2 минуты
                </span>
              </div>

              {/* Clickable tel: Phone */}
              <div className="rounded-2xl bg-gradient-to-r from-violet-50 via-indigo-50/60 to-sky-50 p-5">
                <div className="text-xs font-bold text-slate-500">
                  Единый телефон в Ереване:
                </div>
                <a
                  href="tel:+37499000000"
                  className="t-nums font-display mt-1 flex items-center gap-2.5 text-2xl font-extrabold text-slate-950 transition hover:text-violet-700 sm:text-3xl"
                >
                  <Phone className="h-6 w-6 text-violet-600" />
                  <span>+374 (99) 00-00-00</span>
                </a>
                <div className="mt-1.5 text-xs text-slate-500">
                  Ежедневно с 08:00 до 22:00 • Ночные уборки 24/7 по записи
                </div>
              </div>

              {/* 3 Fast Chat Buttons from TZ: WhatsApp, Telegram, Instagram */}
              <div className="space-y-3">
                <div className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                  Кнопки быстрого чата:
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/37499000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-emerald-200/90 bg-emerald-50/40 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-950">
                        WhatsApp
                      </div>
                      <div className="text-xs text-slate-600">
                        Быстрый чат, оценка по фото и вызов бригады
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-emerald-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-sky-200/90 bg-sky-50/40 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50 hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-sm">
                      <Send className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-950">
                        Telegram
                      </div>
                      <div className="text-xs text-slate-600">
                        Моментальная связь с менеджером «Уборка Бро»
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-sky-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-violet-200/90 bg-violet-50/40 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-50 hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 text-white shadow-sm">
                      <InstagramIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-950">
                        Instagram
                      </div>
                      <div className="text-xs text-slate-600">
                        Живые сторис До / После, рилс и заказ в Direct
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-violet-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-1.5 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span className="whitespace-nowrap">
                Локация: г. Ереван, Республика Армения
              </span>
              <span className="whitespace-nowrap font-bold text-slate-900">
                Договор для физ. и юр. лиц
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
