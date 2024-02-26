import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setImageData] = useState([]);

  useEffect(() => {
    activeAPI();
  }, []);

  const activeAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/getImage");
      setImageData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePost = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:3003/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);
      activeAPI();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input type="file" onChange={handlePost}></input>
      <div className="galleryContainer">
        {data.map((item, index) => (
          <div key={index}>
            <img
              src={item.awslink}
              className="galleryimg"
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
