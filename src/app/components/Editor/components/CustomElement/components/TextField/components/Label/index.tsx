import React, { FC } from 'react'
import { useSelected } from 'slate-react'
import type { RenderElementProps } from 'slate-react';
import classNames from 'classnames';
import styles from './Label.module.scss';

const Label: FC<RenderElementProps> = ({ attributes, children }) => {
  const selected = useSelected();

  return (
  <p {...attributes} className={classNames(styles.label, {[styles.labelSelected]: selected})}>
    {children}
    </p>
)
}

export default Label;