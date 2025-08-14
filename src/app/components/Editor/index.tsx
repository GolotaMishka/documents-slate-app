import React, { useState, useCallback, useMemo } from 'react'
import type { FC } from 'react';
import { withHistory } from 'slate-history'
import { createEditor } from 'slate'
import type { Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react'
import type { RenderElementProps, RenderLeafProps} from 'slate-react';
import Toolbar from './components/Toolbar';
import Leaf from './components/Leaf';
import CustomElement from './components/CustomElement';
import type { CustomEditor, EDITOR_MODE } from '@types'
import styles from './Editor.module.scss';

type TEditorProps = {
    mode: EDITOR_MODE
}

const INITIAL_VALUE: Descendant[] = [];

const Editor: FC<TEditorProps> = ({ mode }) => {
  console.log({mode})
  const editor = useMemo(
    () => withHistory(withReact(createEditor())) as CustomEditor,
    []
  )
  const [content, setContent] = useState(JSON.stringify(INITIAL_VALUE, null, 2));
  const renderElement = useCallback((props: RenderElementProps) => <CustomElement {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])

  return (
    <div>
      <Toolbar editor={editor} />

      <Slate 
        editor={editor} 
        initialValue={INITIAL_VALUE}
        onChange={value => {
          const isAstChange = editor.operations.some(op => 'set_selection' !== op.type)
          if (isAstChange) {
            setContent(JSON.stringify(value, null, 2));
          }
        }}
      >
        <Editable
          onKeyDown={event => {
            if (event.key === "Enter") {
              event.preventDefault(); // stop new block creation
            }
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className={styles.editor}
        />
      </Slate>

      <div className={styles.content}>
        {content}
      </div>
    </div>
  )
}

export default Editor
