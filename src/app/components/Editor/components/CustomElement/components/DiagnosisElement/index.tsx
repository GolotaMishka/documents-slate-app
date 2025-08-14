import type { FC } from "react";
import { useSlateStatic } from "slate-react";
import { Transforms } from "slate";
import DiagnosisSelect from "@components/DiagnosisSelect";
import styles from "./Diagnosis.module.scss";
import type { RenderElementPropsFor, DiagnosisElement, Option, DefaultElement } from '@types';

const Diagnosis: FC<RenderElementPropsFor<DiagnosisElement>> = ({ attributes, children }) => {
  const editor = useSlateStatic();

  const onSelect = (option?: Option) => {
    const newNode: DefaultElement[] = [
    {
      type: "default",
      children: [{ text: option?.name as string }],
    },
     {
      type: "default",
      children: [{ text: option?.code as string }],
    },
    ]
    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] })
  };

  return (
    <div {...attributes} className={styles.diagnosis}>
      {children}
      <div contentEditable={false}>
        <DiagnosisSelect onSelect={onSelect} />
      </div>
    </div>
  );
};

export default Diagnosis;
