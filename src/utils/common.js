import moment from "moment";

export const formatTime = (date) => {

    return moment(date).format(`HH:mm`);
  };

  export const formatFilmDuration = (date) => {

    // return moment(date).format(`mm`);
    return moment(date).minutes();
  };
  
  export const formatDate = (date) => {
    return moment(date).format(`DD MMMM YYYY`);
  };