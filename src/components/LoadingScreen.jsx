const LoadingScreen = (props) => {
  const { progress, errors, loadedCount, totalResources, onContinue } = props;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Loading Resources</h2>
        <p>
          {loadedCount} of {totalResources} resources loaded
        </p>
      </div>

      <div
        style={{
          width: "300px",
          height: "20px",
          backgroundColor: "#333",
          borderRadius: "10px",
          margin: "10px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: errors.length > 0 ? "#ff9800" : "#4caf50",
            transition: "width 0.3s ease",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}
          >
            {progress}%
          </span>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "rgba(255, 152, 0, 0.2)",
            borderRadius: "8px",
            maxWidth: "80%",
            textAlign: "center",
            border: "1px solid #ff9800",
          }}
        >
          <h3 style={{ color: "#ff9800", margin: "0 0 10px 0" }}>
            {errors.length} resource{errors.length !== 1 ? "s" : ""} failed to
            load
          </h3>
          <div
            style={{
              maxHeight: "150px",
              overflowY: "auto",
              marginBottom: "15px",
            }}
          >
            {errors.map((error, index) => (
              <div
                key={index}
                style={{
                  margin: "8px 0",
                  padding: "5px",
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                  borderRadius: "4px",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {error.resource.split("/").pop()}
                </div>
                <div style={{ fontSize: "12px", color: "#ffcc80" }}>
                  {error.error}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onContinue}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.backgroundColor = "#ffa726")}
            onMouseOut={(e) => (e.target.backgroundColor = "#ff9800")}
          >
            Continue Anyway
          </button>
        </div>
      )}

      {errors.length === 0 && loadedCount < totalResources && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>Loading large resources, please wait...</p>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="spinner"
              style={{
                width: "20px",
                height: "20px",
                border: "3px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                borderTopColor: "#fff",
                animation: "spin 1s ease-in-out infinite",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
