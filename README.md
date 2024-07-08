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

<p align="center"> <b>Aggregate</b>
Unify, Simplify, and Amplify
    <br> 
</p>

![Homepage Screenshot](./images/dashboard.png)

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
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

8. After a succesful setup+startup of the Aggregate backend API - above- proceed and start the development server by running:
```bash
npm run dev
```
<b>The Aggreagte Frontend</b> should now be running on your local machine. You can access it by opening your web browser and navigating to `http://localhost:5173` (or the port number displayed in your terminal).
## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
