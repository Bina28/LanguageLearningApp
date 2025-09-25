type Course = {
  courseId: number;
  title: string;
  description: string;
};

type User = {
  id: string;
  email: string;
  displayName: string;
  imageUrl?: string;
};

type CourseDetails = {
  id: number;
  courseId: number;
  lastCompletedDay: string | null;
  attempts: number;
  isCompleted: boolean;
  courseTitle: string;
  courseDescription: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

type Cards = {
  id: string;
  englishText: string;
  norwegianText: string;
};

type UpdatedProgress = {
  userId?: string;
  courseId: number;
  correctAnswers: number;
};

type Profile = {
  id: string;
  displayName: string;
  bio?: string;
  imageUrl?: string;
};

type Photo = {
  id: string;
  url: string;
};
