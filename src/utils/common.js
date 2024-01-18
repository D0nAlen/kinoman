import moment from "moment";

export const formatTime = (date) => {

  return moment(date).format(`HH:mm`);
};

export const formatFilmDuration = (date) => {
  const hours = moment.duration(date, `minutes`).hours();
  const minutes = moment.duration(date, `minutes`).minutes();
  return hours ? hours + "h " + minutes + "m" :
    minutes + "m";
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};