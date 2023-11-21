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