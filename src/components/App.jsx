//import { getImages } from "API/GetImgs";
import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Searchbar  from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";

export default class App extends Component { 
  state = {
    imageName: '',
  }

  handleSearchbarSubmit = imageName => {
    this.setState({ imageName });
  }

  render() {
    return(
       <div>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose={3000} />
       </div>
     );
  }
 
};
