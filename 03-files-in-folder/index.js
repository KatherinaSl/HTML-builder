const fs = require('fs');

// get filenames
fs.readdir(
  '03-files-in-folder/secret-folder',
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        const fileName = file.name;
        const stats = fs.statSync(
          '03-files-in-folder/secret-folder/' + fileName,
        );
        // isFile to check if it's a file or a folder
        if (!file.isFile()) {
          return;
        }

        console.log(
          fileName.split('.')[0] +
            ' - ' +
            fileName.split('.')[1] +
            ' - ' +
            stats.size,
        );
      });
    }
  },
);

// current directory files
// fs.readdir(
//   '03-files-in-folder/secret-folder',
//   { withFileTypes: true },
//   (err, files) => {
//     if (err) throw err;
//     else {
//       files.forEach((file) => {
//         console.log(file);
//       });
//     }
//   },
// );
