# Walkthrough: Form Preview Package Extraction

I have successfully extracted the `PreviewMode` component into a standalone package named `react-form-preview`. This package is now self-sufficient and can be installed in other projects directly from GitHub.

## Changes Made

### 1. Created Package Structure
- Initialized a new project in `form-preview`.
- Set up TypeScript and `tsup` for bundling into ESM and CJS formats.
- Configured dual-module support for maximum compatibility.

### 2. Ported Components & Hooks
- Moved `PurePreview` (the core logic) from `PreviewMode.tsx` to the package.
- Ported the `useAutoScroll` hook.
- Created lightweight, portable versions of Shadcn UI components (`Input`, `Button`, `Label`, `Textarea`, `Checkbox`, `Select`) to ensure the package works without requiring the host project to have Shadcn files.

### 3. Build & Verification
- Verified the build process using `npm run build`.
- Fixed TypeScript linting issues during the porting process.

## How to Use

### Installation
You can install this package in your other projects via GitHub:
```bash
# General installation (installs latest main)
npm install github:chaitanya36000/react-form-preview

# Install a specific version (using your release tag)
npm install github:chaitanya36000/react-form-preview#release-1.0
```
> [!IMPORTANT]
> I have added a `"prepare": "npm run build"` script to your `package.json`. This ensures that whenever you install the package from GitHub, it automatically builds the latest code. **Make sure to push this change to your repository.**

### Usage in React
```tsx
import { PurePreview } from 'react-form-preview';
import 'react-form-preview/dist/index.css'; // If styles are separately bundled

const MyComponent = () => {
  const fields = [
    { id: '1', type: 'heading', content: 'My Form' },
    { id: '2', type: 'text', label: 'Name', placeholder: 'Enter your name' }
  ];

  return <PurePreview fields={fields} />;
};
```

## Local Development

If you want to make changes to the component and see them in real-time, you can use the built-in demo project:

1.  **Install Demo Dependencies** (First time only):
    ```bash
    cd demo
    npm install
    ```
2.  **Start Local Preview**:
    From the root of the project, run:
    ```bash
    npm run demo
    ```
    This will start a Vite server. Any changes you make in `src/PreviewMode.tsx` will be hot-reloaded in the browser immediately.

## Next Steps
1. **GitHub Repository**: Create a new repository on GitHub and push the contents of your project to it.
2. **Styling**: Ensure your host project has Tailwind CSS configured, as the package uses Tailwind classes for styling. You may need to add the package path to your `tailwind.config.js` content array:
```javascript
content: [
  // ... your paths
  "./node_modules/form-preview/dist/**/*.{js,mjs}"
]
```
