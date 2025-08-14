import { useState } from "react";
import type { FC } from "react";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms } from "slate";
// import styles from './Table.module.scss';
import { Button } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import type { RenderElementPropsFor, TableElement, TableRowElement } from '@types';
const Table: FC<RenderElementPropsFor<TableElement> & { isFillMode: boolean }> = ({ attributes, children, element, isFillMode }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const [hover, setHover] = useState(false);

  const addRow = () => {
    const newRow: TableRowElement = {
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

  const removeElement = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  };

  return (
    <div 
    {...attributes} 
    style={{ margin: "10px 0", position: "relative" }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    >
      <table style={{ position: "relative" }}>
        <tbody {...attributes}>{children}</tbody>
      </table>

      {hover && !isFillMode && (
        <Button
            icon={<DeleteOutlined />}
            onClick={removeElement}
            color="danger" 
            variant="solid"
            style={{ position: 'absolute', right: 0, top: 0 }}
          />
      )}
      {!isFillMode && (
        <div style={{ marginTop: 10 }} contentEditable={false}>
          <Tooltip title="Add row">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={(event) => {
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
              onClick={(event) => {
                event.preventDefault();
                deleteRow();
              }}
            />
          </Tooltip>
        </div>
        )}
    </div>
  );
};

export default Table;
