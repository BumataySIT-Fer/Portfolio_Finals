import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Pogi from '../assets/Pogi.png';
import efset from '../assets/efset.png';
import wiw from '../assets/wiwiw.png';

const About: React.FC = () => {

  const certificates = [
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco",
      date: "November 14, 2025",
      image: Pogi,
      link: "https://www.credly.com/badges/beafe4ce-c92d-4958-81a7-c67cc963f98f"
    },
    {
      title: "EF SET English Certificate",
      issuer: "EF SET",
      date: "22 NOV 2025",
      image: efset,
      link: "https://cert.efset.org/XV5uuk"
    },
    {
      title: "AI Agents for Beginners",
      issuer: "Simplilearn",
      date: "2nd DECEMBER 2025",
      image: wiw,
      link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0ODY4IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvOTUxMzA4N185NzkzMDIyMTc2NDY3MjE0MTkxMC5wbmciLCJ1c2VybmFtZSI6IkZlcm5hbmRvIEJ1bWF0YXkifQ%3D%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7834%2FAI-Agents-for-Beginners%2Fcertificate%2Fdownload-skillup&%24web_only=true"
    }
  ];

  return (
    <section className="bg-dark text-white py-5" style={{ minHeight: '100vh' }}>
      <Container>


        <Row className="mb-5 mt-5">
          <Col>
            <h1 className="fw-bold display-5">
              ABOUT <span className="text-warning">ME</span>
            </h1>
            
          </Col>
        </Row>


        <Row className="mb-5">
          <Col>
            <p className="text-secondary fs-5 lh-lg">
              I am a dedicated BSIT student with a passion for building functional and visually
              appealing applications. My journey in tech started with a curiosity about how
              software impacts our daily lives, and now I'm diving deep into Web Development
              and Database Management.
            </p>
          </Col>
        </Row>

   
        <Row>
          <Col xs={12}>
            <h2 className="fw-bold mb-4">CERTIFICATIONS</h2>
          </Col>

          {certificates.map((cert, index) => (
            <Col key={index} md={4} className="mb-4">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Card
                  className="bg-black border border-secondary h-100"
                  style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#ffc107')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
                >
                  <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#000' }}>
                    <Card.Img
                      variant="top"
                      src={cert.image}
                      alt={cert.title}
                      style={{ objectFit: 'contain', height: '100%', opacity: 0.85 }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="text-warning">{cert.title}</Card.Title>
                    <Card.Text className="text-secondary mb-1">
                      Issued by: {cert.issuer}
                    </Card.Text>
                    <Badge bg="secondary">{cert.date}</Badge>
                    <div className="mt-2" style={{ fontSize: '0.8rem', color: '#ffc107' }}>
                      View Certificate
                    </div>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>

        
        <Row className="mt-4">
  <Col xs={12}>
    <h2 className="fw-bold mb-4">BASIC SKILLS</h2>
  </Col>
  

  <Col md={6} className="mb-3">
    <div className="border border-secondary rounded p-4 bg-black h-100">
      <ul className="list-unstyled mb-0">
        <li className="mb-2 text-white"> <span >Java</span> OOP Foundations</li>
        <li className="mb-2 text-white"> <span >C#</span> Razor Pages</li>
        <li className="mb-2 text-white"> <span >React</span> & TypeScript</li>
      
      </ul>
    </div>
  </Col>

  <Col md={6} className="mb-3">
    <div className="border border-secondary rounded p-4 bg-black h-100">
      <ul className="list-unstyled mb-0">
        <li className="mb-2 text-white"> <span >MySQL</span> & MongoDB</li>
        <li className="mb-2 text-white"> <span >Networking</span> (CCNA Basics)</li>
        <li className="mb-2 text-white"> Bootstrap & UI Design</li>
        <li className="mb-2 text-white">Cybersecurity Foundations</li>
      </ul>
    </div>
  </Col>
</Row>

      </Container>
    </section>
  );
};

export default About;