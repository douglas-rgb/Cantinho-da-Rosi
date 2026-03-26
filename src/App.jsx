import React from "react"
import Footer from "./Components/Footer/Footer" 
import Header from "./Components/Header/Header" 
import Navbar from "./Components/Navbar/Navbar" 
import OrderSteps from "./Components/OrderSteps/OrderSteps" 
import About from "./Pages/About/About" 
import Contato from "./Pages/Contato/Contato" 
import Home from "./Pages/Home/Home" 
import Products from "./Pages/Products/Products" 
import WhatsappButton from "./Components/WhatsappButton/WhatsappButton" 
import Location from "./Components/Location/Location" 

function App() { 
  return (<> 
  <Header /> 
  <Navbar /> 
  <Home /> 
  <About /> 
  <Products /> 
  <Contato /> 
  <Location /> 
  <OrderSteps /> 
  <Footer /> 
  <WhatsappButton /> 

  </>) } 
  
  export default App
