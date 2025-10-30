# FitLynk 🏋️‍♂️

**FitLynk** is a full-featured cross-platform gym management mobile app built using **React Native CLI** and **TypeScript**, with **Appwrite** as the backend. Designed with a clean and modern dark UI, the app helps users discover gyms, manage their workout schedules, and track fitness progress seamlessly.

## 📱 Features

- 🔐 **User Authentication**  
  - Register and login with Appwrite
  - Fields: Username, Email, Phone, Password, Gender
  - Secure session management

- 🏠 **Home Screen**  
  - Dynamic greeting with date/time  
  - Daily motivational card  
  - Current plan with crowd meter  
  - Weekly goals tracker  

- 🔍 **Explore Screen**  
  - Search bar with filter chips (Location, Price, Flexibility, Rating)  
  - Gym cards with logos, amenities, pricing, ratings, crowd levels  
  - “View Gym” button and color-coded crowd meter  

- 📆 **Activity Screen**  
  - Interactive calendar with workout/rest day tracking  
  - ‘Set Workout’ for body parts & exercises  
  - View today’s selected workouts  

- 🙍‍♂️ **Profile Page**  
  - View & edit profile  
  - Active membership info  
  - Settings, Help & Support  

- ✨ **Additional Highlights**  
  - Built with React Native CLI (not Expo)  
  - TypeScript for maintainable, scalable code  
  - Appwrite for backend (authentication, database)  
  - Splash screen & branded logo  
  - Fully responsive with modern dark theme  

---

## 🛠️ Tech Stack

| Tech                      | Use                                  |
|---------------------------|--------------------------------------|
| React Native CLI          | Mobile app development               |
| TypeScript                | Type safety                          |
| Appwrite                  | Auth, DB, storage (self-hosted BaaS) |
| React Navigation          | Navigation between screens           |
| react-native-calendars    | Calendar integration                 |
| AsyncStorage              | Local storage (for session tokens)   |
| react-native-vector-icons | Icons                                |
| Linear Gradient           | Background designs                   |

---

## 🧱 Folder Structure

FitLynk/
├── src/
│ ├── screens/ # Screen components
│ ├── navigation/ # React Navigation setup
│ ├── assets/ # Images, logos, icons
│ ├── components/ # Reusable components (if any)
│ └── styles/ # Common styles
├── android/ # Native Android code
├── ios/ # Native iOS code (if needed)
├── App.tsx # Root component
└── README.md

---

## 🚀 How to Run the App

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fitlynk.git
cd fitlynk

###2. Install Dependencies
npm install
# or
yarn install

3. Set Up Appwrite (Backend)
Create an account at https://cloud.appwrite.io or self-host it

Create a new project (e.g. FitLynk)

Set up:

Authentication: Email + Password

Users collection: with fields like username, phone, gender

Database collections (if needed for gyms/workouts)

Note your projectId, endpoint, and API keys for integration

4. Configure Android
Move project out of OneDrive or Desktop folders to avoid path issues

Create a Keystore if generating a release build

Run on emulator or device: npx react-native run-android

5. Build APK (Release)
cd android
./gradlew assembleRelease
APK will be located at:
android/app/build/outputs/apk/release/app-release.apk

📦 Future Improvements
Push notifications for workout reminders

Admin panel for gym owners

In-app purchases for premium plans

Chat with trainers

Sync with wearables (e.g. Fitbit)


🧑‍💻 Developed By
Harsh Malvi
React Native Developer | Mobile App Enthusiast
LinkedIn • GitHub



