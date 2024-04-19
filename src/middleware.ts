// import { authMiddleware } from "@clerk/nextjs";
import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

// export default authMiddleware({
//   publicRoutes: [
//     '/',
//     '/sign-in',
//     '/sign-up',
//     '/api/uploadthing',
//     '/api/webhooks/clerk'
//   ]
// });

const isProtectedRoute = createRouteMatcher([
  '/test(.*)',
  '/upload(.*)',
]);
 
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};