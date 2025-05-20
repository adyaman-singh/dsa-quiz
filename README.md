## 📸 Screenshots
<img width="1470" alt="Screenshot 2025-01-30 at 6 20 02 PM" src="https://github.com/user-attachments/assets/4be3452d-1a4e-4fdd-9732-f6a622ec2c87" />
<img width="1470" alt="Screenshot 2025-03-11 at 8 57 30 PM" src="https://github.com/user-attachments/assets/935a0340-8367-4e5c-acdb-47ef3a5f81f7" />

link to the live website : https://flashify-dsa-adyaman.vercel.app/

---

# 🚀 Flashify DSA - Flashcard-Based Self Testing Tool for DSA

Flashify DSA is an interactive flashcard-based learning tool designed to help developers strengthen their problem-solving skills in Data Structures and Algorithms (DSA). It provides real-time feedback, hints, and performance analysis powered by OpenAI's GPT API.

## 🌟 Features
✅ **Interactive Flashcards** – Solve algorithmic problems with dynamic flashcards.  
✅ **Real-Time Feedback** – Get instant feedback and hints for your submissions.  
✅ **Secure Authentication** – Google OAuth 2.0 integration for secure user login and management.  
✅ **GPT-Powered Analysis** – Analyze user submissions with OpenAI's GPT API, providing hints and time complexity analysis.  
✅ **Full CRUD Support** – Create, update, and delete flashcards dynamically.  
✅ **Deployed on AWS** – Hosted on an AWS EC2 instance for scalability and performance.  

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Material-UI  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Google OAuth 2.0  
- **AI Integration:** OpenAI GPT API  
- **Hosting:** AWS EC2  

---

## 🚀 Getting Started
### 1. **Clone the repository**  
```bash
git clone https://github.com/adyamans3/dsa-quiz.git
```

### 2. **Install dependencies**  
To install dependencies:
```bash
npm run build
npm run start
```

### 3. **Set up environment variables**  
Create a `.env` file in the `backend` folder:
```env
PORT=5069
MONGO_URI=<your-mongodb-uri>
OPENAI_API_KEY=<your-openai-api-key>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

### 4. **Run the backend and frontend**  
Start the backend:
```bash
cd backend
npm run start
```

Start the frontend:
```bash
cd frontend
npm run start
```

---

## 🚦 Usage
1. Sign in using Google OAuth.  
2. Choose a difficulty level (Easy, Medium, Hard).  
3. Solve algorithmic problems using flashcards.  
4. Submit answers to get real-time feedback and hints.  
5. Review your progress and improve!  

---

## 🚀 Deployment
The application is deployed on an **AWS EC2** instance.  
👉 [Live Demo] https://flashify-dsa-adyaman.vercel.app/

---

## 📄 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/model/submit-answer` | Submits the answer and returns AI-generated feedback |
| `POST` | `/auth/login` | Handles user login via Google OAuth |
| `GET`  | `/questions/:difficulty` | Fetches questions based on the selected difficulty |

---

## 👨‍💻 Author
**Adyaman Singh**  
💼 [LinkedIn](https://www.linkedin.com/in/adyaman-singh/)  
📧 adyamans3@gmail.com  

---

## 🌟 Acknowledgements  
- OpenAI for the GPT API  
- Google for OAuth 2.0  
- AWS for deployment support  

---

## 📜 License
This project is licensed under the **MIT License**.  
