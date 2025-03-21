import { CSSProperties } from "react";
import { H3 } from "../common/H3";
import { Edit } from "lucide-react";
import { TCategory } from "../../types/Category";
import { capitalizer } from "../../utils/capitalize";
import { Card } from "../common/Card";
import CardImage from "../common/CardImage";
import { cn } from "../../utils/cn";
import { usePopupStore } from "../../stores/popup.store";

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
      className={cn("group", className)}>
      <CardImage src={category.image} name={category.name} />
      <H3 className="text-center">
        {capitalizer(category.name)}
      </H3>
      {manager && (
        <button className="absolute top-3 sm:top-5 right-3 sm:right-5 w-fit" onClick={handleEdit}>
          <Edit size={32} />
        </button>
      )}
    </Card>
  )
}

export default CategoryCard