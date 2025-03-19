import { cn } from '../../utils/cn'

export const H2 = ({ children, className }: { children: Readonly<React.ReactNode>, className?: string }) => {
  return (
    <h2 className={cn("text-5xl text-base-content font-rubik font-medium", className)}>
      {children}
    </h2>
  )
}
