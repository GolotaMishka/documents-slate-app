import type { FC } from 'react'
import type { RenderElementPropsFor, TableRowElement } from '@types';

const TableRow: FC<RenderElementPropsFor<TableRowElement>> = ({ attributes, children }) => {
  return <tr {...attributes}>{children}</tr>
}

export default TableRow;