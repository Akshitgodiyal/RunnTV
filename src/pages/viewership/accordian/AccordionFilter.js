import React, { useEffect, useState } from "react";
import content_icon from "../../../assets/images/content-icon.svg";
import live_tv from "../../../assets/images/live_tv.svg";
import room from "../../../assets/images/room.svg";

function AccordionFilter({ handleChange, Durations }) {
  const [view, setView] = useState("Channel"); // Default value for view_by
  const [duration, setDuration] = useState("day"); // Default value for Duration

  const filterChange = (e) => {
    const { name, value } = e.target;

    if (name === "view_by") {
      setView(value);
      handleChange(value, duration, { sort: "asc", key: "viewKey" }); // Pass 'value' directly
    } else if (name === "Duration") {
      setDuration(value);
      handleChange(view, value, { sort: "asc", key: "viewKey" }); // Pass 'value' directly
    }
  };
  useEffect(() => {
    handleChange(view, duration, { sort: "asc", key: "viewKey" });
  }, []);

  return (
    <div className="view-duration">
      <div className="view-block">
        <h5>View by </h5>
        <div className="radio-list">
          <div className="radio-box">
            <input
              id="content"
              value="Channel"
              name="view_by"
              type="radio"
              onChange={(e) => filterChange(e)}
              defaultChecked
            />
            <label htmlFor="content">
              <img src={content_icon} />
              Channel
            </label>
          </div>
          <div className="radio-box">
            <input
              id="Genre"
              value="Genre"
              name="view_by"
              type="radio"
              onChange={(e) => filterChange(e)}
            />
            <label htmlFor="Genre">
              <img src={live_tv} />
              Genre
            </label>
          </div>
          <div className="radio-box">
            <input
              id="Location"
              value="Location"
              name="view_by"
              type="radio"
              onChange={(e) => filterChange(e)}
            />
            <label htmlFor="Location">
              <img src={room} />
              Location
            </label>
          </div>
        </div>
      </div>
      <div className="duration-block">
        <h5>
          Duration <small className="smalltext">({Durations})</small>{" "}
        </h5>
        <div className="radio-list">
          <div className="radio-box">
            <input
              id="day"
              value="day"
              name="Duration"
              type="radio"
              onChange={(e) => filterChange(e)}
              defaultChecked
            />
            <label htmlFor="day">Today</label>
          </div>
          <div className="radio-box">
            <input
              id="Week"
              value="Week"
              name="Duration"
              type="radio"
              onChange={(e) => filterChange(e)}
            />
            <label htmlFor="Week">This Week</label>
          </div>
          <div className="radio-box">
            <input
              id="Month"
              value="Month"
              name="Duration"
              type="radio"
              onChange={(e) => filterChange(e)}
            />
            <label htmlFor="Month">This Month</label>
          </div>
          <div className="radio-box">
            <input
              id="Year"
              value="Year"
              name="Duration"
              type="radio"
              onChange={(e) => filterChange(e)}
            />
            <label htmlFor="Year">This Year</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccordionFilter;
