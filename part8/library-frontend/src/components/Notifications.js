import React from "react";

const Notifications = ({ errorMessage, toast }) => {
  return (
    <>
      {errorMessage && (
        <div className="container error" style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}
      {toast && (
        <div className="container error" style={{ color: "green" }}>
          {toast}
        </div>
      )}
    </>
  );
};

export default Notifications;
