# Eventify - React Version

This is your Eventify event discovery platform converted to React with Vite.

## Project Structure

```
eventify/
├── src/
│   ├── pages/           # Page components (Page1-Page9)
│   ├── App.jsx          # Main routing component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
├── postcss.config.js    # PostCSS config
└── .gitignore
```

## Features

- **React with Vite** - Fast development experience
- **React Router** - Client-side navigation between pages
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach
- **Dark Mode Support** - Built-in dark theme

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The app will open automatically at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

## Pages

- **Page 1** - Login/Authentication page
- **Page 2** - Events feed with trending events
- **Pages 3-9** - Additional pages (ready for your content)

## Customization

1. **Styles**: Modify `src/index.css` for custom animations, or `tailwind.config.js` for theme changes
2. **Content**: Edit individual page components in `src/pages/`
3. **Colors**: Primary color is `#256af4` - change in Tailwind config
4. **Fonts**: Uses "Plus Jakarta Sans" from Google Fonts

## Notes

- All original styling is preserved
- Components use React Router for navigation
- State management included for favorites (Page 2)
- Dark mode automatically switches based on system/user preferences

Enjoy your React event platform!
