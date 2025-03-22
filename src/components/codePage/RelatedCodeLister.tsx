import { Link } from 'react-router-dom'
import BubbleText from '../common/BubbleText'
import { TCategory } from '../../types/Category'
import { TCode } from '../../types/Code'

interface RelatedCodeLister {
  relatedCodes: TCode[],
  categories: TCategory[]
}

const RelatedCodeLister = ({ relatedCodes, categories }: RelatedCodeLister) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {relatedCodes.map((item) => (
        <Link
          to={`/codes/${item._id}`}
          key={item._id}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-primary transition-colors cursor-pointer h-fit"
        >
          <h4 className="text-lg font-medium mb-2">{item.name}</h4>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {item.desc}
          </p>
          <div className="flex gap-2">
            {item.categories.map((cat) => (
              <BubbleText
                key={cat}
                text={categories.find((c) => c._id === cat)?.name || ""}
                tag={Link} tagProps={{ to: `/codes?categories=${cat}` }}
              />
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default RelatedCodeLister