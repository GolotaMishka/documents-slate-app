import React, { FC } from "react";
import { useSelected } from "slate-react";
import Paragraph from "./components/Paragraph";
import Checkbox from "./components/Checkbox";
import Select from "./components/Select";
import DiagnosisElement from "./components/DiagnosisElement";
import Table from "./components/Table";
import TableRow from "./components/Table/components/TableRow";
import TableCell from "./components/Table/components/TableCell";
import TextField from "./components/TextField";
import RadioGroup from "./components/RadioGroup";
import RadioOption from "./components/RadioGroup/components/RadioOption";
import TextFieldValue from "./components/TextField/components/TextFieldValue";
import Label from "./components/TextField/components/Label";

type TCustomElementProps = {};

const DefaultElement = (props) => {
  const selected = useSelected();
  return (
    <span
      {...props.attributes}
      style={{
        ...(selected && { border: "2px solid blue" }),
        marginRight: "15px",
      }}
    >
      {props.children}
    </span>
  );
};

const CustomElement: FC<TCustomElementProps> = (props) => {
  const { element } = props;
  switch (element.type) {
    case "paragraph":
      return <Paragraph {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    case "text-field":
      return <TextField {...props} />;

    case "label":
      return <Label {...props} />;

    case "text-field-value":
      return <TextFieldValue {...props} />;

    case "radio-group":
      return <RadioGroup {...props} />;
    case "radio-option":
      return <RadioOption {...props} />;

    case "select":
      return <Select {...props} />;

    case "diagnosis":
      return <DiagnosisElement {...props} />;

    case "table":
      return <Table {...props} />;
    case "table-row":
      return <TableRow {...props} />;
    case "table-cell":
      return <TableCell {...props} />;

    default:
      return <DefaultElement {...props} />;
  }
};

export default CustomElement;
