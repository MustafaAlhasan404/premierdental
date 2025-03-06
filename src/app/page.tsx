'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Patient, PatientStatus, AppointmentType } from './types';
import PatientList from './components/PatientList';
import AppointmentForm from './components/AppointmentForm';
import PatientDetails from './components/PatientDetails';

// Importing Animate.css for animations
import 'animate.css';

export default function Home() {
  // State for patients, grouped by status
  const [patients, setPatients] = useState<Patient[]>([]);
  
  // State for notifications
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  
  // State for patient details modal
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientDetails, setShowPatientDetails] = useState<boolean>(false);
  
  // Filter patients by status
  const waitingPatients = patients.filter(patient => patient.status === PatientStatus.WAITING);
  const upcomingPatients = patients.filter(patient => patient.status === PatientStatus.UPCOMING);
  const currentPatients = patients.filter(patient => patient.status === PatientStatus.CURRENT);

  // Handle adding a new patient
  const handleAddPatient = (patient: Patient) => {
    setPatients(prevPatients => [...prevPatients, patient]);
    setNotification({
      type: 'success',
      message: `${patient.name}'s appointment has been successfully scheduled.`
    });
    
    // Auto-dismiss notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Handle moving a patient to treatment
  const handleMoveTreatment = (patientId: string) => {
    setPatients(prevPatients =>
      prevPatients.map(patient => 
        patient.id === patientId
          ? { ...patient, status: PatientStatus.CURRENT }
          : patient
      )
    );
    
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setNotification({
        type: 'info',
        message: `${patient.name} has been moved to treatment.`
      });
      
      // Auto-dismiss notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  // Handle canceling an appointment
  const handleCancelAppointment = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    
    setPatients(prevPatients =>
      prevPatients.filter(patient => patient.id !== patientId)
    );
    
    if (patient) {
      setNotification({
        type: 'warning',
        message: `${patient.name}'s appointment has been cancelled.`
      });
      
      // Auto-dismiss notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  // Handle viewing patient details
  const handleViewPatient = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setShowPatientDetails(true);
    }
  };

  // Load sample data
  useEffect(() => {
    const samplePatients: Patient[] = [
      {
        id: uuidv4(),
        name: 'Sophia Williams',
        phone: '(555) 123-4567',
        bloodType: 'A+',
        appointmentType: AppointmentType.PREBOOKED,
        appointmentDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        status: PatientStatus.UPCOMING
      },
      {
        id: uuidv4(),
        name: 'James Reynolds',
        phone: '(555) 234-5678',
        bloodType: 'O-',
        appointmentType: AppointmentType.EMERGENCY,
        appointmentDate: new Date(), // Now
        status: PatientStatus.WAITING
      },
      {
        id: uuidv4(),
        name: 'Emma Thompson',
        phone: '(555) 345-6789',
        bloodType: 'B+',
        appointmentType: AppointmentType.DIRECT,
        appointmentDate: new Date(new Date().getTime() - 30 * 60 * 1000), // 30 minutes ago
        status: PatientStatus.WAITING
      },
      {
        id: uuidv4(),
        name: 'Michael Chen',
        phone: '(555) 456-7890',
        bloodType: 'AB+',
        appointmentType: AppointmentType.PREBOOKED,
        appointmentDate: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        status: PatientStatus.UPCOMING
      },
      {
        id: uuidv4(),
        name: 'Olivia Martinez',
        phone: '(555) 567-8901',
        bloodType: 'A-',
        appointmentType: AppointmentType.PREBOOKED,
        appointmentDate: new Date(new Date().getTime() - 60 * 60 * 1000), // 1 hour ago
        status: PatientStatus.CURRENT
      }
    ];
    
    setPatients(samplePatients);
  }, []);

  // Get statistics for dashboard
  const getStatistics = () => {
    return [
      {
        title: 'Total Patients',
        value: patients.length,
        icon: 'fa-users',
        color: 'primary'
      },
      {
        title: 'Waiting',
        value: waitingPatients.length,
        icon: 'fa-hourglass-half',
        color: 'warning'
      },
      {
        title: 'In Treatment',
        value: currentPatients.length,
        icon: 'fa-procedures',
        color: 'success'
      },
      {
        title: 'Upcoming',
        value: upcomingPatients.length,
        icon: 'fa-calendar-day',
        color: 'info'
      }
    ];
  };

  return (
    <Container fluid className="px-4">
      {/* Notification */}
      {notification && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050, marginTop: '70px' }}>
          <Alert 
            variant={notification.type} 
            className="animate__animated animate__fadeInRight shadow-sm"
            onClose={() => setNotification(null)} 
            dismissible
          >
            <div className="d-flex align-items-center">
              <i className={`fas ${
                notification.type === 'success' ? 'fa-check-circle' : 
                notification.type === 'warning' ? 'fa-exclamation-triangle' : 
                'fa-info-circle'
              } me-2`}></i>
              {notification.message}
            </div>
          </Alert>
        </div>
      )}
      
      {/* Dashboard Header */}
      <div className="mb-4 pb-2 border-bottom">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-1 fw-semibold">
              Patient Dashboard
            </h2>
            <p className="text-muted mb-0">
              Manage appointments and patient flow efficiently
            </p>
          </Col>
          <Col xs="auto">
            <div className="text-muted small">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </Col>
        </Row>
      </div>
      
      {/* Statistics */}
      <Row className="mb-4 g-3">
        {getStatistics().map((stat, index) => (
          <Col md={3} sm={6} key={index}>
            <div className={`stat-card bg-white shadow-sm rounded-lg p-3 border-start border-4 border-${stat.color}`}>
              <div className="d-flex align-items-center">
                <div className={`stat-icon bg-${stat.color}-light text-${stat.color} me-3`}>
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-title text-muted small">{stat.title}</div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      
      {/* Main Content */}
      <Row className="g-4">
        {/* Patient Lists */}
        <Col lg={8}>
          <div className="mb-4 section-container waiting-section-container">
            <PatientList
              title="Waiting Room"
              patients={waitingPatients}
              status={PatientStatus.WAITING}
              onMoveTreatment={handleMoveTreatment}
              onCancelAppointment={handleCancelAppointment}
              onViewPatient={handleViewPatient}
            />
          </div>
          
          <div className="mb-4 section-container treatment-section-container">
            <PatientList
              title="Currently In Treatment"
              patients={currentPatients}
              status={PatientStatus.CURRENT}
              onCancelAppointment={handleCancelAppointment}
              onViewPatient={handleViewPatient}
            />
          </div>
          
          <div className="mb-4 section-container upcoming-section-container">
            <PatientList
              title="Upcoming Appointments"
              patients={upcomingPatients}
              status={PatientStatus.UPCOMING}
              onCancelAppointment={handleCancelAppointment}
              onViewPatient={handleViewPatient}
            />
          </div>
        </Col>
        
        {/* Appointment Form */}
        <Col lg={4}>
          <div className="sticky-top" style={{ top: '90px' }}>
            <AppointmentForm onAddPatient={handleAddPatient} />
          </div>
        </Col>
      </Row>
      
      {/* Patient Details Modal */}
      {selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          show={showPatientDetails}
          onHide={() => setShowPatientDetails(false)}
          onMoveTreatment={handleMoveTreatment}
          onCancelAppointment={handleCancelAppointment}
        />
      )}
    </Container>
  );
}
