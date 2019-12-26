jest.mock("../postLoader", () => {
    return {
        loadPosts: jest.fn(),
    }
})

import postLoader from "../postLoader"
import { createPages } from "../../gatsby-node"

describe("createPages", () => {
    it("creates pages correctly", async () => {
        const createPage = jest.fn()
        const pages = []

        for (let i = 0; i < 3; i++) {
            pages.push([])
            for (let j = 0; j < 10; j++) {
                pages[i].push({
                    id: `test-id${i * 10 + j}`,
                    creationTimestamp: 100 - i * 10 - j,
                })
            }
        }

        postLoader.loadPosts
            .mockReturnValueOnce({
                entity: { posts: pages[0], cursor: "test-id9" },
            })
            .mockReturnValueOnce({
                entity: { posts: pages[1], cursor: "test-id19" },
            })
            .mockReturnValueOnce({
                entity: { posts: pages[2], cursor: "" },
            })

        await createPages({ actions: { createPage } })

        expect(postLoader.loadPosts).toHaveBeenCalledTimes(3)
        expect(postLoader.loadPosts).toHaveBeenNthCalledWith(1, "")
        expect(postLoader.loadPosts).toHaveBeenNthCalledWith(2, "test-id9")
        expect(postLoader.loadPosts).toHaveBeenNthCalledWith(3, "test-id19")

        expect(createPage).toHaveBeenCalledWith({
            path: "/",
            component: require.resolve("../../src/templates/postPage.js"),
            context: {
                prevPagePath: "",
                nextPagePath: "/post/page/2",
                page: pages[0],
            },
        })
        expect(createPage).toHaveBeenCalledWith({
            path: "/post/page/2",
            component: require.resolve("../../src/templates/postPage.js"),
            context: {
                prevPagePath: "/",
                nextPagePath: "/post/page/3",
                page: pages[1],
            },
        })
        expect(createPage).toHaveBeenCalledWith({
            path: "/post/page/3",
            component: require.resolve("../../src/templates/postPage.js"),
            context: {
                prevPagePath: "/post/page/2",
                nextPagePath: "",
                page: pages[2],
            },
        })
        pages.forEach((page, index) => {
            const pagePath = index === 0 ? "/" : `/post/page/${index + 1}`

            page.forEach(post => {
                expect(createPage).toHaveBeenCalledWith({
                    path: `/post/read/${post.id}`,
                    component: require.resolve("../../src/templates/post.js"),
                    context: { post, pagePath },
                })
            })
        })
    })

    it("creates pages correctly when no posts are found", async () => {
        const createPage = jest.fn()

        postLoader.loadPosts.mockReturnValue({
            entity: { posts: [], cursor: "" },
        })

        await createPages({ actions: { createPage } })

        expect(createPage).toHaveBeenCalledWith({
            path: "/",
            component: require.resolve("../../src/templates/postPage.js"),
            context: {
                prevPagePath: "",
                nextPagePath: "",
                page: [],
            },
        })
    })
})
