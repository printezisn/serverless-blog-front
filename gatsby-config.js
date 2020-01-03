/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: "Edna Blog",
        siteUrl: process.env.GATSBY_EDNABLOG_SITE_ROOT_URL,
    },
    plugins: [
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-robots-txt`,
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: { prefixes: [`/post/edit/*`, `/post/delete/*`] },
        },
    ],
}
