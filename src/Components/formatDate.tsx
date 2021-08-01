const setDateFormat = (date: any) => {
  if (date) {
    let FormattedDate =
      new Date(date).getDate() +
      "/" +
      (new Date(date).getMonth() + 1) +
      "/" +
      new Date(date).getFullYear();

    return FormattedDate;
  } else return "--";
};

export default setDateFormat;
