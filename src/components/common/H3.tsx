import { cn } from '../../utils/cn'

export const H3 = ({ children, className }: { children: Readonly<React.ReactNode>, className?: string }) => {
  return (
    <h3 className={cn("text-3xl md:text-4xl text-base-content font-medium", className)} title={String(children)}>
      {children}
    </h3>
  )
}
