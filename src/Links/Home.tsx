import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import port from '../assets/port.jpg';


const Home: React.FC = () => {
  return (
    <section 
      style={{ 
        backgroundColor: '#111111', // Simple dark gray
        minHeight: '100vh', 
        color: 'white',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container>
        <Row className="align-items-center">
         
          <Col md={7}>
            <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>
              Hi, I'm <span style={{ color: '#ffcc00' }}>Bumatay Fernando</span>
            </h1>
            
            <p style={{ fontSize: '1.2rem', marginTop: '20px', color: '#cccccc' }}>
              I am a 1st year BSIT student at the University of Baguio. 
              I am interested in coding and learning how computer systems work. 
              This is my personal portfolio where I show my school projects and skills.
            </p>

            <div className="mt-4">
              <Button 
                as={Link as any} 
                to="/about" 
                style={{ 
                  backgroundColor: '#ffcc00', 
                  color: 'black', 
                  border: 'none',
                  marginRight: '10px',
                  fontWeight: 'bold'
                }}
              >
                About My Skills
              </Button>

              <Button 
                as={Link as any} 
                to="/contact" 
                variant="outline-light"
              >
                Contact Me
              </Button>
            </div>
          </Col>

          
          <Col md={5} className="text-center mt-5 mt-md-0">
            <div 
              style={{ 
                width: '300px', 
                height: '300px', 
                border: '5px solid #ffcc00', 
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
             
              <img 
                src={port} 
                alt="Bumatay Fernando" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;