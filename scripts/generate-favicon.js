const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#080808"/>
  <g fill="#D2BEA0">
    <rect x="120" y="80" width="70" height="352"/>
    <rect x="322" y="80" width="70" height="352"/>
    <polygon points="120,80 190,80 392,432 322,432"/>
  </g>
</svg>`;

const publicDir = path.join(__dirname, "..", "public");

async function main() {
  await sharp(Buffer.from(svg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, "icon.png"));

  const png32 = await sharp(Buffer.from(svg))
    .resize(32, 32)
    .png()
    .toBuffer();

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png32.length, 8);
  entry.writeUInt32LE(6 + 16, 12);

  fs.writeFileSync(
    path.join(publicDir, "favicon.ico"),
    Buffer.concat([header, entry, png32]),
  );
  console.log("Generated public/icon.png and public/favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
