import axios from "axios";
import { useState, DragEvent } from "react";
import { toast } from "react-toastify";

type TDragEvent = DragEvent<HTMLDivElement>;

const Uploader = () => {
  const [drag, setDrag] = useState<boolean>(false);

  const dragStartHandler = (e: TDragEvent) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: TDragEvent) => {
    e.preventDefault();
    setDrag(false);
  };

  const addFileToYandex = async ({
    href,
    file,
  }: {
    href: string;
    file: File;
  }) => {
    toast
      .promise(
        axios.put(href, file, {
          headers: {
            "Content-Type": file.type,
          },
        }),
        {
          pending: "Подождите 🕒",
          success: "Загрузилось 👌",
        }
      )
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const getUrlForUpload = async (url: string, file: File) => {
    const {
      data: { href },
    }: {
      data: {
        href: string;
      };
    } = await axios.get(url, {
      headers: {
        Authorization:
          "OAuth y0_AgAAAABlXjFoAApCSgAAAADo9Ju6Ua4cuQKdSaWGFDNbwVXb5TuukIM",
        "Content-Type": "application/octet-stream",
      },
    });

    addFileToYandex({ href, file });
  };

  const onDropHandler = (e: TDragEvent) => {
    e.preventDefault();

    let files: File[] = [...e.dataTransfer.files];
    const file: File = files[0];

    const fileName: string = file.name;
    const webkitRelativePath: string = file.webkitRelativePath || "";

    const fullPath: string = webkitRelativePath
      ? webkitRelativePath + "/" + encodeURIComponent(fileName)
      : encodeURIComponent(fileName);

    const url: string = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${fullPath}&overwrite=true`;

    getUrlForUpload(url, file);

    setDrag(false);
  };

  return (
    <div className="uploader">
      {drag ? (
        <div
          className="drop-area"
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
          onDrop={onDropHandler}
        >
          Отпустите файлы , чтобы загрузить их
        </div>
      ) : (
        <div
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
        >
          Перетащите файлы , чтобы загрузить их
        </div>
      )}
    </div>
  );
};

export default Uploader;
