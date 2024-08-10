# IAmSafe: AI-Powered Personal Safety App

IAmSafe is an innovative personal safety application leveraging Google's Gemini AI to provide comprehensive protection and peace of mind.

## Features

- Voice-activated emergency alerts
- Real-time location sharing
- Smart siren activation
- Dynamic helplines based on location
- AI-powered first aid guidance
- Intelligent ambient monitoring
- Customizable safety profiles
- Offline mode for core functionalities

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Expo CLI

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/jatinchauhann/IAmSafeApp.git
   cd IAmSafeApp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install Expo CLI globally (if not already installed):
   ```
   npm install -g expo-cli
   ```

## Configuration

1. Rename `.env.example` to `.env`
2. Add your Google Gemini AI API key to the `.env` file:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## Running the App

1. Start the Expo development server:
   ```
   npx expo start
   ```

2. Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal or in the browser.

## Important Note

Due to time constraints and limitations of the free model, some features are not fully functional in this demo version:

- Contextual safety information is simulated and not real-time.
- Voice interpretation using Gemini AI is limited and may not accurately respond to all commands.
- Some AI-powered features may have reduced functionality.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Google Gemini AI for powering the core AI functionalities
- Expo for making React Native development smoother

