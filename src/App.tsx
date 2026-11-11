import { useState } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import {
  CalculatorSection,
  type ExtrasState,
} from './components/CalculatorSection'
import { ServiceChecklistsSection } from './components/ServiceChecklistsSection'
import { BeforeAfterSection } from './components/BeforeAfterSection'
import { AdvantagesSection } from './components/AdvantagesSection'
import { ReviewsSection } from './components/ReviewsSection'
import { CareersSection } from './components/CareersSection'
import { ContactsSection } from './components/ContactsSection'
import { Footer } from './components/Footer'
import type {
  BeforeAfterCase,
  CalcMode,
  CleaningServiceId,
} from './data/uborkaData'

export function App() {
  const [mode, setMode] = useState<CalcMode>('cleaning')
  const [serviceId, setServiceId] = useState<CleaningServiceId>('regular')
  const [area, setArea] = useState<number>(60)
  const [extras, setExtras] = useState<ExtrasState>({
    eco: false,
    equip: false,
    night: false,
  })
  const [dryCounts, setDryCounts] = useState<Record<string, number>>({})
  const [carpetM2, setCarpetM2] = useState<number>(0)
  const [careersSubpageOpen, setCareersSubpageOpen] = useState(false)

  const handleChangeMode = (newMode: CalcMode) => {
    setMode(newMode)
    if (newMode === 'dryclean') {
      const hasAnyDry =
        Object.values(dryCounts).some((v) => v > 0) || carpetM2 > 0
      if (!hasAnyDry) {
        setDryCounts((prev) => ({ ...prev, sofa3: 1 }))
      }
    }
  }

  const handleToggleExtra = (key: keyof ExtrasState) => {
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleChangeDryCount = (id: string, delta: number) => {
    setDryCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }))
  }

  const handleResetDryClean = () => {
    setDryCounts({})
    setCarpetM2(0)
  }

  const handleApplyScenario = (
    targetServiceId: CleaningServiceId,
    targetArea: number,
    targetMode: CalcMode,
    withEquip: boolean
  ) => {
    setServiceId(targetServiceId)
    setArea(targetArea)
    setExtras({ eco: false, equip: withEquip, night: false })
    setCarpetM2(0)
    if (targetMode === 'combo') {
      setDryCounts({ sofa3: 1 })
    } else {
      setDryCounts({})
    }
    setMode(targetMode)
    document
      .getElementById('calculator')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectServiceFromChecklists = (
    targetServiceId: CleaningServiceId
  ) => {
    setMode('cleaning')
    setServiceId(targetServiceId)
  }

  const handleLoadCasePreset = (preset: BeforeAfterCase['preset']) => {
    setExtras({ eco: false, equip: !!preset.equip, night: false })
    setCarpetM2(preset.carpetM2 || 0)
    if (preset.serviceId) setServiceId(preset.serviceId)
    if (preset.area) setArea(preset.area)
    if (preset.dry) {
      setDryCounts({ ...preset.dry })
    } else {
      setDryCounts({})
    }
    setMode(preset.mode)
  }

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900">
      <Header onOpenCareersSubpage={() => setCareersSubpageOpen(true)} />

      <main>
        <HeroSection
          area={area}
          serviceId={serviceId}
          onChangeArea={setArea}
          onSelectScenario={handleApplyScenario}
        />

        <CalculatorSection
          mode={mode}
          onChangeMode={handleChangeMode}
          serviceId={serviceId}
          onSelectService={setServiceId}
          area={area}
          onChangeArea={setArea}
          extras={extras}
          onToggleExtra={handleToggleExtra}
          dryCounts={dryCounts}
          onChangeDryCount={handleChangeDryCount}
          carpetM2={carpetM2}
          onChangeCarpetM2={setCarpetM2}
          onResetDryClean={handleResetDryClean}
          onApplyPreset={handleApplyScenario}
        />

        <ServiceChecklistsSection
          onSelectInCalculator={handleSelectServiceFromChecklists}
        />

        <BeforeAfterSection
          onLoadCaseToCalculator={handleLoadCasePreset}
        />

        <AdvantagesSection />

        <ReviewsSection />

        <CareersSection
          isSubpageOpen={careersSubpageOpen}
          onOpenSubpage={() => setCareersSubpageOpen(true)}
          onCloseSubpage={() => setCareersSubpageOpen(false)}
        />

        <ContactsSection />
      </main>

      <Footer onOpenCareersSubpage={() => setCareersSubpageOpen(true)} />
    </div>
  )
}

export default App
