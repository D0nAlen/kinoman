import moment from "moment";

export const formatTime = (date) => {

    return moment(date).format(`HH:mm`);
  };
  
  export const formatDate = (date) => {
    return moment(date).format(`DD MMMM YYYY`);
  };