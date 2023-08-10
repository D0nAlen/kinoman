import { COMMENTS } from "../const.js";

export const generateComments = (count) => {
  let commentsArray = new Array(count);
  return Object.assign(commentsArray, COMMENTS);
};
