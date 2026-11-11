import {
  Sparkles,
  Phone,
  Send,
  MessageSquare,
} from 'lucide-react'
import { InstagramIcon } from './InstagramIcon'

interface FooterProps {
  onOpenCareersSubpage: () => void
}

export function Footer({ onOpenCareersSubpage }: FooterProps) {
  return (
    <footer className="bg-slate-950 py-14 text-white">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-center">
          {/* Logo + Tagline */}
          <a href="#hero" className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-extrabold tracking-tight text-white">
                UBORKA <span className="text-sky-400">BRO</span> («Уборка Бро»)
              </div>
              <div className="text-xs text-slate-400">
                Бро наводит порядок — ты наслаждаешься жизнью! Клининг в Ереване
              </div>
            </div>
          </a>

          {/* Navigation Links Repeat per TZ */}
          <nav className="flex flex-wrap gap-6 text-xs font-bold text-slate-300 sm:text-sm">
            <a href="#services" className="transition hover:text-sky-400">
              Услуги
            </a>
            <a href="#calculator" className="transition hover:text-sky-400">
              Калькулятор
            </a>
            <a href="#results" className="transition hover:text-sky-400">
              До / После
            </a>
            <a href="#advantages" className="transition hover:text-sky-400">
              Преимущества
            </a>
            <a href="#reviews" className="transition hover:text-sky-400">
              Отзывы
            </a>
            <a href="#careers" className="transition hover:text-sky-400">
              Работа у нас
            </a>
            <button
              type="button"
              onClick={onOpenCareersSubpage}
              className="cursor-pointer text-violet-300 transition hover:text-white"
            >
              Вакансии (Анкета)
            </button>
            <a href="#contacts" className="transition hover:text-sky-400">
              Контакты
            </a>
          </nav>
        </div>

        {/* Bottom Copyright & Socials */}
        <div className="t-nums flex flex-col items-start justify-between gap-4 text-xs text-slate-400 sm:flex-row sm:items-center">
          <div>
            © 2026 «Uborka Bro» («Уборка Бро», Ереван,
            Армения). Все права защищены. Официальный договор и 100% гарантия
            чистоты.
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+37499000000"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 font-extrabold text-white transition hover:bg-violet-600"
            >
              <Phone className="h-3.5 w-3.5 text-sky-400" />
              <span>+374 (99) 00-00-00</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 font-bold text-white transition hover:bg-violet-600"
            >
              <InstagramIcon className="h-3.5 w-3.5 text-violet-300" />
              <span>Instagram</span>
            </a>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 font-bold text-white transition hover:bg-sky-600"
            >
              <Send className="h-3.5 w-3.5 text-sky-300" />
              <span>Telegram</span>
            </a>

            <a
              href="https://wa.me/37499000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 font-bold text-white transition hover:bg-emerald-600"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-300" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
