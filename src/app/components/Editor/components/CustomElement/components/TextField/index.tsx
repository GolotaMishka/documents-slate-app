import type { FC } from 'react'
import styles from './TextField.module.scss';
import type { RenderElementPropsFor, TextFieldElement } from '@types';

const TextField: FC<RenderElementPropsFor<TextFieldElement>> = ({ attributes, children }) => {
  return (
  <p {...attributes} className={styles.textField}>
    {children}
    </p>
)
}

export default TextField;