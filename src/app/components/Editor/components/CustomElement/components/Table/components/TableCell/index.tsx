import type { FC } from 'react'
import type { RenderElementPropsFor, TableCellElement } from '@types';

const TableCell: FC<RenderElementPropsFor<TableCellElement>> = ({ attributes, children }) => {
  return <td {...attributes} >{children}</td>
}

export default TableCell;