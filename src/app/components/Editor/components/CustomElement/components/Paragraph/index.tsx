import type { FC } from 'react'
import { useSelected } from 'slate-react'
import classNames from 'classnames';
import styles from './Paragraph.module.scss';
import type { RenderElementPropsFor, ParagraphElement } from '@types';

const Paragraph: FC<RenderElementPropsFor<ParagraphElement>> = ({ attributes, children }) => {
  const selected = useSelected();

  return (
  <p {...attributes} className={classNames(styles.paragraph, {[styles.paragraphSelected]: selected})}>
    {children}
    </p>
)
}

export default Paragraph;