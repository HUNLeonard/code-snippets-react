import { useEffect, useMemo, useState } from 'react'


const TopLoadingBar = ({ maxTime = 1000, bg = "var(--color-success)" }: { maxTime: number, bg?: string }) => {
  const [percentage, setPercentage] = useState(0)
  const percentageStepTime = useMemo(() => maxTime / 100, [maxTime])

  useEffect(() => {
    // Oke, so we want the width to be 100% in maxTime
    // this we can achieve by increasing the percentage by 1
    // every X ms wich is given by the maxTime/100 (BECAUSE 3000ms/100% -> 30ms)
    // Also we can smoothenit out with transition
    const timerId = setInterval(() => {
      setPercentage(p => Math.min(p + 1, 100))
    }, percentageStepTime)

    return () => { clearInterval(timerId) }
  }, [percentageStepTime])

  return (
    <div className="absolute top-0 left-0 p-0.5 transition-[width]"
      style={{
        width: percentage + "%",
        backgroundColor: bg,
        transitionDuration: percentageStepTime + "ms"
      }}
    />
  )
}

export default TopLoadingBar