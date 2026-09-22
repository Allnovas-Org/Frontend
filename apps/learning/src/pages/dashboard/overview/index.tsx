import { WelcomeCard } from "../../../components/dashboard/shared/WelcomeCard";
import { DailyStreakCard } from "../../../components/dashboard/shared/DailyStreakCard";
import { useUserStatus } from "./hooks/useUserStatus";

import { HeroIllustrationCTA } from "./components/inactive/HeroIllustrationCTA";
import { SuggestedLearningPathSection } from "./components/inactive/SuggestedLearningPathSection";
import { RecommendedForYouCard } from "./components/inactive/RecommendedForYouCard";
import { SkillAssessmentPrompt } from "./components/inactive/SkillAssessmentPrompt";

import { BadgeMilestoneRow } from "./components/active/BadgeMilestoneRow";
import { CurrentProjectsSection } from "./components/active/CurrentProjectsSection";
import { RecommendedCoursesSection } from "./components/active/RecommendedCoursesSection";
import { ActivityChart } from "./components/active/ActivityChart";
import { ProgressStatistics } from "./components/active/ProgressStatistics";
import { ChallengeCard } from "./components/active/ChallengeCard";
import { UpcomingEventsList } from "./components/active/UpcomingEventsList";
import { CourseHighlightCard } from "./components/active/CourseHighlightCard";

import {
  suggestedCourses,
  recommendedCourses,
  badges,
  currentProjects,
  weeklyActivity,
  challenges,
  upcomingEvents,
} from "./data/mockData";

export function DashboardOverviewPage() {
  const { status, userName } = useUserStatus();

  if (status === "inactive") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <WelcomeCard
              userName={userName}
              subtitle="Start your tech journey by choosing a learning path tailored for you"
              progress={0}
            />
          </div>
          <DailyStreakCard streakCount={0} filledDays={0} />
        </div>

        <HeroIllustrationCTA />

        <SuggestedLearningPathSection
          title="Suggested learning path"
          courses={suggestedCourses}
        />

        <RecommendedForYouCard
          eyebrow="Based on beginner learners like you"
          badgeLabel="Top pick for beginners"
          title="AI & digital skills path"
          description="The shortest path to becoming relevant in the modern job market. No coding required, just a willingness to learn."
          tags={[
            "AI tools",
            "Prompt engineering",
            "Automation",
            "Digital productivity",
          ]}
          ctaLabel="Start this path"
        />

        <SkillAssessmentPrompt />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <WelcomeCard
            userName={userName}
            subtitle="You're 24% closer to becoming a product designer"
            progress={24}
          />
        </div>
        <DailyStreakCard streakCount={56} filledDays={3} />
      </div>

      <BadgeMilestoneRow badges={badges} />
      <CurrentProjectsSection projects={currentProjects} />
      <RecommendedCoursesSection courses={recommendedCourses} />

      {/* 3-column layout: Activity+Events | ProgressStats+CourseHighlight | Challenges */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <ActivityChart data={weeklyActivity} totalHours={24.9} />
          <UpcomingEventsList events={upcomingEvents} />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-1">
          <ProgressStatistics
            totalActivityPercent={56}
            inProgress={8}
            completed={16}
            upcoming={16}
          />
          <CourseHighlightCard
            groupLabel="Group course"
            levelLabel="Advanced"
            title="Easy way to understand design rules"
            description="Punctuation-learn the basics without the pain. People will never laugh at your punctuation again. You don't require any materials or software."
            participantCount={3}
            courseProgress={87}
          />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-1">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}
