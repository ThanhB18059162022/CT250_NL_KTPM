const xlsx = require("xlsx");

const exportExcel = (data, fileName) => {
    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(workBook, workSheet);

    xlsx.writeFile(workBook, fileName);
};

module.exports = exportExcel;
