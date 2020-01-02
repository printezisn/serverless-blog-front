const postLoader = require("./app/postLoader")

exports.createPages = async ({ actions: { createPage } }) => {
    const posts = await loadAllPosts()
    const regularPosts = posts.filter(post => post.category === "regular")
    const nonRegularPosts = posts.filter(post => post.category !== "regular")

    createRegularPostPages(regularPosts, createPage)
    nonRegularPosts.forEach(post => createPostPage(post, "/", createPage))
}

async function loadAllPosts() {
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

    return posts
}

function createRegularPostPages(posts, createPage) {
    const pageSize = 10,
        pages = [[]]

    posts.forEach(post => {
        if (pages[pages.length - 1].length === pageSize) {
            pages.push([])
        }

        pages[pages.length - 1].push(post)
    })

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
            context: {
                prevPagePath,
                nextPagePath,
                page,
                siteUrl: postLoader.getSiteUrl(),
            },
        })

        page.forEach(post => createPostPage(post, pagePath, createPage))
    })
}

function createPostPage(post, pagePath, createPage) {
    createPage({
        path: `/post/read/${post.id}`,
        component: require.resolve(`./src/templates/post/${post.template}.js`),
        context: {
            post,
            pagePath,
            siteUrl: postLoader.getSiteUrl(),
        },
    })
}
