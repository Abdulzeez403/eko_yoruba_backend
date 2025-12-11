Yoruba Learning App — API Documentation
Base URL
http://localhost:5000/api


All endpoints are JSON.
For protected routes, include Authorization: Bearer <JWT_TOKEN> in headers.

1️⃣ Auth Endpoints
Register

URL: /auth/register

Method: POST

Body:

{
  "name": "Abdul",
  "email": "abdul@example.com",
  "password": "password123"
}


Response (200):

{
  "_id": "64a2b123abc123...",
  "name": "Abdul",
  "email": "abdul@example.com",
  "level": "Beginner",
  "streak": 0,
  "wordsLearned": 0,
  "lessonsCompleted": 0,
  "createdAt": "2025-12-10T10:00:00.000Z"
}

Login

URL: /auth/login

Method: POST

Body:

{
  "email": "abdul@example.com",
  "password": "password123"
}


Response (200):

{
  "user": {
    "_id": "64a2b123abc123...",
    "name": "Abdul",
    "email": "abdul@example.com",
    "level": "Beginner",
    "streak": 0,
    "wordsLearned": 0,
    "lessonsCompleted": 0
  },
  "token": "<JWT_TOKEN>"
}

2️⃣ Lessons Endpoints
Get All Lessons

URL: /lessons

Method: GET

Query Params: level=Beginner|Intermediate|Advanced (optional)

Headers: Authorization: Bearer <JWT_TOKEN>

Response (200):

[
  {
    "_id": "64a2c456def456...",
    "title": "Greetings",
    "level": "Beginner",
    "yorubaWord": "Ẹ káàárọ̀",
    "englishTranslation": "Good morning",
    "pronunciation": "Eh kaa-roh",
    "examples": ["Ẹ káàárọ̀, Bawo ni?", "Ẹ káàárọ̀, Ṣé dáadáa ni?"],
    "audioUrl": "https://example.com/audio/greetings.mp3"
  }
]

Get Single Lesson

URL: /lessons/:id

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>

Response (200):

{
  "_id": "64a2c456def456...",
  "title": "Greetings",
  "level": "Beginner",
  "yorubaWord": "Ẹ káàárọ̀",
  "englishTranslation": "Good morning",
  "pronunciation": "Eh kaa-roh",
  "examples": ["Ẹ káàárọ̀, Bawo ni?", "Ẹ káàárọ̀, Ṣé dáadáa ni?"],
  "audioUrl": "https://example.com/audio/greetings.mp3"
}

3️⃣ Flashcards Endpoints
Get Flashcards

URL: /flashcards

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>

Response (200):

[
  {
    "_id": "64a2f123abc789...",
    "yoruba": "Ẹ ṣé",
    "english": "Thank you",
    "pronunciation": "Eh sheh",
    "audioUrl": "https://example.com/audio/thankyou.mp3"
  }
]

4️⃣ AI Tutor Endpoint
Chat With AI

URL: /ai/chat

Method: POST

Headers: Authorization: Bearer <JWT_TOKEN>

Body:

{
  "message": "Teach me 3 Yoruba greetings with pronunciation"
}


Response (200):

{
  "reply": "Here are 3 Yoruba greetings:\n1. Ẹ káàárọ̀ – Good morning (Eh kaa-roh)\n2. Ẹ káàsán – Good afternoon (Eh kaa-san)\n3. Ẹ kúùrọ̀lẹ́ – Good evening (Eh koo-ro-leh)"
}

5️⃣ Quiz Endpoints
Get Quiz for Lesson

URL: /quiz/:lessonId

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>

Response (200):

[
  {
    "_id": "64a3d123quiz123...",
    "lessonId": "64a2c456def456...",
    "question": "What is 'Good morning' in Yoruba?",
    "options": ["Ẹ káàárọ̀", "Ẹ káàsán", "Ó dàbọ̀", "Ẹ ṣé"],
    "correctAnswer": 0
  }
]

Submit Quiz Answer

URL: /quiz/submit

Method: POST

Headers: Authorization: Bearer <JWT_TOKEN>

Body:

{
  "userId": "64a2b123abc123...",
  "lessonId": "64a2c456def456...",
  "answers": [0, 1, 0]  // index of selected options
}


Response (200):

{
  "score": 2,
  "total": 3,
  "message": "Quiz submitted successfully!"
}

6️⃣ Profile Endpoints
Get Profile

URL: /profile

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>

Response (200):

{
  "_id": "64a2b123abc123...",
  "name": "Abdul",
  "email": "abdul@example.com",
  "level": "Beginner",
  "streak": 3,
  "wordsLearned": 42,
  "lessonsCompleted": 3
}

Update Profile

URL: /profile

Method: PUT

Headers: Authorization: Bearer <JWT_TOKEN>

Body:

{
  "name": "Abdulazeez",
  "level": "Intermediate"
}


Response (200):

{
  "_id": "64a2b123abc123...",
  "name": "Abdulazeez",
  "email": "abdul@example.com",
  "level": "Intermediate",
  "streak": 3,
  "wordsLearned": 42,
  "lessonsCompleted": 3
}

7️⃣ Headers

For protected endpoints:

Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

8️⃣ Notes

All endpoints return JSON.

Use JWT for authentication.

level can be "Beginner", "Intermediate", "Advanced".

AI endpoint uses OpenAI API key from .env.

All IDs are MongoDB _id.
# eko_yoruba_backend
