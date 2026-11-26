// HangukStat — South Korea in Numbers.
// The hand-in program for the best-national-statistics-site bounty.
// It copies app/ and screenshots/ from beside this file to /output and
// writes /output/dossier.json with buildDossier from the kit's vendored
// make.fun library (vendor/makefun-frontend.ts, copied unchanged from the
// kit — the scorer rebuilds the dossier with its own copy and compares
// the two byte for byte, so this file must not be edited).
//
// The site itself is app/: index.html + main.js + data.js + style.css,
// plain static files with no build step and no network request. The four
// screenshots in screenshots/ are real renders of this site's own code
// in a headless browser (see shots.json in the kit for the views).
// Run it outside the grader with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(out, { recursive: true });
cpSync(join(here, "app"), join(out, "app"), { recursive: true });
mkdirSync(join(out, "screenshots"), { recursive: true });
if (existsSync(join(here, "screenshots"))) {
  cpSync(join(here, "screenshots"), join(out, "screenshots"), { recursive: true });
}

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse — more
// than 4 screenshots or one over 256 KiB; more than 993 files and
// directories in app/ or 16 MiB of app files.
writeFileSync(
  join(out, "dossier.json"),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

// One line on stdout so a local run shows what landed in /output.
console.log(`HangukStat handed in: app/ + screenshots/ + dossier.json -> ${out}`);
