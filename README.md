# Mobile Notes App

A simple, modern notes app built with React Native and Expo Router.

## Features
- Create, edit, and delete notes
- View note details
- Responsive and clean UI
- Dark mode support

## Project Structure
```
new-app/
  app/                # App entry, screens, and routes
    (tabs)/           # Tab navigation screens
    components/       # (If present) Screen-specific components
    hooks/            # (If present) Custom hooks
    constants/        # (If present) Color and other constants
    types/            # (If present) TypeScript types
    note-details/     # Dynamic note details screen
    add-note.tsx      # Add note screen
    index.tsx         # Home screen
    _layout.jsx       # Root layout
  components/         # Shared UI components (Button, Header, etc.)
  constants/          # Shared constants (colors, icons)
  assets/             # Fonts and images
  package.json        # Project dependencies
  app.json            # Expo config
  ...
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation
```sh
cd new-app
npm install
```

### Running the App
```sh
npx expo start
```
- Scan the QR code with the Expo Go app or run on an emulator.

## Scripts
- `npm start` / `npx expo start` — Start the development server
- `npm run android` — Run on Android emulator/device
- `npm run ios` — Run on iOS simulator/device (Mac only)

## Customization
- Edit screens in `app/`
- Edit shared components in `components/`
- Update colors in `constants/colors.(js|ts)`

## License
MIT
