/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    plugins: [
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: { prefixes: [`/post/edit/*`, `/post/delete/*`] },
        },
    ],
}

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})
