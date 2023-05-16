import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

export const getAvatar = (username) => {
  console.log("getting avatar for user ", username);
  let avatar = createAvatar(avataaars, {
    seed: username,
    size: 128,
    dataUri: true,
    accessoriesProbability: 100,
    // backgroundColor: ["E76F51", "E9C46A", "F4A261"],
  });
  return avatar.toDataUriSync();
};
