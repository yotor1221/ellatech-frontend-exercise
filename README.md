Ellatech Frontend Exercise
A React Native app built with Expo SDK 53, NativeWind, and React Navigation for user and product management.
Setup Instructions

Clone the Repository(Assuming you create a GitHub repo with these files)

Create Project Structure

Place App.js, package.json, babel.config.js, tailwind.config.js, and app.json in the root.
Create a screens/ folder and add:
RegisterUserScreen.js
RegisterProductScreen.js
ProductListScreen.js
TransactionHistoryScreen.js




Install DependenciesEnsure Node.js (version 20+) and npm are installed, then run:
npm install


Configure TailwindThe provided tailwind.config.js is set up. If needed, regenerate with:
npx tailwindcss init

Ensure content includes ./App.js and ./screens/*.js.

Run the AppStart the Expo development server:
npx expo start

Use Expo Go, an emulator, or a web browser to view the app. Note: Expo Go supports SDK 53 and the New Architecture.


Dependencies

expo: ~53.0.0 (SDK 53 with React Native 0.79 and React 19).
nativewind: ^4.1.9 (Tailwind CSS for React Native).
react-native: 0.79.0 (Compatible with SDK 53).
@react-navigation/native and @react-navigation/stack: For navigation.
react-native-gesture-handler: Required for React Navigation.
tailwindcss: ^3.4.10 (Styling configuration).

Approach and Trade-offs
Approach

SDK 53 Updates: Leverages React Native 0.79, React 19, and the New Architecture (enabled by default for better performance).
Navigation: Used react-navigation to split features into separate screens, fixing FlatList nesting issues and improving UX.
State Management: Centralized products and transactions in App.js with useState, passed as props to screens.
Validation: Basic input validation with alerts.
Styling: NativeWind v4 for consistent, responsive styling with Tailwind presets.
Transaction History: Maintained pagination with 5 items per page.

Trade-offs

New Architecture: Enabled by default; opt-out if third-party libraries are incompatible (e.g., some maps or Stripe integrations).
Local State: Used for simplicity; a backend would enable persistence.
Navigation: Stack navigation is simple but could be enhanced with tabs.
Error Handling: Alerts are basic; modals or toasts would improve UX.
Testing: Omitted tests to focus on functionality; add unit tests for production.
SDK 53 Compatibility: All Expo packages support the New Architecture; verify third-party libs with npx expo-doctor@latest.

Troubleshooting

Nested ScrollView Error: Fixed by removing ScrollView and using separate screens.
Navigation Issues: Ensure react-native-gesture-handler is imported at the top of App.js.
Styling Issues: Verify nativewind/babel in babel.config.js and content paths in tailwind.config.js. Clear cache with npx expo start --clear.
New Architecture Issues: Run npx expo-doctor@latest to check library compatibility. Opt-out in app.json if needed: "newArchEnabled": false.
Metro/Package Errors: Delete node_modules and package-lock.json, then npm install. Use Node 20+.

For more details, refer to Expo SDK 53 Changelog and NativeWind Docs.