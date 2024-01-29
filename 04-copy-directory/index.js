const fs = require('fs');
const path = require('path');

// { recursive: true } - avoid errors if this directory alredy exists
fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (error) => {
  if (error) throw error;
});

function copyDir() {
  fs.readdir('04-copy-directory/files', (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      console.log(file);
      fs.copyFile(
        '04-copy-directory/files/' + file,
        '04-copy-directory/files-copy/' + file,
        (error) => {
          if (error) throw error;
        },
      );
    });
  });
}

copyDir();
