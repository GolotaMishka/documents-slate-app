import React, { FC } from 'react'
import type { RenderElementProps } from 'slate-react';
import styles from './TextField.module.scss';

const TextField: FC<RenderElementProps> = ({ attributes, children }) => {
  return (
  <p {...attributes} className={styles.textField}>
    {children}
    </p>
)
}

export default TextField;