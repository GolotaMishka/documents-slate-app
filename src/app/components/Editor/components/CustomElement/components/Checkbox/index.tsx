import type { FC } from "react";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms } from "slate";
import styles from "./Checkbox.module.scss";
import type { RenderElementPropsFor, CheckboxElement } from '@types';

const Checkbox: FC<RenderElementPropsFor<CheckboxElement> & { isFillMode: boolean }> = ({
  attributes,
  children,
  element,
  isFillMode,
}) => {
  const { checked } = element;
  const editor = useSlateStatic();

  const onChange = (event: any) => {
    const path = ReactEditor.findPath(editor, element);
    const newProperties: Partial<CheckboxElement> = {
      checked: event.target.checked,
    };
    Transforms.setNodes(editor, newProperties, { at: path });
  };

  return (
    <div {...attributes} className={styles.checkbox}>
      <span
        contentEditable={!isFillMode}
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
