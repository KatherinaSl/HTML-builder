const fs = require('fs');
const { stdin, stdout } = process;

// version 1
// const userFile = fs.openSync('02-write-file/text.txt', 'w+');
// stdin.on('data', (data) => {
//   if (data.toString().trim() === 'exit') {
//     stdout.write(data.toString());
//     process.exit();
//   }

//   fs.appendFile(userFile, data, (err) => {
//     if (err) throw err;
//   });
// });
// process.on('exit', () => stdout.write('Goodbye!'));

// version 2
const writableStream = fs.createWriteStream('02-write-file/text.txt');
stdout.write('Please, enter the text \n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  writableStream.write(data);
});
process.on('exit', () => stdout.write('Goodbye!'));
