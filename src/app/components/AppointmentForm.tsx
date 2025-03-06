import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Patient, PatientStatus, AppointmentType } from '../types';

interface AppointmentFormProps {
  onAddPatient: (patient: Patient) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onAddPatient }) => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>(AppointmentType.PREBOOKED);
  const [appointmentDate, setAppointmentDate] = useState<Date>(new Date());
  const [appointmentTime, setAppointmentTime] = useState('09:00');
  
  // Format date for input field
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Create appointment date by combining date and time
    const [hours, minutes] = appointmentTime.split(':').map(Number);
    const appointmentDateTime = new Date(appointmentDate);
    appointmentDateTime.setHours(hours, minutes);
    
    // Create new patient object
    const newPatient: Patient = {
      id: uuidv4(),
      name,
      phone,
      bloodType,
      appointmentType,
      appointmentDate: appointmentDateTime,
      status: appointmentType === AppointmentType.EMERGENCY || appointmentType === AppointmentType.DIRECT 
        ? PatientStatus.WAITING 
        : PatientStatus.UPCOMING
    };
    
    // Add patient
    onAddPatient(newPatient);
    
    // Reset form
    setName('');
    setPhone('');
    setBloodType('');
    setAppointmentType(AppointmentType.PREBOOKED);
    setAppointmentDate(new Date());
    setAppointmentTime('09:00');
    setValidated(false);
  };
  
  return (
    <Card className="border-0 shadow-sm appointment-form-card">
      <Card.Header className="bg-white">
        <h5 className="fw-semibold mb-0">
          <i className="fas fa-calendar-plus text-primary me-2"></i>
          Schedule New Appointment
        </h5>
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col md={12}>
              <div className="section-title mb-3">
                <i className="fas fa-user-circle text-primary me-2"></i>
                Patient Information
              </div>
              
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="patientName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter patient name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Group controlId="patientPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid phone number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="patientBloodType">
                    <Form.Label>Blood Type</Form.Label>
                    <Form.Select
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value)}
                      required
                    >
                      <option value="">Select blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select a blood type.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col md={12}>
              <div className="section-title mb-3">
                <i className="fas fa-calendar-alt text-primary me-2"></i>
                Appointment Details
              </div>
              
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="appointmentType">
                    <Form.Label>Appointment Type</Form.Label>
                    <Form.Select
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value as AppointmentType)}
                      required
                      className={
                        appointmentType === AppointmentType.EMERGENCY 
                          ? 'appointment-type-emergency' 
                          : appointmentType === AppointmentType.DIRECT
                            ? 'appointment-type-walkin'
                            : 'appointment-type-scheduled'
                      }
                    >
                      <option value={AppointmentType.PREBOOKED}>Scheduled Appointment</option>
                      <option value={AppointmentType.DIRECT}>Walk-in</option>
                      <option value={AppointmentType.EMERGENCY}>Emergency</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Group controlId="appointmentDate">
                    <Form.Label>Appointment Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formatDateForInput(appointmentDate)}
                      onChange={(e) => setAppointmentDate(new Date(e.target.value))}
                      required
                      min={formatDateForInput(new Date())}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a valid date.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="appointmentTime">
                    <Form.Label>Appointment Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a valid time.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          
          <div className="d-flex justify-content-end">
            <Button 
              variant="primary" 
              type="submit"
              className="d-flex align-items-center"
            >
              <i className="fas fa-calendar-plus me-2"></i>
              Schedule Appointment
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AppointmentForm; 