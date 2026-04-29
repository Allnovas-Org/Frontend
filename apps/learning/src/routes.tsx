import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout.tsx";
import { PublicLayout } from "./layout/PublicLayout.tsx";

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
