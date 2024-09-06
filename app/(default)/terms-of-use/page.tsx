import React from 'react';
import '../../../css/termsOfUse.css';

const TermsOfUse = () => {
  return (
    <div className="terms-of-use">
      <h1>Terms of Use</h1>
      <div className="terms-of-use__content">
        <section className="terms-of-use__section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to our website. By accessing or using our website, you agree
            to comply with and be bound by the following terms and conditions of
            use. Please review these terms carefully. If you do not agree to
            these terms, you should not use this site.
          </p>
        </section>

        <section className="terms-of-use__section">
          <h2>2. Acceptance of Agreement</h2>
          <p>
            You agree to the terms and conditions outlined in this Terms of Use
            Agreement. This Agreement constitutes the entire and only agreement
            between us and you, and supersedes all prior agreements or
            understandings.
          </p>
        </section>

        <section className="terms-of-use__section">
          <h2>3. Intellectual Property</h2>
          <p>
            The content, organization, graphics, design, and other matters
            related to the website are protected under applicable intellectual
            property laws. You may not modify, copy, reproduce, republish,
            upload, post, transmit, or distribute any material from the site.
          </p>
        </section>

        <section className="terms-of-use__section">
          <h2>4. Limitation of Liability</h2>
          <p>
            In no event will we be liable for any damages, including without
            limitation, indirect, incidental, or consequential damages arising
            out of the use or inability to use the site.
          </p>
        </section>

        <section className="terms-of-use__section">
          <h2>5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time, and such
            modifications will be effective immediately upon posting on the
            site. Your continued use of the site will signify your acceptance of
            the revised terms.
          </p>
        </section>

        <section className="terms-of-use__section">
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Use, please contact
            us at support@example.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
