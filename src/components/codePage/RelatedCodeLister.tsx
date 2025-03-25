import { Link, useNavigate } from 'react-router-dom'
import BubbleText from '../common/BubbleText'
import { TCategory } from '../../types/Category'
import { TCode } from '../../types/Code'

interface RelatedCodeLister {
  relatedCodes: TCode[],
  categories: TCategory[]
}

const RelatedCodeLister = ({ relatedCodes, categories }: RelatedCodeLister) => {
  const navigate = useNavigate();
  const navigatioToCode = (src: string) => {
    navigate(`/codes/${src}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {relatedCodes.map((item) => (
        <div
          onClick={() => navigatioToCode(item._id)}
          key={item._id}
          className="flex flex-col bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-primary transition-colors cursor-pointer"
        >
          <h4 className="text-lg font-medium mb-2">{item.name}</h4>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {item.desc}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {item.categories.map((cat) => (
              <BubbleText
                key={cat}
                text={categories.find((c) => c._id === cat)?.name || ""}
                tag={Link} tagProps={{ to: `/codes?categories=${cat}` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RelatedCodeLister