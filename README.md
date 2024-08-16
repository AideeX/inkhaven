# Inkhaven

Inkhaven is a multi-functional platform designed for lovers of the written word, targeting both writers and readers. Built with the Next.js App Router, Inkhaven provides a seamless experience for content creation, discovery, and interaction, with a focus on simplicity and performance.

### Features
- Content Creation: Write and edit posts using the powerful Toast UI Editor, with support for Markdown and HTML.
- User Authentication: Secure authentication and authorization using Firebase Authentication.
- Data Management: Store and manage user-generated content with Firebase Firestore.
- Real-time Updates: Enjoy real-time updates and seamless interactions with Firebase's real-time database capabilities.
- Responsive Design: Styled with Tailwind CSS for a responsive, mobile-first design that adapts to all screen sizes.
- TypeScript: Leverage the power of TypeScript for static typing and improved developer experience.
- Analytics Dashboard: Track the performance of your content with detailed analytics (in development).
- Dark Mode Support: Switch between light and dark themes for an optimal reading and writing experience.


### Getting Started
#### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v16 or above)
- pnpm (preferred package manager)

#### Installation
Clone the repository:
``` 
git clone https://github.com/AideeX/inkhaven.git
cd inkhaven
```
- Install dependencies:
` pnpm install`

- Create a .env.local file in the root of the project and add your Firebase credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

- Run the development server:
`pnpm run dev`

- Open http://localhost:3000 to view it in your browser.

#### Building for Production
To create a production build, run:
`pnpm run build`

Then, start the server:
`pnpm start`

#### Deployment

Inkhaven can be easily deployed to platforms like Vercel, Firebase Hosting, or any other hosting service that supports Next.js.

#### Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

#### License

This project is licensed under the MIT License.

