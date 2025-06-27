![HealthMate Banner](./res/banner.png)

# HealthMate

HealthMate is a comprehensive health management application designed to help users track appointments, manage crises, and monitor exams. The project consists of a Django backend (REST API) and a React Native frontend (Expo), with additional support for Retrieval-Augmented Generation (RAG) features.

## Project Structure

```
HealthMate/
│
├── app/                # React Native (Expo) frontend
│   ├── app/            # Main app screens and navigation
│   ├── components/     # Reusable UI components
│   ├── services/       # API service modules
│   └── ...             # Config, assets, etc.
│
├── backend/            # Django backend (REST API)
│   ├── appointments/   # Appointments app
│   ├── crisis/         # Crisis management app
│   ├── exams/          # Exams tracking app
│   ├── users/          # User management
│   ├── healthmate/     # Project settings and URLs
│   └── ...             # Database, media, etc.
│
├── rag/                # Retrieval-Augmented Generation (RAG) module
│
└── docs/               # Documentation, diagrams, and mockups
```

---

## Backend Setup (Django)

1. **Install Python 3.11+** and pip if not already installed.

2. **Create and activate a virtual environment:**

   ```sh
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**

   ```sh
   pip install -r backend/requirements.txt
   ```

4. **Apply migrations:**

   ```sh
   cd backend
   python manage.py migrate
   ```

5. **Run the development server:**
   ```sh
   python manage.py runserver 0.0.0.0:8000
   ```

---

## Frontend Setup (React Native with Expo)

1. **Install Node.js (v18+) and npm.**

2. **Install Expo CLI globally:**

   ```sh
   npm install -g expo-cli
   ```

3. **Install dependencies:**

   ```sh
   cd app
   npm install
   ```

4. **Create a config.ts file under `app/app`**

   ```ts
   // config.ts
   export const SERVER_URL = "http://{your_server_ip}:8000";
   ```

   If you're running the backend locally, replace `{your_server_ip}` with your local IP address (e.g., `http://192.168.1.1:8000`).

5. **Start the Expo development server:**

   ```sh
   npm start
   ```

   or

   ```sh
   expo start
   ```

6. **Run on your device:**
   - Use the Expo Go app (iOS/Android) to scan the QR code.
   - Or run on an emulator/simulator.

---

## Documentation

- Diagrams and UI mockups are available in the docs folder.
