/**
 * scripts/build-search-index.mjs
 * Build-time: scan all content .md → public/search-index.json
 * Used by the SearchDialog for client-side fuzzy search (no extra deps needed).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const OUT_DIR = path.join(ROOT, "public");
const OUT_FILE = path.join(OUT_DIR, "search-index.json");

const TYPES = ["articles", "experiments", "cases"];

function slugFromFile(file) {
  return file.replace(/\.md$/, "");
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return {};
  const fm = match[1];
  const data = {};
  let key = null;
  for (const line of fm.split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)/);
    if (kv) {
      key = kv[1];
      let val = kv[2].trim();
      // Arrays: [item1, item2]
      if (val.startsWith("[")) {
        try { val = JSON.parse(val.replace(/'/g, '"')); } catch { val = [val.replace(/[[\]']/g, "")]; }
      }
      // Booleans
      if (val === "true") val = true;
      if (val === "false") val = false;
      data[key] = val;
    } else if (key && line.startsWith("  ")) {
      // Multi-line list values (e.g., techStack items)
      const item = line.trim().replace(/^-\s*/, "");
      if (item) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(item);
      }
    }
  }
  return data;
}

function buildIndex() {
  const entries = [];

  for (const type of TYPES) {
    const dir = path.join(CONTENT_DIR, type);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(dir, file), "utf-8");
        const meta = parseFrontmatter(raw);
        // Extract body (skip frontmatter)
        const bodyMatch = raw.replace(/^---[\s\S]*?\n---\n?/, "");
        const bodyPreview = bodyMatch.slice(0, 300).replace(/[#*`\[\]]/g, "").trim();

        entries.push({
          slug: meta.slug || slugFromFile(file),
          title: meta.title || slugFromFile(file),
          type: type.replace(/s$/, ""),
          date: meta.date || "",
          tags: Array.isArray(meta.tags) ? meta.tags : [],
          summary: meta.summary || "",
          bodyPreview,
          category: meta.category || "",
          subcategory: meta.subcategory || "",
          status: meta.status || "",
          client: meta.client || "",
          industry: meta.industry || "",
        });
      } catch (err) {
        console.warn(`[build-search-index] Skipping ${file} (${err.message})`);
        continue;
      }
    }
  }

  // Sort newest first
  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(entries, null, 2), "utf-8");
  console.log(`search-index.json written with ${entries.length} entries`);
}

try {
  buildIndex();
} catch (err) {
  console.warn(`[build-search-index] Build failed (non-fatal): ${err.message}`);
}
