const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "..", "public");
const sourcePath = path.join(publicDir, "es-favicon.png");

async function main() {
  const png32 = await sharp(sourcePath)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
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
  console.log("Generated public/favicon.ico from es-favicon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
