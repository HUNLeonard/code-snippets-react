import React from 'react'
import { cn } from '../../utils/cn';

interface BubbleTextProps {
  text: string;
  tag?: React.ElementType;
  tagProps?: object;
  className?: string;
  style?: React.CSSProperties;
}

const BubbleText = ({ text, tag: Tag = "div", tagProps = {}, className, style = {} }: BubbleTextProps) => {
  return (
    <Tag className={cn('text-sm px-4 py-1 bg-primary/80 text-primary-content',
      'w-fit rounded-4xl shadow shadow-primary/50',
      'hover:-translate-y-0.5 cursor-pointer',
      'active:translate-y-0 active:brightness-75',
      'transiton-transform duration-200 ease-in-out',
      className)}
      style={style}
      {...tagProps}
    >
      {text}
    </Tag>
  )
}

export default BubbleText