
import Logo from "../assets/AllNova black 2 (1).png";

function Navbar() {

  return (
    <>
      <div className="2xl:px-[200px] ">
        <nav className="flex space-x-2 justify-evenly mx-0  lg:px-12  bg-[#F05658]/10 lg:bg-transparent ">
          <ul className="max-lg:flex hidden">
            <li className="">
              <a href="http://"></a>
            </li>
          </ul>

          <ul className="flex items-center">
            <li>
              <img
                src={Logo}
                className="max-w-36 max-md:w-20"
                alt="AllNova Logo"
              />
            </li>
          </ul>

          <div className="hidden lg:flex font-semibold ">
            <ul className="flex space-x-10 items-center  ">
              <li>
                <a
                  href="#"
                  className={` hover:text-[#F05658] transition-colors duration-200`}
                >
                  Find Freelancers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={` hover:text-[#F05658] transition-colors duration-200`}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={` hover:text-[#F05658] transition-colors duration-200`}
                >
                  Go Pro
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={` hover:text-[#F05658] transition-colors duration-200`}
                >
                  Offshore Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={` hover:text-[#F05658] transition-colors duration-200`}
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <ul className="flex items-center space-x-6">
            <li>
              <p className={`text-[#F05658] hover:text-[#F05640]`}>Sign In</p>
            </li>
            <li className="hidden lg:flex">
              <button
                className={`bg-[#F05658] hover:bg-[#c16456] rounded-2xl px-5 text-white py-1 
                         transition-colors duration-200 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-[#F05658]`}
              >
                Join
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
