import React from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import { Patient, AppointmentType, PatientStatus } from '../types';

interface PatientDetailsProps {
  patient: Patient;
  show: boolean;
  onHide: () => void;
  onMoveTreatment?: (patientId: string) => void;
  onCancelAppointment?: (patientId: string) => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({
  patient,
  show,
  onHide,
  onMoveTreatment,
  onCancelAppointment
}) => {
  // Format date for displaying appointment dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
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

  // Get status badge
  const getStatusBadge = (status: PatientStatus) => {
    switch(status) {
      case PatientStatus.WAITING:
        return (
          <Badge bg="warning-light" text="warning" className="text-uppercase fs-7 fw-medium">
            <i className="fas fa-hourglass-half me-1"></i>
            Waiting
          </Badge>
        );
      case PatientStatus.CURRENT:
        return (
          <Badge bg="success-light" text="success" className="text-uppercase fs-7 fw-medium">
            <i className="fas fa-procedures me-1"></i>
            In Treatment
          </Badge>
        );
      case PatientStatus.UPCOMING:
        return (
          <Badge bg="info-light" text="info" className="text-uppercase fs-7 fw-medium">
            <i className="fas fa-calendar-day me-1"></i>
            Upcoming
          </Badge>
        );
      default:
        return null;
    }
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

  // Get name initial for avatar
  const getNameInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      size="lg"
      className="patient-details-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold">
          Patient Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="p-4 bg-gray-50 border-bottom">
          <div className="d-flex align-items-center">
            <div className={`avatar avatar-lg me-4 ${getAvatarClass(patient.appointmentType)}`}>
              {getNameInitial(patient.name)}
            </div>
            <div>
              <h4 className="mb-1 fw-semibold">{patient.name}</h4>
              <div className="d-flex gap-2 mb-2">
                {getAppointmentTypeBadge(patient.appointmentType)}
                {getStatusBadge(patient.status)}
              </div>
              <div className="d-flex text-muted small">
                <div className="me-3 d-flex align-items-center">
                  <i className="fas fa-phone-alt me-2 text-primary-light"></i>
                  {patient.phone}
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-tint me-2 text-danger"></i>
                  Blood Type: {patient.bloodType}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h5 className="mb-3 fw-semibold">Appointment Information</h5>
          
          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <div className="detail-card p-3 bg-gray-50 rounded-lg h-100">
                <div className="text-muted small mb-1">Appointment Date</div>
                <div className="d-flex align-items-center">
                  <i className="far fa-calendar me-2 text-primary"></i>
                  <span className="fw-medium">{formatDate(patient.appointmentDate)}</span>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="detail-card p-3 bg-gray-50 rounded-lg h-100">
                <div className="text-muted small mb-1">Appointment Time</div>
                <div className="d-flex align-items-center">
                  <i className="far fa-clock me-2 text-primary"></i>
                  <span className="fw-medium">{getTime(patient.appointmentDate)}</span>
                </div>
              </div>
            </Col>
          </Row>
          
          <h5 className="mb-3 fw-semibold">Medical History</h5>
          
          <Row className="mb-4">
            <Col md={12}>
              <div className="detail-card p-3 bg-gray-50 rounded-lg">
                <div className="text-muted small mb-2">Previous Treatments</div>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2 d-flex align-items-center">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <div>
                      <div className="fw-medium">Dental Cleaning</div>
                      <div className="text-muted small">3 months ago</div>
                    </div>
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <div>
                      <div className="fw-medium">Cavity Filling</div>
                      <div className="text-muted small">6 months ago</div>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <div>
                      <div className="fw-medium">X-Ray Examination</div>
                      <div className="text-muted small">1 year ago</div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          
          <h5 className="mb-3 fw-semibold">Notes</h5>
          
          <div className="detail-card p-3 bg-gray-50 rounded-lg mb-4">
            <div className="text-muted small mb-2">Doctor&apos;s Notes</div>
            <p className="mb-0">
              Patient has expressed sensitivity to cold beverages. Recommended fluoride treatment during next visit.
              No allergies to dental anesthetics. Regular checkup schedule maintained.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {patient.status === PatientStatus.WAITING && onMoveTreatment && (
          <Button 
            variant="success" 
            onClick={() => {
              onMoveTreatment(patient.id);
              onHide();
            }}
            className="d-flex align-items-center"
          >
            <i className="fas fa-procedures me-2"></i>
            Start Treatment
          </Button>
        )}
        
        {onCancelAppointment && (
          <Button 
            variant="outline-danger" 
            onClick={() => {
              onCancelAppointment(patient.id);
              onHide();
            }}
            className="d-flex align-items-center"
          >
            <i className="fas fa-times me-2"></i>
            Cancel Appointment
          </Button>
        )}
        
        <Button 
          variant="outline-secondary" 
          onClick={onHide}
          className="d-flex align-items-center"
        >
          <i className="fas fa-times me-2"></i>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientDetails; 