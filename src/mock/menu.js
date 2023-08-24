import { WATCHLIST_CARDS, HISTORY_CARDS, FAVORITES_CARDS } from "../const.js";

const menuButtonNames = [
  {
    title: "Watchlist",
    count: WATCHLIST_CARDS.length,
  },
  {
    title: "History",
    count: HISTORY_CARDS.length,
  },
  {
    title: "Favorites",
    count: FAVORITES_CARDS.length,
  },
];

export const generateMenu = () => {
  return menuButtonNames;
};
// const generateMenu = () => {
//   return menuButtonNames.map((it) => {
//     return {
//       title: it.charAt(0).toUpperCase() + it.slice(1),
//       count: Math.floor(Math.random() * 10),
//     };
//   });
// };