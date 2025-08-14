import type { FC } from 'react'
import { useSelected } from 'slate-react'
import classNames from 'classnames';
import styles from './TextFieldValue.module.scss';
import type { RenderElementPropsFor, TextFieldValueElement } from '@types';

const TextFieldValue: FC<RenderElementPropsFor<TextFieldValueElement>> = ({ attributes, children }) => {
  const selected = useSelected();

  return (
  <p {...attributes} className={classNames(styles.textFieldValue, {[styles.textFieldValueSelected]: selected})}>
    {children}
    </p>
)
}

export default TextFieldValue;