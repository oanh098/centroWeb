const
    dev = global.dev = (process.env.ELEVENTY_ENV === 'development'),
    now = new Date();

module.exports = config => {
//
/* --- PLUGINS --- */

//    navigation
    config.addPlugin( require('@11ty/eleventy-navigation') );
// shortcode
    config.addShortcode('navlist', require('./lib/shortcodes/navlist.js'))

//    post collection (in src/articles)
    config.addCollection('post', collection =>
        collection
            .getFilteredByGlob('./src/articles/*.md')
            .filter(p => dev || (!p.data.draft && p.date <= now))
    )
// product collection (in src/products)
//    config.addCollection('product', collection =>
//        collection
//            .getFilteredByGlob('./src/products/*.md')
//            .filter(p => dev || (!p.data.draft && p.date <= now))
//    );
/* --- FILTERS --- */
 // format dates
 const dateformat = require('./lib/filters/dateformat');
    config.addFilter('datefriendly', dateformat.friendly);
    config.addFilter('dateymd', dateformat.ymd);

//     format word count and reading time
    config.addFilter('readtime', require('./lib/filters/readtime'));

/* ---  --- */
    config.addPassthroughCopy('src/images');

/* --- CSS processing --- */
    config.addTransform('postcss', require('./lib/transforms/postcss'));
    config.addWatchTarget('./src/scss/');

/* --- minify HTML --- */
/*
Note: you could consider not minifying or even beautifying HTML during development.
That said, HTML whitespace can affect browser rendering, so it’s usually best to build
the code in the same way you do for production. Source viewing will become more difficult,
but browser developer tools show the resulting DOM.
*/
//    config.addTransform('htmlminify', require('./lib/transforms/htmlminify'));

/* --- inline assets --- */
    config.addTransform('inline', require('./lib/transforms/inline'));
/*
    Note: the sample code builds ES6 modules rather than transpiling to ES5.
    The script is smaller, but browser compatibility will be more limited.
    That said, it’s a progressive enhancement and the site works without JavaScript.
*/
   // config.addWatchTarget('./src/js/');

    return{
        dir: {
            input: 'src',
            output: 'docs'
        }
    };
};