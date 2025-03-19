import { useState } from 'react'
import { capitalizer } from '../../utils/capitalize'
import { TCategory } from '../../types/Category'
import { cn } from '../../utils/cn'
import { LabelText } from './LabelText'
import { FormError } from './FormError'

interface CategorySelectorProps {
  options: TCategory[],
  onChange: (selectedValue: TCategory["id"][]) => void,
  error?: string,
  name?: string
}


export const CategorySelector = ({ options, onChange, error, name }: CategorySelectorProps) => {
  const [selectedCategories, setSelectedCategories] = useState<TCategory["id"][]>([])

  const toggleSelectedCategory = (categoryId: TCategory["id"]) => {
    const isPresent = selectedCategories.find(p => p === categoryId);
    if (isPresent) {
      const newSC = selectedCategories.filter(c => c !== categoryId);
      setSelectedCategories(newSC)
      onChange(newSC)
      return;
    }
    const newSC = [...selectedCategories, categoryId];
    setSelectedCategories(newSC)
    onChange(newSC)
  }

  return (
    <div>
      <label htmlFor={name}>
        <LabelText text={name} />
        <div className='flex flex-wrap gap-2'>
          {
            options.map((o, idx) =>
              <button
                key={idx}
                type="button"
                onClick={() => toggleSelectedCategory(o.id)}
                className={cn('px-4 py-1 rounded-4xl cursor-pointer shadow-md',
                  "hover:-translate-y-0.5 transition-transform duration-150",
                  selectedCategories.includes(o.id)
                    ? 'bg-accent text-accent-content font-medium ring-2 ring-primary-content'
                    : 'bg-primary text-primary-content '
                )}
              >
                {capitalizer(o.name)}
              </button>
            )
          }
        </div>
      </label>
      <FormError error={error} />
    </div>
  )
}
