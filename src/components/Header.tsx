import { useState } from 'react'
import {
  Sparkles,
  Phone,
  Calculator,
  Menu,
  X,
  Send,
  MessageSquare,
} from 'lucide-react'
import { InstagramIcon } from './InstagramIcon'

interface HeaderProps {
  onOpenCareersSubpage: () => void
}

export function Header({ onOpenCareersSubpage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Услуги', href: '#services' },
    { label: 'Калькулятор', href: '#calculator', highlight: true },
    { label: 'До / После', href: '#results' },
    { label: 'Преимущества', href: '#advantages' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Работа у нас', href: '#careers' },
    { label: 'Контакты', href: '#contacts' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100/80 bg-white/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* 1. Brand Logo (left, leads to #hero) */}
        <a
          href="#hero"
          className="group flex shrink-0 items-center gap-3 focus:outline-none"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-[9px] font-extrabold text-slate-950 ring-2 ring-white">
              ★
            </span>
          </div>
          <div className="whitespace-nowrap">
            <div className="flex items-center gap-1.5 font-display text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
              <span>UBORKA</span>
              <span className="rounded-lg bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                BRO
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"></span>
              <span>Уборка Бро • Ереван</span>
            </div>
          </div>
        </a>

        {/* 2. Anchor Navigation Menu (Center) */}
        <nav className="hidden xl:flex shrink-0 items-center gap-1 rounded-2xl border border-violet-100/90 bg-slate-50/70 p-1.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 ${
                item.highlight
                  ? 'bg-white text-violet-700 shadow-sm ring-1 ring-violet-200/70 hover:bg-violet-50'
                  : 'text-slate-600 hover:bg-white/90 hover:text-violet-700'
              }`}
            >
              {item.highlight && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600" />
              )}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* 3. Fast Contacts: tel: link + Instagram icon/link + CTA */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="tel:+37499000000"
            className="t-nums hidden md:inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-xs font-extrabold text-slate-900 shadow-xs transition-all hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
              <Phone className="h-3.5 w-3.5" />
            </span>
            <span>+374 (99) 00-00-00</span>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Uborka Bro"
            title="Instagram профиль Uborka Bro"
            className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border border-violet-200/80 bg-gradient-to-tr from-violet-50 via-white to-sky-50 px-3.5 text-xs font-bold text-slate-800 shadow-xs transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:text-violet-700 hover:shadow-md"
          >
            <InstagramIcon className="h-4 w-4 shrink-0 text-violet-600" />
            <span className="hidden 2xl:inline">Instagram</span>
          </a>

          <a
            href="#calculator"
            className="hidden sm:inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 px-4 text-xs font-extrabold text-white shadow-md shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/35"
          >
            <Calculator className="h-4 w-4 shrink-0" />
            <span>Калькулятор</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Открыть меню навигации"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-violet-50 xl:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-violet-100 bg-white/95 px-4 py-5 shadow-2xl backdrop-blur-xl xl:hidden">
          <div className="mx-auto max-w-7xl space-y-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-colors ${
                    item.highlight
                      ? 'border-violet-300 bg-violet-50 text-violet-700'
                      : 'border-slate-200/80 bg-slate-50/70 text-slate-800 hover:bg-violet-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenCareersSubpage()
                }}
                className="cursor-pointer rounded-xl border border-sky-200 bg-sky-50/80 px-3.5 py-2.5 text-left text-xs font-bold text-sky-800"
              >
                Анкета «Работа у нас» ↗
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <a
                href="tel:+37499000000"
                className="t-nums flex items-center gap-2 text-sm font-extrabold text-slate-900"
              >
                <Phone className="h-4 w-4 text-violet-600" />
                <span>+374 (99) 00-00-00</span>
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  Telegram
                </a>
                <a
                  href="https://wa.me/37499000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
