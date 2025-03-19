
import { capitalizer } from '../../utils/capitalize'

export const LabelText = ({ text }: { text: string | undefined }) => {
  return (
    <p className="text-lg sm:text-xl text-base-content/80 font-medium mb-1.5">
      {text?.trim() && capitalizer(text)}
    </p>
  )
}
