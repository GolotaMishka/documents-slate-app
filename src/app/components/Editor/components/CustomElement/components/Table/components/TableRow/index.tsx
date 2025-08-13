import React, { FC } from 'react'
import type { RenderElementProps } from 'slate-react';
// import styles from './Table.module.scss';

const TableRow: FC<RenderElementProps> = ({ attributes, children }) => {
  return <tr {...attributes}>{children}</tr>
}

export default TableRow;