import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const filePath = path.join(process.cwd(), "favicon", "favicon.ico");
  const icon = await readFile(filePath);

  return new Response(icon, {
    headers: {
      "content-type": "image/x-icon",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
