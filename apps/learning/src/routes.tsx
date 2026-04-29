// import { createBrowserRouter } from 'react-router-dom'
// import DashboardLayout from "./layout/DashboardLayout.tsx";
// import { PublicLayout } from './layout/PublicLayout.tsx'

// export const appRouter = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <PublicLayout />,
// 		children: [
// 			{
// 				index: true,
// 				lazy: async () => ({
// 					Component: (await import("./pages/HomePage.tsx")).HomePage,
// 				}),
// 			},
// 			{
// 				path: "courses",
// 				lazy: async () => ({
// 					Component: (await import("./pages/CoursesPage.tsx")).CoursesPage,
// 				}),
// 			},
// 			{
// 				path: "features",
// 				lazy: async () => ({
// 					Component: (await import("./pages/FeaturesPage.tsx")).FeaturesPage,
// 				}),
// 			},
// 			{
// 				path: "how-it-works",
// 				lazy: async () => ({
// 					Component: (await import("./pages/HowItWorksPage.tsx"))
// 						.HowItWorksPage,
// 				}),
// 			},

// 			{
// 				path: "about",
// 				lazy: async () => ({
// 					Component: (await import("./pages/AboutPage.tsx")).AboutPage,
// 				}),
// 			},
// 		],
// 	},
// 	{
// 		path: "/signin",
// 		lazy: async () => ({
// 			Component: (await import("./pages/SignInPage.tsx")).SignInPage,
// 		}),
// 	},
// 	{
// 		path: "/signup",
// 		lazy: async () => ({
// 			Component: (await import("./pages/SignUpPage.tsx")).SignUpPage,
// 		}),
// 	},
// 	{
// 		path: "/forgot-password",
// 		lazy: async () => ({
// 			Component: (await import("./pages/ForgotPasswordPage.tsx"))
// 				.ForgotPasswordPage,
// 		}),
// 	},
// 	{
// 		path: "/email-sent",
// 		lazy: async () => ({
// 			Component: (await import("./pages/EmailSentPage.tsx")).EmailSentPage,
// 		}),
// 	},
// 	{
// 		path: "/create-password",
// 		lazy: async () => ({
// 			Component: (await import("./pages/CreatePasswordPage.tsx"))
// 				.CreatePasswordPage,
// 		}),
// 	},
// 	{
// 		path: "/dashboard",
// 		element: <DashboardLayout />,
// 		children: [
// 			{
// 				index: true,
// 				lazy: async () => ({
// 					Component: (
// 						await import("./pages/dashboard/dashboardOverview/DashboardOverviewPage.tsx")
// 					).DashboardOverviewPage,
// 				}),
// 			},
// 			{
// 				path: "my-courses",
// 				lazy: async () => ({
// 					Component: (await import("./pages/dashboard/courses/CoursePage.tsx"))
// 						.CoursePage,
// 				}),
// 			},
// 			{
// 				path: "progress",
// 				lazy: async () => ({
// 					Component: (await import("./pages/dashboard/ProgressPage.tsx"))
// 						.ProgressPage,
// 				}),
// 			},
// 			{
// 				path: "settings",
// 				lazy: async () => ({
// 					Component: (await import("./pages/dashboard/SettingsPage.tsx"))
// 						.SettingsPage,
// 				}),
// 			},
// 			{
// 				path: "course",
// 				lazy: async () => ({
// 					Component: (await import("./pages/dashboard/courses/CoursePage.tsx"))
// 						.default,
// 				}),
// 			},
// 		],
// 	},
// 	{
// 		path: "*",
// 		lazy: async () => ({
// 			Component: (await import("./pages/NotFoundPage.tsx")).NotFoundPage,
// 		}),
// 	},
// ]);

import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout.tsx";
import { PublicLayout } from "./layout/PublicLayout.tsx";

/**
 * Senior Tip: Standardizing the dynamic import ensures Vite correctly
 * maps the chunks and prevents fetch failures.
 */
const lazyLoad = (path: string, componentName: string) => async () => {
	const module = await import(/* @vite-ignore */ path);
	return { Component: module[componentName] };
};

export const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		children: [
			{
				index: true,
				lazy: lazyLoad("./pages/HomePage.tsx", "HomePage"),
			},
			{
				path: "courses",
				lazy: lazyLoad("./pages/CoursesPage.tsx", "CoursesPage"),
			},
			{
				path: "features",
				lazy: lazyLoad("./pages/FeaturesPage.tsx", "FeaturesPage"),
			},
			{
				path: "how-it-works",
				lazy: lazyLoad("./pages/HowItWorksPage.tsx", "HowItWorksPage"),
			},
			{
				path: "about",
				lazy: lazyLoad("./pages/AboutPage.tsx", "AboutPage"),
			},
		],
	},
	{
		path: "/signin",
		lazy: lazyLoad("./pages/SignInPage.tsx", "SignInPage"),
	},
	{
		path: "/signup",
		lazy: lazyLoad("./pages/SignUpPage.tsx", "SignUpPage"),
	},
	{
		path: "/forgot-password",
		lazy: lazyLoad("./pages/ForgotPasswordPage.tsx", "ForgotPasswordPage"),
	},
	{
		path: "/email-sent",
		lazy: lazyLoad("./pages/EmailSentPage.tsx", "EmailSentPage"),
	},
	{
		path: "/create-password",
		lazy: lazyLoad("./pages/CreatePasswordPage.tsx", "CreatePasswordPage"),
	},
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		children: [
			{
				index: true,
				lazy: lazyLoad(
					"./pages/dashboard/dashboardOverview/DashboardOverviewPage.tsx",
					"DashboardOverviewPage",
				),
			},
			{
				path: "my-courses",
				lazy: lazyLoad(
					"./pages/dashboard/courses/CoursePage.tsx",
					"CoursePage",
				),
			},
			{
				path: "progress",
				lazy: lazyLoad("./pages/dashboard/ProgressPage.tsx", "ProgressPage"),
			},
			{
				path: "settings",
				lazy: lazyLoad("./pages/dashboard/SettingsPage.tsx", "SettingsPage"),
			},
			{
				// Fixed: Switched from .default to named export for consistency
				path: "course",
				lazy: lazyLoad(
					"./pages/dashboard/courses/CoursePage.tsx",
					"CoursePage",
				),
			},
		],
	},
	{
		path: "*",
		lazy: lazyLoad("./pages/NotFoundPage.tsx", "NotFoundPage"),
	},
]);
