import { useEffect } from "react";
import useStorage from "../firebase hooks/useStorage";
import deleteFile from "../firebase comps/deleteFile";

const UploadAvatar = ({ file, setFile, avatarUrl, setAvatarUrl }) => {
  const { url } = useStorage(file);
  console.log(url);

  useEffect(() => {
    if (url) {
      deleteFile(avatarUrl);
      setAvatarUrl(url);
    }
  });

  return null;
};

export default UploadAvatar;
