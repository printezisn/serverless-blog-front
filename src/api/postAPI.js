class PostAPI {
    constructor() {
        this.root = process.env.GATSBY_EDNABLOG_ROOT_URL
    }

    async createPost(post) {
        const response = await fetch(this.root, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(post),
        })

        return response.json()
    }
}

export const postAPI = new PostAPI()
