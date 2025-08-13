import React, { FC } from "react";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms } from "slate";
import type { RenderElementProps } from "slate-react";
import DiagnosisSelect from "../../../../../DiagnosisSelect";
import styles from "./Diagnosis.module.scss";

const Diagnosis: FC<RenderElementProps> = ({ attributes, children, element }) => {
  const editor = useSlateStatic();

  const onSelect = ({ code, name }) => {
    console.log({ event });
    // const path = ReactEditor.findPath(editor, element);
    // const newProperties = {
    //   value: event?.target?.value,
    // };
    // Transforms.setNodes(editor, newProperties, { at: path });
    const newNode = [
    {
      type: "default",
      children: [{ text: name }],
    },
     {
      type: "default",
      children: [{ text: code }],
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
