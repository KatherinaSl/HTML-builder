const fs = require('fs');
const path = require('path');
const writableStream = fs.createWriteStream(
  '05-merge-styles/project-dist/bundle.css',
);

fs.readdir('05-merge-styles/styles', { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  else {
    files.forEach((file) => {
      if (!file.name.endsWith('.css')) {
        return;
      }
      fs.readFile(path.join(__dirname, 'styles', file.name), (err, data) => {
        if (err) throw err;
        writableStream.write(data);
      });
    });
  }
});
