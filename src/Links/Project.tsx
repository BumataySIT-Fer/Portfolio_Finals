import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import fg from '../assets/fglab.png';
import porj from '../assets/porj.png';

const Projects: React.FC = () => {

  const projects = [
    {
      title: "RENT EASE",
      description: "My parents assigned me to track our tenants' rent and utility bills (water and electricity). As a first-year IT student, I used AI to 'vibe code' a web app using what I learned from Aptech. I even deployed a live URL with a working Firebase backend. This project helped me automate our records, moving everything to a digital system instead of relying on traditional paper records.",
      image: porj,
      tech: ["React", "Firebase", "TypeScript"],
      github: "https://github.com/BumataySIT-Fer/rentease.git",
      live: "https://rentease-xi.vercel.app/"
    },
    {
      title: "FG LAB5",
      description: "For our Midterm activity, we integrated React Router to manage navigation and implemented a Feedback System to handle user data, applying core concepts of dynamic routing and state management.",
      image: fg,
      tech: ["React", "TypeScript", "Simple use of Routes"],
      github: "https://github.com/BumataySIT-Fer/fg_lab5_bumatay.git",
      live: "https://bumataysit-fer.github.io/fg_lab5_bumatay/"
    },
   
  ];

  return (
    <section className="bg-dark text-white py-5" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Container>

        {/* Header */}
         <Row className="mb-5 mt-5">
          <Col>
            <h1 className="fw-bold display-5">
              MY <span className="text-warning">SIMPLE PROJECTS</span>
            </h1>
           
            <p className="text-secondary fs-5 mt-3">
              Here are some of the things I've built. More coming soon.
            </p>
          </Col>
        </Row>

        {/* Projects Grid */}
        <Row>
          {projects.map((project, index) => (
            <Col key={index} md={6} className="mb-4">
              <Card
                className="bg-black border border-secondary h-100"
                style={{ transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#ffc107')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
              >
                {/* Project Image */}
                <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#111' }}>
                  <Card.Img
                    variant="top"
                    src={project.image}
                    alt={project.title}
                    style={{ objectFit: 'cover', height: '100%', width: '100%', opacity: 0.85 }}
                  />
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-warning fw-bold">{project.title}</Card.Title>
                  <Card.Text className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    {project.description}
                  </Card.Text>

                  {/* Tech Stack Badges */}
                  <div className="mb-3">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} bg="secondary" className="me-1">{tech}</Badge>
                    ))}
                  </div>

                  {/* Buttons pushed to bottom */}
                  <div className="d-flex gap-2 mt-auto">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
};

export default Projects;