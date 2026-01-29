import { RouterProvider } from 'react-router';
import { router } from './routes';

/**
 * Main App Component
 * 
 * Root component that renders the React Router
 * All routes and layouts are defined in routes.jsx
 */
export default function App() {
  return <RouterProvider router={router} />;
}
