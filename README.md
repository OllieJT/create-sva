<p align="center">
 <img src="https://github.com/OllieJT/create-svapp/blob/setup-docs/web/static/create-sa-icon.png?raw=true" width="130" alt="Vibrant square icon with soft corners and the characters S and A.">

</p>

<h1 align="center">
  create-sa
</h1>

<p align="center">Mission: The fastest way to build interactive typesafe Svelte applications.</p>

<p align="center">Get started by running <code>npm create sa@latest</code></p>

<div align="center">

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] ![GitHub Repo stars][github-image]

</div>

## Table of contents

- <a href="#about">About</a>
- <a href="#axioms">Axioms</a>
- <a href="#getting-started">Getting Started</a>

<h2 id="about">The SA Stack</h2>

The _"SA Stack"_ is a web development stack focused on **simplicity**, **consistency**, and **full-stack typesafety**. It combines a collection of tools for interactive full-stack applications, and provides you with a CLI to scaffold your own project.

| Package                                       | Usecase                                                                                                 | Default            | Optional       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------ | -------------- |
| [Svelte](https://svelte.dev/)                 | Framework                                                                                               | ✅ Enabled: v5     | 🚫 _Required_  |
| [SvelteKit](https://kit.svelte.dev/)          | Meta-Framework                                                                                          | ✅ Enabled: v2     | 🚫 _Required_  |
| [Typescript](https://www.typescriptlang.org/) | Type-Safety                                                                                             | ✅ Enabled         | 🚫 _Essential_ |
| [Tailwind CSS](https://tailwindcss.com)       | Styling                                                                                                 | ✅ Enabled         | ✅ Yes         |
| [Lucia](https://lucia-auth.com/)              | Auth                                                                                                    | ✅ Enabled         | ✅ Yes         |
| [Drizzle](https://orm.drizzle.team/)          | Database Adapter<br /> <small style="opacity:0.7; font-size:0.8em;">(MySQL / Sqlite / Postgres)</small> | ✅ Enabled: Sqlite | ✅ Yes         |
| [Husky](https://typicode.github.io/husky/)    | Auth                                                                                                    | 🚫 Disabled        | ✅ Yes         |
| [Prettier](https://prettier.io/)              | Code Formatter                                                                                          | ✅ Enabled         | 🚫 _Essential_ |
| [ESLint](https://eslint.org/)                 | Code Linter                                                                                             | ✅ Enabled         | 🚫 _Essential_ |

> [!NOTE]
> create-sa is heavily inspired by the [t3stack](https://github.com/t3-oss/create-t3-app/), both in the methodology, and the CLI. The first version of this project used or learnt from many aspects of the t3 codebase, and we owe a lot to it's [contributors](https://github.com/t3-oss/create-t3-app/graphs/contributors).

### What exactly is `create-sa`?

`create-sa` is an interactive CLI designed to quickly scaffold a Svelte application with **sensible defaults** tailored for **interactive applications**. Unlike the standard Svelte CLI (which is fantastic for basic websites) create-sa focuses on getting setup with more complex functionality like authentication and databases.

The goal of `create-sa` is to streamline the setup process, providing you with a modular structure that fits your specific needs. Each piece is optional, and the project is generated based on your choices during setup.

SA aims to be as leightweight as possible while scaffolding projects that get you through boilerplate code as fast as possible. This means we may omit beloved packages like [superforms](https://superforms.rocks/) as it does not require project configuration.

---

<h2 id="axioms">Axioms</h2>

This is an _opinionated project_ inspired by the axioms of [t3 stack](https://github.com/t3-oss/create-t3-app/), and the methodologies of [Rich Harris](https://github.com/Rich-Harris).

### 1. Solve Problems

It's easy to fall into the trap of "adding everything" - we explicitly _don't_ want to do that.

Everything added to `create-sa` should both address the mission, and benefit from pre-configuration. This means we **won't** add beloved packages like [superforms](https://superforms.rocks/) as it does not require much setup... but we **will** add things like [Lucia](https://lucia-auth.com/) and integrate it into [Drizzle](https://orm.drizzle.team/) for you.

### 2. Embrace Web Standards

We believe in making the most of native web features to reduce unnecessary complexity and improve performance. Modern web standards offer powerful capabilities that can simplify development and enhance the user experience. By using native browser APIs and built-in features, we minimize dependencies and overhead, resulting in faster, more efficient applications. This means we look forward to deleting code, and removing dependencies in favour of native capabilities.

### 3. Typesafety Isn't Optional

The stated goal of `create-sa` is to provide the quickest way to start a new full-stack, typesafe web application. We take typesafety seriously in these parts as it improves our productivity and helps us ship fewer bugs. Any decision that compromises the typesafe nature of `create-sa` is a decision that should be made in a different project.

<h2 id="getting-started">Getting Started</h2>

To scaffold an app using `create-t3-app`, run any of the following four commands and answer the command prompt questions:

### npm

```bash
npm create sa@latest
```

### yarn

```bash
yarn create sa
```

### pnpm

```bash
pnpm create sa@latest
```

### bun

```bash
bun create sa@latest
```





[downloads-image]: https://img.shields.io/npm/dm/create-svapp?color=364fc7&logoColor=364fc7
[npm-url]: https://www.npmjs.com/package/create-svapp
[npm-image]: https://img.shields.io/npm/v/create-svapp?color=0b7285&logoColor=0b7285
[contribute-url]: https://github.com/olliejt/create-svapp/blob/main/CONTRIBUTING.md
[contribute-image]: https://img.shields.io/badge/PRs-welcome-blue.svg
[github-image]: https://img.shields.io/github/stars/olliejt/create-svapp
[discord-image]: https://img.shields.io/discord/966627436387266600?color=%235865F2&label=Discord&logo=discord&logoColor=%23fff
