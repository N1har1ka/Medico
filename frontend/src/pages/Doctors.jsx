import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [showfilter, setShowFilter] = useState(false);
  const [filterDoc, setFilterDoc] = useState([]);
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showfilter ? "bg-primary" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`${
            showfilter ? "flex" : "hidden sm:flex"
          }  flex-col gap-4 text-sm text-gray-600`}
        >
          <p
            onClick={() => {
              setShowFilter(false);
              speciality === "General Physician"
                ? navigate("/doctors")
                : navigate("/doctors/General Physician");
            }}
            className={` ${
              speciality === "General Physician"
                ? "bg-indigo-100 text-black"
                : ""
            } w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}
          >
            General Physician
          </p>
          <p
            onClick={() => {
              setShowFilter(false);
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist");
            }}
            className={` ${
              speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
            } w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}
          >
            Gynecologist
          </p>
          <p
            onClick={() => {
              setShowFilter(false);
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist");
            }}
            className={` ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            } w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}
          >
            Dermatologist
          </p>
          <p
            onClick={() => {
              setShowFilter(false);
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians");
            }}
            className={` ${
              speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
            } w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}
          >
            Pediatricians
          </p>
          <p
            onClick={() => {
              setShowFilter(false);
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist");
            }}
            className={` ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            } w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}
          >
            Neurologist
          </p>
          <p
            onClick={() => {
              setShowFilter(false);
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist");
            }}
            className={` ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            } w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto  gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50 " src={item.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500 " : "text-gray-500 "
                  }`}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? "bg-green-500 " : "bg-gray-500 "
                    } rounded-full`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
