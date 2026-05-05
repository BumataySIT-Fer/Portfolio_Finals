import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Alert } from 'react-bootstrap';

// Change these to whatever you want
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Wrong username or password.');
    }
  };

const fetchMessages = async () => {
    const res = await fetch('https://portfoliofinals-production.up.railway.app/api/messages');
    const data = await res.json();
    setMessages(data);
  };

  const deleteMessage = async (id: string) => {
    await fetch(`https://portfoliofinals-production.up.railway.app/api/messages/${id}`, { method: 'DELETE' });
    setMessages(messages.filter(m => m._id !== id));
  };

  useEffect(() => {
    if (isLoggedIn) fetchMessages();
  }, [isLoggedIn]);

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <section className="bg-dark text-white" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={4}>
              <div className="border border-secondary rounded p-4 bg-black">
                <h4 className="text-warning fw-bold mb-4">ADMIN LOGIN</h4>

                {loginError && <Alert variant="danger" style={{ fontSize: '0.9rem' }}>{loginError}</Alert>}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      className="bg-dark text-white border-secondary"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      className="bg-dark text-white border-secondary"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="warning" type="submit" className="w-100 fw-bold">
                    Login
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  // DASHBOARD PAGE
  return (
    <section className="bg-dark text-white py-5" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Container>

        {/* Header */}
        <Row className="mb-5 mt-5">
          <Col>
            <h1 className="fw-bold display-5">
              ADMIN <span className="text-warning">DASHBOARD</span>
            </h1>
            
          </Col>
          <Col className="text-end">
            <Button variant="outline-secondary" size="sm" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </Col>
        </Row>

        {/* Messages */}
        <Row>
          <Col xs={12}>
            <h5 className="text-secondary mb-3">
              Messages <Badge bg="warning" text="dark">{messages.length}</Badge>
            </h5>
          </Col>

          {messages.length === 0 ? (
            <Col>
              <p className="text-secondary">No messages yet.</p>
            </Col>
          ) : (
            messages.map((msg) => (
              <Col key={msg._id} md={6} className="mb-4">
                <Card className="bg-black border border-secondary h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Card.Title className="text-warning mb-0">{msg.name}</Card.Title>
                        <small className="text-secondary">{msg.email}</small>
                      </div>
                      <small className="text-secondary">
                        {new Date(msg.date).toLocaleDateString()}
                      </small>
                    </div>
                    <hr className="border-secondary" />
                    <Card.Text className="text-white" style={{ fontSize: '0.95rem' }}>
                      {msg.message}
                    </Card.Text>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteMessage(msg._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

      </Container>
    </section>
  );
};

export default Admin;