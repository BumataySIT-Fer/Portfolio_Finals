import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Contact: React.FC = () => {
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

   
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

       
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all fields.");
            return;
        }

        try {
           
            const res = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                alert("Message Sent: " + data.message);
                
               
                setFormData({ name: "", email: "", message: "" });
            } else {
                alert("Failed to send message.");
            }
        } catch (error) {
            console.error(error);
            alert("Error: Server not found. Make sure your backend is running!");
        }
    };

    return (
        <section style={{ backgroundColor: "#111111", minHeight: "100vh", color: "white", padding: "80px 0" }}>
            <Container>
                <Row className="justify-content-center text-center mb-5">
                    <Col md={6}>
                        <h2 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
                            GET IN <span style={{ color: "#ffcc00" }}>TOUCH</span>
                        </h2>
                        <p className="text-secondary">Message me NOW!!</p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <form onSubmit={handleSubmit} className="custom-card">
                            
                            <div className="mb-3 text-start">
                                <label className="form-label small fw-bold text-uppercase">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control bg-dark text-white border-secondary"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                          
                            <div className="mb-3 text-start">
                                <label className="form-label small fw-bold text-uppercase">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control bg-dark text-white border-secondary"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                      
                            <div className="mb-4 text-start">
                                <label className="form-label small fw-bold text-uppercase">Message</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    className="form-control bg-dark text-white border-secondary"
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                        
                            <Button 
                                type="submit" 
                                className="w-100 py-3 fw-bold"
                                style={{ backgroundColor: "#ffcc00", color: "black", border: "none" }}
                            >
                                SEND MESSAGE
                            </Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;