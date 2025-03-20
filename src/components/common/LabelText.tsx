
import { capitalizer } from '../../utils/capitalize'

export const LabelText = ({ text }: { text: string | undefined }) => {
  if (!text) return null;
  return (
    <p className="text-lg sm:text-xl text-base-content/80 font-medium mb-1.5">
      {capitalizer(text)}
    </p>
  )
}
