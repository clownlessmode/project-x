import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const htmlPath = join(process.cwd(), "out", "payment", "success", "index.html");

if (!existsSync(htmlPath)) {
  console.error(`Missing static payment success route: ${htmlPath}`);
  process.exit(1);
}

const html = readFileSync(htmlPath, "utf8");
if (!html.includes("Project X")) {
  console.error(`Payment success route does not look like an exported app page: ${htmlPath}`);
  process.exit(1);
}
