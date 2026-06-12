const internationalization = {
  "locales": [
    "en",
    "vi"
  ],
  "requiredLocales": [
    "en",
    "vi"
  ],
  "strictMode": "inclusive",
  "defaultLocale": "en"
};
const routing = {
  "mode": "prefix-no-default",
  "storage": {
    "cookies": [
      {
        "name": "INTLAYER_LOCALE",
        "attributes": {}
      }
    ],
    "headers": [
      {
        "name": "x-intlayer-locale"
      }
    ]
  },
  "basePath": ""
};
const editor = {
  "editorURL": "http://localhost:8000",
  "cmsURL": "https://app.intlayer.org",
  "backendURL": "https://back.intlayer.org",
  "port": 8000,
  "enabled": false,
  "dictionaryPriorityStrategy": "local_first",
  "liveSync": false,
  "liveSyncPort": 4000,
  "liveSyncURL": "http://localhost:4000"
};
const log = {
  "mode": "default",
  "prefix": "\u001b[38;5;239m[intlayer] \u001b[0m"
};
const system = {
  "baseDir": "D:\\Working\\portfolio",
  "moduleAugmentationDir": "D:\\Working\\portfolio\\.intlayer\\types",
  "unmergedDictionariesDir": "D:\\Working\\portfolio\\.intlayer\\unmerged_dictionary",
  "remoteDictionariesDir": "D:\\Working\\portfolio\\.intlayer\\remote_dictionary",
  "dictionariesDir": "D:\\Working\\portfolio\\.intlayer\\dictionary",
  "dynamicDictionariesDir": "D:\\Working\\portfolio\\.intlayer\\dynamic_dictionary",
  "fetchDictionariesDir": "D:\\Working\\portfolio\\.intlayer\\fetch_dictionary",
  "typesDir": "D:\\Working\\portfolio\\.intlayer\\types",
  "mainDir": "D:\\Working\\portfolio\\.intlayer\\main",
  "configDir": "D:\\Working\\portfolio\\.intlayer\\config",
  "cacheDir": "D:\\Working\\portfolio\\.intlayer\\cache",
  "tempDir": "D:\\Working\\portfolio\\.intlayer\\tmp"
};
const content = {
  "fileExtensions": [
    ".content.ts",
    ".content.js",
    ".content.cjs",
    ".content.mjs",
    ".content.json",
    ".content.json5",
    ".content.jsonc",
    ".content.tsx",
    ".content.jsx",
    ".content.md",
    ".content.mdx",
    ".content.yaml",
    ".content.yml"
  ],
  "contentDir": [
    "D:\\Working\\portfolio"
  ],
  "codeDir": [
    "D:\\Working\\portfolio"
  ],
  "excludedPath": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.intlayer/**",
    "**/.next/**",
    "**/.nuxt/**",
    "**/.expo/**",
    "**/.vercel/**",
    "**/.turbo/**",
    "**/.tanstack/**",
    "**/.output/**",
    "**/.svelte-kit/**"
  ],
  "watch": true
};
const ai = {};
const dictionary = {
  "fill": true,
  "contentAutoTransformation": false,
  "location": "local",
  "importMode": "static"
};
const build = {
  "mode": "auto",
  "minify": false,
  "purge": false,
  "traversePattern": [
    "**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,astro}",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/build/**",
    "!**/.intlayer/**",
    "!**/.next/**",
    "!**/.nuxt/**",
    "!**/.expo/**",
    "!**/.vercel/**",
    "!**/.turbo/**",
    "!**/.tanstack/**",
    "!**/.output/**",
    "!**/.svelte-kit/**",
    "!**/*.config.*",
    "!**/*.test.*",
    "!**/*.spec.*",
    "!**/*.stories.*",
    "!**/*.d.ts",
    "!**/*.d.ts.map",
    "!**/*.map"
  ],
  "outputFormat": [
    "esm",
    "cjs"
  ],
  "cache": true,
  "checkTypes": false
};
const compiler = {
  "enabled": true,
  "dictionaryKeyPrefix": "",
  "noMetadata": false,
  "saveComponents": false
};

module.exports.internationalization = internationalization;
module.exports.routing = routing;
module.exports.editor = editor;
module.exports.log = log;
module.exports.system = system;
module.exports.content = content;
module.exports.ai = ai;
module.exports.dictionary = dictionary;
module.exports.build = build;
module.exports.compiler = compiler;
