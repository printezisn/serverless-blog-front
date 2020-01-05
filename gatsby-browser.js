import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
import "@fortawesome/fontawesome-free/scss/solid.scss"
import "./src/styles/main.scss"

import "cookieconsent"

import { auth } from "./src/api/auth"

window.cookieconsent.initialise({
    content: {
        href: "/post/read/cookie-policy",
    },
    revokable: true,
    law: {
        regionalLaw: false,
    },
    location: false,
})

auth.init(window.location.href)
