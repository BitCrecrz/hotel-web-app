import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeSelect from "./HomeSelect";

const Home = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      
    }
    else{
      navigate(`/login`)
    }
    // eslint-disable-next-line 
    }, []);

    const Logout = () => {
      localStorage.removeItem('token');
      navigate(`/login`);
    };

  return (
    <div className="home">
      <div className="top-row ">
        <h1 className="top text-base text-black">
          Switch to Hosting <i className="fas fa-globe"></i>
          {!localStorage.getItem('token')?<button
            className="bg-white hover:bg-slate-300 text-gray-700 font-bold p-1 rounded-full m-2"
            onClick={async (event) => {
              event.preventDefault();
              navigate(`/login`);
            }}
          >
            <i className="m-2 fas fa-bars"></i>
            <i className="fas fa-user-circle"></i>
          </button>:<button onClick={Logout} className="bg-white hover:bg-slate-300 text-gray-700 font-bold px-1 rounded-full m-2">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      }
          
        </h1>
      </div>
      <div className="middle-row">
        <h1>Places To Stay</h1>
        <div className="selectform lg:ml-72 lg:max-w-3xl">
          <HomeSelect />
        </div>
      </div>
      <div className="bottom-row m-16">
        <h1 className="text-black w-8 text-6xl font-bold ">GO NEAR</h1>
        <button className="bg-white hover:bg-slate-300 text-gray-700 font-bold px-3 rounded-full">
          Explore Nearby stays
        </button>
      </div>
    </div>
  );
};

export default Home;
