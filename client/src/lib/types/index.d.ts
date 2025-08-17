type Course = {
  courseId: number;
  title: string;
  description: string;
};

type User = {
  id?: string;
  email?: string;
  fullName?: string;
  password?: string;
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

type UpdateUser = Omit<User, "password">;

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
  userid: string;
  courseId: number;
  isCompleted: boolean;
};
