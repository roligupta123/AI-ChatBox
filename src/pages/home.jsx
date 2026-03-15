import React, { useContext, useState } from 'react'
import '../App.css'
import Chat from './chat'
import { RiImageAiLine, RiImageAddLine } from 'react-icons/ri'
import { MdChatBubbleOutline } from 'react-icons/md'
import { FiPlus } from 'react-icons/fi'
import { FaArrowUpLong } from 'react-icons/fa6'
import { dataContext, prevUser, user } from '../context/UserContext'
import { generateResponse } from '../gemini'
import { query } from '../hugging_face'

const Home = () => {
  const { startRes,setStartRes,input,setInput,popUp,setPopUp,feature,setFeature,showResult,setShowResult,
    prevFeature,setPrevFeature,genImgUrl,setGenImgUrl
   } = 
  useContext(dataContext);
  
  async function handleSubmit(e) {
    setStartRes(true)
    setPrevFeature(feature)
    
    setShowResult("")
    prevUser.data=user.data;
    prevUser.mime_type=user.mime_type;
    prevUser.imgUrl=user.imgUrl;
    prevUser.prompt=input
    user.data = null
    user.mime_type= null
    user.imgUrl= null
    setInput("")
    let result = await generateResponse()
    setShowResult(result)
    setFeature("chat")
    
  }

  function handleImage(e){
    setFeature("uploadImg")
    let file = e.target.files[0]

    let reader = new FileReader()
    reader.onload=(event)=>{
      let base64 = event.target.result.split(",")[1]
      user.data = base64
      user.mime_type= file.type
      user.imgUrl=`data:${user.mime_type};base64,${user.data}`
    }
    reader.readAsDataURL(file)
    // console.log(file);
    
  }

async function handleGenerateImg(){
    setStartRes(true)
    setPrevFeature(feature)
    setGenImgUrl("")
    setInput("")
    prevUser.prompt=input
    let result = await query ().then((e)=>{
    let url = URL.createObjectURL(e)
    setGenImgUrl(url)
    
  })
  // setInput("")
  setFeature("chat")
}

  return (
    <div className='home'>
      <nav>
        <div className="logo" onClick={()=>{
          setStartRes(false)
          setFeature("chat")
          user.data = null
          user.mime_type= null
          user.imgUrl= null
          setPopUp(false)
        }}>
          Smart AI Bot
        </div>
      </nav>

      <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage}/>

      {!startRes ? (     
        <div className="hero">
          <span className='tag'>What can help with ?</span>
          <div className="cate">
            <div className="uploadImg" onClick={()=>{
              document.getElementById("inputImg").click()
            }}>
              <RiImageAddLine className='svg' />
              <span>Upload Image</span>
            </div>
            <div className="genImg" onClick={()=>setFeature("genImg")}>
              <RiImageAiLine className='svg' />
              <span>Generate Image</span>
            </div>
            <div className="chat" onClick={()=>setFeature("chat")}>
              <MdChatBubbleOutline className='svg' />
              <span>Let's Chat</span>
            </div>
          </div>
        </div>
      ) : (
        <Chat/>  
      )}

      <form className='input-box' onSubmit={(e)=>{
        e.preventDefault();
        if(input){
          if(feature=='genImg'){
            handleGenerateImg()
          }
          else{
            handleSubmit()
          }
          }
        }
       }>

        <img src={user.imgUrl} alt="" id='im'/>
        {popUp? ( <div className="pop-up">
          <div className="select-up" onClick={()=>{
            setPopUp(false)
            setFeature("chat")
              document.getElementById("inputImg").click()
            }}>
              <RiImageAddLine />
              <span>Upload Image</span>
          </div>
          <div className="select-gen" onClick={()=>{
            setPopUp(false)
            setFeature("genImg")}}>
              <RiImageAiLine />
              <span>Generate Image</span>
          </div>
        </div> ):( null )}
        
        <div id='add' onClick={()=>{
            setPopUp(prev=>!prev)
        }}>
          {feature=='genImg'?<RiImageAiLine id="genimg"/>:<FiPlus />}
          
        </div>
        <input
          type="text"
          placeholder='Ask Something....'
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        {input?
        <button id='submit'>
          <FaArrowUpLong />
        </button>:null}
        
      </form>
    </div>
  )
}

export default Home
