import { useState, useCallback, useMemo } from 'react'
import type { FC } from 'react';
import { withHistory } from 'slate-history'
import { createEditor } from 'slate'
import type { Descendant } from 'slate';
import { Button } from 'antd';
import { Slate, Editable, withReact } from 'slate-react'
import type { RenderElementProps, RenderLeafProps} from 'slate-react';
import Toolbar from './components/Toolbar';
import Leaf from './components/Leaf';
import CustomElement from './components/CustomElement';
import type { CustomEditor } from '@types'
import { EDITOR_MODE } from '@types'
import styles from './Editor.module.scss';

type TEditorProps = {
    mode: EDITOR_MODE
}

const INITIAL_VALUE: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }]}];

const Editor: FC<TEditorProps> = ({ mode }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())) as CustomEditor,[])
  const initialValue: Descendant[] = useMemo(() => localStorage.getItem("content") ? JSON.parse(localStorage.getItem("content") as string) : INITIAL_VALUE, []);
  const [content, setContent] = useState(JSON.stringify(initialValue));
  const isFillMode = mode === EDITOR_MODE.FILL;

  const renderElement = useCallback((props: RenderElementProps) => <CustomElement {...props} isFillMode={isFillMode} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])


  const onSave = () => {
    const value = JSON.stringify(editor.children, null, 2);
    setContent(value);
    localStorage.setItem("content", value);
  }

  const onClear = () => localStorage.removeItem('content');

  return (
    <div>
      <Toolbar editor={editor} isFillMode={isFillMode} />

      <Slate 
        editor={editor} 
        initialValue={initialValue}
      >
        <Editable
          onKeyDown={event => {
            // event.preventDefault(); // stop new block creation
            if (event.key === "Enter") event.preventDefault(); // stop new block creation
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className={styles.editor}
        />
      </Slate>

      <Button type='primary' onClick={onSave}>SAVE</Button>
      <Button color="danger" variant="solid" onClick={onClear}>CLEAR STORAGE</Button>

      <div className={styles.content}>
        {content}
      </div>
    </div>
  )
}

export default Editor
