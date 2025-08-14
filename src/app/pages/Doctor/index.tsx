import Editor from "@components/Editor";
import { EDITOR_MODE } from "@types";

function Doctor() {
  return (
    <div>
      <h1>Doctor</h1>
      <Editor mode={EDITOR_MODE.FILL} />
    </div>
  );
}

export default Doctor;
