import React, { FC, useState, useCallback, useMemo } from 'react'
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import Toolbar from './components/Toolbar';
import Leaf from './components/Leaf';
import CustomElement from './components/CustomElement';

export enum EDITOR_MODE {
    CREATE = 'create',
    FILL = 'fill',
}

type TEditorProps = {
    mode: EDITOR_MODE
}

const initialValue = [
  //  { "type": "checkbox", "checked": false, "children": [ { "text": "Agree?" } ] } 
  // {
  //   type: 'paragraph',
  //   children: [{ text: 'FIRST 1' }],
  // },
  // {
  //   type: 'paragraph',
  //   children: [{ text: 'SECOND 2' }],
  // },
];

const withBlockProtection = (editor) => {
  const { deleteBackward, deleteFragment, deleteForward } = editor;

  // Prevent backspace removing the first block
  editor.deleteBackward = (unit) => {
    const { selection } = editor;
    console.log("deleteBackward: ", { unit, editor })
    // if (selection && editor.children.length <= 1) {
    //   // Only one block → don't delete it
    //   return;
    // }
    deleteBackward(unit);
  };

  // Prevent delete key removing the last block
  editor.deleteForward = (unit) => {
    console.log("deleteForward: ", { unit, editor })
    // const { selection } = editor;
    // if (selection && editor.children.length <= 1) {
    //   return;
    // }
    deleteForward(unit);
  };

  // Prevent removing multiple blocks
  // editor.deleteFragment = () => {
  //   if (editor.children.length <= 1) {
  //     return;
  //   }
  //   deleteFragment();
  // };

  return editor;
};

const Editor: FC<TEditorProps> = ({ mode }) => {
  const [editor] = useState(() => withBlockProtection(withReact(createEditor())))
  const [content, setContent] = useState(JSON.stringify(initialValue, null, 2));
  const renderElement = useCallback(props => <CustomElement {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return (
    <div>
      <Toolbar editor={editor} />

      <Slate 
        editor={editor} 
        initialValue={initialValue}
        onChange={value => {
          const isAstChange = editor.operations.some(op => 'set_selection' !== op.type)
          if (isAstChange) {
            setContent(JSON.stringify(value, null, 2));
          }
        }}
      >
        <Editable
          style={{ background: 'white', padding: '10px 20px', border: '1px solid #ccc' }}
          onKeyDown={event => {
            if (event.key === "Enter") {
              event.preventDefault(); // stop new block creation
            }
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>

      <div style={{ border: '1px solid black', marginTop: '20px', padding: 20}}>
        {content}
      </div>
    </div>
  )
}

export default Editor
