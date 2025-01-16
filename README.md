# Welcome to PodCodar WebApp!

This WebApp is the main project of PodCodar, a learning community about programming and technology.

- 📖 [React router docs](https://reactrouter.com/start/home)
- 🧑‍💻 [PodCodar Engineering docs](https://podcodar.github.io/webapp)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Development

### System Dependencies

To have a consistent development environment, we recommend using the following tools:

- [Bun](https://bun.sh)
- [direnv](https://direnv.net/)

### Setup

```shellscript
# (optional) if you have direnv
direnv allow

# install dependencies
bun install 

# decrypt project credentials into a .env file
bun decrypt 
```

### Running the dev server

```shellscript
bun run dev
```

## Production

First, build your app for production:

```sh
bun run build
```

Then run the app in production mode:

```sh
bun start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `bun run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
