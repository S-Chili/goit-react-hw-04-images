import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Searchbar  from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";

export default function App() { 
  const [imageName, setImageName] = useState('')

  const handleSearchbarSubmit = name => {
    setImageName(name);
  }


  return(
     <div>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      <ImageGallery imageName={imageName} />
      <ToastContainer autoClose={3000} />
     </div>
  );
 
};
