import React, { FC } from 'react'
import { Editable,ReactEditor, Slate, useFocused, useSelected, useSlateStatic, useReadOnly } from 'slate-react'
import {
  Transforms,
} from 'slate'
import Paragraph from './components/Paragraph';
import Checkbox from './components/Checkbox';
import Select from './components/Select';
import DiagnosisElement from './components/DiagnosisElement';
import TextField from './components/TextField';
import RadioGroup from './components/RadioGroup';
import RadioOption from './components/RadioGroup/components/RadioOption';
import TextFieldValue from './components/TextField/components/TextFieldValue';
import Label from './components/TextField/components/Label';

type TCustomElementProps = {
}


const DefaultElement = props => {
  const selected = useSelected();
  return <span {...props.attributes} style={{
    ...(selected && { border: '2px solid blue' }),
    marginRight: '15px'
  }}>{props.children}</span>
}

const CustomElement: FC<TCustomElementProps> = (props) => {
  const { element } = props;
  switch (element.type) {
    case 'paragraph':
        return <Paragraph {...props} />
    case 'checkbox':
      return <Checkbox {...props} />
    case "text-field":
      return <TextField {...props} />

    case "label":
      return <Label {...props}  />

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

      default:
        return <DefaultElement {...props} />
  }
}

export default CustomElement
