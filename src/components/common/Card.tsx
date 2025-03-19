import React from 'react'

interface CardProps {
  bg?: string,
  text?: string,
  Tag: "article" | "button" | "div"
  children?: Readonly<React.ReactNode>
}

export const Card = ({ bg, text, Tag = "div", children }: CardProps) => {
  return (
    <Tag
      className='rounded-xl overflow-hidden border border-black/20 shadow-md flex flex-col'
      style={{
        backgroundColor: bg,
        color: text
      }}
    >
      {children}
    </Tag>
  )
}
