import type { FC } from "react";
import { Transforms, Node } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";
import styles from "./RadioOption.module.scss";
import type { RenderElementPropsFor, RadioOptionElement } from '@types';

const RadioOption: FC<RenderElementPropsFor<RadioOptionElement>> = ({
  attributes,
  children,
  element,
}) => {
  const editor = useSlateStatic();

  const handleChange = () => {
    if (!editor.selection) return;

    // Get the path to the currently edited element
    const currentPath = ReactEditor.findPath(editor, element);

    // Get parent (radio-group) path
    const groupPath = currentPath.slice(0, -1);
    const groupNode = Node.get(editor, groupPath);

    // @ts-expect-error
    if (groupNode && groupNode.type === "radio-group") {
      groupNode.children.forEach((opt) => {
        const optPath = ReactEditor.findPath(editor, opt);
        Transforms.setNodes(
          editor,
              // @ts-expect-error
          { checked: opt.id === element.id },
          { at: optPath }
        );
      });
    }
  };

  return (
    <div {...attributes} className={styles.radioOption}>
      <span contentEditable={false}>
        <input
          type="radio"
          id={element.id}
          name={element.name}
          value={element.id}
          checked={element.checked}
          onChange={handleChange}
        />
      </span>
      {children}
    </div>
  );
};

export default RadioOption;
