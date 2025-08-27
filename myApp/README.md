Ellatech Frontend Exercise
A React Native app built with Expo and NativeWind for user and product management.
Setup Instructions

Clone the Repository(Assuming you create a GitHub repo with these files)

Install DependenciesEnsure you have Node.js and npm installed, then run:
npm install


Configure TailwindRun:
npx tailwindcss init

(But since we provided tailwind.config.js, it's optional if you overwrite)

Run the AppStart the Expo development server:
npx expo start

Follow the prompts to open the app in an emulator, physical device, or browser via Expo Go.


Dependencies

expo: For building and running the React Native app.
nativewind: For Tailwind CSS-based styling.
react-native: Core React Native components.
tailwindcss: For styling configuration.

Approach and Trade-offs
Approach

State Management: Used useState for local state to manage users, products, and transactions.
Validation: Basic validation for inputs with alerts.
Styling: NativeWind for easy styling.
Transaction History: Simple pagination.
Error Handling: Alerts for errors.

Trade-offs

Local state only, no persistence.
Basic pagination without advanced features.
Alerts for UX, could be improved with modals.
No unit tests included.

To set up, place these files in the root of your project directory. Note: NativeWind v4 is used; ensure compatibility with Expo by following official docs if issues arise.