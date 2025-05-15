# 🎉 Shared Albums with Face Classification by AI

## Description

This is a **Progressive Web App (PWA)** designed for groups of friends to **upload, share, and automatically classify photos by AI** using facial AI recognition (AWS Rekognition). Users can organize event photos and download them in a personalized way.

---

## 🛠️ Technologies Used

- **Frontend**: [Next.js 15](https://nextjs.org/) + PWA, hosted on Vercel
- **Backend**: [Fastify](https://www.fastify.io/) + [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: Google OAuth + JWT
- **Image Storage**: [AWS S3](https://aws.amazon.com/s3/)
- **Facial AI Recognition**: [AWS Rekognition](https://aws.amazon.com/rekognition/)
- **Payment Gateways**:
  - Mercado Pago (Argentina)
  - PayPal (International)
- **Internationalization**: [next-i18next](https://github.com/isaachinman/next-i18next)

---

## 🚀 Key Features

1. **Sign Up and Login**:

   - Sign in with Google, generate a JWT token for authentication.

2. **Album Creation**:

   - Create albums with a unique ID and invitation link.

3. **Invitation**:

   - Share albums via a link (WhatsApp, Telegram, etc.).

4. **Photo Upload**:

   - Users can upload photos to an album. Images are stored in AWS S3.

5. **Automatic Face Classification**:

   - AWS Rekognition classifies and groups photos by face using AI, making it easy to browse personal, group, and landscape images.

6. **Browsing and Filtering**:

   - Users can filter photos by categories: personal, group, landscape.

7. **Custom Download**:
   - Users can download only the photos they appear in, or the entire album.

---

## 💰 Monetization

- **Free Plan**:

  - 1 album per user.
  - Up to 15 members per album.
  - Includes photo processing (AWS Rekognition + S3).

- **Paid Plan**:
  - From the **second album** or **more than 15 members**: **$10 USD per album or equivalent**.
  - Unlocks unlimited processing and no member limits.
  - Unlocks unlimited albums.

---

## 🌍 Internationalization

- Supports **Spanish** and **English**.
- Detects browser language or allows the user to choose a preferred language.

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (`.env`):

   - Google OAuth credentials
   - AWS credentials (S3, Rekognition)
   - Database and other configurations

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📝 Contributions

If you want to contribute to the project, please **fork** the repository and submit your **pull requests**.

---

## 📬 Contact

- For more information, questions, or suggestions, contact the development team at [joniwaibs@gmail.com](mailto:joniwaibs@gmail.com).
