import React from 'react'
import ReactCardSlider from 'react-card-slider-component';
// a slide object contains the image link, title and function/click event for when a user clicks on a card
const slides = [
    {image:"https://picsum.photos/200/300",title:"This is a title",description:"This is a description"},
    {image:"https://picsum.photos/600/500",title:"This is a second title",description:"This is a second description"},
    {image:"https://picsum.photos/700/600",title:"This is a third title",description:"This is a third description"},
    {image:"https://picsum.photos/500/400",title:"This is a fourth title",description:"This is a fourth description"},
    {image:"https://picsum.photos/200/300",title:"This is a fifth title",description:"This is a fifth description"},
    {image:"https://picsum.photos/800/700",title:"This is a sixth title",description:"This is a sixth description"},
    {image:"https://picsum.photos/300/400",title:"This is a seventh title",description:"This is a seventh description"},
]

const Slider = () => {
  return (
    <div style={{width:"95%", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
<ReactCardSlider slides={slides}/>

    </div>
  )
}

export default Slider
