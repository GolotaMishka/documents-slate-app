import React, { FC } from "react";
import type { RenderElementProps } from "slate-react";
import styles from "./RadioGroup.module.scss";

const RadioGroup: FC<RenderElementProps> = ({
  attributes,
  children,
}) => {
  return (
    <fieldset {...attributes} className={styles.radioGroup}>
      {children}
    </fieldset>
  );
};

export default RadioGroup;
