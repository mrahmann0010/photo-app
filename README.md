# Photo App (Vite + React)

This repository has been converted from Create React App to [Vite](https://vitejs.dev/).
The project now uses the lightweight Vite dev server with `@vitejs/plugin-react` and Tailwind CSS.

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Starts the Vite development server. Open `http://localhost:5173` (or the port printed) to view the app.
The page supports hot module replacement, so edits are reflected instantly.

### `npm run build`

Bundles the application for production using Vite. The compiled output lives in the `dist` folder.

### `npm run preview`

Serves the production build locally so you can verify the output before deployment.

### `npm test`

Currently still runs the CRA test runner; you may choose to migrate tests to Vitest or another tooling.

## Notes

* All CRA-specific dependencies (react-scripts) have been removed.  
* Static assets in the `public/` folder are now referenced by absolute paths (e.g. `/favicon.ico`).
* Tailwind background images were updated to use the correct public path.

For more information on Vite and plugin configuration, see [Vite documentation](https://vitejs.dev/).
