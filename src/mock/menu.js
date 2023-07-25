const menuButtonNames = [
    `watchlist`,
    `history`,
    `favorites`,
  ];
  
  const generateMenu = () => {
    return menuButtonNames.map((it) => {
      return {
        title: it.charAt(0).toUpperCase() + it.slice(1),
        count: Math.floor(Math.random() * 10),
      };
    });
  };
  
  export { generateMenu };
  