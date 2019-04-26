// Styles
import "aos/dist/aos.css";
import "../css/font-awesome.css";
import "swiper/dist/css/swiper.min.css";
import "../scss/style.scss";
// Javascript
import "./libs/bootstrap";
import AOS from "aos";
import Swiper from "swiper";

$(document).ready(() => {
  // Aos Initialization
  AOS.init({
    disable: window.innerWidth < 1024
  });

  console.log("Happy coding!");
});
