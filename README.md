# 🚀 Create-Stack CLI

A *Node.js based CLI tool* to quickly scaffold modern frontend stacks or clone full boilerplates from GitHub.
Perfect for developers who want to bootstrap projects faster without repetitive setup steps.

---

## ✨ Features

* 📦 *Project Initialization*

  * Create a React app (JavaScript or TypeScript).
  * Optionally configure TailwindCSS out of the box.

* 🧩 *Frontend Libraries (pick what you need)*

  * React
  * TailwindCSS
  * TypeScript
  * Formik + Yup
  * React Hook Form
  * React Router
  * TanStack Query
  * Zustand
  * Redux Toolkit + React-Redux

* 🌐 *Full Boilerplates*

  * Clone production-ready starter projects directly from GitHub:

    * FastAPI + React (full-stack template)
    * MERN Boilerplate
    * Fullstack Starter Template
    * React Boilerplate
    * Django + React Boilerplate

* ⚡ *Automated Setup*

  * Runs npx create-react-app with TypeScript (if selected).
  * Installs all chosen libraries automatically.
  * Configures TailwindCSS (with working config + CSS setup).

---

## 📦 Tech Stack / Dependencies

### Core

* [Node.js](https://nodejs.org/) (>= 16.x)
* [npm](https://www.npmjs.com/)

### Libraries Used

* [chalk](https://github.com/chalk/chalk) → For colored CLI output.
* [inquirer](https://github.com/SBoudrias/Inquirer.js) → For interactive prompts.
* [child_process.execSync](https://nodejs.org/api/child_process.html) → To run shell commands (git clone, npm install, etc.).
* [fs](https://nodejs.org/api/fs.html) → For writing configuration files.
* [path](https://nodejs.org/api/path.html) → For handling file paths.

---

## 🚀 Quick Start

Run the CLI directly without installing globally:

bash
npx create-stack-kit


You’ll see:

plaintext
🚀 Create-Stack CLI
? Enter project name: (my-app)


---

## 📖 Example Flow

plaintext
$ npx create-stack-kit
🚀 Create-Stack CLI
? Enter project name: my-app
? Do you want a frontend stack or a boilerplate (full project)? frontend
? Select frontend libraries: React, Tailwind, TypeScript, React Router, TanStack Query

📦 Setting up frontend project: my-app
Creating React TypeScript project...
✔ Created project in folder "my-app"

Installing Tailwind CSS and its dependencies...
Initializing Tailwind configuration...
✓ Created Tailwind configuration files

Adding React Router...
Adding TanStack Query...

✅ Project "my-app" is ready!

👉 Next steps:
  cd my-app
  npm start


---

## 🔧 Boilerplate Mode

If you choose *boilerplate mode*, the CLI will ask:

plaintext
? Select a boilerplate template:
  FastAPI + React
  MERN Boilerplate
  Fullstack Starter Template
  React Boilerplate
  Django + React Boilerplate


For example, choosing *MERN Boilerplate* runs:

bash
git clone https://github.com/djizco/mern-boilerplate.git my-app


Output:

plaintext
📥 Cloning boilerplate from https://github.com/djizco/mern-boilerplate.git
✅ Boilerplate setup done in folder "my-app"


---

## 🧑‍💻 Code Comments

The CLI is written with *detailed inline comments* in index.js.
Example snippet:

js
// Ask user for project name
const { projectName } = await inquirer.prompt([
  {
    type: "input",
    name: "projectName",
    message: "Enter project name:",
    default: "my-app",
  },
]);


---

## 🏆 Why This Project?

* Saves developers hours of setup time.
* Eliminates repetitive config (Tailwind, React Router, etc.).
* Gives flexibility → choose *minimal frontend* or *full boilerplate*.
* Helps students, hackathon teams, and startups to *start coding features immediately* instead of setup.

---

## 📜 License

MIT License © 2025

---

## 🔥 Hackathon Line Limit Compliance

📌 Hackathon Line Limit (JavaScript): *300 lines (3.0x coefficient)*
✅ Our index.js implementation: *179 lines only*

👉 This shows we built a *feature-rich CLI* well within the strict line limit.

---
