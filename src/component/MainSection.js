import React, { useState,useEffect } from 'react'
import './MainSection.css'
import Gallery from '../assets/index'
import image10 from '../assets/image-10.jpg'

const MainSection = () => {
  const [currentAnswer, setCurrentAnswer] = useState()
  const [imageGroup, setImageGroup] = useState([])
  const [nextAnswer, setNextAnswer] = useState()
  const [change, setChange] = useState(2)
  const [menu, setMenu] = useState(true)
  const [game, setGame] = useState(false)


  const FirstRound = ()=>{

    const randomIndex2 = Math.floor(Math.random() * Gallery.length);
    const selectedImage2 = Gallery[randomIndex2];
    setCurrentAnswer(selectedImage2)

    //Select Random 6 images
    const shuffledImages = Gallery.sort(() => Math.random() - 0.5);
    const selectedImages = shuffledImages.slice(0, 6);

    if(!selectedImages.includes(selectedImage2)){
      const randomIndex = Math.floor(Math.random() * 6);
      selectedImages[randomIndex] = selectedImage2
    }
    setImageGroup(selectedImages);

    const randomIndex = Math.floor(Math.random() * Gallery.length);
    const selectedImage = Gallery[randomIndex];
    setNextAnswer(selectedImage);
  }

  const NextRound = ()=>{


    const shuffledImages = Gallery.sort(() => Math.random() - 0.5);
    const selectedImages = shuffledImages.slice(0, 6);

    if(!selectedImages.includes(nextAnswer)){
      const randomIndex = Math.floor(Math.random() * 6);
      selectedImages[randomIndex] = nextAnswer
    }
    setImageGroup(selectedImages);
    setCurrentAnswer(nextAnswer)

    const randomIndex = Math.floor(Math.random() * Gallery.length);
    const selectedImage = Gallery[randomIndex];
    setNextAnswer(selectedImage);
  }

  const handleClick = (e)=>{
    if(e === currentAnswer){
      NextRound()
      setChange(2)
    }else if(change > 0){
      setChange(change-1)
      alert('Wrong Answer, ' + change + ' left.')
    }else if(change<= 0){
      alert('Game Over.')
      setChange(2)
      setImageGroup([])
      setNextAnswer('')
      setCurrentAnswer('')
      setGame(false)
      setMenu(true)
    }
  }

  const FirstImage = ()=>{
   
  }

  const handleStart = ()=>{
    FirstImage();
    setMenu(false);
    FirstRound();
  
    setTimeout(() => {
      setGame(true)
    }, 1000)

  }
  return (
    <section>
      {menu &&
        <div className='Menu'>
          <div className='Menu-title'>
            <p>Start the game?</p>
          </div>
          <div className='Menu-button'>
            <button className='Menu-button_Start' onClick={()=> {handleStart()}}>Start</button>
            <button className='Menu-button_Exit' onClick={()=> window.close()}>Exit</button>
          </div>
        </div>
      }
      {game ? (
        <>
          <div className='top-section'>
            <div className='top-section_content'>
              <div className='top-section_content-container'>
                <img src={nextAnswer} alt='image'/>
              </div>   
            </div>
          </div>
          <div className='bottom-section'>
            <div className='bottom-section_content'>
              {imageGroup.map((image,index)=>(
                <div className='bottom-section_content-container' key={`Option ${index+1}`}>
                  <img src={image} alt={`Option ${index}`} onClick={()=>handleClick(image)}/>
                </div>
              ))}
            </div>
          </div>
        </>
      ):(
        <div className='FirstImage'>
          {currentAnswer && <img src={currentAnswer} alt='First Image'/>}
        </div>
      )}  
    </section>
    
  )
}

export default MainSection