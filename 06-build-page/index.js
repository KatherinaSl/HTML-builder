const fs = require('fs');
const fsPromises = require('fs').promises;
const { stdin, stdout } = process;
const path = require('path');
// const writableStream = fs.createWriteStream('project-dist/style.css');

async function compileHtml() {
  try {
    await fsPromises.mkdir(path.join(__dirname, 'project-dist'), {
      recursive: true,
    });

    let template = await fsPromises.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8',
    );

    const files = await fsPromises.readdir('06-build-page/components');
    for (const file of files) {
      if (!file.endsWith('.html')) {
        return;
      }
      let templateTag = '{{' + file.slice(0, -5) + '}}';
      const templateFile = await fsPromises.readFile(
        path.join(__dirname, `components/${file}`),
        'utf-8',
      );
      if (template.includes(templateTag)) {
        template = template.replaceAll(templateTag, templateFile);
      }
    }

    await fsPromises.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      template,
      'utf-8',
    );
  } catch (error) {
    console.log(error);
  }
}
compileHtml();

async function compileStyles() {
  try {
    const files = await fsPromises.readdir('06-build-page/styles', {
      withFileTypes: true,
    });

    await fsPromises.writeFile(
      path.join(__dirname, 'project-dist', 'style.css'),
      '',
      'utf-8',
    );

    for (const file of files) {
      if (!file.name.endsWith('.css')) {
        return;
      }
      const stylesFile = await fsPromises.readFile(
        path.join(__dirname, 'styles', file.name),
        'utf-8',
      );

      await fsPromises.appendFile(
        path.join(__dirname, 'project-dist', 'style.css'),
        stylesFile,
        'utf-8',
      );
    }
  } catch (error) {
    console.log(error);
  }
}
compileStyles();

async function copyFolder() {
  try {
    await fsPromises.mkdir(path.join(__dirname, 'project-dist/assets'), {
      recursive: true,
    });
    const files = await fsPromises.readdir('06-build-page/assets', {
      withFileTypes: true,
      recursive: true,
    });

    for (let file of files) {
      if (file.isDirectory()) {
        let newPath = file.path.replace('06-build-page', 'project-dist');
        await fsPromises.mkdir(path.join(__dirname, newPath, file.name), {
          recursive: true,
        });
      }
    }

    for (let file of files) {
      if (!file.isFile()) {
        continue;
      }
      let newPath = file.path.replace(
        '06-build-page',
        '06-build-page\\project-dist',
      );
      await fsPromises.copyFile(
        file.path + '\\' + file.name,
        newPath + '\\' + file.name,
      );
    }
  } catch (error) {
    console.log(error);
  }
}

copyFolder();
