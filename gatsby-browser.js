import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
import "@fortawesome/fontawesome-free/scss/solid.scss"
import "./src/styles/main.scss"

import { auth } from "./src/api/auth"

auth.init(window.location.href)
