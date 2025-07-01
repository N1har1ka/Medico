import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(null);
  const [slotTime, setSlotTime] = useState("");

  useEffect(() => {
    const found = doctors.find((doc) => doc._id === docId);
    console.log("Doctor Info Found:", found);
    setDocInfo(found);
  }, [doctors, docId]);

  useEffect(() => {
    if (!docInfo) return;
    const today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      const start = new Date(today);
      start.setDate(today.getDate() + i);
      const end = new Date(start);
      end.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        start.setHours(Math.max(10, now.getHours() + 1));
        start.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        start.setHours(10, 0, 0, 0);
      }

      const dailySlots = [];
      while (start < end) {
        const time = start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = start.getDate();
        let month = start.getMonth() + 1;
        let year = start.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const isSlotBooked =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(time);

        if (!isSlotBooked) {
          dailySlots.push({
            datetime: new Date(start),
            time: time,
          });
        }

        start.setMinutes(start.getMinutes() + 30);
      }

      if (dailySlots.length > 0) slots.push(dailySlots);
    }
    // console.log("Generated Slots:", slots);
    setDocSlots(slots);
    setSlotIndex(0);
  }, [docInfo]);

  const bookAppointment = async () => {
    // console.log("Trying to book appointment");
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    if (slotIndex === null || !slotTime) {
      toast.error("Please select a date and time slot");
      return;
    }
    const selectedSlot = docSlots[slotIndex]?.find((s) => s.time === slotTime);
    if (!selectedSlot) {
      toast.error("Invalid slot selected");
      return;
    }

    const date = selectedSlot.datetime;
    const slotDate = `${date.getDate()}_${
      date.getMonth() + 1
    }_${date.getFullYear()}`;

    try {
      // console.log("Booking slot:", { docId, slotDate, slotTime });
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (!docInfo) return null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          className="bg-primary w-full sm:max-w-72 rounded-lg"
          src={docInfo.image}
          alt=""
        />

        <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <p className="text-sm text-gray-500 max-w-[700px] mt-1">
            {docInfo.about}
          </p>
          <p className="text-gray-500 font-medium mt-4">
            Appointment Fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center overflow-x-scroll mt-4">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                // console.log("Selected day index:", index);
                setSlotIndex(index);
                setSlotTime("");
              }}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index
                  ? "bg-primary text-white"
                  : "border border-gray-200"
              }`}
            >
              <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-center overflow-x-scroll mt-4">
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                // console.log("Selected time:", item.time);
                setSlotTime(item.time);
              }}
              className={`text-sm font-light flex-shrink-0 px-5 py-6 min-w-16 rounded-full cursor-pointer ${
                item.time === slotTime
                  ? "bg-primary text-white"
                  : "text-gray-400 border border-gray-200"
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
