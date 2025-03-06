// Appointment types
export enum AppointmentType {
  PREBOOKED = "prebooked",
  DIRECT = "direct",
  EMERGENCY = "emergency"
}

// Patient status in clinic workflow
export enum PatientStatus {
  UPCOMING = "upcoming", // Patients with future appointments
  WAITING = "waiting",   // Patients currently waiting in the clinic
  CURRENT = "current"    // Patient currently being treated
}

// Patient interface
export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  age?: number;
  bloodType?: string;
  appointmentType: AppointmentType;
  appointmentDate: Date;
  notes?: string;
  status: PatientStatus;
} 