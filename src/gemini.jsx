import { prevUser } from "./context/UserContext";

const api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyD6mataOmk8H9hxAzRhtCMXH_iOZjO1Q3U"

export async function generateResponse(){
    let requestOptions = {
        method: 'POST',
        Headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [
            {
            "parts": [
                {"text": prevUser.prompt},
                prevUser.data?[
                    {"inline_data": {
                    "mime_type": prevUser.mime_type,
                    "data": prevUser.data
                }}
                ]:[]
                
            ]
            }
        ]
        })
    }

    try{
        let response = await fetch(api_url, requestOptions);
        let data = await response.json();
        let apiResponse = data.candidates[0].content.parts[0].text.replace('/\*\*(.*?)\*\*/g',"$1").trim()
        return apiResponse;
    }
    catch{

    }
}
