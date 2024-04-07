import React from "react";
import "./index.css";
import CircleIcon from "../../Assests/circle.png";

const Card = (props) => {
  const { data } = props;
  return (
    <div className="container">
      <div className="content">
        <p className="title">{data.id}</p>
        <h4 className="subtitle">{data.title}</h4>
        {/* <p className="description"> */}
        {data?.tag?.map((el) => {
          return (
            <div class="tag">
              <img src={CircleIcon} height={"10px"} style={{marginRight: '8px'}}></img>
              {el}
            </div>
          );
        })}

        {/* </p> */}
      </div>
      {/* <div className="image-container">
        <img
          className="image"
          src="path/to/man-standing-next-to-request.jpg"
          alt="A man standing next to the feature request"
        />
      </div> */}
    </div>
  );
};

export default Card;
