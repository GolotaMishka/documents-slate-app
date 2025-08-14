import type { FC } from "react";
import { ReactEditor, useSlateStatic, useReadOnly } from "slate-react";
import { Transforms } from "slate";
import styles from "./Checkbox.module.scss";
import type { RenderElementPropsFor, CheckboxElement } from '@types';

const Checkbox: FC<RenderElementPropsFor<CheckboxElement>> = ({
  attributes,
  children,
  element,
}) => {
  const { checked } = element;
  const editor = useSlateStatic();
  const readOnly = useReadOnly();

  const onChange = (event) => {
    const path = ReactEditor.findPath(editor, element);
    const newProperties: Partial<CheckboxElement> = {
      checked: event.target.checked,
    };
    Transforms.setNodes(editor, newProperties, { at: path });
  };

  return (
    <div {...attributes} className={styles.checkbox}>
      <span
        contentEditable={!readOnly}
        suppressContentEditableWarning
        className={styles.checkboxLabel}
      >
        {children}
      </span>
      <span contentEditable={false}>
        <input type="checkbox" checked={checked} onChange={onChange} />
      </span>
    </div>
  );
};

export default Checkbox;
