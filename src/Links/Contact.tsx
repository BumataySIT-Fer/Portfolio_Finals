import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.name || !formData.email || !formData.message) {
      return "Please fill in all fields.";
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(formData.email)) {
      return "Invalid email format.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setStatus(error);
      setIsError(true);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      // Save to MongoDB for admin page
      await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      setStatus("Message sent successfully!");
      setIsError(false);
      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.error("ERROR:", error);
      setStatus("Failed to send message. Please try again.");
      setIsError(true);
    }

    setLoading(false);
  };

  return (
    <section className="bg-dark text-white py-5" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <Container>

        {/* Header */}
        <Row className="mb-5 mt-5 text-center">
          <Col>
            <h1 className="fw-bold display-5">
              CONTACT <span className="text-warning">ME</span>
            </h1>
          </Col>
        </Row>

        {/* Form */}
        <Row className="justify-content-center">
          <Col md={7}>
            <div className="border border-secondary rounded p-4 bg-black">

              {status && (
                <Alert variant={isError ? "danger" : "success"}>
                  {status}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-secondary">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-secondary">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-secondary">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Button
                  variant="warning"
                  type="submit"
                  className="w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </Form>

            </div>
          </Col>
        </Row>

      </Container>
    </section>
  );
};

export default Contact;