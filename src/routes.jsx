import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { PostFeedPage } from "./pages/PostFeedPage";
import { SinglePostPage } from "./pages/SinglePostPage";
import { WritePage } from "./pages/WritePage";
import { MyDraftsPage } from "./pages/MyDraftsPage";
import { MyPostsPage } from "./pages/MyPostsPage";
import { MyProfilePage } from "./pages/MyProfilePage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { TagPostsPage } from "./pages/TagPostsPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Root } from "./layouts/Root";

/**
 * Route Configuration
 * 
 * Defines all application routes using React Router v6 Data API
 * Structure:
 * - / (Root layout with navbar)
 *   - All child routes inherit the layout
 *   - Protected routes are handled within individual pages
 */

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      // Public routes
      { index: true, Component: LandingPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "feed", Component: PostFeedPage },
      { path: "post/:id", Component: SinglePostPage },
      { path: "search", Component: SearchPage },
      { path: "tag/:tagName", Component: TagPostsPage },
      { path: "author/:userId", Component: UserProfilePage },
      
      // Protected routes (auth check happens within components)
      { path: "write", Component: WritePage },
      { path: "write/:postId", Component: WritePage },
      { path: "me/drafts", Component: MyDraftsPage },
      { path: "me/posts", Component: MyPostsPage },
      { path: "me/profile", Component: MyProfilePage },
      { path: "me/settings", Component: EditProfilePage },
      { path: "notifications", Component: NotificationsPage },
      
      // 404 catch-all
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
