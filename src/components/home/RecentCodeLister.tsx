import { Link } from 'react-router-dom'
import { TCode } from '../../types/Code'
import RecentCodeCard from './RecentCodeCard'
import { cn } from '../../utils/cn'

const RecentCodeLister = ({ codes }: { codes: TCode[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {codes.map((code) => (
          <RecentCodeCard key={code.id} code={code} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link
          to="/codes"
          className={cn(
            "px-6 py-2 bg-primary/20 text-primary-content rounded-full",
            "hover:bg-primary/30 transition-colors duration-200",
            "flex items-center justify-center gap-2 font-medium",
          )}
        >
          View All Snippets
        </Link>
      </div>
    </>
  )
}

export default RecentCodeLister