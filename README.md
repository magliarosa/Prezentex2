# Prezentex

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Node Version](https://img.shields.io/badge/Node-22.14.0-blue.svg)](https://nodejs.org/)

## Table of Contents
- [Prezentex](#prezentex)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Tech Stack](#tech-stack)
  - [Getting Started Locally](#getting-started-locally)
  - [Available Scripts](#available-scripts)
  - [Project Scope](#project-scope)
  - [Project Status](#project-status)
  - [License](#license)

## Project Description
Prezentex is a centralized web application designed to ease the stress of gift shopping by providing a platform to organize both gift ideas and recipient information. With an intuitive interface and streamlined workflows, users can efficiently manage gift ideas, assign them to specific recipients, and keep track of their choices.

## Tech Stack
**Frontend:**
- A combination of [Astro 5](https://astro.build) and [React](https://reactjs.org) to develop fast, efficient web pages with interactive components.
- **TypeScript 5** for static typing and enhanced development experience.
- **Tailwind CSS 4** for styling.
- **Shadcn/ui** for accessible, ready-to-use React components.

**Backend:**
- **Supabase:** Provides a hosted PostgreSQL database along with integrated authentication services, handling data storage and user management.

**CI/CD & Hosting:**
- **GitHub Actions** for continuous integration and deployment pipelines.

## Getting Started Locally
1. Ensure you have [Node.js](https://nodejs.org/) installed. The project requires Node.js version **22.14.0** as specified in the `.nvmrc` file.
2. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
3. Navigate to the project directory:
   ```sh
   cd prezentex2
   ```
4. Install the dependencies:
   ```sh
   npm install
   ```
5. Run the development server:
   ```sh
   npm run dev
   ```
6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or the port specified by the dev server).

## Available Scripts
Within the project directory, you can run:
- `npm run dev` - Starts the local development server.
- `npm run build` - Builds the application for production.
- `npm run preview` - Serves the production build locally.
- `npm run astro` - Runs Astro CLI commands.
- `npm run lint` - Runs ESLint to check for syntax and style issues.
- `npm run lint:fix` - Automatically fixes linting issues.
- `npm run format` - Formats the codebase using Prettier.

## Project Scope
The current scope of Prezentex includes:
- Adding new recipients with name and description.
- Adding gift ideas with details such as name, price, link, and description.
- Assigning gift ideas to specific recipients during creation or editing.
- Editing and deleting entries for gift ideas and recipients.
- Implementing a unified styling approach for modal windows.
- User authentication and registration, including Google account integration (with row-level security).

**Exclusions (MVP):**
- Reminder systems or in-app notifications.
- Advanced filtering or data analytics features.
- Sharing gift ideas between users.
- Mobile application support.
- Extended options like birthday or name day tracking.

## Project Status
**MVP Stage:** The project is currently in the Minimum Viable Product stage, focusing on core functionality and iterative improvements based on user feedback.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 