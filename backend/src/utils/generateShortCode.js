import { nanoid } from "nanoid";

const generateShortCode = () => {
  return nanoid(8);
};

export default generateShortCode;