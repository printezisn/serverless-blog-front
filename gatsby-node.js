const fetch = require("node-fetch")

exports.createPages = async ({ actions: { createPage } }) => {
    const posts = await loadAllPosts()
    posts.forEach(post => {
        createPage({
            path: `/post/read/${post.id}`,
            component: require.resolve("./src/templates/post.js"),
            context: { post },
        })
    })
}

async function loadAllPosts() {
    const rootUrl = process.env.GATSBY_EDNABLOG_ROOT_URL
    let lastID = ""
    let posts = []

    while (true) {
        const response = await fetch(`${rootUrl}?lastID=${lastID}`, {
            method: "GET",
            mode: "cors",
        })
        const result = await response.json()

        if (result.entity.posts.length === 0) {
            break
        }

        posts.push.apply(posts, result.entity.posts)

        if (result.entity.cursor === "") {
            break
        }

        lastID = result.entity.cursor
    }

    return posts
}
