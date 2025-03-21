import { Button } from './Button'
import { SaveIcon, Trash2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { LoadingText } from './LoadingText'


interface EditFormButtonsProps {
  isLoading: boolean
  isDeleting: boolean
  resetPopup: () => void
  handleDelete: () => void
}

const EditFormButtons = ({ isLoading, isDeleting, resetPopup, handleDelete }: EditFormButtonsProps) => {
  return (
    <div className="flex flex-wrap justify-between gap-2">
      <Button
        type="submit"
        className="flex items-center h-fit gap-2 !px-4 flex-1 whitespace-nowrap justify-center"
        disabled={isLoading}
      >
        <SaveIcon />
        {isLoading ? <LoadingText /> : "Edit"}
      </Button>
      <Button
        execute={handleDelete}
        className={cn(
          isDeleting
            ? "!bg-error !text-error-content"
            : "!bg-warning text-warning-content",
          "flex items-center h-fit gap-2 !px-4 flex-1 whitespace-nowrap justify-center",
        )}
        disabled={isLoading}
      >
        <Trash2 />
        {isLoading ? (
          <LoadingText />
        ) : !isDeleting ? (
          "Delete"
        ) : (
          "Delete Confirm"
        )}
      </Button>
      <Button
        execute={resetPopup}
        className="!bg-base-content/70 !text-base-100 flex-1 whitespace-nowrap "
        disabled={isLoading}
      >
        Cancel
      </Button>
    </div>
  )
}

export default EditFormButtons