import type { FC } from "react";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms } from "slate";
import styles from "./Select.module.scss";
import type { RenderElementPropsFor, SelectElement } from '@types';

const Select: FC<RenderElementPropsFor<SelectElement>> = ({ attributes, children, element }) => {
  const { value, name, options } = element;
  const editor = useSlateStatic();

  const onChange = (event) => {
    const path = ReactEditor.findPath(editor, element);
    const newProperties: Partial<SelectElement> = {
      value: event?.target?.value,
    };
    Transforms.setNodes(editor, newProperties, { at: path });
  };

  return (
    <div {...attributes} className={styles.select}>
      {children}
      <span
        contentEditable={false}
        suppressContentEditableWarning
        className={styles.selectValue}
      >
        {value || "Оберіть"}
      </span>
      <select name={name} id={name} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
