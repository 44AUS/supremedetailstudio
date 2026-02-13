import React, { useState } from 'react';
import { Input, Textarea, Button } from "@nextui-org/react";
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        const error = await response.json();
        toast.error(error.detail || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full grid grid-cols-1 gap-4">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="First and Last Name"
          variant="bordered"
          className="max"
          required
          isDisabled={loading}
        />

        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
          variant="bordered"
          className="max"
          required
          isDisabled={loading}
        />

        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          label="Phone Number"
          variant="bordered"
          className="max"
          required
          isDisabled={loading}
        />

        <Textarea
          label="Questions/Comments"
          variant="bordered"
          labelPlacement="inside"
          placeholder="Please give us a brief description of your questions, comments, or concerns."
          className="max"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          isDisabled={loading}
          minRows={4}
        />
      </div>

      <div style={{ margin: 'auto', marginTop: '15px', display: 'block', float: 'right' }}>
        <Button
          type="submit"
          radius="none"
          size="md"
          variant="shadow"
          style={{
            backgroundColor: 'rgb(232, 2, 0)',
            fontFamily: 'SceneProRg',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#fff'
          }}
          isLoading={loading}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
