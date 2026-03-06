export interface AttendanceSubmission {
  id: string;
  name: string;
  participating: boolean;
  attendeeCount: number;
  nonAttendeeCount?: number;
  note: string;
  submittedAt: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}