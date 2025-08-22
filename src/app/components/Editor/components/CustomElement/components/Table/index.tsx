import { useState } from "react";
import type { FC } from "react";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms } from "slate";
import { Button } from "antd";
import {
  MinusOutlined,
  DeleteOutlined,
  DeleteColumnOutlined,
  ColumnWidthOutlined,
  InsertRowBelowOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import type {
  RenderElementPropsFor,
  TableElement,
  TableRowElement,
  TableCellElement,
} from "@types";
const Table: FC<
  RenderElementPropsFor<TableElement> & { isFillMode: boolean }
> = ({ attributes, children, element, isFillMode }) => {
  const editor = useSlateStatic();
  const tablePath = ReactEditor.findPath(editor, element);
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
      at: [...tablePath, element.children.length],
    });
  };

  const deleteRow = () => {
    if (element.children.length > 1) {
      Transforms.removeNodes(editor, {
        at: [...tablePath, element.children.length - 1],
      });
    }
  };

  const addColumn = () => {
    const { children } = element;

    for (const [rowIndex, row] of children.entries()) {
      // @ts-expect-error
      if (row.type !== "table-row") continue;

      const cell: TableCellElement = {
        type: "table-cell",
        children: [{ text: "" }],
      };

      Transforms.insertNodes(editor, cell, {
        at: [...tablePath, rowIndex, row.children.length],
      });
    }
  };


  const deleteColumn = () => {
  const lastColIndex = element.children[0].children.length - 1;
  if (lastColIndex < 0) return;

  // Remove last cell from each row
  element.children.forEach((row, rowIndex) => {
    const cellPath = [...tablePath, rowIndex, lastColIndex];
    Transforms.removeNodes(editor, { at: cellPath });
  });
}

  const deleteTable = () => {
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
      {!isFillMode && (
        <div style={{ marginBottom: 10 }} contentEditable={false}>
          <Tooltip title="Add column">
            <Button
              type="primary"
              shape="circle"
              icon={<ColumnWidthOutlined />}
              onClick={(event) => {
                event.preventDefault();
                addColumn();
              }}
            />
          </Tooltip>
          <Tooltip title="Delete column">
            <Button
              color="danger"
              variant="solid"
              shape="circle"
              icon={<DeleteColumnOutlined />}
              onClick={(event) => {
                event.preventDefault();
                deleteColumn();
              }}
            />
          </Tooltip>
        </div>
      )}
      <table style={{ position: "relative" }}>
        <tbody {...attributes}>{children}</tbody>
      </table>

      {hover && !isFillMode && (
        <Button
          icon={<DeleteOutlined />}
          onClick={deleteTable}
          color="danger"
          variant="solid"
          style={{ position: "absolute", right: 0, top: 0 }}
        />
      )}

      {!isFillMode && (
        <div style={{ marginTop: 10 }} contentEditable={false}>
          <Tooltip title="Add row">
            <Button
              type="primary"
              shape="circle"
              icon={<InsertRowBelowOutlined />}
              onClick={(event) => {
                event.preventDefault();
                addRow();
              }}
            />
          </Tooltip>

          <Tooltip title="Delete row">
            <Button
              color="danger"
              variant="solid"
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
