import { cn } from '../../utils/cn'

export const H2 = ({ children, className }: { children: Readonly<React.ReactNode>, className?: string }) => {
  return (
    <h2 className={cn("text-4xl md:text-5xl text-base-content font-medium my-6", className)}>
      {children}
    </h2>
  )
}
