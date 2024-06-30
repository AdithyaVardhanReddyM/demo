import { v4 as uuidv4 } from "uuid";
import {
  Achievement,
  Education,
  Experience,
  PersonalDetails,
  Project,
  Skill,
} from "./schema";
import { z } from "zod";
import { personalDetailsSchema } from "@/lib/schemas/personalSchema";
import { educationSchema } from "@/lib/schemas/educationSchema";

// Mock Personal Details
const mockPersonalDetails: z.infer<typeof personalDetailsSchema> = {
  firstName: "John",
  lastName: "Doe",
  mobile: "+1234567890",
  email: "john.doe@example.com",
  portfolio: "https://johndoe.com",
  jobRole: "Full Stack Developer",
  overallSummary:
    "I write clean and maintainable code, particularly in TypeScript and JavaScript. My passion lies in developing efficient backends, leveraging MongoDB or PostgreSQL to ensure optimal performance. I thoroughly enjoy working with Next.js and React.js, as they enable me to create dynamic and powerful applications and I have experience with docker.",
};

// Mock Experiences
const mockExperiences: Experience[] = [
  {
    id: "exp1",
    userId: "user1",
    position: "Senior Developer",
    company: "Tech Solutions Inc.",
    location: "New York, NY",
    description:
      "Led a team of developers in creating innovative web applications.",
    responsibilities: JSON.stringify([
      "Managed a team of 5 developers",
      "Implemented agile methodologies",
      "Designed and developed scalable backend systems",
    ]),
    startDate: new Date("2018-01-01"),
    endDate: new Date("2023-06-30"),
  },
  {
    id: "exp2",
    userId: "user1",
    position: "Junior Developer",
    company: "StartUp Co.",
    location: "San Francisco, CA",
    description:
      "Contributed to the development of a cutting-edge mobile application.",
    responsibilities: JSON.stringify([
      "Developed frontend components using React Native",
      "Integrated RESTful APIs",
      "Performed code reviews and unit testing",
    ]),
    startDate: new Date("2015-06-01"),
    endDate: new Date("2017-12-31"),
  },
];

// Mock Education
const mockEducation: z.infer<typeof educationSchema> = {
  education: [
    {
      institutionName: "University of Technology",
      educationType: "Bachelor's Degree",
      startDate: new Date("2011-09-01"),
      endDate: new Date("2015-05-31"),
      description:
        "Studied Computer Science with a focus on software engineering and database management.",
    },
  ],
};

// Mock Skills
const mockSkills: Skill[] = [
  {
    id: uuidv4(),
    userId: "clerk_user_123",
    skillType: "JavaScript",
    expertise: 5,
  },
  { id: uuidv4(), userId: "clerk_user_123", skillType: "React", expertise: 5 },
  {
    id: uuidv4(),
    userId: "clerk_user_123",
    skillType: "Node.js",
    expertise: 4,
  },
  { id: uuidv4(), userId: "clerk_user_123", skillType: "Python", expertise: 4 },
  { id: uuidv4(), userId: "clerk_user_123", skillType: "SQL", expertise: 4 },
  { id: uuidv4(), userId: "clerk_user_123", skillType: "AWS", expertise: 3 },
];

// Mock Achievements
const mockAchievements: Achievement[] = [
  {
    id: uuidv4(),
    userId: "clerk_user_123",
    title: "Employee of the Year",
    description:
      "Awarded Employee of the Year at Tech Innovators Inc. for outstanding performance and leadership in 2023.",
  },
  {
    id: uuidv4(),
    userId: "clerk_user_123",
    title: "Conference Speaker",
    description: 'Spoke at ReactConf 2022 on "Scaling React Applications".',
  },
  {
    id: uuidv4(),
    userId: "clerk_user_123",
    title: "Open Source Contributor",
    description:
      'Major contributor to popular open-source project "awesome-react-components" with over 5k stars on GitHub.',
  },
];

const projectMock: Project[] = [
  {
    id: "proj1",
    userId: "user1",
    name: "E-commerce Platform",
    url: "https://github.com/johndoe/ecommerce-platform",
    description: "A full-stack e-commerce solution with advanced features.",
    features: JSON.stringify([
      "User authentication and authorization",
      "Product catalog with search and filter capabilities",
      "Shopping cart and checkout process",
      "Admin dashboard for inventory management",
    ]),
  },
  {
    id: "proj2",
    userId: "user1",
    name: "Task Management App",
    url: "https://task-manager-app.com",
    description:
      "A responsive web application for managing tasks and projects.",
    features: JSON.stringify([
      "User-friendly interface with drag-and-drop functionality",
      "Real-time updates using WebSockets",
      "Integration with popular calendar apps",
      "Team collaboration features",
    ]),
  },
];

// Combine all mock data
const mockResumeData = {
  personalDetails: mockPersonalDetails,
  experiences: mockExperiences,
  education: mockEducation,
  skills: mockSkills,
  achievements: mockAchievements,
  projects: projectMock,
};

export default mockResumeData;
