#!/usr/bin/env node
import { execSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";

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
      ],
    },
  ]);

  console.log(chalk.blue(`\n📦 Setting up frontend project: ${projectName}\n`));

  // Start with Vite
  execSync(`npm create vite@latest ${projectName}`, { stdio: "inherit" });
  process.chdir(projectName);

  if (libs.includes("Tailwind")) {
    execSync("npm install -D tailwindcss postcss autoprefixer", { stdio: "inherit" });
    execSync("npx tailwindcss init -p", { stdio: "inherit" });
  }
  if (libs.includes("TypeScript")) {
    execSync("npm install -D typescript @types/react @types/react-dom @types/node", { stdio: "inherit" });
  }
  if (libs.includes("Formik")) {
    execSync("npm install formik yup", { stdio: "inherit" });
  }
  if (libs.includes("React Hook Form")) {
    execSync("npm install react-hook-form", { stdio: "inherit" });
  }
  if (libs.includes("React Router")) {
    execSync("npm install react-router-dom", { stdio: "inherit" });
  }
  if (libs.includes("TanStack Query")) {
    execSync("npm install @tanstack/react-query", { stdio: "inherit" });
  }

  console.log(chalk.green(`\n✅ Project "${projectName}" is ready!`));
  console.log(chalk.yellow(`\n👉 Next steps:\n  cd ${projectName}\n  npm install\n  npm run dev\n`));
}

main();