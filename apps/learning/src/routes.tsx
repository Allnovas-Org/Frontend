import { createBrowserRouter, Navigate } from 'react-router-dom'
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
          Component: (await import('./pages/dashboard/overview/index.tsx'))
            .DashboardOverviewPage,
        }),
      },
      {
        path: 'career-map',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/career-map/index.tsx'))
            .CareerMapPage,
        }),
      },
      {
        path: 'course',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/course/index.tsx'))
            .CoursePage,
        }),
      },
      {
        path: 'bookmark',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/bookmark/index.tsx'))
            .BookmarkPage,
        }),
      },
      {
        path: 'community',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/community/CommunityLayout.tsx'))
            .CommunityLayout,
        }),
        children: [
          { index: true, element: <Navigate to="feed" replace /> },
          {
            path: 'feed',
            lazy: async () => ({
              Component: (await import('./pages/dashboard/community/feed/index.tsx'))
                .CommunityFeedPage,
            }),
          },
          {
            path: 'trending',
            lazy: async () => ({
              Component: (await import('./pages/dashboard/community/trending/index.tsx'))
                .CommunityTrendingPage,
            }),
          },
          {
            path: 'opportunities',
            lazy: async () => ({
              Component: (await import('./pages/dashboard/community/opportunities/index.tsx'))
                .CommunityOpportunitiesPage,
            }),
          },
          {
            path: 'showcase',
            lazy: async () => ({
              Component: (await import('./pages/dashboard/community/showcase/index.tsx'))
                .CommunityShowcasePage,
            }),
          },
          {
            path: 'saved',
            lazy: async () => ({
              Component: (await import('./pages/dashboard/community/saved/index.tsx'))
                .CommunitySavedPage,
            }),
          },
          {
            path: 'events',
            lazy: async () => ({
              Component: (await import('./pages/dashboard/community/events/index.tsx'))
                .CommunityEventsPage,
            }),
          },
          {
            path: 'mentorship',
            lazy: async () => ({
              Component: (await import('./pages/dashboard/community/mentorship/index.tsx'))
                .CommunityMentorshipPage,
            }),
          },
        ],
      },
      {
        path: 'internship',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/internship/index.tsx'))
            .InternshipPage,
        }),
      },
      {
        path: 'earning',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/earning/index.tsx'))
            .EarningPage,
        }),
      },
      {
        path: 'message',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/message/index.tsx'))
            .MessagePage,
        }),
      },
      {
        path: 'profile',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/profile/index.tsx'))
            .ProfilePage,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/settings/index.tsx'))
            .SettingsPage,
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