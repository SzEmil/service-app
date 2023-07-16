import fs from 'fs/promises';

const isAccessible = dir =>
  fs
    .access(dir)
    .then(() => true)
    .catch(() => false);

const createFolderIsNotExist = async folder => {
  if (!isAccessible(folder)) {
    await fs.mkdir(folder);
  }
};

export default createFolderIsNotExist;