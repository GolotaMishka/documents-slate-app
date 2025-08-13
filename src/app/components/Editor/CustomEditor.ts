import { Editor as SlateEditor, Transforms, Element } from "slate";

const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = SlateEditor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isItalicMarkActive(editor) {
    const marks = SlateEditor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  isCodeBlockActive(editor) {
    const [match] = SlateEditor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      SlateEditor.removeMark(editor, "bold");
    } else {
      SlateEditor.addMark(editor, "bold", true);
    }
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      SlateEditor.removeMark(editor, "italic");
    } else {
      SlateEditor.addMark(editor, "italic", true);
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Element.isElement(n) && SlateEditor.isBlock(editor, n) }
    );
  },

  toggleVoid(editor) {
    SlateEditor.addMark(editor, "isVoid", true);
  },

  insertParagraph(editor) {
    const text = { text: "Text" };
    const newNode = {
      type: "paragraph",
      children: [text],
    };
    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },

  insertLabelValue(editor) {
    const newNode = {
      type: "text-field",
      children: [
        { type: "label", children: [{ text: "New label", bold: true }] },
        { type: "text-field-value", children: [{ text: "abc" }] },
      ],
    };
    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },
  insertCheckbox(editor) {
    const newNode = {
      type: "checkbox",
      checked: true,
      children: [{ text: "Agree" }],
    };

    Transforms.insertNodes(editor, newNode, { at: [editor.children.length] });
  },
  insertRadio(editor) {
    const name = "group" + Math.floor(Math.random() * 1000);
    const newNode = {
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

  insertSelect(editor) {
    const name = "select" + Math.floor(Math.random() * 1000);
    const newNode = {
      type: "select",
      name,
      // value: 'v2',
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

  insertDiagnosis(editor) {
    const newNode = {
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

  insertTable(editor) {
    const newNode = {
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
};

export default CustomEditor;
