

const HomeAbout = () => {
  return (
    <div className="min-vh-100 bg-light py-5 px-3 px-sm-4 px-lg-5 ">
      <div className="container-xl">
        
        {/* Main heading */}
        <div className="text-center mb-3">
          <h1 className="display-4 fw-bold text-dark mb-2">
            Why we are Here
          </h1>
          <div className="mx-auto" style={{ width: '100px', height: '2px', backgroundColor: '#343a40' }}></div>
        </div>

        {/* Image and Text Section */}
        <div className="row align-items-center mb-5">
          <div className="col-12 col-md-6 about">
            <div className="card shadow-sm overflow-hidden">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4hPQrLUHgalb0KVQMPuiJurkCdqdCGh-1w&s" 
                alt="Modern pendant lights in a contemporary interior"
                className="card-img-top img-fluid"
                style={{ height: '20rem', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 habout ">
            <div className="p-4">
              <p className="fs-5 text-secondary">
                Welcome to Umair Abaya, where we showcase our exquisite collection of lighting and designs that blend luxurious fabrics with modern elegance. Explore our extraordinary range, crafted to elevate any space throughout the year. Whether for a special occasion, festival, or a thoughtful gesture, our curated selection offers a variety of stylish and innovative lighting solutions that combine fashion and functionality. Discover the joy of transforming your environment with Umair Abaya unique offerings.
              </p>
            </div>
          </div>
        </div>

        {/* Welcome section */}
        <div className="text-center mb-5 muhe">
          <h2 className="display-5 fw-bold text-dark mb-4">
            WELCOME TO Umair Abaya
          </h2>
        </div>

        {/* Tagline section */}
        <div className="text-center onE">
          <p className="display-6 fst-italic text-secondary">
            FOR THE ONES WHO LOVE MODESTY
          </p>
        </div>

        {/* Bottom Image */}
        <div className="mt-30 ">
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