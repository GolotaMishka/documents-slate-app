import type { FC } from "react";
import CustomEditor from "../../CustomEditor";
import { Button } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  FontSizeOutlined,
  CheckSquareOutlined,
  MoreOutlined,
  FileTextOutlined,
  CaretDownOutlined,
  HeartOutlined,
  TableOutlined,
} from "@ant-design/icons";
import styles from "./Toolbar.module.scss";
import { Tooltip } from "antd";
import type { CustomEditor as TCustomEditor } from "@types";
type TToolbarProps = {
  editor: TCustomEditor;
  isFillMode: boolean;
};

const Toolbar: FC<TToolbarProps> = ({ editor, isFillMode }) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarActions}>
        <Button
          shape="circle"
          icon={<BoldOutlined />}
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        />

        <Button
          shape="circle"
          icon={<ItalicOutlined />}
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleItalicMark(editor);
          }}
        />
      </div>

      <div className={styles.toolbarActions}>
        <Tooltip title="Add paragraph">
          <Button
            type="primary"
            shape="circle"
            icon={<FontSizeOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.insertParagraph(editor);
            }}
            disabled={isFillMode}
          />
        </Tooltip>

        <Tooltip title="Add label-value">
          <Button
            type="primary"
            shape="circle"
            icon={<FileTextOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.insertTextField(editor);
            }}
            disabled={isFillMode}
          />
        </Tooltip>

        <Tooltip title="Add checkbox">
          <Button
            type="primary"
            shape="circle"
            icon={<CheckSquareOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.insertCheckbox(editor);
            }}
            disabled={isFillMode}
          />
        </Tooltip>

        <Tooltip title="Add radio">
          <Button
            type="primary"
            shape="circle"
            icon={<MoreOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.insertRadio(editor);
            }}
            disabled={isFillMode}
          />
        </Tooltip>

        <Tooltip title="Add select">
          <Button
            type="primary"
            shape="circle"
            icon={<CaretDownOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.insertSelect(editor);
            }}
            disabled={isFillMode}
          />
        </Tooltip>
        <Tooltip title="Add diagnosis">
          <Button
            type="primary"
            shape="circle"
            icon={<HeartOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.insertDiagnosis(editor);
            }}
            disabled={isFillMode}
          />
        </Tooltip>

        <Tooltip title="Add table">
          <Button
            type="primary"
            shape="circle"
            icon={<TableOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.insertTable(editor);
            }}
            disabled={isFillMode}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Toolbar;
