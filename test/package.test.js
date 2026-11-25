import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { categories, converters } from "../src/index.js";

const declarations = readFileSync(
  new URL("../src/index.d.ts", import.meta.url),
  "utf8"
);
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
);

/**
 * @param {string} value
 * @returns {string}
 */
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

test("generated declarations cover every category", () => {
  for (const category of categories) {
    const type = capitalize(category);

    assert.ok(
      declarations.includes(`export interface ${type}Converter`),
      `Missing ${type}Converter`
    );
    assert.ok(
      declarations.includes(`export declare const ${category}: ${type}Converter;`),
      `Missing ${category} declaration`
    );
  }
});

test("generated declarations cover every unit and ordered pair", () => {
  for (const category of categories) {
    const unitNames = converters[category].units;

    for (const unit of unitNames) {
      assert.ok(
        declarations.includes(`  | "${unit}"`),
        `Missing ${unit} in the ${category} unit union`
      );

      for (const toUnit of unitNames) {
        assert.ok(
          declarations.includes(`  ${unit}To${toUnit}(value: number): number;`),
          `Missing ${unit}To${toUnit} in ${category}`
        );
      }
    }
  }
});

test("generated declarations cover every alias and the round helper", () => {
  for (const category of categories) {
    for (const alias of Object.keys(converters[category].aliases)) {
      assert.ok(
        declarations.includes(`  | ${JSON.stringify(alias)}`),
        `Missing ${alias} in the ${category} alias union`
      );
    }
  }

  assert.ok(declarations.includes("export declare const aliases"));
  assert.ok(declarations.includes("export declare function round"));
  assert.ok(declarations.includes("export declare function parseQuantity"));
  assert.ok(declarations.includes("export declare function formatQuantity"));
  assert.ok(declarations.includes("export declare function isLeapYear"));
  assert.ok(declarations.includes("export declare function daysInMonth"));
});

test("the README documents every supported unit", () => {
  for (const category of categories) {
    for (const unit of converters[category].units) {
      assert.ok(
        readme.includes(`\`${unit}\``),
        `README does not mention ${unit} from ${category}`
      );
    }
  }

  assert.ok(readme.includes("## Migrating from 1.x"));
  assert.ok(readme.includes("## Unit aliases"));
  assert.ok(readme.includes("### `parseQuantity("));
  assert.ok(readme.includes("### `formatQuantity("));
  assert.ok(readme.includes("### Calendar helpers"));
  assert.ok(readme.includes("round("));
  assert.ok(readme.includes("import {\n  convert,\n  formatQuantity,"));
});

test("the README documents the intentional limitations", () => {
  const requiredPhrases = [
    "## Limitations and tradeoffs",
    "ESM-only",
    "Pair functions are canonical-only",
    "IEEE-754",
    "`parseQuantity()` is a tokenizer",
    "No time-zone",
    "Below absolute zero",
    "US customary",
    "Non-finite values throw",
  ];

  for (const phrase of requiredPhrases) {
    assert.ok(
      readme.includes(phrase),
      `README is missing limitation: ${phrase}`
    );
  }
});

test("package metadata points at real entry points", () => {
  assert.equal(packageJson.main, "./src/index.js");
  assert.equal(packageJson.types, "./src/index.d.ts");
  assert.equal(packageJson.exports["."].types, "./src/index.d.ts");
  assert.equal(packageJson.exports["."].import, "./src/index.js");
  assert.ok(packageJson.files.includes("src"));
  assert.equal(packageJson.sideEffects, false);
  assert.ok(packageJson.engines.node);
});

test("the test script is a real command, not recursive", () => {
  assert.equal(packageJson.scripts.test, "node --test");
  assert.ok(!packageJson.scripts.test.includes("npm run test"));
});
