import { useEffect, useRef, useState } from 'react'

export function useAnimatedNumber(target: number, duration = 360): number {
  const [displayValue, setDisplayValue] = useState(target)
  const currentRef = useRef(target)

  useEffect(() => {
    const startValue = currentRef.current
    const diff = target - startValue
    if (diff === 0) return

    let animationFrameId: number
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const nextVal = Math.round(startValue + diff * eased)
      currentRef.current = nextVal
      setDisplayValue(nextVal)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        currentRef.current = target
        setDisplayValue(target)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [target, duration])

  return displayValue
}
