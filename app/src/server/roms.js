import fs from 'fs';
import path from 'path';
import {Router} from 'express';

let romDir;
let romList = [];
let romMap = {};
let fileMap = {};
let scanTimer;

const BASE_URL = '/api/roms';
const FILES_URL = `${BASE_URL}/files`;

export const router = new Router;

router.get(BASE_URL, (req, res) => {
  res.json(romList);
});

router.get(`${BASE_URL}/:id`, (req, res) => {
  const {id} = req.params;
  if (id == null) {
    res.status(400).send('Missing ROM ID.');
    return;
  }

  const rom = romMap[id];
  if (rom == null) {
    res.status(404).send(`ROM with ID ${id} not found.`);
    return;
  }

  res.json(rom);
});

router.get(`${FILES_URL}/:name`, (req, res) => {
  const {name} = req.params;
  if (name == null) {
    res.status(400).send('Missing filename.');
    return;
  }

  const file = fileMap[name];
  if (file == null) {
    res.status(404).send(`File ${name} not found.`);
    return;
  }

  res.download(file, name);
});

export function watch(dir) {
  romDir = dir;
  if (!fs.existsSync(romDir)) {
    fs.mkdirSync(romDir);
  }
  fs.watch(romDir, scheduleScan);
  scheduleScan();
}

function scheduleScan() {
  clearTimeout(scanTimer);
  scanTimer = setTimeout(scan, 1000);
}

function scan() {
  console.log(`Scanning "${romDir}" directory`);

  romList = [];
  romMap = {};
  fileMap = {};

  for (const romFile of fs.readdirSync(romDir)) {
    if (path.extname(romFile).toLowerCase() !== '.nes') {
      continue;
    }

    const romName = sanitizeName(romFile);
    fileMap[romName] = path.join(romDir, romFile);

    const rom = {
      id: makeId(romFile),
      name: getBasename(romFile),
      file: `${FILES_URL}/${romName}`,
    };

    romList.push(rom);
    romMap[rom.id] = rom;

    const imageFile = findImage(romFile);
    if (imageFile) {
      const imageName = sanitizeName(imageFile);
      fileMap[imageName] = path.join(romDir, imageFile);
      rom.thumbnail = `${FILES_URL}/${imageName}`;
    }
  }

  romList.sort(compare);

  console.log(`Found ${romList.length} ROMs`);
}

function makeId(file) {
  return path.basename(file, path.extname(file))
         .replace(/[ _-]+/g, ' ').trim()
         .replace(/[^a-zA-Z0-9 ]+/g, '')
         .replace(/ +/g, '-')
         .toLowerCase();
}

function sanitizeName(file) {
  const ext = path.extname(file);
  return path.basename(file, ext)
         .replace(/[ _-]+/g, ' ').trim()
         .replace(/[^a-zA-Z0-9 ]+/g, '')
         .replace(/ +/g, '_') + ext;
}

function getBasename(file) {
  return path.basename(file, path.extname(file)).trim();
}

function findImage(romFile) {
  for (const ext of ['png', 'git', 'jpg', 'jpeg']) {
    const imageFile = romFile.replace(/\.nes$/i, `.${ext}`);
    if (fs.existsSync(path.join(romDir, imageFile))) {
      return imageFile;
    }
  }
  return null;
}

function compare(rom1, rom2) {
  const name1 = rom1.name.replace(/^The /i, '');
  const name2 = rom2.name.replace(/^The /i, '');
  return name1.localeCompare(name2);
}
