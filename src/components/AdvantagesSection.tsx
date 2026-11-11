import {
  FileText,
  UserCheck,
  ShieldCheck,
  ClipboardCheck,
  Sparkles,
  CheckCircle,
} from 'lucide-react'

export function AdvantagesSection() {
  const advantages = [
    {
      num: '01',
      tag: 'Белая компания',
      title: 'Официально и надежно (Белая компания)',
      desc: 'Работаем прозрачно, предоставляем закрывающие документы и заключение договора для физических и юридических лиц.',
      icon: FileText,
      colSpan: 'md:col-span-2',
      accent: 'from-violet-500 to-indigo-600',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    },
    {
      num: '02',
      tag: '100% ответственность',
      title: 'Проверенный персонал',
      desc: 'Все сотрудники официально трудоустроены, прошли проверку безопасности и обучение. Мы несем 100% материальную ответственность.',
      icon: UserCheck,
      colSpan: 'md:col-span-2',
      accent: 'from-sky-500 to-blue-600',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      num: '03',
      tag: 'Гарантия 100%',
      title: 'Оплата за результат (Гарантия 100%)',
      desc: 'Вы проверяете работу и платите только тогда, когда всем довольны. (Предоплата только для крупных коммерческих объектов).',
      icon: ShieldCheck,
      colSpan: 'md:col-span-2',
      accent: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      num: '04',
      tag: 'Стандарты чистоты',
      title: 'Профессиональный контроль',
      desc: 'На объектах работают технологи и бригадиры, контролирующие соблюдение стандартов чистоты по чек-листу перед сдачей квартиры.',
      icon: ClipboardCheck,
      colSpan: 'md:col-span-3',
      accent: 'from-indigo-500 to-violet-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
  ]

  return (
    <section
      id="advantages"
      className="scroll-mt-20 border-b border-violet-100 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-violet-100 pb-8 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/80 px-3.5 py-1 text-xs font-extrabold tracking-wider text-indigo-800 uppercase">
              <CheckCircle className="h-3.5 w-3.5 text-indigo-600" />
              <span>Блок 4 • Наши преимущества</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Почему выбирают{' '}
              <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                «Уборка Бро»?
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
            Дружелюбный сервис без лишнего пафоса, но с железной дисциплиной,
            официальным договором и премиальной техникой.
          </p>
        </div>

        {/* 5 Bento Cards Grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-6">
          {advantages.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.num}
                className={`${item.colSpan} group flex flex-col justify-between rounded-3xl border border-violet-100/90 bg-gradient-to-br from-white via-white to-violet-50/40 p-6 shadow-lg shadow-indigo-950/5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl sm:p-8`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`t-nums rounded-full border px-3 py-1 text-xs font-extrabold ${item.badgeBg}`}
                  >
                    {item.num} • {item.tag}
                  </span>
                </div>

                <div className="mt-6 space-y-2.5">
                  <h3 className="font-display text-lg font-extrabold text-slate-950 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}

          {/* 5th Card: Premium Chemistry & Equipment (Featured Gradient Card) */}
          <div className="group flex flex-col justify-between rounded-3xl bg-gradient-to-br from-violet-700 via-indigo-700 to-sky-600 p-6 text-white shadow-xl shadow-violet-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8 md:col-span-3">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="t-nums rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-extrabold text-sky-100">
                05 • Karcher & Kiehl
              </span>
            </div>

            <div className="mt-6 space-y-2.5">
              <h3 className="font-display text-lg font-extrabold text-white sm:text-xl">
                Премиум-химия и оборудование
              </h3>
              <p className="text-xs leading-relaxed text-violet-100 sm:text-sm">
                Используем гипоаллергенную профессиональную химию и мощное
                спец-оборудование (промышленные пылесосы, парогенераторы,
                роторные и экстракторные машины).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
