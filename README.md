# Serverless Blog (Front-end)

A series of projects showing how you can build a serverless blog in AWS. This project contains the front-end part of the application.
You can find the back-end part in https://github.com/printezisn/serverless-blog-back.

My personal blog was built this way: https://ednablog.com.

## How it Works

The project is built in React and GatsbyJS and is meant to serve as a static website hosted on S3, using CloudFront as a CDN.
During build time, the application fetches all the blog posts from an API gateway and creates static pages for them. This makes the website very fast and allows for CDN caching.

It also contains pages that handle CRUD operations on blog posts, by calling the same API gateway. The API gateway requires authentication, so the user has to sign in first, through Cognito, and then the application passes the access token to the API gateway.

## Getting Started

The following instructions will get you started with the project in your local environment.

### Prerequisites

Before starting, you need to do the following actions:

1. Install the latest version of **NodeJS**.
1. Install the Gatsby CLI: `npm install -g gatsby`
1. Install the node modules of the project: `npm install`
1. Set the following environment variables:
    - **GATSBY_EDNABLOG_API_ROOT_URL**: The root URL of the API gateway (e.g. https://myid.execute-api.myregion.amazonaws.com/mystage/posts/). Be careful, the URL must end with a "/".
    - **GATSBY_EDNABLOG_SITE_ROOT_URL**: The root URL of the website (e.g. http://localhost:8000/). Be careful, the URL must end with a "/".
    - **GATSBY_EDNABLOG_SITE_TITLE**: The title of the website (e.g. Edna Blog).
    - **GATSBY_EDNABLOG_SITE_SUBTITLE**: The subtitle of the website (e.g. (E)very (D)eveloper (N)eeds (A) blog).
    - **GATSBY_EDNABLOG_SITE_DESCRIPTION**: The description of the website (e.g. My personal blog).
    - **GATSBY_EDNABLOG_AUTHOR**: The author of the blog posts (e.g. John Doe).
    - **GATSBY_COGNITO_CLIENT_ID**: The client ID of the Cognito user pool.
    - **GATSBY_COGNITO_APP_WEB_DOMAIN**: The app web domain of the Cognito user pool.
    - **GATSBY_COGNITO_USER_POOL_ID**: The ID of the Cognito user pool.

You can also create a **dotenv** file with values for the above environment variables. This way, you won't have to set the environment variables every time you open a new session. You can create a separate dotenv file for each environment. For example:

**.env.development**:

```
GATSBY_EDNABLOG_API_ROOT_URL=https://myid.execute-api.myregion.amazonaws.com/Test/posts/
GATSBY_EDNABLOG_SITE_ROOT_URL=http://localhost:8000/
GATSBY_EDNABLOG_SITE_TITLE=Edna Blog
GATSBY_EDNABLOG_SITE_SUBTITLE=(E)very (D)eveloper (N)eeds (A) blog
GATSBY_EDNABLOG_SITE_DESCRIPTION=My personal blog.
GATSBY_EDNABLOG_AUTHOR=John Doe
GATSBY_COGNITO_CLIENT_ID=<client id>
GATSBY_COGNITO_APP_WEB_DOMAIN=<app web domain>
GATSBY_COGNITO_USER_POOL_ID=<user pool id>
```

**.env.production**:

```
GATSBY_EDNABLOG_API_ROOT_URL=https://myid.execute-api.myregion.amazonaws.com/Prod/posts/
GATSBY_EDNABLOG_SITE_ROOT_URL=http://localhost:9000/
GATSBY_EDNABLOG_SITE_TITLE=Edna Blog
GATSBY_EDNABLOG_SITE_SUBTITLE=(E)very (D)eveloper (N)eeds (A) blog
GATSBY_EDNABLOG_SITE_DESCRIPTION=My personal blog.
GATSBY_EDNABLOG_AUTHOR=John Doe
GATSBY_COGNITO_CLIENT_ID=<client id>
GATSBY_COGNITO_APP_WEB_DOMAIN=<app web domain>
GATSBY_COGNITO_USER_POOL_ID=<user pool id>
```

### Build

You can build the project by running the following command:

```
npm run build
```

### Running the tests

You can run the unit tests with the following command:

```
npm run test
```

### Running the application

You can run the application for development with the following command (changes you make will be automatically reflected without having to restart the server):

```
npm run develop
```

You can run the application for production with the following command (you will have to build the project and restart the server if you make changes):

```
npm run build && npm run serve
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
