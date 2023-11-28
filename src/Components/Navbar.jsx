import { Link } from "react-router-dom";

const Navbar = ({ updateDataArray }) => {
  const onButtonClick = () => {
    const newData = generateRandomArray();
    updateDataArray(newData);
  };

  const generateRandomArray = () => {
    // Generating random values of an array of 6 numbers
    const newArray = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 100)
    );
    console.log(`newArry is : ${newArray}`);
    return newArray;
  };

  return (
    <div>
      <nav>
        <div id="logo">
           <Link to="/"> 
              <img
                src="https://mma.prnewswire.com/media/1920828/Assiduus_Global_Logo.jpg?p=facebook"
                alt=""
              />
          </Link>
        </div>

        <div id="menu">
          <div id="Random-data">
            <button onClick={onButtonClick}>Randomize the data</button>
          </div>
          <div id="search">
            <input type="search" />
            <i class="bx bx-search-alt-2"></i>
          </div>
          <div id="notification">
            <i class="bx bxs-bell"></i>
          </div>
          <div id="profile">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="company-logo"
              className="profile-img"
            />
          </div>
          <div id="dwn-arrow">
            <i class="bx bxs-down-arrow"></i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
