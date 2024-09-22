const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/-/");
    eleventyConfig.addPassthroughCopy("./src/favicon.ico");
    
    eleventyConfig.addPassthroughCopy("src/blog/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/blog/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("src/blog/**/*.png");
    eleventyConfig.addPassthroughCopy("src/blog/**/*.webp");
    eleventyConfig.addPassthroughCopy("src/blog/**/*.gif");


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
    eleventyConfig.addCollection("blog", function(collectionApi) {
        return collectionApi
            .getFilteredByGlob("src/blog/**/*.md")
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