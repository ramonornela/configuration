const path = require('path');
const fs = require('fs');
const Dgeni = require('dgeni');
const DgeniPackage = Dgeni.Package;

// dgeni packages
const jsdocPackage = require('dgeni-packages/jsdoc');
const nunjucksPackage = require('dgeni-packages/nunjucks');
const typescriptPackage = require('dgeni-packages/typescript');

// Project configuration.
const projectRootDir = path.resolve(__dirname, '../..');
const sourceDir = path.resolve(projectRootDir, 'src');
const outputDir = path.resolve(projectRootDir, 'dist/docs/api');
const templateDir = path.resolve(__dirname, './templates');

const dgeniPackageDeps = [
  jsdocPackage,
  nunjucksPackage,
  typescriptPackage,
];

let apiDocsPackage = new DgeniPackage('configuration-docs', dgeniPackageDeps)

.config(function(log) {
  log.level = 'info';
})

// Configure the processor for reading files from the file system.
.config(function(readFilesProcessor, writeFilesProcessor) {
  readFilesProcessor.basePath = sourceDir;
  readFilesProcessor.$enabled = false; // disable for now as we are using readTypeScriptModules

  writeFilesProcessor.outputFolder = outputDir;
})

// Configure the processor for understanding TypeScript.
.config(function(readTypeScriptModules) {
  readTypeScriptModules.basePath = sourceDir;
  readTypeScriptModules.ignoreExportsMatching = [/^_/];
  readTypeScriptModules.hidePrivateMembers = true;

  // Entry points for docs generation. All publically exported symbols found through these
  // files will have docs generated.
  readTypeScriptModules.sourceFiles = [
    'index.ts',
  ];
})


// Configure processor for finding nunjucks templates.
.config(function(templateFinder, templateEngine) {
  // Where to find the templates for the doc rendering
  templateFinder.templateFolders = [templateDir];

  // Standard patterns for matching docs to templates
  templateFinder.templatePatterns = [
    'common.template.html'
  ];

  // dgeni disables autoescape by default, but we want this turned on.
  templateEngine.config.autoescape = true;

  // Nunjucks and Angular conflict in their template bindings so change Nunjucks
  templateEngine.config.tags = {
    variableStart: '{$',
    variableEnd: '$}'
  };
});


module.exports = apiDocsPackage;
