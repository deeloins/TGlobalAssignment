Tech Stack
Framework: React Native (Expo SDK)
Language: TypeScript (Strict Type Checking)
Icons: Lucide-React-Native
Navigation: Expo Router (File-based routing)

📱 Features Implemented
Publications Screen: A vertically scrollable list of medical publications.
Search Functionality: A styled search bar with real-time text input capabilities.
Custom UI Components:
Profile Avatars with fallback image support.
Category Badges (e.g., Covid, Vaccine) with dynamic coloring.
Detailed Publication Cards featuring author metadata and read-time indicators.
Type Safety: Resolved complex StyleProp conflicts between ViewStyle, TextStyle, and ImageStyle to ensure a 0-error build.

Challenges & Solutions
The Challenge: Encountered a No overload matches this call TypeScript error when applying styles to SafeAreaView and Text components. This was caused by overlapping style properties (like cursor or userSelect) that are valid on Web but not Native.
The Solution: I implemented a strict Styles interface for the StyleSheet, explicitly separating ViewStyle, TextStyle, and ImageStyle. This ensured that only valid properties were passed to each component, resulting in a type-safe and more performant UI layer.

Demo
(https://jam.dev/c/c826c9a0-553c-431a-b6f4-959c1f270cfc)

👤 Author
Michael Podeke

LinkedIn: www.linkedin.com/in/michael-podeke

Portfolio: react-portfolio-iota-one-49.vercel.app
