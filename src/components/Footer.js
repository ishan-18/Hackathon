import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>We are a company that focuses on soil health and environmental sustainability.</p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Soil Test</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Forums</a></li>
              <li><a href="#">Gov Policies</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <address>
              <span>123 Main St.</span>
              <span>Anytown, USA 12345</span>
              <span><a href="mailto:info@soilhealth.com">info@soilhealth.com</a></span>
              <span><a href="tel:555-555-5555">555-555-5555</a></span>
            </address>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <p className="text-center">&copy; Soil Health 2021</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
