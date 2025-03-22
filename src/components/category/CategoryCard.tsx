import { CSSProperties } from "react";
import { H3 } from "../common/H3";
import { Edit } from "lucide-react";
import { TCategory } from "../../types/Category";
import { capitalizer } from "../../utils/capitalize";
import { Card } from "../common/Card";
import CardImage from "../common/CardImage";
import { cn } from "../../utils/cn";
import { usePopupStore } from "../../stores/popup.store";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: TCategory;
  manager?: boolean;
  style?: CSSProperties
  className?: string
}

const CategoryCard = ({ category, manager = false, style = {}, className }: CategoryCardProps) => {
  const setEditingValues = usePopupStore(store => store.setEditingValues)
  const openPopup = usePopupStore(store => store.openPopup)

  const handleEdit = () => {
    setEditingValues(category)
    openPopup()
  }

  return (
    <Card
      Tag="article"
      style={style}
      className={className}>
      <Link to={`/codes?categories=${category._id}`} className="group">
        <CardImage src={category.image} name={category.name} />
      </Link>
      <H3 className={cn("text-center",
        "hover:scale-105 w-fit mx-auto",
        "hover:text-primary transition-[color,scale] duration-200",
      )}
        title={category.name}>
        <Link to={`/codes?categories=${category._id}`}>
          {capitalizer(category.name)}
        </Link>
      </H3>
      {manager && (
        <button className={cn("absolute top-3 sm:top-5 right-3 sm:right-5 w-fit",
          "hover:scale-120 transition-transform duration-200 ease-in-out",
        )}
          onClick={handleEdit}>
          <Edit size={32} />
        </button>
      )}
    </Card>
  )
}

export default CategoryCard