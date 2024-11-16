const fs = require('fs');
const path = require('path');

const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function(eleventyConfig) {
    // Configure Markdown-It with the footnote plugin
    const md = markdownIt().use(markdownItFootnote);

    // Set Markdown-It as the markdown engine
    eleventyConfig.setLibrary("md", md);

    eleventyConfig.addPassthroughCopy("./src/-/");
    eleventyConfig.addPassthroughCopy("./src/favicon.ico");
    
    eleventyConfig.addPassthroughCopy("src/thoughts/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/thoughts/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("src/thoughts/**/*.png");
    eleventyConfig.addPassthroughCopy("src/thoughts/**/*.webp");
    eleventyConfig.addPassthroughCopy("src/thoughts/**/*.gif");

    eleventyConfig.addPassthroughCopy("src/things/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/things/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("src/things/**/*.png");
    eleventyConfig.addPassthroughCopy("src/things/**/*.webp");
    eleventyConfig.addPassthroughCopy("src/things/**/*.gif");

    eleventyConfig.addShortcode("loadJSON", function(file) {
        const filePath = path.join(__dirname, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        if (!eleventyConfig.collections[file]) {
            // Wrap the data in a function
            eleventyConfig.addCollection(file, () => data);
        }

        return ''; // Return an empty string as nothing needs to be rendered here
    });

    // Define a collection for blog posts
    eleventyConfig.addCollection("thoughts", function(collectionApi) {
        return collectionApi
            .getFilteredByGlob("src/thoughts/**/*.md")
            .filter(item => !item.filePathStem.includes("/."))
            .sort((a, b) => b.date - a.date); // Sort by date, newest first
    });

    // Define a collection for things 
    eleventyConfig.addCollection("things", function(collectionApi) {
        return collectionApi
            .getFilteredByGlob("src/things/**/index.md")
            .filter(item => !item.filePathStem.includes("/."))
            .sort((a, b) => b.date - a.date); // Sort by date, newest first
    });


    // eleventyConfig.addShortcode("includeFile", function(file) {
    //     const filePath = path.join(__dirname, "src", file);
    //     return fs.readFileSync(filePath, "utf8");
    // });

    // Set directories for input and output
    return {
        dir: {
            input: 'src',
            output: "_site",
            includes: '../_includes', // Correct path to the includes folder
            data: '../_data',       // Correct path to the data folder
        },
        passthroughFileCopy: true,
    };
};