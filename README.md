<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.ibb.co/WKxXnqw/agglogo.png" alt="Aggregate-Frintend logo"></a>
</p>

<h3 align="center">aggregate-fronteend</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/Blue-Davinci/Aggregate-FronteEnd.svg)](https://github.com/Blue-Davinci/Aggregate-FronteEnd/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Blue-Davinci/Aggregate-FronteEnd.svg)](https://github.com/Blue-Davinci/Aggregate-FronteEnd/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 
Unify, Simplify, <b>Aggregate!</b>
    <br> 
</p>

![Homepage Screenshot](./images/homepage.png)

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage And Features](#usage)
- [Built Using](#built_using)
- [TODO](./TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

The Aggregate front-end is a fully integrated and user friendly svelte application design to seamlessly integrate with the sister project: [The Aggregate Backend](https://github.com/Blue-Davinci/Aggregate)

Aggregate brings together your favorite news sources, blogs, and updates into a single, easy-to-navigate platform. Our goal is to make sure you never miss out on important updates while providing you with a personalized experience. Whether it's tech news, sports updates, or the latest gadgets, Aggregate ensures you stay informed effortlessly.

<hr />


## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

💡🔔**Heads Up**
The app uses `page.server.js` to communicate with the `aggregate` backend with the exception of `formless` requests such as the `feed follows` and `favorites` system which use the `API` methods using `server.js` in the `/api` route.

### Prerequisites
Prior to running the <b>Aggregate</b> project, you need to make sure that you have the following installed in your system: 
- **Node.js:** This project is built with Svelte, which requires Node.js to run. You can download Node.js from the official website.

- **Visual Studio Code:** This is the recommended code editor for this project. You can download it from the official website.

- **Svelte:** This project is built with Svelte. You can install it globally on your system by running npm install -g svelte.

- **Golang and The Aggregate Back-end:** This can be found [here](https://github.com/Blue-Davinci/Aggregate)

### Installing

You can hit the ground running by:

1. **Cloning the Repo:** Clone this repo by doing
```bash
git clone https://github.com/Blue-Davinci/Aggregate-Frontend.git
```

2. **Navigate to the Project Directory:** Done with downloading the repo? Go ahead and navigate to the directory by doing: 
Say what the step will be

```bash
cd aggregate-frontend
```
3. **Install Node.Js:** Haven't installed `node.js`? What are you waiting for, go ahead and download it from their [official website](https://nodejs.org/)

4. **Install Svelte:** Now get your nose deep by downloading svelte like below: 
```bash
npm create svelte@latest 
```

5. **Install the project's dependancies:** Proceed and install the project's dependancies by running:
```bash
npm install
```

6. **Launch the Aggregate Backend:** Start and launch the backend server by following the instructions [here](https://github.com/Blue-Davinci/aggregate?tab=readme-ov-file#installing)

7. Make sure you have the following 2 files in the root folder i.e `Aggregate-Frontend\` as they hold all the links used to interact with the `API`:
```bash
.env.development
.env.production
```

8. We use `cloudinary`, found [documented here](https://cloudinary.com/documentation/node_image_and_video_upload), for hosting the User avatars. So create a file called `.env` on the root (where the above env.dev... are) and add your key + secret
as Shown below:

```bash
CLOUDINARY_API_KEY=<cloudinary api key xxxxxx>
CLOUDINARY_API_SECRET=<cloudinary api secret yyyyy>
```

- You also need to add an **encryption key and IV** in the above file which will be used in encrypting the user api_keys. You can generate both the **IV** and **Encryption key** via the `generator.js` in `lib\utilities\encryption.js`
- For a **quick generation** you can use the `javascript debugger terminal` by first navigating to the directory:

```bash
cd src/lib/utilities
```

- Then **execute** the file by running:

```bash
node encryption.js
```

- You will find a `.env` file in the same directory. You can open and copy the data to the root `.env`, which should have your `cloudinary secrets`, or change it with the `Admin dashboard` *(in the pipeline)*

8. After a succesful setup+startup of the **Aggregate backend API - above**- proceed and start the development server by running:
```bash
npm run dev
```
<b>The Aggreagte Frontend</b> should now be running on your local machine. You can access it by opening your web browser and navigating to `http://localhost:5173` (or the port number displayed in your terminal).

- After a successful startup and login, you should have something like this: 


![Dashboard Screenshot](./images/dashboard.png)

<hr />

## 🎈 Usage And Features <a name="usage"></a>

<b>The basics of the app includes:</b>

1. Homepage: This is the first page for users `http://localhost:5173` and contains the landing page shown as the first image in this readme. 
    - The app supports a smooth Dark  as well as Light themes
2. Feeds: This contains all the feeds that a user can create, follow, hide, manage and more.
    - Ability to follow and unfollow feeds
    - You can search and filter all feeds
    - Ability To Hide any feed that a registered user has added 
    <b>(this feed will only be accessible by the user who created the feed only)</b>
    - Feed manager to manage added/created feeds including updating them.
    - View the currently top followed feeds
    - View the top users who've added feeds including their unique scores calculated by our backend algorithm.
    - Ability to share the feed with other users (linked in, pinterest, twitter, facebook and direct to clip).
3. About: No one knows what it means, but it’s provocative… it gets the people going!
4. Login & Signup: They contain the links for a user to login and also create an account.
    - Supports password recovery/reset
    - Supports SMTP server and token authentication
    - Supports user account activation
    - User Account Manager: panel for a user to update their:
        - Avatar/ Profile picture 
        - Username
        - Password <b>*(in the pipeline)*</b>
5. Dashboard: This only appears after login and is a main page. It contains posts that have been followed by the user and:
    - Ability to search for and filter all followed feed posts
    - Ability to favorite and unfavorite feeds posts
    - Ability to view detailed info for the feed posts which supports HTML content as well as videos
    - Ability to **share** the posts with other users. If a user doesn't follow a post's feed, they will
        Be alerted and provided an option to go and follow the feed.
    - Support for comments with the following features:
        - Supports emojis
        - Create your own comments and reply to others
        - Ability to edit and delete your comments
        - Notifications for any post a user favorited or from any reply to a user's comment.
    - Ability to view your followed feeds
    - Ability to access your favorite posts
    - Ability to add new feeds for people to view and follow as well, including setting their visibility.
    - Ability to **download** the posts for registered users into <b>*pdf*, *json*</b> and <b>*markdown*</b> formats.
    - *Ratings for best followed feeds. <b>(In the Pipeline)</b>*
6. Payment: A feature that allows users to subscribe and transact within the app based on available subscription plans.
    - Users have certain limitations imposed which can only be lifted if on a subscription plan.
    - Users can choose between all of the available subscription plans
    - Admins can add/delete/update subscription plans
    - **Mobile Money** payment  options are also available.
    - Users can view/search and see statistics of their previous transactions as well as subscription statuses.
    - Challenged transactions, if encountered, appear on a navigation to the  dashboard allowing a user to resolve, hide of completely cancel them
    - Users can **cancel** their subscriptions at anytime. Cancelled subscriptions are valid as long as they have not expired

7. Admin Dashboard + Permissions: God Mode <b>*(In the pipeline)*</b>
8. Logout: *And awaaaaaaaay, you go*.

<hr />

## 🚀 Deployment <a name = "deployment"></a>

## Docker
Dockerfile and Docker Compose Setup:

The application uses a multi-stage Dockerfile for building and running the application. The build stage uses a Node.js base image to install dependencies and build the application. The final stage prepares the runtime environment.
The `docker-compose.yml` file orchestrates the build and deployment process, ensuring the application is containerized and runs as expected.

To Build the application:
1. Navigate to project directory:
```bash
cd aggregate-frontend
```
2. Check and verify the following file incase you want to change any configs:

```bash
docker-compose.yml
Dockerfile
```
3. Run the following command to build the docker image based on the `docker-compose.yml` file:

```bash
docker compose up --build
```
<p align="center">
🔍 The --build option ensures that Docker Compose rebuilds the image, which is useful for incorporating the latest changes in the source code or dependencies.
</p>

## A note:
- The application uses different API connection strings based on the environment (development or production).
- The settings can be found in the `.env.development` and `.env.production` files. The prod strings involve connections to & from the docker container.

<b>You can replace this with your own connection strings.</b>

<hr />

![Feeds Screenshot](./images/feeds.png)

## ⛏️ Built Using <a name = "built_using"></a>

- [Node.js](https://nodejs.org/en/) - Server Environment
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Svelte](https://svelte.dev/) - Innovative Framework for building user interfaces
- [SvelteKit](https://kit.svelte.dev/) - Framework for building web applications with Svelte
- [Paystack](https://paystack.com/) - Give your customers the gift of modern, frictionless, painless payments. Integrate Paystack once and let your customers pay you however they want.
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation with static type inference
- [Shad-CN Svelte](https://www.shadcn-svelte.com/) - Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
- [Svelte-Toast](https://zerodevx.github.io/svelte-toast/) - Toast notification library for Svelte
- [Svelte-Confetti](https://mitcheljager.github.io/svelte-confetti/) - Add a burst of fun to your Svelte applications with customizable confetti components. Open Source and easy to integrate.
- [RoboHash](https://robohash.org/) - Robohash is a easy web service that makes it easy to provide unique, robot/alien/monster/whatever images for any text.
- [Lucid-Svelte](https://lucide.dev/) - Beautiful & consistent icons
- [Box-Icons](https://boxicons.com/) - High Quality Web Icons
Simple Open Source icons carefully crafted for designers & developers. Made by the community.
- Other items not mentioned.

<hr />

![Feed View](./images/feedview.png)

## ✍️ Authors <a name = "authors"></a>

- [@Blue-Davinci](https://github.com/Blue-Davinci) - Idea & Initial work

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

👥 See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 💡 Inspiration
The inspiration for Aggregate comes from my personal struggle with managing and consuming content from multiple websites. As an avid reader and tech enthusiast, I found it challenging to stay updated with the latest news, articles, and blog posts. This project became an opportunity to solve a real problem I faced while learning new technologies and honing my development skills.

<hr />

🎩✨ Hat tip to:
- [Official Svelte](https://learn.svelte.dev/tutorial/welcome-to-svelte)
- [HuntaByte](https://www.youtube.com/@huntabyte)
- Any and all people whose libraries\codes were used.
