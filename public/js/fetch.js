export default get = (url) => {
          return  fetch(url).then((responseJson) => {
                return responseJson.json();
            })
         }

export const post = (url = "http://localhost:3000/config", data) => {
        return  fetch(url, {
                method: 'post',
                
                headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                    },
                
                body: JSON.stringify({
                        data
                    })
                })
            }
