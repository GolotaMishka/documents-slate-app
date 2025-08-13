import React, { FC } from "react";
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
} from "@ant-design/icons";
import styles from "./Toolbar.module.scss";
import { Tooltip } from "antd";

type TToolbarProps = {
  editor: any;
};

const Toolbar: FC<TToolbarProps> = ({ editor }) => {
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
          />
        </Tooltip>

        <Tooltip title="Add label-value">
          <Button
            type="primary"
            shape="circle"
            icon={<FileTextOutlined />}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.insertLabelValue(editor);
            }}
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
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Toolbar;
