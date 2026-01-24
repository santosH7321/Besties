import type { FC, ReactElement, ReactNode } from "react"

interface CardInterface {
  children?: ReactElement
  title?: ReactNode
  footer?: ReactElement
  divider?: boolean
}

const Card: FC<CardInterface> = ({ children, title, footer, divider }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border border-gray-100
        px-6 py-5
        space-y-3
        shadow-sm
        hover:shadow-md
        transition-shadow
      "
    >
      {title && (
        <h1 className="text-base font-semibold text-gray-900 capitalize">
          {title}
        </h1>
      )}

      {divider && (
        <div className="h-px bg-gray-100 -mx-6 my-3" />
      )}

      {children && (
        <div className="text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      )}

      {footer && (
        <div className="pt-4 mt-4 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card