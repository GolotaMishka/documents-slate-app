import type { BaseEditor } from 'slate'
import type { ReactEditor, RenderElementProps } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export enum EDITOR_MODE {
    CREATE = 'create',
    FILL = 'fill',
}

export type Option = { code: string; name: string };

export type FormattedText = { text: string; bold?: true, italic?: boolean  };

export type CustomText = FormattedText;

export type ParagraphElement = {
  type: 'paragraph',
  children: CustomText[]
}

export type LabelElement = {
  type: 'label',
  children: CustomText[]
}

export type TextFieldValueElement = {
  type: 'text-field-value',
  children: CustomText[]
}


export type TextFieldElement = {
  type: 'text-field',
  children: [LabelElement, TextFieldValueElement]
}

export type CheckboxElement = {
  type: 'checkbox',
  checked: boolean,
  children: CustomText[]
}

export type RadioOptionElement = {
  type: 'radio-option',
  name: string,
  id: string,
  checked: boolean,
  children: [CustomText]
}

export type RadioGroupElement = {
  type: 'radio-group',
  children: [LabelElement, ...RadioOptionElement[]]
}

export type SelectElement = {
    type: "select",
    name: string,
    value?: string,
    options: { value: string, label: string }[],
    children: LabelElement[],
}

export type DiagnosisElement = {
    type: "diagnosis",
    value?: { name: string, code: string },
    children: [LabelElement],
}

export type TableCellElement = {
    type: "table-cell",
    children: (CheckboxElement|CustomText|SelectElement)[],
}

export type TableRowElement = {
    type: "table-row",
    children: TableCellElement[],
}

export type TableElement = {
    type: "table",
    children: TableRowElement[],
}

export type DefaultElement = {
    type: "default",
    children: CustomText[]
}

export type CustomElement = 
ParagraphElement 
| LabelElement 
| TextFieldValueElement 
| TextFieldElement 
| CheckboxElement 
| RadioOptionElement
| RadioGroupElement 
| SelectElement 
| DiagnosisElement
| TableCellElement 
| TableRowElement 
| TableElement
| DefaultElement;

export type RenderElementPropsFor<T> = RenderElementProps & {
  element: T
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}