import React, { useContext } from 'react'
import { dataContext, prevUser } from '../context/UserContext'

const Chat = () => {
  let {input,setInput,prevInput,setPrevInput,showResult,setShowResult,feature,setFeature,
    prevFeature,setPrevFeature,genImgUrl,setGenImgUrl
  } = useContext(dataContext)
  return (
    <div className='chat-page'>
      <div className="user">
        {prevFeature=='uploadImg'?<>
        <img src={prevUser.imgUrl} alt="" />
        <span>{prevUser.prompt}</span></>:<span>{prevUser.prompt}</span>}
        
      </div>
      <div className="ai">
        {prevFeature=='genImg'?<>
        {!genImgUrl?<span>Generating image...</span>:<img src={genImgUrl} alt="" />}</>
        :!showResult?<span>Loading...</span>:<span>{showResult}</span>
        }
      </div>
    </div>
  )
}

export default Chat