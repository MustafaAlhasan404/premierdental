import React from 'react';
import { Patient, AppointmentType, PatientStatus } from '../types';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';

interface PatientListProps {
  title: string;
  patients: Patient[];
  status: PatientStatus;
  onMoveTreatment?: (patientId: string) => void;
  onCancelAppointment?: (patientId: string) => void;
  onViewPatient?: (patientId: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ 
  title, 
  patients, 
  status, 
  onMoveTreatment, 
  onCancelAppointment,
  onViewPatient
}) => {

  // Get appropriate badge for appointment type
  const getAppointmentTypeBadge = (appointmentType: AppointmentType) => {
    switch(appointmentType) {
      case AppointmentType.EMERGENCY:
        return (
          <Badge bg="danger-light" text="danger" className="text-uppercase fs-7 fw-medium">
            <i className="fas fa-ambulance me-1"></i>
            Emergency
          </Badge>
        );
      case AppointmentType.DIRECT:
        return (
          <Badge bg="warning-light" text="warning" className="text-uppercase fs-7 fw-medium">
            <i className="fas fa-walking me-1"></i>
            Walk-in
          </Badge>
        );
      case AppointmentType.PREBOOKED:
        return (
          <Badge bg="info-light" text="info" className="text-uppercase fs-7 fw-medium">
            <i className="fas fa-calendar-check me-1"></i>
            Scheduled
          </Badge>
        );
      default:
        return null;
    }
  };

  // Format date for displaying appointment dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get time from Date object
  const getTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  // Get status indicator based on status type
  const getStatusIndicator = () => {
    switch(status) {
      case PatientStatus.WAITING:
        return (
          <div className="status-indicator status-waiting">
            <i className="fas fa-hourglass-half me-1"></i>
            Waiting
          </div>
        );
      case PatientStatus.CURRENT:
        return (
          <div className="status-indicator status-current">
            <i className="fas fa-procedures me-1"></i>
            In Treatment
          </div>
        );
      case PatientStatus.UPCOMING:
        return (
          <div className="status-indicator status-upcoming">
            <i className="fas fa-calendar-day me-1"></i>
            Upcoming
          </div>
        );
      default:
        return null;
    }
  };

  // Get emergency class for styling
  const getEmergencyClass = (appointmentType: AppointmentType) => {
    return appointmentType === AppointmentType.EMERGENCY ? 'patient-emergency' : '';
  };

  // Get name initial for avatar
  const getNameInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Get avatar class based on appointment type
  const getAvatarClass = (appointmentType: AppointmentType) => {
    switch(appointmentType) {
      case AppointmentType.EMERGENCY:
        return 'bg-danger text-white';
      case AppointmentType.DIRECT:
        return 'bg-warning text-white';
      case AppointmentType.PREBOOKED:
        return 'bg-primary text-white';
      default:
        return 'bg-primary-light text-white';
    }
  };

  // Get section background class based on status
  const getSectionClass = () => {
    switch(status) {
      case PatientStatus.WAITING:
        return 'waiting-section';
      case PatientStatus.CURRENT:
        return 'treatment-section';
      case PatientStatus.UPCOMING:
        return 'upcoming-section';
      default:
        return '';
    }
  };

  // Get empty state icon based on status
  const getEmptyStateIcon = () => {
    switch(status) {
      case PatientStatus.WAITING:
        return 'fa-hourglass';
      case PatientStatus.CURRENT:
        return 'fa-procedures';
      case PatientStatus.UPCOMING:
        return 'fa-calendar-day';
      default:
        return 'fa-user-clock';
    }
  };

  return (
    <div className={`patient-list mb-4 ${getSectionClass()}`}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="mb-0 fw-semibold">
          {title}
          {patients.length > 0 && (
            <Badge bg="primary-light" text="primary" className="ms-2 fw-medium">
              {patients.length}
            </Badge>
          )}
        </h5>
        {getStatusIndicator()}
      </div>
      
      {patients.length === 0 ? (
        <Card className={`text-center p-4 border-0 shadow-sm empty-card ${getSectionClass()}-empty`}>
          <div className="empty-state py-4">
            <i className={`fas ${getEmptyStateIcon()} fa-3x text-gray-400 mb-3`}></i>
            <p className="text-gray-500 mb-0">No patients {status.toLowerCase()} at the moment</p>
          </div>
        </Card>
      ) : (
        <div className="patient-cards">
          {patients.map(patient => (
            <Card 
              key={patient.id} 
              className={`hover-grow animate__animated animate__fadeIn ${getEmergencyClass(patient.appointmentType)} ${getSectionClass()}-card`}
            >
              <Card.Body className="p-0">
                <div className="d-flex p-3">
                  <div className="me-3">
                    <div className={`avatar ${getAvatarClass(patient.appointmentType)}`}>
                      {getNameInitial(patient.name)}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <h6 className="mb-0 fw-semibold">{patient.name}</h6>
                      {getAppointmentTypeBadge(patient.appointmentType)}
                    </div>
                    <div className="d-flex text-muted small mb-2">
                      <div className="me-3">
                        <i className="fas fa-phone-alt me-1 text-primary-light"></i>
                        {patient.phone}
                      </div>
                      <div>
                        <i className="fas fa-tint me-1 text-danger"></i>
                        {patient.bloodType}
                      </div>
                    </div>
                    <div className="d-flex text-muted small">
                      <div className="me-3">
                        <i className="far fa-calendar me-1 text-primary-light"></i>
                        {formatDate(patient.appointmentDate)}
                      </div>
                      <div>
                        <i className="far fa-clock me-1 text-primary-light"></i>
                        {getTime(patient.appointmentDate)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-actions p-3 pt-0 d-flex justify-content-end gap-2 border-top mt-3">
                  {status === PatientStatus.WAITING && onMoveTreatment && (
                    <Button 
                      variant="success" 
                      size="sm" 
                      onClick={() => onMoveTreatment(patient.id)}
                      className="d-flex align-items-center"
                    >
                      <i className="fas fa-procedures me-1"></i>
                      Start Treatment
                    </Button>
                  )}
                  
                  {onViewPatient && (
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => onViewPatient(patient.id)}
                      className="d-flex align-items-center"
                    >
                      <i className="fas fa-user-md me-1"></i>
                      View Details
                    </Button>
                  )}
                  
                  {onCancelAppointment && (
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => onCancelAppointment(patient.id)}
                      className="d-flex align-items-center"
                    >
                      <i className="fas fa-times me-1"></i>
                      Cancel
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList; 