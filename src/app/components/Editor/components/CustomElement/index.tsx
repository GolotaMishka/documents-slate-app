import type { FC } from "react";
import type { RenderElementProps } from "slate-react";
import Paragraph from "./components/Paragraph";
import Checkbox from "./components/Checkbox";
import Select from "./components/Select";
import Diagnosis from "./components/DiagnosisElement";
import Table from "./components/Table";
import TableRow from "./components/Table/components/TableRow";
import TableCell from "./components/Table/components/TableCell";
import TextField from "./components/TextField";
import RadioGroup from "./components/RadioGroup";
import RadioOption from "./components/RadioGroup/components/RadioOption";
import TextFieldValue from "./components/TextField/components/TextFieldValue";
import Label from "./components/Label";
import DefaultElement from './components/DefaultElement';

import type {
  RenderElementPropsFor,
  ParagraphElement,
  LabelElement,
  TextFieldValueElement,
  TextFieldElement,
  CheckboxElement,
  RadioOptionElement,
  RadioGroupElement,
  SelectElement,
  DiagnosisElement,
  TableCellElement,
  TableRowElement,
  TableElement,
} from "@types";

const CustomElement: FC<RenderElementProps> = (props) => {
  const { element } = props;
  switch (element.type) {
    case "paragraph":
      return (
        <Paragraph {...(props as RenderElementPropsFor<ParagraphElement>)} />
      );
    case "checkbox":
      return <Checkbox {...(props as RenderElementPropsFor<CheckboxElement>)} />;
    case "text-field":
      return <TextField {...(props as RenderElementPropsFor<TextFieldElement>)} />;
    case "label":
      return <Label {...(props as RenderElementPropsFor<LabelElement>)} />;
    case "text-field-value":
      return <TextFieldValue {...(props as RenderElementPropsFor<TextFieldValueElement>)} />;
    case "radio-group":
      return <RadioGroup {...(props as RenderElementPropsFor<RadioGroupElement>)} />;
    case "radio-option":
      return <RadioOption {...(props as RenderElementPropsFor<RadioOptionElement>)} />;
    case "select":
      return <Select {...(props as RenderElementPropsFor<SelectElement>)} />;
    case "diagnosis":
      return <Diagnosis {...(props as RenderElementPropsFor<DiagnosisElement>)} />;
    case "table":
      return <Table {...(props as RenderElementPropsFor<TableElement>)} />;
    case "table-row":
      return <TableRow {...(props as RenderElementPropsFor<TableRowElement>)} />;
    case "table-cell":
      return <TableCell {...(props as RenderElementPropsFor<TableCellElement>)} />;

    default:
      return <DefaultElement {...props} />;
  }
};

export default CustomElement;
