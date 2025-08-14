import type { FC } from 'react'
import { useSelected } from 'slate-react'
import type { RenderElementProps } from 'slate-react'

const DefaultElement: FC<RenderElementProps> = ({ attributes, children }) => {
  const selected = useSelected();

  return (
  <span
      {...attributes}
      style={{
        ...(selected && { border: "2px solid blue" }),
        marginRight: "15px",
      }}
    >
      {children}
    </span>
)
}

export default DefaultElement;