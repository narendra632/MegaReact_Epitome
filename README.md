# MegaReact_Epitome
 The full stack social media app using ReactJS, appwrite, tailwind, and typescript

# React + TypeScript + Vite

 Teachnologies used :
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

 # React 
essential commands - npm install react-router-dom - to handle routing

 # AppWrite
  Appwrite Cloud is a backend service that provides various functionalities to mobile, web, and Flutter applications 
  setup - npm install appwrite

 # Vite
  fastest way to setup development environment for React JS
   commands to setup vite - npm create vite@latest

 # Tailwind css
  A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup
     setup for vite - npm install -D tailwindcss postcss autoprefixer
                    - npx tailwindcss init -p
                    - modify the content in tailwind.config.js from the get started tailwind instructions
                    - npm install -D tailwindcss-animate


 # shadcn/ui
  Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable using tailwind. Open Source.


 # TanStack Query (React Query)
  Powerful asynchronous state management for TS/JS, React, Solid, Vue and Svelte.
  We are using some of its many features - Auto Caching, Auto Refetching, Infinite Scroll Queries, Pagination, SSR support, Mutations API
     setup - npm install @tanstack/react-query
















# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
