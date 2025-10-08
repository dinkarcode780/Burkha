const HomeAbout = () => {
  return (
    <div className="min-vh-100 bg-light py-5 px-3 px-sm-4 px-lg-5">
      <div className="container-xl">
        
        {/* Main heading */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-4">
            ABOUT US
          </h1>
          <div className="mx-auto" style={{ width: '100px', height: '2px', backgroundColor: '#343a40' }}></div>
        </div>

        {/* Image Grid Section */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          {/* Image 1 - Modern Lighting */}
          <div className="col">
            <div className="card shadow-sm overflow-hidden h-100">
              <img 
                src="https://comfobynoor.in/wp-content/uploads/2025/02/Grey-Black-Simple-Fashion-Instagram-Post.png" 
                alt="Modern pendant lights in a contemporary interior"
                className="card-img-top img-fluid"
                style={{ height: '16rem', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Image 2 - Fabric and Design */}
          <div className="col">
            <div className="card shadow-sm overflow-hidden h-100">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury fabric and lighting combination"
                className="card-img-top img-fluid"
                style={{ height: '16rem', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Image 3 - Artistic Lighting */}
          <div className="col">
            <div className="card shadow-sm overflow-hidden h-100">
              <img 
                src="https://comfobynoor.in/wp-content/uploads/2025/02/b0bd1699-a8d2-474b-89f8-6b8cb929bea9.jpg" 
                alt="Artistic lighting design in modern space"
                className="card-img-top img-fluid"
                style={{ height: '16rem', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="card bg-light p-4 p-md-5 shadow-sm mb-5">
          <div className="card-body">
            <div className="d-flex flex-column gap-3 text-secondary">
              <p className="fs-5">
                Welcome to Comfo, discover our expertise collection of lights and
              </p>
              <p className="fs-5">
                designs that combine fabrics and modern afforders. Explore our
              </p>
              <p className="fs-5">
                extraordinary collection of lights and designs, monitor our early for
              </p>
              <p className="fs-5">
                personal work in place throughout all the year experience. Whether
              </p>
              <p className="fs-5">
                it's a special occasion, a festival, or simply a gesture of appreciation, our
              </p>
              <p className="fs-5">
                created selection offers an array of gifted visitors that combine fashion
              </p>
              <p className="fs-5">
                and modular afforders. Do our commercial and experience the joy of
              </p>
            </div>
          </div>
        </div>

        {/* Additional Image Section */}
        <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
          <div className="col">
            <div className="card shadow-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Elegant home lighting design"
                className="card-img-top img-fluid"
                style={{ height: '20rem', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern interior with creative lighting"
                className="card-img-top img-fluid"
                style={{ height: '20rem', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Welcome section */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-4">
            WELCOME TO COMFO
          </h2>
        </div>

        {/* Tagline section */}
        <div className="text-center">
          <p className="display-6 fst-italic text-secondary">
            FOR THE ONES, WHO LOVES MODESTY
          </p>
        </div>

        {/* Bottom Image */}
        <div className="mt-5">
          <div className="card shadow overflow-hidden">
            <img 
              src="https://comfobynoor.in/wp-content/uploads/2025/02/IMG_3844-1152x1536.jpg" 
              alt="Comfo lighting collection showcase"
              className="card-img-top img-fluid"
              style={{ height: '24rem', objectFit: 'cover' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeAbout;