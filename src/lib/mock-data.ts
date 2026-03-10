import type { Roadmap, ProjectSuggestion, InterviewQuestion } from './types';

// ============ MOCK ROADMAP DATA ============

export function generateMockRoadmap(targetRole: string, totalWeeks: number): Roadmap {
  const roadmapData: Record<string, () => Roadmap> = {
    'Data Analyst': () => generateDataAnalystRoadmap(totalWeeks),
    'Full Stack Developer': () => generateFullStackRoadmap(totalWeeks),
    'AI/ML Engineer': () => generateMLEngineerRoadmap(totalWeeks),
    'Cloud/DevOps': () => generateDevOpsRoadmap(totalWeeks),
  };

  const generator = roadmapData[targetRole] || (() => generateFullStackRoadmap(totalWeeks));
  return generator();
}

function generateDataAnalystRoadmap(totalWeeks: number): Roadmap {
  return {
    careerPath: 'Data Analyst',
    totalWeeks,
    skillGaps: ['SQL', 'Python', 'Power BI', 'Statistics', 'Excel Advanced', 'Tableau'],
    weeks: [
      {
        week: 1, theme: 'Excel & Data Fundamentals',
        topics: ['Advanced Excel formulas', 'Pivot tables & charts', 'Data cleaning techniques', 'VLOOKUP & INDEX-MATCH'],
        resources: [
          { title: 'Excel for Data Analysis - Full Course', url: 'https://youtube.com', type: 'video', duration: '4hr' },
          { title: 'Data Cleaning Best Practices', url: 'https://towardsdatascience.com', type: 'article', duration: '30min' },
        ],
        project: { title: 'Sales Dashboard in Excel', description: 'Build an interactive sales dashboard using pivot tables, charts, and slicers to analyze regional sales performance.', skills: ['Excel', 'Data Visualization'], difficulty: 'beginner', estimatedHours: 6 },
        hours: 10, milestone: 'Can work with Excel professionally',
      },
      {
        week: 2, theme: 'SQL Fundamentals',
        topics: ['SELECT, WHERE, ORDER BY', 'JOINs (INNER, LEFT, RIGHT)', 'GROUP BY & aggregations', 'Subqueries'],
        resources: [
          { title: 'SQL Tutorial - Full Database Course', url: 'https://youtube.com', type: 'video', duration: '4hr' },
          { title: 'SQLZoo Interactive Exercises', url: 'https://sqlzoo.net', type: 'course', duration: '3hr' },
        ],
        project: { title: 'Employee Database Queries', description: 'Write 20+ SQL queries to extract insights from an employee database including salary analysis, department stats, and hiring trends.', skills: ['SQL'], difficulty: 'beginner', estimatedHours: 5 },
        hours: 10, milestone: 'Can write intermediate SQL queries',
      },
      {
        week: 3, theme: 'Advanced SQL & Database Design',
        topics: ['Window functions', 'CTEs & temp tables', 'Database normalization', 'Performance optimization'],
        resources: [
          { title: 'Advanced SQL for Analytics', url: 'https://youtube.com', type: 'video', duration: '3hr' },
          { title: 'Window Functions Explained', url: 'https://mode.com', type: 'article', duration: '45min' },
        ],
        project: { title: 'E-commerce Analytics Dashboard', description: 'Build complex SQL queries for an e-commerce database including cohort analysis, funnel metrics, and revenue forecasting.', skills: ['SQL', 'Analytics'], difficulty: 'intermediate', estimatedHours: 8 },
        hours: 12, milestone: 'Can handle complex SQL analytics',
      },
      {
        week: 4, theme: 'Python for Data Analysis',
        topics: ['Python basics & data types', 'Pandas fundamentals', 'NumPy arrays', 'Reading CSV/JSON/Excel files'],
        resources: [
          { title: 'Python for Data Analysis - Pandas', url: 'https://youtube.com', type: 'video', duration: '5hr' },
          { title: 'Pandas Documentation', url: 'https://pandas.pydata.org', type: 'documentation', duration: '2hr' },
        ],
        project: { title: 'COVID-19 Data Analysis', description: 'Analyze global COVID-19 data using Pandas — clean data, compute rolling averages, compare countries, and generate insights.', skills: ['Python', 'Pandas'], difficulty: 'beginner', estimatedHours: 7 },
        hours: 12, milestone: 'Can manipulate data with Pandas',
      },
      {
        week: 5, theme: 'Data Visualization with Python',
        topics: ['Matplotlib basics', 'Seaborn statistical plots', 'Plotly interactive charts', 'Choosing the right chart type'],
        resources: [
          { title: 'Data Visualization in Python', url: 'https://youtube.com', type: 'video', duration: '3hr' },
          { title: 'Seaborn Gallery', url: 'https://seaborn.pydata.org', type: 'documentation', duration: '1hr' },
        ],
        project: { title: 'Stock Market Visualization', description: 'Create an interactive stock market dashboard with candlestick charts, moving averages, and volume analysis using Plotly.', skills: ['Python', 'Matplotlib', 'Plotly'], difficulty: 'intermediate', estimatedHours: 8 },
        hours: 10, milestone: 'Can create professional visualizations',
      },
      {
        week: 6, theme: 'Statistics for Data Analysis',
        topics: ['Descriptive statistics', 'Probability distributions', 'Hypothesis testing', 'Correlation & regression'],
        resources: [
          { title: 'Statistics Fundamentals', url: 'https://youtube.com', type: 'video', duration: '4hr' },
          { title: 'Khan Academy Statistics', url: 'https://khanacademy.org', type: 'course', duration: '5hr' },
        ],
        project: { title: 'A/B Test Analysis', description: 'Analyze results of a website A/B test — compute significance, confidence intervals, and make data-driven recommendations.', skills: ['Statistics', 'Python'], difficulty: 'intermediate', estimatedHours: 6 },
        hours: 10, milestone: 'Can apply statistics to real problems',
      },
      {
        week: 7, theme: 'Power BI Fundamentals',
        topics: ['Power BI Desktop setup', 'Data modeling & relationships', 'DAX formulas', 'Creating dashboards'],
        resources: [
          { title: 'Power BI Full Course', url: 'https://youtube.com', type: 'video', duration: '6hr' },
          { title: 'Microsoft Learn - Power BI', url: 'https://learn.microsoft.com', type: 'course', duration: '4hr' },
        ],
        project: { title: 'HR Analytics Dashboard', description: 'Build a comprehensive HR dashboard in Power BI showing attrition analysis, salary distributions, and department performance.', skills: ['Power BI', 'DAX', 'Data Modeling'], difficulty: 'intermediate', estimatedHours: 10 },
        hours: 12, milestone: 'Can build Power BI dashboards',
      },
      {
        week: 8, theme: 'Tableau & Advanced Visualization',
        topics: ['Tableau basics', 'Calculated fields', 'Dashboard actions', 'Storytelling with data'],
        resources: [
          { title: 'Tableau Tutorial for Beginners', url: 'https://youtube.com', type: 'video', duration: '4hr' },
          { title: 'Tableau Public Gallery', url: 'https://public.tableau.com', type: 'documentation', duration: '1hr' },
        ],
        project: { title: 'Global Superstore Analysis', description: 'Create a Tableau story analyzing the Global Superstore dataset with drill-down capabilities, map views, and KPI tracking.', skills: ['Tableau', 'Storytelling'], difficulty: 'intermediate', estimatedHours: 8 },
        hours: 10, milestone: 'Can create Tableau visualizations',
      },
      {
        week: 9, theme: 'Data Cleaning & ETL',
        topics: ['Handling missing data', 'Data transformation', 'Regular expressions', 'ETL pipelines with Python'],
        resources: [
          { title: 'Data Cleaning with Python', url: 'https://youtube.com', type: 'video', duration: '3hr' },
          { title: 'OpenRefine Tutorial', url: 'https://openrefine.org', type: 'tool', duration: '2hr' },
        ],
        project: { title: 'Messy Dataset Cleanup Pipeline', description: 'Build an automated Python pipeline to clean a messy real-world dataset — handle duplicates, missing values, outliers, and format issues.', skills: ['Python', 'Pandas', 'ETL'], difficulty: 'intermediate', estimatedHours: 8 },
        hours: 10, milestone: 'Can handle messy real-world data',
      },
      {
        week: 10, theme: 'Portfolio Projects & Case Studies',
        topics: ['End-to-end analysis projects', 'Business case studies', 'Presentation skills', 'GitHub portfolio setup'],
        resources: [
          { title: 'Data Analysis Portfolio Guide', url: 'https://youtube.com', type: 'video', duration: '2hr' },
          { title: 'Kaggle Competitions', url: 'https://kaggle.com', type: 'course', duration: '5hr' },
        ],
        project: { title: 'Retail Analytics Capstone', description: 'Complete end-to-end retail analytics project: data collection, cleaning, analysis, visualization, and business recommendations deck.', skills: ['SQL', 'Python', 'Power BI', 'Statistics'], difficulty: 'advanced', estimatedHours: 15 },
        hours: 14, milestone: 'Have a portfolio-worthy project',
      },
      {
        week: 11, theme: 'Resume Building & Job Prep',
        topics: ['ATS-friendly resume writing', 'LinkedIn optimization', 'Data analyst job market', 'Networking strategies'],
        resources: [
          { title: 'Data Analyst Resume Guide', url: 'https://youtube.com', type: 'video', duration: '1hr' },
          { title: 'Resume Templates', url: 'https://novoresume.com', type: 'tool', duration: '2hr' },
        ],
        project: { title: 'Professional Portfolio Website', description: 'Build a personal portfolio website showcasing your data analysis projects with embedded Tableau dashboards and GitHub links.', skills: ['Communication', 'Personal Brand'], difficulty: 'beginner', estimatedHours: 5 },
        hours: 8, milestone: 'Resume and LinkedIn ready',
      },
      {
        week: 12, theme: 'Interview Preparation',
        topics: ['Common DA interview questions', 'SQL coding interviews', 'Case study interviews', 'Behavioral questions (STAR method)'],
        resources: [
          { title: 'Top 50 DA Interview Questions', url: 'https://youtube.com', type: 'video', duration: '2hr' },
          { title: 'StrataScratch SQL Practice', url: 'https://stratascratch.com', type: 'course', duration: '5hr' },
        ],
        project: { title: 'Mock Interview Challenge', description: 'Complete 5 timed practice interviews covering SQL queries, case studies, and behavioral questions with self-evaluation rubric.', skills: ['Interview', 'SQL', 'Communication'], difficulty: 'advanced', estimatedHours: 8 },
        hours: 10, milestone: 'Interview-ready!',
      },
    ],
    projects: [
      { title: 'Sales Dashboard in Excel', description: 'Interactive sales dashboard using pivot tables', skills: ['Excel'], difficulty: 'beginner', estimatedHours: 6 },
      { title: 'COVID-19 Data Analysis', description: 'Global pandemic data analysis with Python', skills: ['Python', 'Pandas'], difficulty: 'beginner', estimatedHours: 7 },
      { title: 'E-commerce Analytics', description: 'Complex SQL analytics for an online store', skills: ['SQL', 'Analytics'], difficulty: 'intermediate', estimatedHours: 8 },
      { title: 'HR Analytics Dashboard', description: 'Power BI dashboard for HR metrics', skills: ['Power BI', 'DAX'], difficulty: 'intermediate', estimatedHours: 10 },
      { title: 'Retail Analytics Capstone', description: 'End-to-end retail analysis project', skills: ['SQL', 'Python', 'Power BI'], difficulty: 'advanced', estimatedHours: 15 },
    ],
    interviewTopics: ['SQL queries', 'Statistics & probability', 'Data cleaning', 'Visualization best practices', 'A/B testing', 'Business metrics', 'ETL processes', 'Excel & Power BI', 'Python Pandas', 'Case studies'],
    resumeTips: [
      'Lead with a strong summary highlighting your data analysis skills',
      'Include metrics: "Analyzed 1M+ rows of data to identify 15% revenue opportunity"',
      'List tools prominently: SQL, Python, Power BI, Tableau, Excel',
      'Include GitHub links to your portfolio projects',
      'Add relevant certifications: Google Data Analytics, IBM Data Analyst',
    ],
  };
}

function generateFullStackRoadmap(totalWeeks: number): Roadmap {
  return {
    careerPath: 'Full Stack Developer',
    totalWeeks,
    skillGaps: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs', 'Git'],
    weeks: [
      {
        week: 1, theme: 'HTML, CSS & Web Fundamentals',
        topics: ['Semantic HTML5', 'CSS Flexbox & Grid', 'Responsive design', 'CSS animations'],
        resources: [
          { title: 'Web Development Full Course', url: 'https://youtube.com', type: 'video', duration: '5hr' },
          { title: 'CSS Grid Garden', url: 'https://cssgridgarden.com', type: 'course', duration: '1hr' },
        ],
        project: { title: 'Responsive Portfolio Site', description: 'Build a fully responsive personal portfolio with CSS Grid, Flexbox, animations, and mobile-first design.', skills: ['HTML', 'CSS'], difficulty: 'beginner', estimatedHours: 8 },
        hours: 12, milestone: 'Can build responsive websites',
      },
      {
        week: 2, theme: 'JavaScript Fundamentals',
        topics: ['Variables, functions, scope', 'DOM manipulation', 'Event handling', 'ES6+ features'],
        resources: [
          { title: 'JavaScript Crash Course', url: 'https://youtube.com', type: 'video', duration: '4hr' },
          { title: 'JavaScript.info', url: 'https://javascript.info', type: 'documentation', duration: '5hr' },
        ],
        project: { title: 'Interactive Todo App', description: 'Build a feature-rich todo application with local storage, drag-and-drop, filters, and keyboard shortcuts.', skills: ['JavaScript', 'DOM'], difficulty: 'beginner', estimatedHours: 6 },
        hours: 12, milestone: 'Solid JavaScript fundamentals',
      },
      {
        week: 3, theme: 'Advanced JavaScript & TypeScript',
        topics: ['Async/Await & Promises', 'Closures & prototypes', 'TypeScript basics', 'Generics & interfaces'],
        resources: [
          { title: 'TypeScript Full Course', url: 'https://youtube.com', type: 'video', duration: '4hr' },
          { title: 'TypeScript Handbook', url: 'https://typescriptlang.org', type: 'documentation', duration: '3hr' },
        ],
        project: { title: 'Weather App with TypeScript', description: 'Build a weather application using TypeScript, fetching data from APIs with proper type safety and error handling.', skills: ['TypeScript', 'APIs'], difficulty: 'beginner', estimatedHours: 6 },
        hours: 10, milestone: 'Can write TypeScript confidently',
      },
      {
        week: 4, theme: 'React Fundamentals',
        topics: ['Components & JSX', 'State & Props', 'Hooks (useState, useEffect)', 'Event handling in React'],
        resources: [
          { title: 'React Full Course 2024', url: 'https://youtube.com', type: 'video', duration: '6hr' },
          { title: 'React Official Docs', url: 'https://react.dev', type: 'documentation', duration: '4hr' },
        ],
        project: { title: 'Movie Search App', description: 'Build a movie search application with React using the TMDB API, featuring search, favorites, and detailed views.', skills: ['React', 'API Integration'], difficulty: 'beginner', estimatedHours: 8 },
        hours: 12, milestone: 'Can build React applications',
      },
      {
        week: 5, theme: 'Advanced React & State Management',
        topics: ['Context API & useReducer', 'Custom hooks', 'React Router', 'Performance optimization'],
        resources: [
          { title: 'Advanced React Patterns', url: 'https://youtube.com', type: 'video', duration: '3hr' },
          { title: 'React Router Documentation', url: 'https://reactrouter.com', type: 'documentation', duration: '2hr' },
        ],
        project: { title: 'E-Commerce Store Frontend', description: 'Build a complete e-commerce frontend with product catalog, shopping cart, user auth UI, and checkout flow.', skills: ['React', 'State Management', 'React Router'], difficulty: 'intermediate', estimatedHours: 12 },
        hours: 14, milestone: 'Can build complex React apps',
      },
      {
        week: 6, theme: 'Node.js & Express Backend',
        topics: ['Node.js fundamentals', 'Express routing & middleware', 'REST API design', 'Error handling'],
        resources: [
          { title: 'Node.js & Express Full Course', url: 'https://youtube.com', type: 'video', duration: '5hr' },
          { title: 'Express.js Guide', url: 'https://expressjs.com', type: 'documentation', duration: '2hr' },
        ],
        project: { title: 'REST API for Blog Platform', description: 'Build a complete REST API with CRUD operations, authentication middleware, validation, and error handling.', skills: ['Node.js', 'Express', 'REST APIs'], difficulty: 'intermediate', estimatedHours: 10 },
        hours: 12, milestone: 'Can build backend APIs',
      },
      {
        week: 7, theme: 'Databases & ORM',
        topics: ['PostgreSQL fundamentals', 'Database design & normalization', 'Prisma ORM', 'Migrations & seeding'],
        resources: [
          { title: 'PostgreSQL Crash Course', url: 'https://youtube.com', type: 'video', duration: '3hr' },
          { title: 'Prisma Documentation', url: 'https://prisma.io', type: 'documentation', duration: '3hr' },
        ],
        project: { title: 'Full-Stack Task Manager', description: 'Build a task management app with PostgreSQL backend, Prisma ORM, user authentication, and team collaboration features.', skills: ['PostgreSQL', 'Prisma', 'Node.js'], difficulty: 'intermediate', estimatedHours: 12 },
        hours: 14, milestone: 'Can work with databases',
      },
      {
        week: 8, theme: 'Authentication & Security',
        topics: ['JWT authentication', 'OAuth 2.0 / Social login', 'Password hashing (bcrypt)', 'CORS & security headers'],
        resources: [
          { title: 'Authentication in Node.js', url: 'https://youtube.com', type: 'video', duration: '3hr' },
          { title: 'OWASP Top 10', url: 'https://owasp.org', type: 'article', duration: '2hr' },
        ],
        project: { title: 'Auth System with JWT + OAuth', description: 'Implement a complete authentication system with JWT tokens, Google OAuth, password reset, and role-based access control.', skills: ['JWT', 'OAuth', 'Security'], difficulty: 'intermediate', estimatedHours: 10 },
        hours: 12, milestone: 'Can implement secure authentication',
      },
      {
        week: 9, theme: 'Next.js & Full-Stack Framework',
        topics: ['Next.js App Router', 'Server Components', 'API Routes', 'Server Actions'],
        resources: [
          { title: 'Next.js Full Course', url: 'https://youtube.com', type: 'video', duration: '5hr' },
          { title: 'Next.js Documentation', url: 'https://nextjs.org', type: 'documentation', duration: '4hr' },
        ],
        project: { title: 'SaaS Dashboard with Next.js', description: 'Build a SaaS analytics dashboard using Next.js with server components, API routes, authentication, and real-time data.', skills: ['Next.js', 'React', 'Full Stack'], difficulty: 'intermediate', estimatedHours: 14 },
        hours: 14, milestone: 'Can build full-stack Next.js apps',
      },
      {
        week: 10, theme: 'DevOps & Deployment',
        topics: ['Git & GitHub workflows', 'Docker basics', 'CI/CD with GitHub Actions', 'Vercel/Railway deployment'],
        resources: [
          { title: 'Docker for Beginners', url: 'https://youtube.com', type: 'video', duration: '3hr' },
          { title: 'GitHub Actions Guide', url: 'https://docs.github.com', type: 'documentation', duration: '2hr' },
        ],
        project: { title: 'Deploy Full-Stack App', description: 'Containerize and deploy a full-stack application with Docker, set up CI/CD pipeline, and configure production environment.', skills: ['Docker', 'CI/CD', 'DevOps'], difficulty: 'intermediate', estimatedHours: 8 },
        hours: 10, milestone: 'Can deploy production apps',
      },
      {
        week: 11, theme: 'Portfolio & Open Source',
        topics: ['Portfolio website', 'Open source contributions', 'Code review practices', 'Technical writing'],
        resources: [
          { title: 'How to Contribute to Open Source', url: 'https://youtube.com', type: 'video', duration: '1hr' },
          { title: 'First Contributions', url: 'https://firstcontributions.github.io', type: 'course', duration: '2hr' },
        ],
        project: { title: 'Capstone Full-Stack Project', description: 'Build a production-quality full-stack SaaS application of your choice to showcase as your capstone portfolio project.', skills: ['React', 'Node.js', 'PostgreSQL', 'Full Stack'], difficulty: 'advanced', estimatedHours: 20 },
        hours: 14, milestone: 'A portfolio-worthy capstone project',
      },
      {
        week: 12, theme: 'Interview Preparation',
        topics: ['DSA practice', 'System design basics', 'Behavioral interviews (STAR)', 'Live coding practice'],
        resources: [
          { title: 'LeetCode Top 75', url: 'https://leetcode.com', type: 'course', duration: '10hr' },
          { title: 'System Design Primer', url: 'https://github.com', type: 'article', duration: '5hr' },
        ],
        project: { title: 'Mock Interview Sprint', description: 'Complete 10 mock interviews covering algorithms, system design, and behavioral questions with detailed self-review.', skills: ['DSA', 'System Design', 'Communication'], difficulty: 'advanced', estimatedHours: 10 },
        hours: 12, milestone: 'Interview-ready!',
      },
    ],
    projects: [
      { title: 'Responsive Portfolio', description: 'Personal portfolio with modern CSS', skills: ['HTML', 'CSS'], difficulty: 'beginner', estimatedHours: 8 },
      { title: 'Movie Search App', description: 'React app with TMDB API', skills: ['React', 'APIs'], difficulty: 'beginner', estimatedHours: 8 },
      { title: 'E-Commerce Frontend', description: 'Full e-commerce with React', skills: ['React', 'State Management'], difficulty: 'intermediate', estimatedHours: 12 },
      { title: 'Blog Platform API', description: 'REST API with Express & PostgreSQL', skills: ['Node.js', 'PostgreSQL'], difficulty: 'intermediate', estimatedHours: 10 },
      { title: 'SaaS Dashboard', description: 'Full-stack Next.js SaaS app', skills: ['Next.js', 'Full Stack'], difficulty: 'advanced', estimatedHours: 14 },
    ],
    interviewTopics: ['JavaScript fundamentals', 'React hooks & lifecycle', 'TypeScript', 'REST API design', 'Database design', 'System design basics', 'DSA (Arrays, Trees, Graphs)', 'Git workflows', 'CSS & responsive design', 'Authentication patterns'],
    resumeTips: [
      'Highlight specific tech stack: React, Node.js, TypeScript, PostgreSQL, Next.js',
      'Include live demo links alongside GitHub repos for each project',
      'Quantify impact: "Built a dashboard serving 500+ daily users"',
      'Add contributions to open source if possible',
      'Include deployment experience: Docker, Vercel, AWS',
    ],
  };
}

function generateMLEngineerRoadmap(totalWeeks: number): Roadmap {
  return {
    careerPath: 'AI/ML Engineer',
    totalWeeks,
    skillGaps: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'MLOps', 'Mathematics'],
    weeks: Array.from({ length: Math.min(totalWeeks, 12) }, (_, i) => ({
      week: i + 1,
      theme: ['Python & Math Foundations', 'NumPy & Pandas Mastery', 'Statistics & Probability', 'ML Fundamentals - Regression', 'ML Fundamentals - Classification', 'ML Fundamentals - Unsupervised', 'Deep Learning with TensorFlow', 'NLP & Text Processing', 'Computer Vision', 'MLOps & Deployment', 'Portfolio Projects', 'Interview Preparation'][i] || `Week ${i + 1}`,
      topics: [
        ['Python advanced', 'Linear algebra', 'Calculus basics', 'NumPy'],
        ['Pandas data manipulation', 'Data cleaning', 'Feature engineering', 'EDA'],
        ['Probability distributions', 'Hypothesis testing', 'Bayesian statistics', 'A/B testing'],
        ['Linear regression', 'Polynomial regression', 'Regularization', 'Gradient descent'],
        ['Logistic regression', 'Decision trees', 'Random forests', 'SVM'],
        ['K-means clustering', 'PCA', 'DBSCAN', 'Anomaly detection'],
        ['Neural networks', 'CNNs', 'Transfer learning', 'Keras/TensorFlow'],
        ['Text preprocessing', 'Word embeddings', 'Transformers', 'Sentiment analysis'],
        ['Image classification', 'Object detection', 'Data augmentation', 'YOLO'],
        ['Model deployment', 'Docker for ML', 'FastAPI', 'MLflow'],
        ['End-to-end ML project', 'Kaggle competitions', 'Research paper implementation', 'GitHub portfolio'],
        ['ML interview questions', 'System design for ML', 'Coding challenges', 'Paper discussions']
      ][i] || [],
      resources: [
        { title: `Week ${i + 1} Learning Resource`, url: 'https://youtube.com', type: 'video' as const, duration: '4hr' },
        { title: `Week ${i + 1} Documentation`, url: 'https://scikit-learn.org', type: 'documentation' as const, duration: '2hr' },
      ],
      project: {
        title: ['NumPy Matrix Operations', 'EDA on Titanic Dataset', 'Statistical Analysis Report', 'House Price Prediction', 'Spam Classifier', 'Customer Segmentation', 'Image Classifier CNN', 'Sentiment Analysis App', 'Object Detection System', 'ML API Deployment', 'End-to-End ML Pipeline', 'Mock Interview Marathon'][i] || `Project ${i + 1}`,
        description: 'Build a comprehensive project applying the concepts learned this week.',
        skills: ['Python', 'ML', 'TensorFlow'],
        difficulty: (i < 4 ? 'beginner' : i < 8 ? 'intermediate' : 'advanced') as 'beginner' | 'intermediate' | 'advanced',
        estimatedHours: 8 + i,
      },
      hours: 10 + Math.floor(i / 3) * 2,
      milestone: `Completed ${['Python & Math Foundations', 'NumPy & Pandas Mastery', 'Statistics & Probability', 'ML - Regression', 'ML - Classification', 'ML - Unsupervised', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps', 'Portfolio', 'Interview Ready!'][i] || `Week ${i + 1}`}`,
    })),
    projects: [
      { title: 'House Price Predictor', description: 'End-to-end regression model', skills: ['Python', 'Scikit-learn'], difficulty: 'beginner', estimatedHours: 8 },
      { title: 'Spam Classifier', description: 'NLP-based email classifier', skills: ['Python', 'NLP'], difficulty: 'intermediate', estimatedHours: 10 },
      { title: 'Image Classifier', description: 'CNN for image classification', skills: ['TensorFlow', 'CNN'], difficulty: 'intermediate', estimatedHours: 12 },
      { title: 'Recommendation System', description: 'Collaborative filtering engine', skills: ['Python', 'ML'], difficulty: 'advanced', estimatedHours: 15 },
    ],
    interviewTopics: ['Bias-variance tradeoff', 'Gradient descent', 'Regularization', 'Cross-validation', 'Ensemble methods', 'Neural network architectures', 'NLP concepts', 'Model evaluation metrics', 'Feature engineering', 'MLOps'],
    resumeTips: [
      'Highlight ML models you\'ve built and their performance metrics',
      'Include Kaggle rankings or competition results',
      'List frameworks: TensorFlow, PyTorch, Scikit-learn, Hugging Face',
      'Mention deployed models with real-world impact',
      'Add research papers read/implemented',
    ],
  };
}

function generateDevOpsRoadmap(totalWeeks: number): Roadmap {
  return {
    careerPath: 'Cloud/DevOps',
    totalWeeks,
    skillGaps: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
    weeks: Array.from({ length: Math.min(totalWeeks, 12) }, (_, i) => ({
      week: i + 1,
      theme: ['Linux & Shell Scripting', 'Git & Version Control', 'Networking Fundamentals', 'Docker Fundamentals', 'Docker Compose & Orchestration', 'CI/CD Pipelines', 'AWS Core Services', 'Infrastructure as Code', 'Kubernetes Basics', 'Monitoring & Logging', 'Security & Compliance', 'Capstone & Interview Prep'][i] || `Week ${i + 1}`,
      topics: [
        ['Linux commands', 'Bash scripting', 'File permissions', 'Process management'],
        ['Git branching', 'Merge strategies', 'GitHub workflows', 'Code review'],
        ['TCP/IP', 'DNS', 'Load balancing', 'SSL/TLS'],
        ['Docker images', 'Containers', 'Volumes', 'Networking'],
        ['Docker Compose', 'Multi-container apps', 'Docker Swarm', 'Registry'],
        ['GitHub Actions', 'Jenkins basics', 'Pipeline design', 'Automated testing'],
        ['EC2', 'S3', 'RDS', 'VPC & IAM'],
        ['Terraform basics', 'AWS CloudFormation', 'Ansible', 'Infrastructure automation'],
        ['Pods & Services', 'Deployments', 'ConfigMaps', 'Helm charts'],
        ['Prometheus', 'Grafana', 'ELK Stack', 'Alerting'],
        ['AWS Security', 'Secret management', 'Network policies', 'Compliance'],
        ['Architecture design', 'Portfolio', 'Mock interviews', 'Certification prep'],
      ][i] || [],
      resources: [
        { title: `Week ${i + 1} DevOps Resource`, url: 'https://youtube.com', type: 'video' as const, duration: '4hr' },
        { title: `Week ${i + 1} Documentation`, url: 'https://docs.aws.amazon.com', type: 'documentation' as const, duration: '2hr' },
      ],
      project: {
        title: ['Server Setup Script', 'Git Workflow Automation', 'Network Troubleshooting Lab', 'Dockerize a Web App', 'Multi-Service Docker App', 'CI/CD Pipeline Setup', 'Deploy on AWS', 'Terraform Infrastructure', 'Kubernetes Cluster', 'Monitoring Dashboard', 'Security Hardening', 'Full DevOps Pipeline'][i] || `Project ${i + 1}`,
        description: 'Build a hands-on project applying DevOps concepts from this week.',
        skills: ['Linux', 'Docker', 'AWS'],
        difficulty: (i < 4 ? 'beginner' : i < 8 ? 'intermediate' : 'advanced') as 'beginner' | 'intermediate' | 'advanced',
        estimatedHours: 8 + i,
      },
      hours: 10 + Math.floor(i / 3) * 2,
      milestone: `Completed ${['Linux', 'Git', 'Networking', 'Docker', 'Docker Compose', 'CI/CD', 'AWS', 'IaC', 'Kubernetes', 'Monitoring', 'Security', 'Full Pipeline'][i]}`,
    })),
    projects: [
      { title: 'Dockerize Web App', description: 'Container setup for a full-stack app', skills: ['Docker'], difficulty: 'beginner', estimatedHours: 6 },
      { title: 'CI/CD Pipeline', description: 'Automated build and deploy pipeline', skills: ['GitHub Actions', 'Docker'], difficulty: 'intermediate', estimatedHours: 10 },
      { title: 'AWS Infrastructure', description: 'Cloud infrastructure with Terraform', skills: ['AWS', 'Terraform'], difficulty: 'intermediate', estimatedHours: 12 },
      { title: 'K8s Cluster Setup', description: 'Production Kubernetes cluster', skills: ['Kubernetes', 'Helm'], difficulty: 'advanced', estimatedHours: 15 },
    ],
    interviewTopics: ['Linux commands', 'Docker vs VMs', 'Kubernetes architecture', 'CI/CD concepts', 'AWS services', 'Terraform', 'Networking', 'Security best practices', 'Monitoring strategies', 'Incident response'],
    resumeTips: [
      'List cloud certifications: AWS SAA, CKA, Terraform Associate',
      'Highlight automation achievements: "Reduced deployment time by 80%"',
      'Include tool proficiency: Docker, Kubernetes, Terraform, Ansible',
      'Mention scale: "Managed infrastructure serving 100K+ requests/day"',
      'Add GitHub repos with IaC examples',
    ],
  };
}

// ============ MOCK PROJECT SUGGESTIONS ============

export const projectSuggestions: ProjectSuggestion[] = [
  { id: '1', title: 'Personal Finance Tracker', description: 'Build a web app to track income, expenses, and savings goals with visual charts and budget categories. Include CSV import and monthly reports.', skills: ['React', 'Node.js', 'PostgreSQL', 'Charts'], difficulty: 'intermediate', estimatedHours: 20, careerPath: 'Full Stack Developer', githubUrl: 'https://github.com' },
  { id: '2', title: 'AI Chatbot with RAG', description: 'Create an AI chatbot that can answer questions about uploaded documents using Retrieval Augmented Generation with embeddings.', skills: ['Python', 'LangChain', 'Vector DB', 'NLP'], difficulty: 'advanced', estimatedHours: 25, careerPath: 'AI/ML Engineer', githubUrl: 'https://github.com' },
  { id: '3', title: 'Sales Dashboard', description: 'Design an interactive sales analytics dashboard with filters, drill-down capabilities, and KPI tracking using real-world datasets.', skills: ['Power BI', 'SQL', 'DAX'], difficulty: 'intermediate', estimatedHours: 12, careerPath: 'Data Analyst' },
  { id: '4', title: 'Kubernetes Microservices', description: 'Deploy a microservices architecture on Kubernetes with service mesh, auto-scaling, and monitoring using Prometheus and Grafana.', skills: ['Kubernetes', 'Docker', 'Prometheus'], difficulty: 'advanced', estimatedHours: 30, careerPath: 'Cloud/DevOps', githubUrl: 'https://github.com' },
  { id: '5', title: 'Social Media Dashboard', description: 'Build a real-time social media analytics dashboard that aggregates data from multiple platforms with sentiment analysis.', skills: ['React', 'APIs', 'Charts', 'NLP'], difficulty: 'intermediate', estimatedHours: 18, careerPath: 'Full Stack Developer' },
  { id: '6', title: 'Fraud Detection System', description: 'Build an ML model to detect fraudulent transactions using ensemble methods, handle class imbalance, and deploy as an API.', skills: ['Python', 'Scikit-learn', 'FastAPI'], difficulty: 'advanced', estimatedHours: 22, careerPath: 'AI/ML Engineer' },
  { id: '7', title: 'Customer Churn Analysis', description: 'Analyze telecom customer data to predict churn, create visualizations, and present actionable business recommendations.', skills: ['Python', 'Pandas', 'Matplotlib'], difficulty: 'beginner', estimatedHours: 10, careerPath: 'Data Analyst' },
  { id: '8', title: 'CI/CD Pipeline Builder', description: 'Create an automated CI/CD pipeline with GitHub Actions that builds, tests, and deploys a containerized application.', skills: ['GitHub Actions', 'Docker', 'Bash'], difficulty: 'intermediate', estimatedHours: 14, careerPath: 'Cloud/DevOps' },
  { id: '9', title: 'E-Commerce Platform', description: 'Full-stack e-commerce with product catalog, cart, checkout, payment integration (Stripe), and admin dashboard.', skills: ['Next.js', 'Stripe', 'PostgreSQL'], difficulty: 'advanced', estimatedHours: 40, careerPath: 'Full Stack Developer' },
  { id: '10', title: 'Image Classification App', description: 'Build and deploy a CNN-based image classification web app that identifies objects in uploaded images with confidence scores.', skills: ['TensorFlow', 'Flask', 'CNN'], difficulty: 'intermediate', estimatedHours: 16, careerPath: 'AI/ML Engineer' },
  { id: '11', title: 'HR Analytics Report', description: 'Create a comprehensive HR analytics report analyzing employee attrition, satisfaction scores, and salary equity using Python and Tableau.', skills: ['Python', 'Tableau', 'Statistics'], difficulty: 'beginner', estimatedHours: 8, careerPath: 'Data Analyst' },
  { id: '12', title: 'Infrastructure as Code', description: 'Use Terraform to provision a complete AWS infrastructure with VPC, EC2, RDS, S3, and CloudFront with proper security groups.', skills: ['Terraform', 'AWS', 'Linux'], difficulty: 'intermediate', estimatedHours: 16, careerPath: 'Cloud/DevOps' },
];

// ============ MOCK INTERVIEW QUESTIONS ============

export const interviewQuestions: InterviewQuestion[] = [
  // Technical
  { id: '1', category: 'technical', question: 'What is the difference between SQL and NoSQL databases? When would you use each?', answer: 'SQL databases are relational, using tables with predefined schemas, ideal for structured data and complex queries (PostgreSQL, MySQL). NoSQL databases are non-relational, offering flexible schemas, great for unstructured data, high scalability (MongoDB, Redis). Use SQL for ACID compliance, complex joins; NoSQL for horizontal scaling, flexible data models.', difficulty: 'easy', careerPath: 'Full Stack Developer' },
  { id: '2', category: 'technical', question: 'Explain the concept of closure in JavaScript with an example.', answer: 'A closure is a function that has access to variables in its outer (enclosing) scope, even after the outer function has returned. Example: function counter() { let count = 0; return function() { return ++count; }; } const inc = counter(); inc(); // 1, inc(); // 2. The inner function "closes over" the count variable.', difficulty: 'medium', careerPath: 'Full Stack Developer' },
  { id: '3', category: 'technical', question: 'What is the bias-variance tradeoff in machine learning?', answer: 'Bias is error from overly simplified models (underfitting). Variance is error from overly complex models (overfitting). High bias = model is too simple, misses patterns. High variance = model memorizes training data, fails on new data. The tradeoff: reducing one often increases the other. Goal: find the sweet spot with techniques like cross-validation, regularization, and ensemble methods.', difficulty: 'medium', careerPath: 'AI/ML Engineer' },
  { id: '4', category: 'technical', question: 'How does a LEFT JOIN differ from an INNER JOIN?', answer: 'INNER JOIN returns only rows with matching values in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right table; unmatched right-side values are NULL. Example: SELECT * FROM orders LEFT JOIN customers ON orders.customer_id = customers.id — returns all orders even if customer info is missing.', difficulty: 'easy', careerPath: 'Data Analyst' },
  { id: '5', category: 'technical', question: 'Explain the difference between Docker containers and virtual machines.', answer: 'VMs run a full OS on a hypervisor, providing complete isolation but using more resources. Containers share the host OS kernel, are lightweight (MB vs GB), start in seconds vs minutes, and use less resources. Containers are ideal for microservices and CI/CD. VMs are better for running different OS or complete isolation requirements.', difficulty: 'easy', careerPath: 'Cloud/DevOps' },
  // DSA
  { id: '6', category: 'dsa', question: 'How would you find the maximum subarray sum in an array? (Kadane\'s Algorithm)', answer: 'Kadane\'s Algorithm: Initialize maxSoFar = arr[0], maxEndingHere = arr[0]. For each element from index 1: maxEndingHere = max(arr[i], maxEndingHere + arr[i]); maxSoFar = max(maxSoFar, maxEndingHere). Time: O(n), Space: O(1). The key insight is that at each position, either extend the existing subarray or start a new one.', difficulty: 'medium', careerPath: 'Full Stack Developer' },
  { id: '7', category: 'dsa', question: 'Explain the time complexity of common sorting algorithms.', answer: 'Bubble Sort: O(n²) avg/worst, O(n) best. Merge Sort: O(n log n) all cases, O(n) space. Quick Sort: O(n log n) avg, O(n²) worst, O(log n) space. Heap Sort: O(n log n) all cases, O(1) space. Counting Sort: O(n+k), O(k) space (non-comparison). For most practical uses, built-in sorts (Timsort) run in O(n log n).', difficulty: 'easy', careerPath: 'Full Stack Developer' },
  // HR
  { id: '8', category: 'hr', question: 'Tell me about a time you had to learn a new technology quickly. How did you approach it?', answer: 'Use STAR method: Situation (project required unfamiliar tech), Task (needed to deliver feature within sprint), Action (structured learning: official docs → tutorial → small prototype → implementation, asked senior devs for code review), Result (delivered on time, became team\'s go-to for that technology). Emphasize learning strategy, resourcefulness, and proactive communication.', difficulty: 'easy', careerPath: 'Full Stack Developer' },
  { id: '9', category: 'hr', question: 'Where do you see yourself in 5 years?', answer: 'Focus on growth within the role and company. Example: "In 5 years, I see myself as a senior engineer leading technical initiatives, mentoring junior developers, and contributing to architectural decisions. I\'m excited about deepening my expertise in [relevant technology] and growing into a tech lead role." Show ambition while aligning with the company\'s trajectory.', difficulty: 'easy', careerPath: 'Full Stack Developer' },
  // System Design
  { id: '10', category: 'system-design', question: 'Design a URL shortener like bit.ly. Walk through the architecture.', answer: 'Components: 1) API (POST to create short URL, GET to redirect) 2) Hash function (Base62 encoding of auto-increment ID or MD5 hash truncated to 7 chars) 3) Database (Key-value store like Redis for fast lookups + relational DB for analytics) 4) Scale: Cache popular URLs, use consistent hashing for distributed storage, 301 redirect for caching. Handle: collision resolution, custom aliases, expiration, analytics tracking.', difficulty: 'hard', careerPath: 'Full Stack Developer' },
  { id: '11', category: 'system-design', question: 'How would you design an ML model serving infrastructure?', answer: 'Key components: 1) Model Registry (MLflow, S3) for versioned artifacts 2) Serving Layer: REST API (FastAPI/Flask) or gRPC for real-time, batch prediction with Spark/Airflow 3) Feature Store for consistent features 4) A/B testing framework 5) Monitoring: track prediction drift, model performance, latency 6) Scale: Kubernetes for auto-scaling, GPU scheduling, canary deployments 7) CI/CD for model retraining and deployment.', difficulty: 'hard', careerPath: 'AI/ML Engineer' },
  { id: '12', category: 'technical', question: 'What are window functions in SQL? Give examples.', answer: 'Window functions perform calculations across a set of rows related to the current row, without collapsing rows like GROUP BY. Examples: ROW_NUMBER() OVER (ORDER BY salary DESC) — rank employees; SUM(sales) OVER (PARTITION BY region) — running total per region; LAG(value, 1) OVER (ORDER BY date) — compare to previous row. Key: OVER clause defines the window (PARTITION BY + ORDER BY).', difficulty: 'medium', careerPath: 'Data Analyst' },
];
