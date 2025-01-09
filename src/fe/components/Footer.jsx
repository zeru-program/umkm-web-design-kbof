import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-5">
      <div className="container">
        <div className="row gy-4 text-center text-md-start">
          {/* Logo and Description */}
          <div className="col-12 col-md-3">
            <div className=' col-md-2 mb-3'>
              <img src="/images/logo-navbar2.png" className='img-logo-footer' alt="" />
            </div>
            <p>Bring Nature Into Your Space</p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-white">
                <span className="iconify" data-icon="mdi:facebook"></span>
              </a>
              <a href="#" className="text-white">
                <span className="iconify" data-icon="mdi:instagram"></span>
              </a>
              <a href="#" className="text-white">
                <span className="iconify" data-icon="ic:baseline-tiktok"></span>
              </a>
              <a href="#" className="text-white">
                <span className="iconify" data-icon="mdi:twitter"></span>
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div className="col-12 col-md-3">
            <h3 className="">Explore</h3>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/plants" className="text-white text-decoration-none">Plants</a></li>
              <li><a href="/education" className="text-white text-decoration-none">Education</a></li>
              <li><a href="/about-us" className="text-white text-decoration-none">About Us</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="col-12 col-md-3">
            <h3 className="">Help</h3>
            <ul className="list-unstyled">
              <li><a href="/about-us" className="text-white text-decoration-none">FAQ</a></li>
              <li><a href="/about-us" className="text-white text-decoration-none">Support</a></li>
              <li><a href="/about-us" className="text-white text-decoration-none">Refunds</a></li>
              <li><a href="/about-us" className="text-white text-decoration-none">How To Shop</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-12 col-md-3">
            <h3 className="">Contact</h3>
            <ul className="list-unstyled">
              <li>Email: <a href="mailto:contact@greenhouse.com" className="text-white text-decoration-none">contact@greenhouse.com</a></li>
              <li>Phone: <a href="tel:+6287774487198" className="text-white text-decoration-none">+6287774487198</a></li>
              <li className=''>Address: Jl. Raya Tajur, Kp. Buntar RT.02/RW.08, Kel. Muara sari, Kec.
                Bogor Selatan</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 text-center">
          <hr className="border-white opacity-50" />
          <div className='d-flex justify-content-between'>  
          <p>© 2024 Green House.</p>
          <p>All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer