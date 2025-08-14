import Editor from "@components/Editor";
import { EDITOR_MODE } from "@types";
function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <Editor mode={EDITOR_MODE.CREATE} />
    </div>
  );
}

export default Admin;
