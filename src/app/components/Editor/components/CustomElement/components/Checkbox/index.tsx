import React, { FC } from "react";
import { ReactEditor, useSlateStatic, useReadOnly } from "slate-react";
import { Transforms } from "slate";
import type { RenderElementProps } from "slate-react";
import styles from "./Checkbox.module.scss";

const Checkbox: FC<RenderElementProps> = ({
  attributes,
  children,
  element,
}) => {
  const { checked } = element;
  const editor = useSlateStatic();
  const readOnly = useReadOnly();

  const onChange = (event) => {
    const path = ReactEditor.findPath(editor, element);
    const newProperties = {
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
