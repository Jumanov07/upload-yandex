import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getUrlForUpload } from "./redux/slices/uploadSlice";

function App() {
  const [drag, setDrag] = useState(false);

  const dispatch = useDispatch();

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    const file = files[0];

    const fileName = file.name;
    const webkitRelativePath = file.webkitRelativePath || "";

    const fullPath = webkitRelativePath
      ? webkitRelativePath + "/" + encodeURIComponent(fileName)
      : encodeURIComponent(fileName);

    const url = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${fullPath}&overwrite=true`;

    dispatch(
      getUrlForUpload({
        url,
        file,
      })
    );

    setDrag(false);
  };

  return (
    <div className="app">
      {drag ? (
        <div
          className="drop-area"
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          Отпустите файлы , чтобы загрузить их
        </div>
      ) : (
        <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          Перетащите файлы , чтобы загрузить их
        </div>
      )}
    </div>
  );
}

export default App;
