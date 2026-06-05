import { ArticleCategory, Article } from "../../../types";

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  {
    id: "get-started",
    title: "Get Started",
    subtitle: "Learn the basics",
    count: 2,
  },
  {
    id: "freelancing",
    title: "Freelancing",
    subtitle: "Master Freelance",
    count: 3,
  },
  {
    id: "creator",
    title: "Creator",
    subtitle: "Get paid to Create",
    count: 2,
  },
  {
    id: "skill-set",
    title: "Skill Set",
    subtitle: "Improve your Skills",
    count: 2,
  },
  {
    id: "hiring",
    title: "Hiring",
    subtitle: "Hire the Right Person",
    count: 2,
  },
  {
    id: "general",
    title: "General Tips",
    subtitle: "Learn all here",
    count: 2,
  },
];

export const ARTICLES_BY_CATEGORY: Record<string, Article[]> = {
  "get-started": [
    {
      id: "nav",
      title: "Navigating Allnovas",
      readTime: 5,
      author: "AllnovasMedia",
      description:
        "Allnovas is a platform that gives you the chance to make money from your home. Learn how to navigate through the platform and maximize your opportunities.",
      category: "get-started",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-15"),
      sidebarItems: [
        { id: "intro", label: "Intro" },
        { id: "platform-overview", label: "Platform Overview" },
        { id: "creating-profile", label: "Creating Your Profile" },
        { id: "browsing-jobs", label: "Browsing & Applying for Jobs" },
        { id: "managing-projects", label: "Managing Projects" },
        { id: "payments-withdrawals", label: "Payments & Withdrawals" },
      ],
      sections: [
        {
          id: "intro",
          title: "Getting Started with Allnovas",
          content:
            "Welcome to Allnovas, your gateway to freelance success! Whether you're a seasoned freelancer or just starting your journey, our platform offers all the tools you need to grow your career and income. This guide will walk you through every feature to help you get the most out of Allnovas.",
        },
        {
          id: "platform-overview",
          title: "Understanding the Platform Overview",
          content:
            "Allnovas is a comprehensive platform designed to connect freelancers with quality clients from around the world. Our mission is to make freelancing accessible, transparent, and rewarding. The platform features an intuitive dashboard where you can manage all your activities, from job applications to client communications.",
          subsections: [
            {
              title: "Key Features",
              content:
                "• Dashboard: Your personal hub for all activities\n• Job Marketplace: Browse thousands of opportunities\n• Messaging: Direct communication with clients\n• Analytics: Track your performance and earnings\n• Reviews: Build your reputation through client feedback\n• Payment System: Secure and fast withdrawals",
            },
          ],
        },
        {
          id: "creating-profile",
          title: "Creating Your Profile",
          content:
            "Your profile is your digital storefront on Allnovas. It's the first impression potential clients will have of you. A complete and professional profile significantly increases your chances of getting hired.",
          subsections: [
            {
              title: "Profile Setup Steps",
              content:
                "1. Upload a Professional Photo: Use a clear headshot\n2. Write a Compelling Bio: Highlight your expertise and what makes you unique\n3. Add Your Skills: List all relevant skills and expertise areas\n4. Portfolio: Showcase your best work with examples or links\n5. Verification: Complete identity and skill verification for credibility\n6. Pricing: Set your rates based on market research and experience",
            },
            {
              title: "Pro Tips",
              content:
                "• Keep your bio concise but informative\n• Update your skills regularly\n• Add portfolio samples that match your target clients\n• Complete all verification steps early\n• Use professional language throughout",
            },
          ],
        },
        {
          id: "browsing-jobs",
          title: "Browsing & Applying for Jobs",
          content:
            "The job marketplace is where opportunities meet talent. With thousands of jobs posted daily, learning to search and filter effectively is crucial.",
          subsections: [
            {
              title: "How to Find the Right Jobs",
              content:
                "• Use filters: Category, budget, experience level, timeline\n• Read job descriptions carefully: Understand requirements fully\n• Check client ratings: Higher-rated clients typically have better experiences\n• Review expectations: Ensure timeline and deliverables are clear",
            },
            {
              title: "Crafting Winning Proposals",
              content:
                "• Personalize your proposal: Reference specific details from the job post\n• Highlight relevant experience: Show similar projects you've completed\n• Be transparent about timeline: Clearly state when you can deliver\n• Propose competitive rates: Research similar jobs to price appropriately\n• Use professional language: Proofread before submitting",
            },
          ],
        },
        {
          id: "managing-projects",
          title: "Managing Projects Effectively",
          content:
            "Once you've landed a project, effective management is key to client satisfaction and repeat business.",
          subsections: [
            {
              title: "Project Management Best Practices",
              content:
                "• Confirm requirements: Clarify any ambiguities before starting\n• Set milestones: Break large projects into checkpoints\n• Communicate regularly: Keep clients updated on progress\n• Meet deadlines: Always deliver on time or earlier\n• Deliver quality: Double-check all work before submission\n• Be responsive: Answer client messages promptly",
            },
            {
              title: "Using Allnovas Tools",
              content:
                "• Messaging: Use the built-in messaging for all communication\n• File sharing: Upload work safely through the platform\n• Time tracking: Use tools to document hours worked (if applicable)\n• Milestone payments: Work with the milestone system for larger projects",
            },
          ],
        },
        {
          id: "payments-withdrawals",
          title: "Payments & Withdrawals",
          content:
            "Understanding how payments work on Allnovas is essential for managing your earnings effectively.",
          subsections: [
            {
              title: "Payment Process",
              content:
                "• Funds go to escrow: Client payment is held securely\n• Work completion: Submit deliverables through the platform\n• Client release: Once approved, funds are released to you\n• Platform fee: Allnovas takes a reasonable percentage\n• Your balance: Available funds appear in your wallet",
            },
            {
              title: "Withdrawal Options",
              content:
                "• Bank transfer: Direct deposit to your account\n• Digital wallets: PayPal, Wise, and other options\n• Minimum withdrawal: Check current minimum requirements\n• Processing time: Usually 3-5 business days\n• Fees: Some withdrawal methods may have fees",
            },
          ],
        },
      ],
    },
    {
      id: "gig",
      title: "Gig Creation",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner2.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "gig-basics", label: "Gig Basics" },
        { id: "compelling-titles", label: "Crafting Titles" },
        { id: "pricing-tiers", label: "Setting Pricing Tiers" },
        { id: "media-gallery", label: "Media & Portfolio" },
        { id: "gig-seo", label: "Optimizing for Search" },
      ],
      sections: [
        {
          id: "gig-basics",
          title: "Understanding Gig Basics",
          content:
            "A 'Gig' is a service that you offer and sell on Allnovas. It allows you to showcase your talent and provide potential clients with all the information they need to purchase your service instantly. Unlike bidding on jobs, Gigs put the power of the 'storefront' in your hands.",
          subsections: [
            {
              title: "Why Gigs Matter",
              content:
                "• Passive Lead Gen: Clients find you while you sleep.\n• Standardized Workflow: You define the scope, reducing 'scope creep'.\n• Faster Hiring: Clients can buy with one click if your info is clear.",
            },
          ],
        },
        {
          id: "compelling-titles",
          title: "Crafting High-Converting Titles",
          content:
            "Your title is the first thing a client sees. It needs to be punchy, clear, and focused on the value you provide. Avoid being vague; specificity builds trust.",
          subsections: [
            {
              title: "The Perfect Title Formula",
              content:
                "Use the formula: 'I will [Service] + [Benefit/Niche]'. \n\nGood: 'I will design a modern logo for your organic skincare brand.'\nBad: 'I will do some graphic design for you.'",
            },
          ],
        },
        {
          id: "pricing-tiers",
          title: "Setting Your Pricing Tiers",
          content:
            "Allnovas allows you to offer three different packages: Basic, Standard, and Premium. This 'Good-Better-Best' strategy is proven to increase average order value.",
          subsections: [
            {
              title: "Package Breakdown",
              content:
                "• Basic: The 'Entry Level' service for simple tasks.\n• Standard: Your 'Best Seller' that includes the most common requests.\n• Premium: The 'VIP' package with fast delivery, source files, and extra revisions.",
            },
          ],
        },
        {
          id: "media-gallery",
          title: "The Power of Media & Portfolio",
          content:
            "Visual evidence of your skill is the strongest conversion factor. Gigs with high-quality images or videos perform 70% better than text-only listings.",
          subsections: [
            {
              title: "What to Include",
              content:
                "1. Main Image: A bright, professional thumbnail with minimal text.\n2. Work Samples: High-resolution screenshots of previous projects.\n3. Intro Video: A 30-second clip of you explaining how you help clients (optional but highly recommended).",
            },
          ],
        },
        {
          id: "gig-seo",
          title: "Optimizing for Search (Gig SEO)",
          content:
            "To get your Gig on the first page of Allnovas search results, you must optimize your metadata. This ensures that when a client searches for a keyword, your service appears.",
          subsections: [
            {
              title: "SEO Best Practices",
              content:
                "• Keywords: Place your main keyword in the Title and the first sentence of the Description.\n• Tags: Use all 5 available search tags with relevant industry terms.\n• URL: Allnovas generates your URL from your first title—make it count!",
            },
          ],
        },
      ],
    },
    {
      id: "job-posting",
      title: "Job posting and Job application",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner2.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "posting-basics", label: "Posting a Job" },
        { id: "defining-scope", label: "Defining Project Scope" },
        { id: "budgeting", label: "Budget & Timelines" },
        { id: "screening", label: "Screening Talent" },
        { id: "application-tips", label: "Applying for Jobs" },
      ],
      sections: [
        {
          id: "posting-basics",
          title: "The Fundamentals of Posting a Job",
          content:
            "Posting a job on Allnovas is the first step to bringing your project to life. A well-structured job post acts as a filter, attracting serious professionals while deterring unqualified applicants.",
          subsections: [
            {
              title: "What Makes a Good Post?",
              content:
                "• Clarity: Use a descriptive title.\n• Detail: Explain the problem you are solving.\n• Requirements: List specific tools or languages needed (e.g., React, Python, Figma).",
            },
          ],
        },
        {
          id: "defining-scope",
          title: "Defining the Project Scope",
          content:
            "Scope creep is the biggest enemy of freelance projects. By defining exactly what is (and isn't) included in the project, you protect your budget and the freelancer's time.",
          subsections: [
            {
              title: "Deliverables Checklist",
              content:
                "1. Final Files: Specify formats (PDF, .ai, .zip).\n2. Milestones: Break large projects into smaller, payable phases.\n3. Revisions: State how many rounds of changes are included.",
            },
          ],
        },
        {
          id: "budgeting",
          title: "Setting Realistic Budgets & Timelines",
          content:
            "Budgeting correctly ensures you get quality work. On Allnovas, you can choose between Fixed Price (for clear deliverables) or Hourly Rates (for ongoing collaboration).",
          subsections: [
            {
              title: "Market Pricing",
              content:
                "Research similar projects on the platform to ensure your offer is competitive. High-tier talent rarely applies to under-budgeted roles.",
            },
          ],
        },
        {
          id: "screening",
          title: "How to Screen Applicants",
          content:
            "Once the proposals start coming in, you need a system to find the perfect match. Don't just look at the price; look at the proof.",
          subsections: [
            {
              title: "Vetting Steps",
              content:
                "• Check Portfolios: Does their style match your vision?\n• Read Reviews: Look for comments on communication and deadlines.\n• Interview: Use the Allnovas chat to ask a specific technical question.",
            },
          ],
        },
        {
          id: "application-tips",
          title: "Bonus: The Freelancer's Application Flow",
          content:
            "If you are a freelancer reading this, the key to a successful application is personalization. Clients can spot 'copy-paste' proposals instantly.",
          subsections: [
            {
              title: "Winning Proposal Tips",
              content:
                "• The First Sentence: Address the client's specific problem immediately.\n• Relevant Samples: Attach only the 2-3 most relevant pieces of work.\n• Call to Action: End with a suggestion for a brief discovery call.",
            },
          ],
        },
      ],
    },
    {
      id: "offer",
      title: "What Allnova offer",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "marketplace", label: "Global Marketplace" },
        { id: "secure-payments", label: "Secure Transactions" },
        { id: "collaboration", label: "Collaboration Tools" },
        { id: "allnova-pro", label: "Allnova Pro Benefits" },
        { id: "support", label: "24/7 Expert Support" },
      ],
      sections: [
        {
          id: "marketplace",
          title: "A Global Marketplace for Talent",
          content:
            "Allnova connects high-skilled freelancers with forward-thinking businesses across the globe. Our platform spans hundreds of categories, ensuring that whether you're a developer or a digital marketer, there's a space for you.",
          subsections: [
            {
              title: "Diverse Categories",
              content:
                "• Technology & Programming\n• Creative Arts & Design\n• Digital Marketing & SEO\n• Writing & Translation\n• Business Consulting",
            },
          ],
        },
        {
          id: "secure-payments",
          title: "Safe and Secure Transactions",
          content:
            "We take the stress out of payments. Our integrated escrow service ensures that freelancers are paid for their work and clients only release funds when they are 100% satisfied with the delivery.",
          subsections: [
            {
              title: "Financial Peace of Mind",
              content:
                "• Multi-currency support for global trade.\n• Instant withdrawals to local banks and digital wallets.\n• Tax-compliant invoicing generated automatically.",
            },
          ],
        },
        {
          id: "collaboration",
          title: "Advanced Collaboration Tools",
          content:
            "Allnova is more than just a job board; it's a workspace. We provide the infrastructure needed to manage projects from initial brief to final delivery without ever leaving the platform.",
          subsections: [
            {
              title: "In-Platform Features",
              content:
                "1. Real-time Messaging: Secure chat for instant feedback.\n2. Milestone Tracking: Clear progress visualization for complex projects.\n3. File Management: High-speed uploads and organized storage.",
            },
          ],
        },
        {
          id: "allnova-pro",
          title: "Elite Growth with Allnova Pro",
          content:
            "For those looking to scale, Allnova Pro offers verified badges, lower service fees, and priority placement in search results to help top-tier talent stand out.",
          subsections: [
            {
              title: "Pro Advantages",
              content:
                "• Verified Badge: Build instant trust with a vetted profile.\n• Analytics Dashboard: Track your earnings and conversion rates.\n• Dedicated Success Manager: One-on-one guidance for your business.",
            },
          ],
        },
        {
          id: "support",
          title: "24/7 Expert Support",
          content:
            "Whether you have a technical question or need help with a project dispute, our global support team is available around the clock to ensure your experience is seamless.",
          subsections: [
            {
              title: "How to reach us",
              content:
                "• Live Chat: Available in your dashboard.\n• Help Center: Comprehensive guides and FAQs.\n• Dispute Resolution: Fair mediation by human experts.",
            },
          ],
        },
      ],
    },
    {
      id: "first-client",
      title: "How to land your first client on allnova",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner2.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "profile-optimization", label: "Optimizing for Trust" },
        { id: "bidding-strategy", label: "Strategic Bidding" },
        { id: "low-barrier-entry", label: "The Foot-in-the-Door" },
        { id: "communication", label: "The Speed Advantage" },
        { id: "over-delivering", label: "Securing the 5-Star" },
      ],
      sections: [
        {
          id: "profile-optimization",
          title: "Optimizing Your Profile for Instant Trust",
          content:
            "Without previous platform reviews, your profile must work twice as hard. Clients look for 'Social Proof'—if you don't have it on Allnova yet, bring it from elsewhere.",
          subsections: [
            {
              title: "What to do:",
              content:
                "• Link External Portfolios: Show Behance, GitHub, or personal sites.\n• Video Intro: A 30-second video builds more trust than 1,000 words.\n• Specificity: Instead of 'Developer', use 'Shopify Plus Expert for Fashion Brands'.",
            },
          ],
        },
        {
          id: "bidding-strategy",
          title: "Strategic Bidding: Quality over Quantity",
          content:
            "Don't copy-paste. Clients receive dozens of generic bids. To stand out, your proposal must prove you have read their specific requirements.",
          subsections: [
            {
              title: "The Winning Proposal Structure:",
              content:
                "1. The Hook: Mention a specific detail from their job post.\n2. The Solution: Briefly explain *how* you will solve their problem.\n3. The Proof: Attach a single, highly relevant file or link.",
            },
          ],
        },
        {
          id: "low-barrier-entry",
          title: "The Foot-in-the-Door Technique",
          content:
            "Your first goal isn't high profit—it's high ratings. Consider taking a smaller, short-term project to get that first 5-star review on your profile.",
          subsections: [
            {
              title: "Pro-Tip:",
              content:
                "Look for 'Quick Turnaround' jobs. These clients are usually in a hurry and more willing to hire a talented newcomer who can start immediately.",
            },
          ],
        },
        {
          id: "communication",
          title: "The Speed Advantage",
          content:
            "Data shows that the first three freelancers to respond to a job post have an 80% higher chance of being hired. Set up Allnova mobile notifications to stay ahead.",
        },
        {
          id: "over-delivering",
          title: "Securing the 5-Star Review",
          content:
            "Your first review is your most important asset. Over-deliver on your first project by providing a small extra (like an additional revision or a bonus file) to guarantee a glowing testimonial.",
        },
      ],
    },
    {
      id: "post-job",
      title: "Post a job on allnova ",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "choosing-type", label: "Job vs. Gig" },
        { id: "filling-details", label: "The Posting Wizard" },
        { id: "budget-options", label: "Pricing Your Project" },
        { id: "visibility-boost", label: "Featured Posts" },
        { id: "reviewing-bids", label: "Managing Applications" },
      ],
      sections: [
        {
          id: "choosing-type",
          title: "Choosing the Right Project Type",
          content:
            "On Allnova, you can either browse 'Gigs' (pre-packaged services) or 'Post a Job' (custom projects). Choose 'Post a Job' when you have unique requirements that need a tailored solution.",
        },
        {
          id: "filling-details",
          title: "Navigating the Posting Wizard",
          content:
            "Our step-by-step wizard helps you categorize your needs correctly. Ensure you choose the most relevant category to notify the right freelancers.",
          subsections: [
            {
              title: "Essential Fields:",
              content:
                "• Clear Title: e.g., 'React Developer for Fintech Dashboard'.\n• Skills Tags: Select up to 5 tags to improve matching accuracy.\n• Description: Be explicit about the 'Definition of Done'.",
            },
          ],
        },
        {
          id: "budget-options",
          title: "Pricing Your Project",
          content:
            "You can choose between a 'Fixed Price' (best for one-off tasks) or 'Hourly' (best for ongoing support). Allnova provides market ranges to help you stay competitive.",
        },
        {
          id: "visibility-boost",
          title: "Boosting Your Job Visibility",
          content:
            "If you need talent urgently, you can select the 'Featured Job' option. This pins your post to the top of the search results and sends it directly to our 'Pro' verified freelancers.",
        },
        {
          id: "reviewing-bids",
          title: "Managing Applications",
          content:
            "As soon as your job is live, proposals will arrive in your 'Hiring' dashboard. You can 'Shortlist' interesting candidates, 'Decline' others, and start a 'Chat' to interview potential hires.",
          subsections: [
            {
              title: "Safe Hiring:",
              content:
                "Always keep communications and payments within Allnova to remain protected by our Escrow and Dispute Resolution services.",
            },
          ],
        },
      ],
    },
    {
      id: "visibility",
      title: "Increasing your visibility",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "algorithm", label: "The Allnova Algorithm" },
        { id: "keywords", label: "Keyword Optimization" },
        { id: "responsiveness", label: "The Speed Factor" },
        { id: "reviews", label: "Leveraging Feedback" },
      ],
      sections: [
        {
          id: "algorithm",
          title: "Understanding the Search Algorithm",
          content:
            "Allnova uses a dynamic ranking system to show the most relevant freelancers to clients. Your visibility score is determined by activity, completion rates, and historical performance.",
          subsections: [
            {
              title: "Core Ranking Factors",
              content:
                "• Profile Completeness: 100% complete profiles rank higher.\n• Success Rate: Consistently delivering work on time.\n• Activity: Frequent logins and profile updates signal reliability.",
            },
          ],
        },
        {
          id: "keywords",
          title: "Keyword & Tag Optimization",
          content:
            "To be found, you must speak the same language as your clients. Identify the specific terms clients use when searching for your services.",
          subsections: [
            {
              title: "Strategic Placement",
              content:
                "1. Gig Titles: Use high-volume keywords early in the title.\n2. Search Tags: Use all 5 available tags with a mix of broad and niche terms.\n3. Descriptions: Naturally weave keywords into the first 100 words of your bio.",
            },
          ],
        },
        {
          id: "responsiveness",
          title: "The Speed Factor",
          content:
            "Allnova tracks your average response time. Freelancers who respond to inquiries within 1-2 hours are prioritized in search results because they provide a better client experience.",
        },
      ],
    },
    {
      id: "pro",
      title: "Allnova Pro",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner2.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "what-is-pro", label: "What is Allnova Pro?" },
        { id: "pro-benefits", label: "Exclusive Benefits" },
        { id: "vetting", label: "The Vetting Process" },
        { id: "maintaining", label: "Maintaining Pro Status" },
      ],
      sections: [
        {
          id: "what-is-pro",
          title: "Defining Allnova Pro",
          content:
            "Allnova Pro is a curated marketplace of top-tier, manually vetted freelancers. It bridges the gap between high-end corporate clients and world-class independent talent.",
        },
        {
          id: "pro-benefits",
          title: "Benefits of Going Pro",
          content:
            "Being a Pro member is more than just a badge; it's a complete business upgrade designed to increase your conversion rate and project value.",
          subsections: [
            {
              title: "Key Perks",
              content:
                "• The Pro Badge: A trust signal that allows for premium pricing.\n• Reduced Fees: Pro members benefit from lower platform service charges.\n• Priority Support: 24/7 dedicated success manager access.",
            },
          ],
        },
        {
          id: "vetting",
          title: "The Application & Vetting Process",
          content:
            "Our team reviews your external professional background, portfolio quality, and current platform performance. Only the top 1% of applicants are admitted to the Pro program.",
        },
      ],
    },
    {
      id: "winning-profile",
      title: "How to Create a Winning Freelance Profile on AllNova",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "profile-photo", label: "The Perfect Photo" },
        { id: "bio-structure", label: "Writing a Killer Bio" },
        { id: "portfolio", label: "Showcasing Your Work" },
        { id: "skills-certs", label: "Skills & Certifications" },
      ],
      sections: [
        {
          id: "profile-photo",
          title: "The Power of First Impressions",
          content:
            "Clients decide to click on your profile based on your photo. Use a high-resolution, professional headshot with a neutral background.",
        },
        {
          id: "bio-structure",
          title: "Crafting a Client-Centric Bio",
          content:
            "Don't just list what you do; explain how you solve the client's problems. A winning bio is 20% about you and 80% about the value you provide to the client.",
          subsections: [
            {
              title: "The Bio Formula",
              content:
                "1. The Hook: Identify a common pain point.\n2. The Solution: Explain your unique approach.\n3. The Call to Action: Direct the client to message you or view your gigs.",
            },
          ],
        },
        {
          id: "portfolio",
          title: "Building a High-Impact Portfolio",
          content:
            "Quality over quantity. Include 3-5 case studies that show the 'Before' and 'After' of your work. Use high-quality imagery and explain the results achieved for previous clients.",
        },
      ],
    },
    {
      id: "expectations",
      title: "Your First 7 Days on AllNova: What to Expect",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "day-1-3", label: "Days 1-3: Setup" },
        { id: "day-4-5", label: "Days 4-5: Engagement" },
        { id: "day-6-7", label: "Days 6-7: Analysis" },
        { id: "mindset", label: "The Growth Mindset" },
      ],
      sections: [
        {
          id: "day-1-3",
          title: "Days 1-3: Foundation and Setup",
          content:
            "The first three days are about identity. This is when you complete your profile, verify your identity, and set up your payment methods. A fully verified profile is 4x more likely to receive an inquiry.",
        },
        {
          id: "day-4-5",
          title: "Days 4-5: Active Engagement",
          content:
            "Start browsing the marketplace. Don't just apply to everything; pick 3 jobs that match your top skills perfectly. Focus on crafting personalized proposals that address the client's specific problem.",
        },
        {
          id: "day-6-7",
          title: "Days 6-7: Review and Iterate",
          content:
            "Check your dashboard analytics. Are people viewing your profile but not messaging you? If so, it's time to tweak your bio or your portfolio images.",
          subsections: [
            {
              title: "The 7-Day Checklist",
              content:
                "• Profile 100% complete\n• First 5 custom proposals sent\n• Portfolio updated with at least 3 items\n• Mobile app installed for instant notifications",
            },
          ],
        },
      ],
    },
    {
      id: "escrow-system",
      title: "How Our Escrow System Protects Freelancers and Clients",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "escrow-definition", label: "What is Escrow?" },
        { id: "how-it-works", label: "Step-by-Step Flow" },
        { id: "dispute-resolution", label: "Handling Disputes" },
      ],
      sections: [
        {
          id: "escrow-definition",
          title: "Understanding Escrow",
          content:
            "Escrow is a legal arrangement in which a third party (AllNova) holds a large sum of money or property until a particular condition has been met (the delivery of work). It eliminates the risk of 'non-payment' for freelancers and 'non-delivery' for clients.",
        },
        {
          id: "how-it-works",
          title: "The Payment Lifecycle",
          content:
            "When a project starts, the client funds the milestone. The money is held securely by AllNova. Once the freelancer submits the work and the client approves it, the funds are instantly released to the freelancer's wallet.",
          subsections: [
            {
              title: "Benefits for Freelancers",
              content:
                "• Guaranteed Payment: You know the money is there before you start.\n• Fairness: Payment is based on objective milestones.",
            },
          ],
        },
        {
          id: "dispute-resolution",
          title: "Fair Dispute Resolution",
          content:
            "If a client is unhappy with the work or a freelancer cannot finish a project, our mediation team steps in. We review the original project scope and communication logs to ensure a fair refund or payment split.",
        },
      ],
    },
    {
      id: "hiring-process",
      title: "Understanding How Hiring Works on AllNova",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Learn how to create high converting gigs that attract the right clients. Discover best practices for presenting your services.",
      category: "get-started",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-20"),
      sidebarItems: [
        { id: "funnel-stages", label: "The Hiring Funnel" },
        { id: "interviews", label: "The Interview Stage" },
        { id: "contracts", label: "Signing the Contract" },
      ],
      sections: [
        {
          id: "funnel-stages",
          title: "The Stages of the Funnel",
          content:
            "Hiring on AllNova isn't just about clicking a button. It involves a funnel: Job Posting -> Applications -> Shortlisting -> Interviewing -> Hiring.",
        },
        {
          id: "interviews",
          title: "The Interview & Chat Phase",
          content:
            "Once shortlisted, you will enter a private chat with the client. This is where you clarify technical requirements, agree on a timeline, and ensure there is a good cultural fit.",
          subsections: [
            {
              title: "Pro-Tip for Clients",
              content:
                "Ask for a small paid trial if you are hiring for a long-term position. It’s the best way to test real-world performance.",
            },
          ],
        },
        {
          id: "contracts",
          title: "Official Offers and Contracts",
          content:
            "The hiring process is only complete when an 'Offer' is sent by the client and 'Accepted' by the freelancer. This creates a binding agreement on the platform and activates the Escrow protection.",
        },
      ],
    },
  ],
  freelancing: [
    {
      id: "writing-freelance-post",
      title: "How to Write a Freelance Job Post That Attracts the Best Talent",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "Attract top-tier professionals by learning how to write clear, compelling, and technical job descriptions.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-10"),
      sidebarItems: [
        { id: "compelling-title", label: "Crafting the Title" },
        { id: "defining-scope", label: "Defining Project Scope" },
        { id: "technical-specs", label: "Technical Requirements" },
        { id: "budget-transparency", label: "Budget Transparency" },
      ],
      sections: [
        {
          id: "compelling-title",
          title: "Crafting the Perfect Title",
          content:
            "Your job title is the first thing a freelancer sees. A vague title like 'Need a Developer' will be ignored by top talent. You need to be specific about the technology and the goal.",
          subsections: [
            {
              title: "Title Checklist",
              content:
                "• Include the primary skill (e.g., Python, Figma, Copywriting)\n• Mention the project type (e.g., Bug fix, Migration, New Build)\n• Mention the industry if relevant (e.g., E-commerce, Fintech)",
            },
          ],
        },
        {
          id: "defining-scope",
          title: "Defining the Project Scope",
          content:
            "Detailed descriptions attract detailed people. If you provide a clear roadmap, the freelancer can give you an accurate quote, preventing 'Scope Creep' later.",
          subsections: [
            {
              title: "What to Include",
              content:
                "1. Objective: What is the end goal?\n2. Deliverables: What exactly will be handed over?\n3. Exclusions: What is NOT part of this project?",
            },
          ],
        },
        {
          id: "technical-specs",
          title: "Listing Technical Requirements",
          content:
            "Be explicit about the tools or frameworks required. This ensures the applicants have the exact expertise needed to complete your task without a steep learning curve.",
        },
        {
          id: "budget-transparency",
          title: "The Role of Budget Transparency",
          content:
            "Quality work has a price. By being transparent about your budget range, you filter for freelancers who can realistically deliver within your constraints, saving time for both parties.",
        },
      ],
    },
    {
      id: "choosing-freelancer",
      title: "How to Choose the Right Freelancer for Your Project",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "Don't just hire the lowest bidder. Learn how to vet portfolios, read between the lines of reviews, and conduct effective interviews.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-10"),
      sidebarItems: [
        { id: "vetting-portfolio", label: "Vetting Portfolios" },
        { id: "reading-reviews", label: "Analyzing Reviews" },
        { id: "interview-strategy", label: "Interview Strategy" },
        { id: "trial-projects", label: "The Power of Trials" },
      ],
      sections: [
        {
          id: "vetting-portfolio",
          title: "Vetting Portfolios Like a Pro",
          content:
            "Look for quality over quantity. A strong portfolio should show projects that solve problems similar to yours. Don't just look at the visuals; ask about the process behind them.",
        },
        {
          id: "reading-reviews",
          title: "Analyzing Client Reviews",
          content:
            "Look for patterns in reviews. Does the freelancer communicate well? Do they meet deadlines? One bad review in fifty is normal, but a pattern of lateness is a red flag.",
          subsections: [
            {
              title: "Red Flags to Watch For",
              content:
                "• Lack of communication for several days\n• Multiple revisions required for simple tasks\n• Inability to follow brand guidelines",
            },
          ],
        },
        {
          id: "interview-strategy",
          title: "Conducting the Interview",
          content:
            "Use the Allnovas chat tool to ask specific technical questions. This gauges how the freelancer thinks and how quickly they understand your requirements.",
        },
      ],
    },
    {
      id: "verified-freelancers",
      title: "Why Verified Freelancers Deliver Better Work",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "Learn about the Allnova Verification process and why hiring verified talent reduces project risk.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-10"),
      sidebarItems: [
        { id: "trust-badge", label: "The Trust Badge" },
        { id: "lower-risk", label: "Lowering Project Risk" },
        { id: "standards", label: "Professional Standards" },
      ],
      sections: [
        {
          id: "trust-badge",
          title: "The Power of the Verified Badge",
          content:
            "When you see a verified badge, it means Allnovas has manually checked the identity and skill level of that freelancer. It’s an instant mark of quality and trust.",
        },
        {
          id: "lower-risk",
          title: "How Verification Lowers Your Risk",
          content:
            "Verified freelancers are less likely to abandon projects because they have a reputation and a vetted status to protect. It provides a safer environment for high-budget projects.",
        },
      ],
    },
    {
      id: "managing-freelancers",
      title: "Managing Freelancers: Communication and Collaboration Tips",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Maximize productivity by mastering remote management and collaboration tools.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-12"),
      sidebarItems: [
        { id: "comm-channels", label: "Communication Channels" },
        { id: "feedback", label: "Constructive Feedback" },
        { id: "milestones", label: "Managing Milestones" },
      ],
      sections: [
        {
          id: "comm-channels",
          title: "Establishing Clear Communication",
          content:
            "Set expectations on day one. How often do you want updates? What tools will you use for file sharing? Clear communication prevents project delays.",
        },
        {
          id: "feedback",
          title: "Giving Constructive Feedback",
          content:
            "Be specific when giving feedback. Instead of saying 'I don't like this,' say 'The font is too small to read on mobile.' Specificity helps the freelancer fix issues faster.",
        },
        {
          id: "milestones",
          title: "The Importance of Milestones",
          content:
            "Break large projects into smaller chunks. This keeps the freelancer motivated and allows you to review the work incrementally rather than waiting for one big reveal.",
        },
      ],
    },
    {
      id: "escrow-payments",
      title: "How Escrow and Milestone Payments Work for Clients",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Learn how the escrow process secures your funds and how to set up milestones to ensure project success and freelancer motivation.",
      category: "freelancing",
      image: "/images/art-banner2.png",
      publishedDate: new Date("2024-01-12"),
      sidebarItems: [
        { id: "escrow-flow", label: "The Escrow Flow" },
        { id: "defining-milestones", label: "Defining Milestones" },
        { id: "releasing-funds", label: "Releasing Payments" },
        { id: "protection", label: "Client Protection" },
      ],
      sections: [
        {
          id: "escrow-flow",
          title: "The Secure Escrow Flow",
          content:
            "Escrow acts as a neutral vault. When you hire a freelancer, you deposit the project funds into Escrow. Allnova holds these funds until the work is delivered and approved.",
          subsections: [
            {
              title: "Step-by-Step Security",
              content:
                "1. Deposit: Client funds the milestone.\n2. Work: Freelancer starts with financial peace of mind.\n3. Review: Client receives and inspects the work.\n4. Release: Client triggers the payment once satisfied.",
            },
          ],
        },
        {
          id: "defining-milestones",
          title: "Defining Effective Milestones",
          content:
            "For large projects, avoid one giant payment. Break the work into logical phases (milestones) to maintain momentum and minimize risk.",
          subsections: [
            {
              title: "Example Milestone Structure",
              content:
                "• Milestone 1: Wireframes and Design Concept (30%)\n• Milestone 2: Initial Development/Alpha Build (40%)\n• Milestone 3: Final Testing and Handover (30%)",
            },
          ],
        },
        {
          id: "releasing-funds",
          title: "When to Release Payments",
          content:
            "Only release funds when the specific deliverables for that milestone are met. Once released, funds cannot be reclaimed through the platform, so ensure you have performed a thorough review.",
        },
      ],
    },
  ],
  creator: [
    {
      id: "content-creation",
      title: "Content Creation Essentials",
      readTime: 8,
      author: "AllnovasMedia",
      description:
        "Get started with content creation and build your audience. Learn the fundamentals of creating engaging content across different platforms.",
      category: "creator",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-08"),
      sidebarItems: [
        { id: "finding-niche", label: "Finding Your Niche" },
        { id: "platform-strategy", label: "Platform Strategy" },
        { id: "content-pillars", label: "Content Pillars" },
        { id: "workflow-tools", label: "Workflow & Tools" },
      ],
      sections: [
        {
          id: "finding-niche",
          title: "Identifying Your Creative Niche",
          content:
            "The most successful creators don't try to appeal to everyone. They find the intersection of what they love, what they are good at, and what a specific audience is willing to pay for.",
          subsections: [
            {
              title: "The Niche Audit",
              content:
                "• Skills: What can you produce faster/better than others?\n• Passion: What can you talk about for 30 minutes without preparation?\n• Demand: Are there active communities or businesses buying this type of content?",
            },
          ],
        },
        {
          id: "platform-strategy",
          title: "Choosing the Right Platforms",
          content:
            "Not all platforms are created equal. Your content format (Video, Text, or Audio) should dictate where you focus your primary energy.",
        },
        {
          id: "content-pillars",
          title: "Establishing Your Content Pillars",
          content:
            "To maintain consistency, define 3-4 'pillars' or recurring themes for your work. This helps your audience know what to expect and simplifies your creative process.",
          subsections: [
            {
              title: "Example Pillars for a Graphic Designer",
              content:
                "1. Educational (Logo design tutorials)\n2. Inspirational (Daily design challenges)\n3. BTS (Behind-the-scenes of client projects)\n4. Industry News (Critiques of major brand re-designs)",
            },
          ],
        },
        {
          id: "workflow-tools",
          title: "Tools for the Modern Creator",
          content:
            "Efficiency is key to scaling. Invest in tools that automate the tedious parts of creation—like scheduling, basic editing, and project management.",
        },
      ],
    },
  ],
  "skill-set": [
    {
      id: "skill-development",
      title: "Continuous Skill Development",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Stay relevant in your field by continuously learning and upgrading your skills. Discover resources and strategies for professional growth.",
      category: "skill-set",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-14"),
      sidebarItems: [
        { id: "skill-gap", label: "Identifying Skill Gaps" },
        { id: "learning-frameworks", label: "The 70-20-10 Rule" },
        { id: "emerging-tech", label: "Adapting to AI & Tech" },
        { id: "soft-skills", label: "High-Value Soft Skills" },
      ],
      sections: [
        {
          id: "skill-gap",
          title: "Identifying Your Skill Gaps",
          content:
            "To stay relevant, you must first identify where your current knowledge ends. Look at the job descriptions of projects you *wanted* to apply for but didn't have the technical requirements for.",
          subsections: [
            {
              title: "Self-Assessment Tips",
              content:
                "• Audit your toolkit: Are you using industry-standard software?\n• Feedback loop: Ask past clients if there were any technical areas where they felt your service could expand.\n• Peer Benchmarking: Look at 'Pro' profiles on Allnovas in your niche.",
            },
          ],
        },
        {
          id: "learning-frameworks",
          title: "The 70-20-10 Learning Model",
          content:
            "Effective development isn't just about watching videos. True mastery comes from a balanced approach to learning.",
          subsections: [
            {
              title: "Applying the Model",
              content:
                "• 70% Experiential: Learning through tough projects and trial-and-error.\n• 20% Social: Mentorship, peer reviews, and community discussions.\n• 10% Formal: Structured courses, books, and certifications.",
            },
          ],
        },
        {
          id: "emerging-tech",
          title: "Adapting to AI and Emerging Tech",
          content:
            "Don't fight automation; leverage it. Learn how AI tools can speed up your workflow (e.g., AI for coding, writing, or image generation) so you can focus on high-level strategy.",
        },
        {
          id: "soft-skills",
          title: "Developing High-Value Soft Skills",
          content:
            "Technical skills get you the job, but soft skills get you rehired. Focus on mastering communication, time management, and remote collaboration.",
        },
      ],
    },
    {
      id: "certifications",
      title: "Valuable Certifications",
      readTime: 5,
      author: "AllnovasMedia",
      description:
        "Explore relevant certifications that can boost your credibility and earning potential. Learn which certifications matter in your industry.",
      category: "skill-set",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-19"),
      sidebarItems: [
        { id: "why-certify", label: "The Value of Proof" },
        { id: "top-certs", label: "Industry-Specific Certs" },
        { id: "displaying-certs", label: "Maximizing Impact" },
      ],
      sections: [
        {
          id: "why-certify",
          title: "Why Certifications Matter",
          content:
            "Certifications act as a 'Trust Signal.' For a client who doesn't know you, a badge from Google, AWS, or HubSpot proves that you have met a global standard of competence.",
        },
        {
          id: "top-certs",
          title: "Top Certifications by Niche",
          content:
            "Not all certificates are equal. Focus on those issued by the creators of the tools you use most.",
          subsections: [
            {
              title: "High-ROI Certifications",
              content:
                "• Developers: AWS Certified Developer, Google Cloud Architect.\n• Marketers: Google Ads Search, HubSpot Content Marketing.\n• Project Managers: PMP, Scrum Master (CSM).\n• Designers: Adobe Certified Professional, UX Design by Google.",
            },
          ],
        },
        {
          id: "displaying-certs",
          title: "Maximizing Your Badge's Impact",
          content:
            "Don't just bury your certificates at the bottom of your profile. Mention them in your Gig descriptions and use the certification's specific terminology in your tags to improve SEO.",
        },
      ],
    },
  ],
  hiring: [
    {
      id: "hiring-guide",
      title: "Hiring the Right Talent",
      readTime: 8,
      author: "AllnovasMedia",
      description:
        "Learn how to identify top-tier freelancers. Discover interview techniques and evaluation criteria that go beyond the resume.",
      category: "hiring",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-11"),
      sidebarItems: [
        { id: "defining-needs", label: "Defining Your Needs" },
        { id: "vetting-process", label: "The Vetting Process" },
        { id: "interview-tech", label: "Interview Techniques" },
        { id: "cultural-fit", label: "Assessing Soft Skills" },
      ],
      sections: [
        {
          id: "defining-needs",
          title: "Defining Your Talent Needs",
          content:
            "Before you post, you must decide if you need a specialist or a generalist. A specialist solves a specific problem fast; a generalist helps with a variety of smaller tasks.",
        },
        {
          id: "vetting-process",
          title: "The Allnovas Vetting Process",
          content:
            "Don't just look at the star rating. Dive into the 'Review History' to see if the freelancer has handled projects of a similar scale to yours.",
          subsections: [
            {
              title: "Portfolio Red Flags",
              content:
                "• Stock images used as work samples.\n• Lack of recent projects (over 6 months inactive).\n• Portfolios that don't match the skills listed on the profile.",
            },
          ],
        },
        {
          id: "interview-tech",
          title: "Effective Interview Techniques",
          content:
            "Use 'Behavioral Questions' to understand how they work under pressure. Ask: 'Tell me about a time a project's requirements changed midway—how did you handle it?'",
        },
      ],
    },
    {
      id: "project-management",
      title: "Managing Hired Talent",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "Ensure successful outcomes through effective remote management. Learn best practices for collaboration and milestone tracking.",
      category: "hiring",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-17"),
      sidebarItems: [
        { id: "onboarding", label: "Effective Onboarding" },
        { id: "tracking-progress", label: "Tracking Milestones" },
        { id: "feedback-loops", label: "Constructive Feedback" },
      ],
      sections: [
        {
          id: "onboarding",
          title: "The First 24 Hours: Onboarding",
          content:
            "Success starts with a clear kickoff. Provide your freelancer with brand guidelines, access to necessary tools, and a clear point of contact.",
        },
        {
          id: "tracking-progress",
          title: "Milestones vs. Micromanagement",
          content:
            "Trust your freelancer but verify progress. Use the Allnovas Milestone system to release payments only when specific, pre-agreed phases are completed.",
          subsections: [
            {
              title: "Management Best Practices",
              content:
                "• Set clear deadlines for every deliverable.\n• Schedule a weekly 15-minute sync for long-term projects.\n• Use a centralized document for all change requests.",
            },
          ],
        },
      ],
    },
    {
      id: "writing-freelance-post",
      title: "How to Write a Freelance Job Post That Attracts the Best Talent",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "High-quality freelancers are selective. Learn how to write a job post that stands out and clearly communicates your project goals.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-10"),
      sidebarItems: [
        { id: "title-hook", label: "The Title Hook" },
        { id: "project-details", label: "Project Details" },
        { id: "selection-criteria", label: "Defining Selection Criteria" },
      ],
      sections: [
        {
          id: "title-hook",
          title: "The Art of the Job Title",
          content:
            "Top freelancers search by keyword. Your title should include the tech stack and the specific deliverable.",
          subsections: [
            {
              title: "Examples",
              content:
                "• Weak: 'Need a writer'\n• Strong: 'B2B Tech Copywriter for SaaS Landing Page (5-Day Turnaround)'",
            },
          ],
        },
        {
          id: "project-details",
          title: "Providing Context and Clarity",
          content:
            "Describe the 'Why' behind the project. Freelancers are more motivated when they understand the impact of their work.",
        },
      ],
    },
    {
      id: "choosing-freelancer",
      title: "How to Choose the Right Freelancer for Your Project",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "Move past the price tag. Learn how to evaluate proposals, test skills, and select a freelancer who aligns with your business goals.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-10"),
      sidebarItems: [
        { id: "evaluating-proposals", label: "Evaluating Proposals" },
        { id: "skill-testing", label: "Skill Testing" },
        { id: "final-selection", label: "The Final Selection" },
      ],
      sections: [
        {
          id: "evaluating-proposals",
          title: "Reading Between the Lines of Proposals",
          content:
            "Avoid 'Copy-Paste' applicants. Look for freelancers who ask clarifying questions in their initial proposal; this shows they are already thinking about your solution.",
        },
        {
          id: "skill-testing",
          title: "The Power of a Paid Trial",
          content:
            "Before committing to a $2,000 project, offer a $50-100 paid trial. This reveals their communication style, speed, and actual skill level under a real deadline.",
        },
      ],
    },
    {
      id: "verified-freelancers",
      title: "Why Verified Freelancers Deliver Better Work",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "Discover the AllNova verification standard. Learn how vetted professionals reduce project risk and ensure higher quality outcomes.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-10"),
      sidebarItems: [
        { id: "vetted-standard", label: "The Verification Standard" },
        { id: "reliability-gap", label: "The Reliability Gap" },
        { id: "quality-assurance", label: "Quality Assurance" },
        { id: "lower-risk", label: "Mitigating Project Risk" },
      ],
      sections: [
        {
          id: "vetted-standard",
          title: "The AllNova Verification Standard",
          content:
            "Hiring a verified freelancer means choosing talent that has passed our rigorous multi-step screening process. We don't just check IDs; we evaluate professional history and technical competence.",
          subsections: [
            {
              title: "What We Verify",
              content:
                "• Identity & Background: Government-issued ID and professional history.\n• Skill Proficiency: Documented expertise in claimed categories.\n• Communication Standards: Ability to collaborate effectively in professional environments.",
            },
          ],
        },
        {
          id: "lower-risk",
          title: "Mitigating Project Risk",
          content:
            "Verified freelancers have a 'verified' badge on their profiles. This status is hard to earn and easy to lose, creating a strong incentive for consistent, high-quality performance and adherence to deadlines.",
        },
      ],
    },
    {
      id: "managing-freelancers",
      title: "Managing Freelancers: Communication and Collaboration Tips",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Master the art of remote team management. Learn the frameworks and tools needed to keep your projects on track and your talent motivated.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-12"),
      sidebarItems: [
        { id: "onboarding", label: "Effective Onboarding" },
        { id: "comm-cadence", label: "Communication Cadence" },
        { id: "collaboration-tools", label: "Collaboration Tools" },
        { id: "feedback-loops", label: "Healthy Feedback Loops" },
      ],
      sections: [
        {
          id: "onboarding",
          title: "Setting the Stage with Onboarding",
          content:
            "A successful project starts with a clear kickoff. Ensure your freelancer has everything they need on day one to prevent delays.",
          subsections: [
            {
              title: "Onboarding Checklist",
              content:
                "1. Brand Guidelines: Visual and tone-of-voice documentation.\n2. Access Credentials: Tools, staging environments, or asset folders.\n3. Communication Policy: Primary channel and expected response times.",
            },
          ],
        },
        {
          id: "comm-cadence",
          title: "Establishing a Communication Cadence",
          content:
            "Avoid micromanaging by setting up a predictable schedule for updates. This respects the freelancer's 'deep work' time while keeping you informed.",
        },
      ],
    },
    {
      id: "escrow-payments",
      title: "How Escrow and Milestone Payments Work for Clients",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Secure your investment. Understand how AllNova's payment system protects your funds and ensures you only pay for work you approve.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-12"),
      sidebarItems: [
        { id: "escrow-concept", label: "The Escrow Concept" },
        { id: "milestone-funding", label: "Funding Milestones" },
        { id: "approval-process", label: "Review & Approval" },
        { id: "dispute-safety", label: "Safety & Disputes" },
      ],
      sections: [
        {
          id: "escrow-concept",
          title: "Securing Your Budget with Escrow",
          content:
            "Escrow is a neutral holding area for project funds. It protects clients by ensuring the money isn't released until work is delivered, and protects freelancers by proving the client has the budget available.",
        },

        {
          id: "milestone-funding",
          title: "The Power of Milestone Payments",
          content:
            "Break large projects into smaller, manageable chunks. This reduces risk and provides the freelancer with regular motivation.",
          subsections: [
            {
              title: "Example Milestone Setup",
              content:
                "• Phase 1: Research & Discovery (20%)\n• Phase 2: First Draft / Prototype (40%)\n• Phase 3: Final Delivery & Revisions (40%)",
            },
          ],
        },
      ],
    },
    {
      id: "building-relationships",
      title: "How to Build Long-Term Relationships with Freelancers on AllNova",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Stop rehiring and start scaling. Learn how to turn one-off projects into a reliable on-demand workforce for your business.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-12"),
      sidebarItems: [
        { id: "partnership-mindset", label: "Partnership Mindset" },
        { id: "clear-briefs", label: "Investing in Briefs" },
        { id: "fair-treatment", label: "Fairness and Loyalty" },
        { id: "retaining-talent", label: "Retention Strategies" },
      ],
      sections: [
        {
          id: "partnership-mindset",
          title: "Treating Freelancers as Partners",
          content:
            "The best freelancers choose their clients as much as clients choose them. Treat your talent as an extension of your team to foster loyalty and high-quality output.",
        },
        {
          id: "fair-treatment",
          title: "Building Loyalty Through Fairness",
          content:
            "Respecting a freelancer's expertise and boundaries leads to a smoother working relationship. Satisfied freelancers often go the extra mile for 'anchor' clients.",
          subsections: [
            {
              title: "Retention Tips",
              content:
                "• Prompt Approval: Release milestones quickly when work is satisfactory.\n• Clear Feedback: Be specific about what works and what doesn't.\n• Referral & Reviews: Leave honest, positive feedback to help their business grow.",
            },
          ],
        },
      ],
    },
  ],
  general: [
    {
      id: "writing-freelance-post",
      title: "How to Write a Freelance Job Post That Attracts the Best Talent",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "High-quality freelancers are selective. Learn how to write a job description that clearly communicates your needs and attracts top-tier applicants.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-10"),
      sidebarItems: [
        { id: "title-optimization", label: "Optimizing Your Title" },
        { id: "defining-scope", label: "Defining the Scope" },
        { id: "setting-budget", label: "Setting Budget Expectations" },
        { id: "selection-criteria", label: "Clarity on Criteria" },
      ],
      sections: [
        {
          id: "title-optimization",
          title: "The Power of a Clear Job Title",
          content:
            "Top freelancers search by specific keywords. Instead of 'Need a Designer,' use 'Senior UI/UX Designer for Fintech Dashboard Migration.' A specific title filters out unqualified applicants immediately.",
        },
        {
          id: "defining-scope",
          title: "Providing a Detailed Project Scope",
          content:
            "Ambiguity is the enemy of a good proposal. If a freelancer doesn't understand what success looks like, they won't apply. Break your project down into specific tasks.",
          subsections: [
            {
              title: "What to Include",
              content:
                "• Clear objectives: What problem are you solving?\n• Deliverables: What exactly do you expect to receive?\n• Timeline: When is the final deadline and are there milestones?",
            },
          ],
        },
        {
          id: "setting-budget",
          title: "Transparency in Budgeting",
          content:
            "While you might have a fixed budget, providing a range attracts professionals who work at different price points. Being transparent prevents time-wasting for both parties.",
        },
      ],
    },
    {
      id: "choosing-freelancer",
      title: "How to Choose the Right Freelancer for Your Project",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "Beyond the price tag: learn how to evaluate portfolios, read between the lines of reviews, and conduct effective interviews.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-10"),
      sidebarItems: [
        { id: "portfolio-review", label: "Evaluating Portfolios" },
        { id: "review-analysis", label: "Analyzing Feedback" },
        { id: "interviewing", label: "The Interview Stage" },
        { id: "trial-projects", label: "The Value of Trials" },
      ],
      sections: [
        {
          id: "portfolio-review",
          title: "Look for Relevancy, Not Just Quality",
          content:
            "A freelancer might be a great artist, but if they haven't worked in your specific niche, the learning curve might be steep. Look for projects in their portfolio that solve problems similar to yours.",
        },
        {
          id: "review-analysis",
          title: "Reading Between the Lines of Reviews",
          content:
            "A 5-star rating is good, but the written feedback tells the real story. Look for mentions of 'communication,' 'deadlines,' and 'problem-solving.'",
        },
        {
          id: "trial-projects",
          title: "Starting with a Paid Trial",
          content:
            "If you are unsure between two candidates, offer a small, paid test project. It is the most effective way to see how they handle real instructions and deadlines.",
        },
      ],
    },
    {
      id: "verified-freelancers",
      title: "Why Verified Freelancers Deliver Better Work",
      readTime: 6,
      author: "AllnovasMedia",
      description:
        "Learn about the AllNova verification process and why hiring vetted talent significantly reduces project risk.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-10"),
      sidebarItems: [
        { id: "verification-process", label: "The Vetting Process" },
        { id: "reliability", label: "Increased Reliability" },
        { id: "quality-benchmarks", label: "Quality Benchmarks" },
      ],
      sections: [
        {
          id: "verification-process",
          title: "What Does 'Verified' Mean?",
          content:
            "Every verified freelancer on AllNova has undergone a manual review of their identity, professional background, and skill proficiency. This badge is an indicator of professional intent.",
        },
        {
          id: "reliability",
          title: "Risk Mitigation for Clients",
          content:
            "Verified freelancers are statistically more likely to meet deadlines and maintain high communication standards. They have a reputation on the platform that they are incentivized to protect.",
        },
      ],
    },
    {
      id: "managing-freelancers",
      title: "Managing Freelancers: Communication and Collaboration Tips",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Successful projects rely on management. Learn the communication frameworks that keep remote freelancers productive and aligned.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-12"),
      sidebarItems: [
        { id: "onboarding", label: "Effective Onboarding" },
        { id: "comm-cadence", label: "Communication Cadence" },
        { id: "feedback-loops", label: "Constructive Feedback" },
      ],
      sections: [
        {
          id: "onboarding",
          title: "The Power of a Good Kickoff",
          content:
            "Don't just send a task and disappear. Provide a project brief, access to necessary assets, and a clear explanation of your brand's voice or technical standards.",
        },
        {
          id: "comm-cadence",
          title: "Establishing a Communication Routine",
          content:
            "Decide early on how often you need updates. Whether it is a daily check-in or a weekly milestone review, consistency prevents project drift.",
          subsections: [
            {
              title: "Management Best Practices",
              content:
                "• Use the AllNova chat for official record-keeping.\n• Set clear response time expectations.\n• Acknowledge receipt of work promptly.",
            },
          ],
        },
      ],
    },
    {
      id: "escrow-payments",
      title: "How Escrow and Milestone Payments Work for Clients",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Understand the financial safety net that protects your budget. Learn how to set up and release milestone payments securely.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-12"),
      sidebarItems: [
        { id: "escrow-basics", label: "Escrow Basics" },
        { id: "setting-milestones", label: "Setting Up Milestones" },
        { id: "releasing-funds", label: "Releasing Funds" },
      ],
      sections: [
        {
          id: "escrow-basics",
          title: "Your Financial Protection",
          content:
            "Escrow ensures that your money is held securely by AllNova and is only released to the freelancer once you have approved the work. This eliminates the risk of paying for unfinished projects.",
        },
        {
          id: "setting-milestones",
          title: "Structuring Milestone Payments",
          content:
            "For large projects, break payments into phases. This keeps the freelancer motivated and allows you to review progress at every step.",
          subsections: [
            {
              title: "Example Structure",
              content:
                "1. Deposit: Initial kickoff (20%)\n2. Milestone 1: First Draft/Prototype (40%)\n3. Milestone 2: Final Delivery & Revisions (40%)",
            },
          ],
        },
      ],
    },
    {
      id: "building-relationships",
      title: "How to Build Long-Term Relationships with Freelancers on AllNova",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Stop the cycle of constant rehiring. Learn how to turn one-off projects into a reliable, on-demand workforce for your business.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-12"),
      sidebarItems: [
        { id: "partnership-mindset", label: "Partnership Mindset" },
        { id: "communication-standards", label: "Communication Standards" },
        { id: "fairness-loyalty", label: "Fairness and Loyalty" },
        { id: "retention-strategies", label: "Retention Strategies" },
      ],
      sections: [
        {
          id: "partnership-mindset",
          title: "Adopting a Partnership Mindset",
          content:
            "The most talented freelancers choose their clients carefully. To build a long-term bond, move away from a 'transactional' approach and treat the freelancer as an extension of your internal team.",
        },
        {
          id: "communication-standards",
          title: "Clear and Respectful Communication",
          content:
            "Consistency is key. When freelancers know exactly how and when they will receive feedback, they can plan their workflows more efficiently, leading to better results for you.",
          subsections: [
            {
              title: "Communication Best Practices",
              content:
                "• Respond to queries within 24 hours.\n• Use screen-recordings (like Loom) for complex feedback.\n• Avoid 'emergency' requests on weekends unless previously agreed.",
            },
          ],
        },
        {
          id: "fairness-loyalty",
          title: "Building Loyalty Through Fairness",
          content:
            "Prompt payments and occasional bonuses for exceptional work go a long way. If a freelancer feels financially respected, they will prioritize your projects over others when you're in a rush.",
        },
      ],
    },
    {
      id: "success-stories",
      title: "Success Stories",
      readTime: 5,
      author: "AllnovasMedia",
      description:
        "Get inspired by real freelancers and clients who have scaled their businesses and careers using the Allnovas ecosystem.",
      category: "general",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-13"),
      sidebarItems: [
        { id: "freelancer-spotlight", label: "Freelancer Spotlight" },
        { id: "agency-growth", label: "Agency Growth" },
        { id: "client-efficiency", label: "Client Efficiency" },
      ],
      sections: [
        {
          id: "freelancer-spotlight",
          title: "From Side-Hustle to Full-Time",
          content:
            "Meet Sarah, a graphic designer who replaced her corporate income in just 8 months on Allnovas by specializing in presentation design for startups.",
        },
        {
          id: "agency-growth",
          title: "Scaling to an Agency",
          content:
            "Learn how Marcus used Allnovas to find sub-contractors, eventually evolving from a solo developer into a full-service web agency managing 10+ projects simultaneously.",
        },
      ],
    },
    {
      id: "platform-updates",
      title: "Platform Updates & Features",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Stay informed about the latest tools, UI improvements, and security features rolled out to enhance your Allnovas experience.",
      category: "general",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-21"),
      sidebarItems: [
        { id: "new-dashboard", label: "Dashboard Redesign" },
        { id: "ai-integration", label: "AI Writing Assistant" },
        { id: "security-upgrades", label: "Enhanced Security" },
      ],
      sections: [
        {
          id: "new-dashboard",
          title: "A Faster, Leaner Dashboard",
          content:
            "We've optimized the project management dashboard to load 40% faster. You can now filter active milestones and chat history with a single click.",
        },
        {
          id: "ai-integration",
          title: "AI-Powered Gig Descriptions",
          content:
            "Our new AI assistant helps freelancers draft compelling Gig descriptions by analyzing high-performing listings in their specific niche.",
        },
      ],
    },
    {
      id: "building-relationships",
      title: "How to Build Long-Term Relationships with Freelancers on AllNova",
      readTime: 7,
      author: "AllnovasMedia",
      description:
        "Learn how to turn one-off projects into a reliable on-demand workforce. Discover strategies for retaining top talent and fostering loyalty.",
      category: "freelancing",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-12"),
      sidebarItems: [
        { id: "partnership-mindset", label: "Partnership Mindset" },
        { id: "communication-standards", label: "Communication Standards" },
        { id: "fairness-loyalty", label: "Fairness and Loyalty" },
        { id: "retention-strategies", label: "Retention Strategies" },
      ],
      sections: [
        {
          id: "partnership-mindset",
          title: "Adopting a Partnership Mindset",
          content:
            "The most talented freelancers choose their clients carefully. To build a long-term bond, move away from a 'transactional' approach and treat the freelancer as an extension of your internal team.",
        },
        {
          id: "communication-standards",
          title: "Clear and Respectful Communication",
          content:
            "Consistency is key. When freelancers know exactly how and when they will receive feedback, they can plan their workflows more efficiently.",
          subsections: [
            {
              title: "Communication Best Practices",
              content:
                "• Respond to queries within 24 hours.\n• Use screen-recordings for complex feedback.\n• Avoid 'emergency' requests on weekends unless previously agreed.",
            },
          ],
        },
        {
          id: "fairness-loyalty",
          title: "Building Loyalty Through Fairness",
          content:
            "Prompt payments and occasional bonuses for exceptional work go a long way. Respecting a freelancer's expertise builds a mutual sense of investment in your business goals.",
        },
      ],
    },
    {
      id: "success-stories",
      title: "Success Stories",
      readTime: 5,
      author: "AllnovasMedia",
      description:
        "Get inspired by real freelancers and clients who have scaled their businesses and careers using the Allnovas ecosystem.",
      category: "general",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-13"),
      sidebarItems: [
        { id: "freelancer-spotlight", label: "Freelancer Spotlight" },
        { id: "agency-growth", label: "Agency Growth" },
        { id: "client-efficiency", label: "Client Efficiency" },
      ],
      sections: [
        {
          id: "freelancer-spotlight",
          title: "From Side-Hustle to Full-Time",
          content:
            "Meet Sarah, a graphic designer who replaced her corporate income in just 8 months on Allnovas by specializing in presentation design for startups.",
        },
        {
          id: "agency-growth",
          title: "Scaling to an Agency",
          content:
            "Learn how Marcus used Allnovas to find sub-contractors, eventually evolving from a solo developer into a full-service web agency managing 10+ projects.",
        },
        {
          id: "client-efficiency",
          title: "The Solopreneur's Advantage",
          content:
            "How an e-commerce founder used the Allnovas talent pool to automate 80% of their content creation and customer support, doubling revenue in six months.",
        },
      ],
    },
    {
      id: "platform-updates",
      title: "Platform Updates & Features",
      readTime: 4,
      author: "AllnovasMedia",
      description:
        "Stay informed about the latest tools, UI improvements, and security features rolled out to enhance your Allnovas experience.",
      category: "general",
      image: "/images/art-banner1.png",
      publishedDate: new Date("2024-01-21"),
      sidebarItems: [
        { id: "new-dashboard", label: "Dashboard Redesign" },
        { id: "ai-integration", label: "AI Writing Assistant" },
        { id: "security-upgrades", label: "Enhanced Security" },
      ],
      sections: [
        {
          id: "new-dashboard",
          title: "A Faster, Leaner Dashboard",
          content:
            "We've optimized the project management dashboard to load 40% faster. You can now filter active milestones and chat history with a single click.",
        },

        {
          id: "ai-integration",
          title: "AI-Powered Gig Descriptions",
          content:
            "Our new AI assistant helps freelancers draft compelling Gig descriptions by analyzing high-performing listings in their specific niche.",
        },
        {
          id: "security-upgrades",
          title: "Two-Factor Authentication (2FA)",
          content:
            "To further protect your earnings and personal data, we have introduced mandatory 2FA for all withdrawal requests and sensitive account changes.",
        },
      ],
    },
  ],
};

export const ALL_ARTICLES = Object.values(ARTICLES_BY_CATEGORY).flat();
