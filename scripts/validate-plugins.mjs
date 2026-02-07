#!/usr/bin/env node

import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");

const marketplaceFile = join(rootDir, ".claude-plugin/marketplace.json");
const schemaFile = join(__dirname, "marketplace.schema.json");
const pluginsDir = join(rootDir, "plugins");

let hasErrors = false;

console.log("Validating marketplace.json...");

// Load files
const marketplace = JSON.parse(readFileSync(marketplaceFile, "utf-8"));
const schema = JSON.parse(readFileSync(schemaFile, "utf-8"));

// Remove $schema field to avoid meta-schema validation
delete schema.$schema;
delete schema.$id;

// 1. Schema validation
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);
const valid = validate(marketplace);

if (valid) {
  console.log("  ✓ Schema validation passed");
} else {
  console.log("  ✗ Schema validation failed:");
  validate.errors.forEach((err) => {
    const path = err.instancePath || "/";
    const msg = err.message || "unknown error";
    console.log(`    - ${path}: ${msg}`);
  });
  hasErrors = true;
}

// 2. Check source paths exist
const plugins = marketplace.plugins || [];
const missingPaths = [];

plugins.forEach((plugin) => {
  const sourcePath = resolve(rootDir, plugin.source);
  if (!existsSync(sourcePath)) {
    missingPaths.push(plugin.source);
  }
});

if (missingPaths.length === 0) {
  console.log(`  ✓ All ${plugins.length} source paths exist`);
} else {
  console.log("  ✗ Source path missing:");
  missingPaths.forEach((path) => console.log(`    - ${path}`));
  hasErrors = true;
}

// 3. Check for orphaned plugin directories
const registeredDirs = new Set(
  plugins.map((p) => p.source.replace("./plugins/", ""))
);

const actualDirs = existsSync(pluginsDir)
  ? readdirSync(pluginsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  : [];

const orphanedDirs = actualDirs.filter((dir) => !registeredDirs.has(dir));

if (orphanedDirs.length === 0) {
  console.log("  ✓ No orphaned plugin directories");
} else {
  console.log(`  ⚠ Orphaned directories: ${orphanedDirs.join(", ")}`);
  hasErrors = true;
}

// Summary
if (hasErrors) {
  console.log("1 error(s) found.");
  process.exit(1);
} else {
  console.log("All checks passed.");
  process.exit(0);
}
