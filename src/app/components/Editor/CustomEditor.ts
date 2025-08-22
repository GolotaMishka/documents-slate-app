import { Editor as SlateEditor, Transforms } from "slate";
import type {
  ParagraphElement,
  TextFieldElement,
  CheckboxElement,
  RadioGroupElement,
  SelectElement,
  DiagnosisElement,
  TableElement,
  Option, 
  DefaultElement,
  TableCellElement
} from "@types";

const CustomEditor = {
  isBoldMarkActive(editor: SlateEditor) {
    const marks = SlateEditor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isItalicMarkActive(editor: SlateEditor) {
    const marks = SlateEditor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  toggleBoldMark(editor: SlateEditor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      SlateEditor.removeMark(editor, "bold");
    } else {
      SlateEditor.addMark(editor, "bold", true);
    }
  },

  toggleItalicMark(editor: SlateEditor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      SlateEditor.removeMark(editor, "italic");
    } else {
      SlateEditor.addMark(editor, "italic", true);
    }
  },

  insertParagraph(editor: SlateEditor) {
    const newNode: ParagraphElement = {
      type: "paragraph",
      children: [{ text: "Text" }],
    };
    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },

  insertTextField(editor: SlateEditor) {
    const newNode: TextFieldElement = {
      type: "text-field",
      children: [
        { type: "label", children: [{ text: "New label", bold: true }] },
        { type: "text-field-value", children: [{ text: "abc" }] },
      ],
    };
    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },

  insertCheckbox(editor: SlateEditor) {
    const newNode: CheckboxElement = {
      type: "checkbox",
      checked: true,
      children: [{ text: "Agree" }],
    };

    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },
  insertRadio(editor: SlateEditor) {
    const name = "group" + Math.floor(Math.random() * 1000);
    const newNode: RadioGroupElement = {
      type: "radio-group",
      children: [
        {
          type: "label",
          children: [{ text: "Select a maintenance drone:", bold: true }],
        },
        {
          type: "radio-option",
          name,
          id: "Huey",
          checked: true,
          children: [{ text: "Huey" }],
        },
        {
          type: "radio-option",
          name,
          id: "Dewey",
          checked: false,
          children: [{ text: "Dewey" }],
        },
        {
          type: "radio-option",
          name,
          id: "Louie",
          checked: false,
          children: [{ text: "Louie" }],
        },
      ],
    };
    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },

  insertSelect(editor: SlateEditor) {
    const name = "select" + Math.floor(Math.random() * 1000);
    const newNode: SelectElement = {
      type: "select",
      name,
      options: [
        { value: "v1", label: "Label 1" },
        { value: "v2", label: "Label 2" },
        { value: "v3", label: "Label 3" },
      ],
      children: [
        { type: "label", children: [{ text: "Choose a pet:", bold: true }] },
      ],
    };

    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },

  insertDiagnosis(editor: SlateEditor) {
    const newNode: DiagnosisElement = {
      type: "diagnosis",
      children: [
        {
          type: "label",
          children: [{ text: "Choose diagnosis:", bold: true }],
        },
      ],
    };

    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },

  insertTable(editor: SlateEditor) {
    const newNode: TableElement = {
      type: "table",
      children: [
        {
          type: "table-row",
          children: [
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
            {
              type: "table-cell",
              children: [{ text: "Human", bold: true }],
            },
            {
              type: "table-cell",
              children: [{ text: "Dog", bold: true }],
            },
            {
              type: "table-cell",
              children: [{ text: "Cat", bold: true }],
            },
          ],
        },
        {
          type: "table-row",
          children: [
            {
              type: "table-cell",
              children: [{ text: "# of Feet", bold: true }],
            },
            {
              type: "table-cell",
              children: [{ text: "2" }],
            },
            {
              type: "table-cell",
              children: [{ text: "4" }],
            },
            {
              type: "table-cell",
              children: [{ text: "4" }],
            },
          ],
        },
        {
          type: "table-row",
          children: [
            {
              type: "table-cell",
              children: [{ text: "# of Lives", bold: true }],
            },
            {
              type: "table-cell",
              children: [{ text: "1" }],
            },
            {
              type: "table-cell",
              children: [{ text: "1" }],
            },
            {
              type: "table-cell",
              children: [{ text: "9" }],
            },
          ],
        },
      ],
    };

    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },

  insertComplexTable(editor: SlateEditor) {
    const generateHeaderCell = (title: string): TableCellElement => ({ type: "table-cell", children: [{ text: title, bold: true  }]  });
    const agreementNode: CheckboxElement = {
      type: "checkbox",
      checked: true,
      children: [],
    };

    const stateNode: SelectElement = {
        type: "select",
        name: "select" + Math.floor(Math.random() * 1000),
        options: [
          { value: "norm", label: "Нормальний" },
          { value: "gread", label: "Чудовий" },
          { value: "bad", label: "Поганий" },
        ],
        children: [],
      };


    const newNode: TableElement = {
      type: "table",
      children: [
        {
          type: "table-row",
          children: [
            generateHeaderCell('ПІБ'),
            generateHeaderCell('Згода'),
            generateHeaderCell('Стан'),
          ],
        },
        {
          type: "table-row",
          children: [
            {
              type: "table-cell",
              children: [{ text: "Іваненко В.В." }],
            },
            {
              type: "table-cell",
              children: [agreementNode],
            },
            {
              type: "table-cell",
              children: [stateNode],
            },
          ],
        },
      ],
    };

    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },
};

export default CustomEditor;
