import type { FC } from 'react'
import { useSelected } from 'slate-react'
import classNames from 'classnames';
import styles from './Label.module.scss';
import type { RenderElementPropsFor, LabelElement } from '@types';

const Label: FC<RenderElementPropsFor<LabelElement>> = ({ attributes, children }) => {
  const selected = useSelected();

  return (
  <p {...attributes} className={classNames(styles.label, {[styles.labelSelected]: selected})}>
    {children}
    </p>
)
}

export default Label;