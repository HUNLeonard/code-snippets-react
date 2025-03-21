import { CircleX, PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../common/Button'

const NoRelatedCodes = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="size-20 bg-base-content/50 rounded-full grid place-content-center">
        <CircleX strokeWidth={2} size={52} />
      </div>
      <p className="text-lg text-base-content/60">No related code snippet has been created yet!</p>
      <Button
        className="w-fit mx-auto !bg-accent !px-4"
        tag={Link} tagProps={{ to: "/codes/new" }}
      >
        <span className="flex items-center gap-2">
          <PlusCircle size={20} />
          Create Code
        </span>
      </Button>
    </div>
  )
}

export default NoRelatedCodes