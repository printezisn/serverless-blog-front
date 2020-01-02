jest.mock("../postLoader", () => {
    return {
        loadPosts: jest.fn(),
        getSiteUrl: jest.fn(),
    }
})

import postLoader from "../postLoader"
import { createPages } from "../../gatsby-node"

describe("createPages", () => {
    it("creates pages correctly", async () => {
        const createPage = jest.fn()
        const pages = []
        const nonRegularPosts = [
            {
                id: "non-regular-test-id0",
                template: "regular",
                category: "about",
                creationTimestamp: 100,
            },
            {
                id: "non-regular-test-id1",
                template: "regular",
                category: "about",
                creationTimestamp: 99,
            },
        ]

        for (let i = 0; i < 3; i++) {
            pages.push([])
            for (let j = 0; j < 10; j++) {
                pages[i].push({
                    id: `test-id${i * 10 + j}`,
                    template: "regular",
                    category: "regular",
                    creationTimestamp: 100 - i * 10 - j,
                })
            }
        }

        postLoader.getSiteUrl.mockReturnValue("site_url")
        postLoader.loadPosts
            .mockReturnValueOnce({
                entity: { posts: pages[0], cursor: "test-id9" },
            })
            .mockReturnValueOnce({
                entity: { posts: pages[1], cursor: "test-id19" },
            })
            .mockReturnValueOnce({
                entity: { posts: pages[2], cursor: "test-id29" },
            })
            .mockReturnValueOnce({
                entity: { posts: nonRegularPosts, cursor: "" },
            })

        await createPages({ actions: { createPage } })

        expect(postLoader.loadPosts).toHaveBeenCalledTimes(4)
        expect(postLoader.loadPosts).toHaveBeenNthCalledWith(1, "")
        expect(postLoader.loadPosts).toHaveBeenNthCalledWith(2, "test-id9")
        expect(postLoader.loadPosts).toHaveBeenNthCalledWith(3, "test-id19")
        expect(postLoader.loadPosts).toHaveBeenNthCalledWith(4, "test-id29")

        expect(createPage).toHaveBeenCalledWith({
            path: "/",
            component: require.resolve("../../src/templates/postPage.js"),
            context: {
                prevPagePath: "",
                nextPagePath: "/post/page/2",
                page: pages[0],
                siteUrl: "site_url",
            },
        })
        expect(createPage).toHaveBeenCalledWith({
            path: "/post/page/2",
            component: require.resolve("../../src/templates/postPage.js"),
            context: {
                prevPagePath: "/",
                nextPagePath: "/post/page/3",
                page: pages[1],
                siteUrl: "site_url",
            },
        })
        expect(createPage).toHaveBeenCalledWith({
            path: "/post/page/3",
            component: require.resolve("../../src/templates/postPage.js"),
            context: {
                prevPagePath: "/post/page/2",
                nextPagePath: "",
                page: pages[2],
                siteUrl: "site_url",
            },
        })

        pages.forEach((page, index) => {
            const pagePath = index === 0 ? "/" : `/post/page/${index + 1}`

            page.forEach(post => {
                expect(createPage).toHaveBeenCalledWith({
                    path: `/post/read/${post.id}`,
                    component: require.resolve(
                        "../../src/templates/post/regular.js"
                    ),
                    context: { post, pagePath, siteUrl: "site_url" },
                })
            })
        })

        nonRegularPosts.forEach(post => {
            expect(createPage).toHaveBeenCalledWith({
                path: `/post/read/${post.id}`,
                component: require.resolve(
                    "../../src/templates/post/regular.js"
                ),
                context: { post, pagePath: "/", siteUrl: "site_url" },
            })
        })
    })

    it("creates pages correctly when no posts are found", async () => {
        const createPage = jest.fn()

        postLoader.loadPosts.mockReturnValue({
            entity: { posts: [], cursor: "" },
        })

        postLoader.getSiteUrl.mockReturnValue("site_url")

        await createPages({ actions: { createPage } })

        expect(createPage).toHaveBeenCalledWith({
            path: "/",
            component: require.resolve("../../src/templates/postPage.js"),
            context: {
                prevPagePath: "",
                nextPagePath: "",
                page: [],
                siteUrl: "site_url",
            },
        })
    })
})
