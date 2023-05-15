import { useState, useEffect } from "react";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../firebase/config";

const useStorage = (file) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(storage, file.name);

    uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .then((url) => setUrl(url))
      .catch((error) => console.log(error));
  }, [file]);

  return { url };
};

export default useStorage;
