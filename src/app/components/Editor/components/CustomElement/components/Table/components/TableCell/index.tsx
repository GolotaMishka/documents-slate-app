import React, { FC } from 'react'
import type { RenderElementProps } from 'slate-react';
// import styles from './Table.module.scss';

const TableCell: FC<RenderElementProps> = ({ attributes, children }) => {
  return <td {...attributes} >{children}</td>
}

export default TableCell;