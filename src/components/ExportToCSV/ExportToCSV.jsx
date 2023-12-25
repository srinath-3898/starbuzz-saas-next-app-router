import Papa from "papaparse";

const flattenObject = (obj, parentKey = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], newKey));
      } else {
        const leafKey = newKey.split('.').pop();
        acc[leafKey] = obj[key];
      }
      return acc;
    }, {});
  };
  
const ExportToCSV = (data, filename) => {
  const flattenedData = data.map((item) => flattenObject(item));

  const csv = Papa.unparse(flattenedData);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename || "export.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default ExportToCSV;
