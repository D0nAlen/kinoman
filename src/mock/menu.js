const menuButtonNames = [
    `Watchlist`,
    `History`,
    `Favorites`,
  ];
  
  const generateMenu = () => {
    return menuButtonNames.map((it) => {
      return {
        title: it,
        count: Math.floor(Math.random() * 10),
      };
    });
  };
  
  export { generateMenu };
  