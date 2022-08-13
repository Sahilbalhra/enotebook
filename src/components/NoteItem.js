import React from "react";

const NoteItem = (props) => {
  const { title, description } = props.note;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5>{title}</h5>
            <div className="icon">
              <i className="far fa-trash-alt mx-2"></i>
              <i className="fa-solid fa-pen-to-square mx-2"></i>
            </div>
          </div>

          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
