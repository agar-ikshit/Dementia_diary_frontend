


# 🧠 Dementia Diaries – Frontend

Welcome to **Dementia Diaries**, a journaling web app designed to support people with dementia in recording, exploring, and reflecting on their daily emotions.  
Users can write diary entries every day, and an AI model automatically detects and tags each entry with its emotion, making it easy to revisit positive moments and memories in the future.

🌐 **Live demo:** [dementia-diary-frontend.vercel.app](https://dementia-diary-frontend.vercel.app/)  
🛠 **Backend repo:** [Dementia_diary_backend](https://github.com/agar-ikshit/Dementia_diary_backend)

---

## ✨ Features

- Sign up and login securely
- Add daily diary entries
- Automatic emotion detection (using a Hugging Face model)
- Search past entries by emotion groups:
  - **Positive:** happy, joy, surprise
  - **Negative:** sad, sadness, anger, disgust, shame, fear
  - **Neutral:** neutral
- Clean, modern UI built with React and Tailwind CSS

---

## 🚀 Getting Started

Follow these steps to run the frontend locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/agar-ikshit/Dementia_diary_frontend.git
   cd Dementia_diary_frontend


2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root folder and add:

   ```
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

   Replace the URL if your backend is running elsewhere.

4. **Run the app**

   ```bash
   npm start
   ```

   The app will run at [http://localhost:3000](http://localhost:3000)

---

## 📦 Project Structure

```
src/
├── components/        # Reusable components like LoginForm, SignupForm, DiaryApp
├── context/           # AuthContext for authentication state
├── services/          # API service (e.g., diaryService)
├── App.js             # Main app entry point
└── index.js
```

---

## 🧰 Built With

* [React](https://reactjs.org/) – UI library
* [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
* [React Modal](https://github.com/reactjs/react-modal) – Accessible modal component
* Hugging Face (model deployment for emotion detection)
* [Vercel](https://vercel.com/) – Deployment

---

## 📌 Backend

The backend handles user authentication, diary entry storage, and integrates with the AI model.

* **Backend repo:** [Dementia\_diary\_backend](https://github.com/agar-ikshit/Dementia_diary_backend)

---

## 🙏 Contributing

Contributions and suggestions are welcome!
Feel free to fork this repo, make changes, and open a pull request.

---

## 📄 License

This project is open source – feel free to use and build on it.

---

## ✨ Credits

Built with ❤️ by [@agar-ikshit](https://github.com/agar-ikshit)
Helping people with dementia reflect on happier days.

