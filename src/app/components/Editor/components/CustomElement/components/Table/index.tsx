import React, { FC } from "react";
import type { RenderElementProps } from "slate-react";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms } from "slate";
// import styles from './Table.module.scss';
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const Table: FC<RenderElementProps> = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const addRow = () => {
    const newRow = {
      type: "table-row",
      children: element.children[0].children.map(() => ({
        type: "table-cell",
        children: [{ text: "" }],
      })),
    };
    Transforms.insertNodes(editor, newRow, {
      at: [...path, element.children.length],
    });
  };

  const deleteRow = () => {
    if (element.children.length > 1) {
      Transforms.removeNodes(editor, {
        at: [...path, element.children.length - 1],
      });
    }
  };

  return (
    <div {...attributes} style={{ margin: "10px 0" }}>
      <table style={{ position: "relative" }}>
        <tbody {...attributes}>{children}</tbody>
      </table>
      <div style={{ marginTop: 10 }} contentEditable={false}>
        <Tooltip title="Add row">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              addRow();
            }}
          />
        </Tooltip>

        <Tooltip title="Delete row">
          <Button
            type="primary"
            shape="circle"
            icon={<MinusOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              deleteRow();
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Table;
