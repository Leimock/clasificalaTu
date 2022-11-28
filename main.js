import './style.css'

document.getElementById('search').addEventListener('click', getData)

async function getData() {
  let checkboxes = document.getElementsByName("hat")
  let selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked==true).map(ch => ch.value)

  let downhat = document.getElementById('dcap').value
  let spore = document.getElementById('spore').value

  let fungo

  try {
    const response = await fetch("https://raw.githubusercontent.com/fosskers/myshroom-api/master/public/mushrooms.json")
    fungo = await response.json()

    for (let i = 0; i< fungo.length; i++) {

      let mine = selectedCboxes.sort()
      let compare = fungo[i].attributes.cap.sort()

      if (JSON.stringify(compare) == JSON.stringify(mine) && fungo[i].attributes.hymenium.includes(downhat) && fungo[i].attributes.sporePrint.includes(spore)) {
        
        document.getElementById('name').innerHTML = "Nombre: " + fungo[i].latin

        if (fungo[i].attributes.poisonous) document.getElementById('poison').innerHTML = "Venenosa: Si"
        else document.getElementById('poison').innerHTML = "Venenosa: No"

        if (fungo[i].attributes.deadly) document.getElementById('deadly').innerHTML = "Mortal: Si"
        else document.getElementById('deadly').innerHTML = "Mortal: No"

        break;
      }

    }

  } catch (Exception) {
    console.log(Exception)
  }

}

