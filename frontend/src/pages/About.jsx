import React from "react";
import "./About.css";

export default function About() {
  return (
    <main className="about-container">
      
      {/* Hero Section */}
      <section className="hero-section fade-in">
        <h1>Company Jobs</h1>
        <p>Your career, our mission. Bringing top talent and companies together.</p>
      </section>

      {/* Mission Section */}
      <section className="content-section slide-up">
        <h2>Our Mission</h2>
        <p>
          We strive to provide the best platform for job seekers and employers by bridging opportunities with talent in an honest and trustworthy environment.
        </p>
      </section>

      {/* Values Section */}
      <section className="content-section slide-left">
        <h2>Our Values</h2>
        <ul>
          <li>Integrity & Transparency</li>
          <li>Innovation & Excellence</li>
          <li>User-Centered Experience</li>
          <li>Diversity & Inclusion</li>
        </ul>
      </section>

      {/* Why Choose Us Section */}
      <section className="content-section slide-right features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Simple & Clean</h3>
            <p>Easy to navigate job listings and applications with a modern interface.</p>
          </div>
          <div className="feature-card">
            <h3>Trustworthy</h3>
            <p>Verified jobs and candidates to ensure quality and security.</p>
          </div>
          <div className="feature-card">
            <h3>Always Support</h3>
            <p>Assistance at every stage for employers and candidates.</p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="content-section fade-in-up">
        <h2>Meet Our Team</h2>
        <p>
          Our dedicated team brings years of experience in HR, recruitment, and technology to ensure your success.
        </p>
      </section>
    </main>
  );
}
