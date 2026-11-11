import { useState } from 'react'
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CheckCheck,
  Sparkles,
} from 'lucide-react'
import { REVIEWS_LIST } from '../data/uborkaData'

export function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? REVIEWS_LIST.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === REVIEWS_LIST.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <section
      id="reviews"
      className="airy-mesh-bg scroll-mt-20 border-b border-violet-100 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + Rating Summary + Carousel Controls */}
        <div className="flex flex-col justify-between gap-6 border-b border-violet-100 pb-8 lg:flex-row lg:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100/90 px-3.5 py-1 text-xs font-extrabold tracking-wider text-violet-800 uppercase">
              <MessageCircle className="h-3.5 w-3.5 text-violet-600" />
              <span>Блок 5 • Отзывы клиентов и скриншоты чатов</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Что пишут клиенты{' '}
              <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                в наших мессенджерах
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="t-nums flex items-center gap-3 rounded-2xl border border-violet-200/80 bg-white px-4 py-2.5 shadow-xs">
              <span className="font-display text-2xl font-extrabold text-slate-950">
                5.0
              </span>
              <div className="text-xs">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <div className="font-semibold text-slate-500">
                  Рейтинг по Еревану (5 звёзд)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Предыдущий отзыв"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-violet-200 bg-white text-slate-800 shadow-xs transition hover:border-violet-500 hover:bg-violet-50 hover:text-violet-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Следующий отзыв"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-violet-200 bg-white text-slate-800 shadow-xs transition hover:border-violet-500 hover:bg-violet-50 hover:text-violet-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messenger Screenshot-style Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS_LIST.map((rev, idx) => {
            const isHighlighted = idx === activeIndex
            const messengerStyles =
              rev.messenger === 'Telegram'
                ? 'bg-sky-50 text-sky-700 border-sky-200'
                : rev.messenger === 'WhatsApp'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-violet-50 text-violet-700 border-violet-200'

            return (
              <div
                key={rev.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex cursor-pointer flex-col justify-between rounded-3xl border p-5 transition-all duration-300 ${
                  isHighlighted
                    ? 'border-violet-400 bg-white shadow-xl shadow-violet-500/10 ring-2 ring-violet-400/30 -translate-y-1'
                    : 'border-violet-100/90 bg-white/90 shadow-md shadow-indigo-950/5 hover:-translate-y-1 hover:border-violet-300'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Messenger Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="font-display text-sm font-extrabold text-slate-950">
                        {rev.name}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        {rev.district}
                      </div>
                    </div>
                    <span
                      className={`rounded-xl border px-2.5 py-1 text-[10px] font-extrabold ${messengerStyles}`}
                    >
                      {rev.messenger}
                    </span>
                  </div>

                  {/* 5 Stars + Service Tag */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                      {rev.serviceTag}
                    </span>
                  </div>

                  {/* Simulated Chat Screenshot Bubble */}
                  <div className="rounded-2xl rounded-tl-sm border border-slate-100 bg-slate-50/90 p-3.5 text-xs leading-relaxed text-slate-700">
                    <p>«{rev.text}»</p>
                    <div className="mt-2 flex items-center justify-end gap-1 text-[10px] font-semibold text-slate-400">
                      <span>{rev.timeSent}</span>
                      <CheckCheck className="h-3.5 w-3.5 text-sky-500" />
                    </div>
                  </div>

                  {/* Uborka Bro Reply Bubble */}
                  <div className="ml-4 rounded-2xl rounded-tr-sm bg-gradient-to-r from-violet-600 to-indigo-600 p-3 text-[11px] leading-snug text-white shadow-xs">
                    <div className="mb-0.5 flex items-center gap-1 font-extrabold text-sky-200">
                      <Sparkles className="h-3 w-3" />
                      <span>Uborka Bro</span>
                    </div>
                    <p>{rev.broReply}</p>
                  </div>
                </div>

                {/* Footer with Order Total */}
                <div className="t-nums mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <span className="font-semibold text-slate-400">
                    Сумма заказа:
                  </span>
                  <span className="font-extrabold text-violet-700">
                    {rev.price}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
