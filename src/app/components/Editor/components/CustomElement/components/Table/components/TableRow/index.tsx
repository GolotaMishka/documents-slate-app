import { useState, useMemo } from "react";
import type { FC } from "react";
import type { RenderElementPropsFor, TableRowElement } from "@types";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Path } from 'slate';
import { Transforms } from "slate";
import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";
import {
  HolderOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const getItems = ({
  insertAbove,
  insertBelow,
  deleteRow,
}: {
  insertAbove: () => void;
  insertBelow: () => void;
  deleteRow: () => void;
}): MenuProps["items"] => [
  {
    label: (
      <div>
        <ArrowUpOutlined style={{ marginRight: 10 }} />
        Insert above
      </div>
    ),
    key: "0",
    onClick: insertAbove,
  },
  {
    label: (
      <div>
        <ArrowDownOutlined style={{ marginRight: 10 }} />
        Insert below
      </div>
    ),
    key: "1",
    onClick: insertBelow,
  },
  {
    label: (
      <div>
        <DeleteOutlined style={{ marginRight: 10 }} />
        Delete
      </div>
    ),
    key: "2",
    onClick: deleteRow,
  },
];

const TableRow: FC<RenderElementPropsFor<TableRowElement>> = ({
  attributes,
  children,
  element,
}) => {
  const editor = useSlateStatic();
  const rowPath = ReactEditor.findPath(editor, element);
  const [hover, setHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const insertRow = (insertPath: Path) => {
    const cellCount = element.children.length;

    // Create a new row with the same number of cells
    const newRow: TableRowElement = {
      type: "table-row",
      children: Array.from({ length: cellCount }).map(() => ({
        type: "table-cell",
        children: [{ text: "" }],
      })),
    };

    Transforms.insertNodes(editor, newRow, { at: insertPath });
  };

  const insertAbove = () => insertRow(rowPath);
  const insertBelow = () => insertRow(Path.next(rowPath));
  const deleteRow = () => Transforms.removeNodes(editor, { at: rowPath });

  const items = useMemo(
    () =>
      getItems({
        insertAbove,
        insertBelow,
        deleteRow,
      }),
    [rowPath]
  );

  return (
    <tr
      {...attributes}
      style={{
        margin: "10px 0",
        position: "relative",
        outline: menuOpen ? "2px solid blue" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setMenuOpen(false);
      }}
    >
      {children}
      {hover && (
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          open={menuOpen}
          onOpenChange={setMenuOpen}
        >
          <Button
            style={{ position: "absolute", left: "-12px", top: 10 }}
            size="small"
            icon={<HolderOutlined />}
          />
        </Dropdown>
      )}
    </tr>
  );
};

export default TableRow;
