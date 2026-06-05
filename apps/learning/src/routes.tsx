import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from './layout/DashboardLayout.tsx'
import { PublicLayout } from './layout/PublicLayout.tsx'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/HomePage.tsx')).HomePage,
        }),
      },
      {
        path: 'courses',
        lazy: async () => ({
          Component: (await import('./pages/CoursesPage.tsx')).CoursesPage,
        }),
      },
      {
        path: 'features',
        lazy: async () => ({
          Component: (await import('./pages/FeaturesPage.tsx')).FeaturesPage,
        }),
      },
      {
        path: 'how-it-works',
        lazy: async () => ({
          Component: (await import('./pages/HowItWorksPage.tsx')).HowItWorksPage,
        }),
      },
      
      {
        path: 'about',
        lazy: async () => ({
          Component: (await import('./pages/AboutPage.tsx')).AboutPage,
        }),
      },
    ],
  },
  {
    path: '/signin',
    lazy: async () => ({
      Component: (await import('./pages/SignInPage.tsx')).SignInPage,
    }),
  },
  {
    path: '/signup',
    lazy: async () => ({
      Component: (await import('./pages/SignUpPage.tsx')).SignUpPage,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/ForgotPasswordPage.tsx')).ForgotPasswordPage,
    }),
  },
  {
    path: '/email-sent',
    lazy: async () => ({
      Component: (await import('./pages/EmailSentPage.tsx')).EmailSentPage,
    }),
  },
  {
    path: '/create-password',
    lazy: async () => ({
      Component: (await import('./pages/CreatePasswordPage.tsx')).CreatePasswordPage,
    }),
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component:
            (await import('./pages/dashboard/DashboardOverviewPage.tsx'))
              .DashboardOverviewPage,
        }),
      },
      {
        path: 'my-courses',
        lazy: async () => ({
          Component:
            (await import('./pages/dashboard/MyCoursesPage.tsx')).MyCoursesPage,
        }),
      },
      {
        path: 'progress',
        lazy: async () => ({
          Component:
            (await import('./pages/dashboard/ProgressPage.tsx')).ProgressPage,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component:
            (await import('./pages/dashboard/SettingsPage.tsx')).SettingsPage,
        }),
      },
    ],
  },
  {
    path: '*',
    lazy: async () => ({
      Component: (await import('./pages/NotFoundPage.tsx')).NotFoundPage,
    }),
  },
])
