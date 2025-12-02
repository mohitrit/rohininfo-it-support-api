exports.filterData = (resultData, filter) => {
  const { page_number, page_size, sort_column, sort_order } = filter;
  const result = resultData.map((val, i) => {
    return { ...val, id: i +1};
  });
  const dataType = typeof result[0][sort_column] === "number" ? true : false;
  switch (sort_order) {
    case "no":
      return result.slice(
        parseInt(page_number) * parseInt(page_size),
        parseInt(page_size) * (parseInt(page_number) + 1)
      );
      break;
    case "asc": {
      const data = dataType
        ? result.sort((a, b) => a[sort_column] - b[sort_column])
        : result.sort((a, b) => {
            const nameA = a[sort_column]; // ignore upper and lowercase
            const nameB = b[sort_column]; // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });
      return data.slice(
        parseInt(page_number) * parseInt(page_size),
        parseInt(page_size) * (parseInt(page_number) + 1)
      );
      break;
    }
    case "desc": {
      const descDat = dataType
        ? result.sort((a, b) => b[sort_column] - a[sort_column])
        : result.sort((a, b) => {
            const nameA = a[sort_column]; // ignore upper and lowercase
            const nameB = b[sort_column]; // ignore upper and lowercase
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });
      return descDat.slice(
        parseInt(page_number) * parseInt(page_size),
        parseInt(page_size) * (parseInt(page_number) + 1)
      );
      break;
    }
    default:
      return [];
  }
};
