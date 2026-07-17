import { readFileSync } from "node:fs";
import { join } from "node:path";

const expected =
  /<meta\s+name="apay-tag"\s+content="MUFMWK4YVDDVSZOE3NCTS22BULA4AVCP"\s*\/?>/;
const htmlPath = join(process.cwd(), "out", "index.html");
const html = readFileSync(htmlPath, "utf8");

if (!expected.test(html)) {
  console.error(`Missing required apay meta tag in ${htmlPath}`);
  process.exit(1);
}
