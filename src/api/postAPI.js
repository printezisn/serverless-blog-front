import { auth } from "./auth"

class PostAPI {
    constructor() {
        this.root = process.env.GATSBY_EDNABLOG_API_ROOT_URL
    }

    async createPost(post) {
        const response = await fetch(this.root, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(post),
            headers: {
                Authorization: auth.getToken(),
            },
        })

        return response.json()
    }

    async updatePost(post) {
        const response = await fetch(this.root, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(post),
            headers: {
                Authorization: auth.getToken(),
            },
        })

        return response.json()
    }

    async getPost(id) {
        const response = await fetch(this.root + encodeURIComponent(id), {
            method: "GET",
            mode: "cors",
        })

        return response.json()
    }

    async deletePost(id) {
        const response = await fetch(this.root + encodeURIComponent(id), {
            method: "DELETE",
            mode: "cors",
            headers: {
                Authorization: auth.getToken(),
            },
        })

        return response.json()
    }
}

export const postAPI = new PostAPI()
