const postLoader = require("./app/postLoader")

exports.createPages = async ({ actions: { createPage } }) => {
    const pages = await loadAllPostPages()
    if (pages.length === 0) {
        createPage({
            path: "/",
            component: require.resolve("./src/templates/postPage.js"),
            context: { prevPagePath: "", nextPagePath: "", page: [] },
        })

        return
    }

    pages.forEach((page, index) => {
        let prevPagePath = ""
        if (index === 1) {
            prevPagePath = "/"
        } else if (index > 0) {
            prevPagePath = `/post/page/${index}`
        }

        const nextPagePath =
            index === pages.length - 1 ? "" : `/post/page/${index + 2}`
        const pagePath = index === 0 ? "/" : `/post/page/${index + 1}`

        createPage({
            path: pagePath,
            component: require.resolve("./src/templates/postPage.js"),
            context: { prevPagePath, nextPagePath, page },
        })

        page.forEach(post => {
            createPage({
                path: `/post/read/${post.id}`,
                component: require.resolve("./src/templates/post.js"),
                context: { post },
            })
        })
    })
}

async function loadAllPostPages() {
    let lastID = ""
    let posts = []

    // Load all posts from the API
    while (true) {
        const result = await postLoader.loadPosts(lastID)

        if (result.entity.posts.length === 0) {
            break
        }

        posts.push.apply(posts, result.entity.posts)

        if (result.entity.cursor === "") {
            break
        }

        lastID = result.entity.cursor
    }

    // Sort them by creation date
    posts.sort((a, b) => {
        if (a.creationTimestamp < b.creationTimestamp) {
            return 1
        }
        if (a.creationTimestamp > b.creationTimestamp) {
            return -1
        }

        return 0
    })

    // Put them into pages
    const pageSize = 10
    let pages = []
    posts.forEach(post => {
        if (pages.length === 0 || pages[pages.length - 1].length === pageSize) {
            pages.push([])
        }

        pages[pages.length - 1].push(post)
    })

    return pages
}
