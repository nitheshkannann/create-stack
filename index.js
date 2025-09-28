#!/usr/bin/env node
import { execSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";
import { writeFileSync } from "fs";
import { join } from "path";

async function main() {
  console.log(chalk.green("🚀 Create-Stack CLI"));

  // Ask name of project
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter project name:",
      default: "my-app",
    },
  ]);

  // First choice: frontend stack vs boilerplate
  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "Do you want a frontend stack or a boilerplate (full project)?",
      choices: [
        { name: "Frontend stack (React + libraries)", value: "frontend" },
        { name: "Boilerplate from GitHub (full project)", value: "boilerplate" },
      ],
    },
  ]);

  if (mode === "boilerplate") {
    // Boilerplate options
    const { boiler } = await inquirer.prompt([
      {
        type: "list",
        name: "boiler",
        message: "Select a boilerplate template:",
        choices: [
          {
            name: "FastAPI + React (fastapi/full-stack-fastapi-template)",
            value: "https://github.com/fastapi/full-stack-fastapi-template.git",
          },
          {
            name: "MERN Boilerplate (djizco/mern-boilerplate)",
            value: "https://github.com/djizco/mern-boilerplate.git",
          },
          {
            name: "Fullstack starter (Sairyss/fullstack-starter-template)",
            value: "https://github.com/Sairyss/fullstack-starter-template.git",
          },
          {
            name: "React Boilerplate (frontend-only) (react-boilerplate/react-boilerplate)",
            value: "https://github.com/react-boilerplate/react-boilerplate.git",
          },
          {
            name: "Django + React (vintasoftware/django-react-boilerplate)",
            value: "https://github.com/vintasoftware/django-react-boilerplate.git",
          },
        ],
      },
    ]);

    console.log(chalk.blue(`\n📥 Cloning boilerplate from ${boiler}`));
    execSync(`git clone ${boiler} ${projectName}`, { stdio: "inherit" });
    console.log(chalk.green(`✅ Boilerplate setup done in folder "${projectName}"`));
    return;
  }

  // Else mode === "frontend"
  // Prompt for frontend libraries selection
  const { libs } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "libs",
      message: "Select frontend libraries:",
      choices: [
        "React",
        "Tailwind",
        "TypeScript",
        "Formik",
        "React Hook Form",
        "React Router",
        "TanStack Query",
        "Zustand",
        "Redux Toolkit",
      ],
    },
  ]);

  console.log(chalk.blue(`\n📦 Setting up frontend project: ${projectName}\n`));

  // Create React App with TypeScript if selected
  const isTypescript = libs.includes("TypeScript");
  console.log(chalk.blue(`Creating React ${isTypescript ? "TypeScript " : ""}project...`));
  execSync(`npx create-react-app ${projectName} ${isTypescript ? "--template typescript" : ""}`, { stdio: "inherit" });
  process.chdir(projectName);

  // Install selected libraries
  const dependencies = [];
  const devDependencies = [];

  if (libs.includes("Tailwind")) {
    console.log(chalk.blue("\nInstalling Tailwind CSS and its dependencies..."));
    execSync("npm install -D tailwindcss@3.2.7 postcss@8.4.21 autoprefixer@10.4.13", { stdio: "inherit" });
    console.log(chalk.blue("\nInitializing Tailwind configuration..."));
    execSync("npx tailwindcss init -p", { stdio: "inherit" });
    
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
    writeFileSync(join(process.cwd(), 'tailwind.config.js'), tailwindConfig);
    
    const tailwindCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`;
    writeFileSync(join(process.cwd(), 'src', 'index.css'), tailwindCss);
    writeFileSync(join(process.cwd(), 'src', 'App.css'), '');

    console.log(chalk.blue("✓ Created Tailwind configuration files"));
  }

  if (libs.includes("Formik")) {
    console.log(chalk.blue("Adding Formik and Yup..."));
    dependencies.push("formik", "yup");
  }

  if (libs.includes("React Hook Form")) {
    console.log(chalk.blue("Adding React Hook Form..."));
    dependencies.push("react-hook-form");
  }

  if (libs.includes("React Router")) {
    console.log(chalk.blue("Adding React Router..."));
    dependencies.push("react-router-dom");
  }

  if (libs.includes("TanStack Query")) {
    console.log(chalk.blue("Adding TanStack Query..."));
    dependencies.push("@tanstack/react-query");
  }

  if (libs.includes("Zustand")) {
    console.log(chalk.blue("Adding Zustand for state management..."));
    dependencies.push("zustand");
  }

  if (libs.includes("Redux Toolkit")) {
    console.log(chalk.blue("Adding Redux Toolkit and React-Redux..."));
    dependencies.push("@reduxjs/toolkit", "react-redux");
  }

  // Install dependencies
  if (dependencies.length > 0) {
    console.log(chalk.blue("\nInstalling selected libraries:"));
    dependencies.forEach(dep => console.log(chalk.yellow(`- ${dep}`)));
    execSync(`npm install ${dependencies.join(" ")}`, { stdio: "inherit" });
  }

  if (devDependencies.length > 0) {
    console.log(chalk.blue("\nInstalling development dependencies:"));
    devDependencies.forEach(dep => console.log(chalk.yellow(`- ${dep}`)));
    execSync(`npm install -D ${devDependencies.join(" ")}`, { stdio: "inherit" });
  }

  console.log(chalk.green(`\n✅ Project "${projectName}" is ready!`));
  console.log(chalk.yellow(`\n👉 Next steps:\n  cd ${projectName}\n  npm start\n`));
}

main();