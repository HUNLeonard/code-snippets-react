import React from 'react'
import { cn } from '../../utils/cn'

interface LoadingBarIconWrapperProps {
  children: Readonly<React.ReactNode>
  bg?: string,
  color?: string,

}

const LoadingBarIconWrapper = ({ children, bg = "black", color = "white" }: LoadingBarIconWrapperProps) => {
  return (
    <div className={cn("size-10 rounded-full",
      " shrink-0 grid place-content-center")}
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </div>
  )
}

export default LoadingBarIconWrapper