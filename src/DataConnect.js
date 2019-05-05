async function getData(){
    var data
    try {
      var parsedata = await fetch("http://localhost:3001",{mode:"cors"})
      data = await parsedata.json()

    } catch(err){
      alert("Unable to access server, please play with Minions for the time being.")

      data = "https://www.muraldecal.com/en/img/fomi030_1-jpg/folder/products-detalle-muestras-grandes/wall-murals-minions.jpg"

    }
    return data
  }


  async function getTagName(id){
    try {
      var data = await fetch(`http://localhost:3001/tags/${id}`,{mode:"cors"})
      var tag =  await data.json()
      return tag[0].tag
    }catch{
      prompt("Unable to Connect to Server")
    }
  }

  function submitTagsToServer(options){
    fetch("http://localhost:3001", {
        method: "post",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify({
          id: options.photoId,
          tags: options.tags
          }
        )
      })
    }
  

export {submitTagsToServer, getData, getTagName}  