import type { FC } from "react";
import styles from "./RadioGroup.module.scss";
import type { RenderElementPropsFor, RadioGroupElement } from '@types';

const RadioGroup: FC<RenderElementPropsFor<RadioGroupElement>> = ({
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
