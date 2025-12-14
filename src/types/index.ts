export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'admin' | 'counselor';
  institutionCode: string;
  name: string;
  // Student specific
  usn?: string;
  section?: string;
  branch?: string;
  semester?: number;
  profile?: StudentProfile;
  // Counselor specific
  specialization?: string; 
}

export interface StudentProfile {
  internalMarks: Record<string, number>;
  quizMarks: Record<string, number>;
  attendance: Record<string, number>;
  stressLevel: number;
  moodHistory: MoodEntry[];
  counselingSessions: CounselingSession[];
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  stressLevel: number;
  notes?: string;
  physicalSymptoms: string[];
}

export interface CounselingSession {
  id:string;
  date: string;
  counselorId: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: string;
  anonymousId: string;
}

export interface CounselingSlot {
  id: string;
  counselorId: string;
  date: string;
  time: string;
  isBooked: boolean;
  studentAnonymousId?: string;
  type: 'chat' | 'call';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'student' | 'counselor';
  timestamp: Date;
}

export interface SOSAlert {
  id: string;
  studentId: string;
  studentName: string;
  reason: string;
  timestamp: Date;
  status: 'new' | 'acknowledged';
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  isAnonymous: boolean;
}

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  timestamp: Date;
  isAnonymous: boolean;
  voiceMessageUrl?: string;
  replies: ForumReply[];
}
