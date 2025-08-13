import Editor, { EDITOR_MODE } from '../../components/Editor';

function Doctor() {
  return (
    <div>
      <h1>Doctor</h1>
      <Editor mode={EDITOR_MODE.FILL} />
      </div>
  )
}

export default Doctor
