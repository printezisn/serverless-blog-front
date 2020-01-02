import { CognitoAuth } from "amazon-cognito-auth-js"
import { Events } from "../utils/constants"
import { eventBus } from "../utils/eventBus"

class Auth {
    constructor() {
        const rootUrl = process.env.GATSBY_EDNABLOG_SITE_ROOT_URL
        const authData = {
            ClientId: "7icdk42lkcj7fevgp2lgss0aio",
            AppWebDomain: "ednablog.auth.ca-central-1.amazoncognito.com",
            TokenScopesArray: ["email", "openid"],
            RedirectUriSignIn: rootUrl,
            RedirectUriSignOut: rootUrl,
            UserPoolId: "ca-central-1_zPiF08WsY",
            AdvancedSecurityDataCollectionFlag: false,
        }

        const self = this
        const auth = new CognitoAuth(authData)
        auth.userhandler = {
            onSuccess: result => {
                self.token = result.getIdToken().getJwtToken()
                eventBus.emit(Events.AUTH_CHANGE)
            },
            onFailure: () => {},
        }

        this.auth = auth
        this.token = this.auth
            .getSignInUserSession()
            .getIdToken()
            .getJwtToken()
    }

    logIn() {
        this.auth.getSession()
    }

    logOut() {
        this.auth.signOut()
    }

    init(url) {
        this.auth.parseCognitoWebResponse(url)
    }

    getToken() {
        return this.token
    }

    isLoggedIn() {
        return this.token !== ""
    }
}

export const auth = new Auth()
