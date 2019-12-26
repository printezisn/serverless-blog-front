const fetch = require("node-fetch")

class PostLoader {
    async loadPosts(lastID) {
        const rootUrl = process.env.GATSBY_EDNABLOG_ROOT_URL
        const response = await fetch(`${rootUrl}?lastID=${lastID}`, {
            method: "GET",
            mode: "cors",
        })

        return await response.json()
    }
}

module.exports = new PostLoader()
