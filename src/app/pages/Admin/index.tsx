import Editor, { EDITOR_MODE } from '../../components/Editor';

function Admin() {
  return (
    <div>
        <h1>Admin</h1>
        <Editor mode={EDITOR_MODE.CREATE} />
    </div>
  )
}

export default Admin
