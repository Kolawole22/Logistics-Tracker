# Logistics Tracker

A React Native mobile application for tracking logistics and shipments, built with Expo and TypeScript. Currently using sample data for demonstration purposes.

## Features

- Package tracking dashboard with real-time status updates
- Detailed package information view
- Status update functionality
- Customizable settings with dynamic font scaling
- Modern, accessible UI design
- Cross-platform support (iOS & Android)

## Current Implementation

This is a demonstration version that uses sample data to showcase the functionality. The app includes:

- Pre-populated package data for testing and demonstration
- Simulated status updates
- Mock tracking information
- Sample delivery routes and timestamps

To implement with real data, you would need to:

1. Replace the mock data in `contexts/PackagesContext` with your API integration
2. Update the data models to match your backend schema
3. Implement proper authentication if required
4. Add real-time updates for package status changes

## Tech Stack

- [React Native](https://reactnative.dev/) - Mobile framework
- [Expo](https://expo.dev/) - Development platform
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Expo Router](https://docs.expo.dev/routing/introduction/) - File-based routing
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Local data persistence
- [React Native Toast Message](https://github.com/calintamas/react-native-toast-message) - Toast notifications

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Expo Go](https://expo.dev/client) app on your mobile device or simulator

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd LogisticsTracker
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun start
```

4. Open the app:
   - 📱 Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - 🖥️ Press 'i' for iOS simulator or 'a' for Android emulator

## Project Structure

```
LogisticsTracker/
├── app/                 # Application screens and routing
├── assets/             # Static assets (images, fonts)
├── components/         # Reusable UI components
├── contexts/          # React Context providers
└── types/             # TypeScript type definitions
```

## Features in Detail

### Package Tracking

- Real-time status updates
- Comprehensive package details
- Status history

### Font Scaling

- Dynamic text size adjustment
- System font size integration
- Screen-specific font scaling control

### Settings

- Font scaling toggle
- System settings integration
- Live text preview

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
