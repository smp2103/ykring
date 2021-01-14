import axios from "axios";
import xlsx from "xlsx";




const filterButton = document.getElementById('filterButton')
const postings = document.getElementById('postings')
const join = document.getElementById('join')
const postDate = document.getElementsByClassName('postDate')

// if(postDate) {
//   console.log(1)
//   const date = document.getElementsByClassName('date')
//   console.log(date)
//   const refreshDate = function () {
//     for(let k=0; k<date.length;k++){
//       date[k].innerHTML = timeForToday(date[k].value)
//     }
//   } 
//   setInterval(refreshDate,10000)
// }

var getFile = document.getElementById("getFile")


const previewFiles = function () {
  var preview = document.querySelector('#preview')
  var files = document.querySelector('input[type=file]').files;

  function readAndPreview(file) {

    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var i = new Image();
        i.width = 300
        i.height = 300
        i.src = this.result;
        preview.appendChild(i)

      })
      reader.readAsDataURL(file);


    }
  }
  if (files) {
    [].forEach.call(files, readAndPreview)
  }
}

if (getFile) {
  getFile.onchange = previewFiles;
}


if (join) {
  join.onchange = function (e) {
    console.log("onchange")
    var files = e.target.files; //input file 객체를 가져온다.
    var i, f, json;
    for (i = 0; i != files.length; ++i) {
      f = files[i];
      var reader = new FileReader(); //FileReader를 생성한다.         
      
      //성공적으로 읽기 동작이 완료된 경우 실행되는 이벤트 핸들러를 설정한다.
      reader.onload = function (e) {

        var data = e.target.result; //FileReader 결과 데이터(컨텐츠)를 가져온다.

        //바이너리 형태로 엑셀파일을 읽는다.
        var workbook = xlsx.read(data, {
          type: 'binary'
        });

        //엑셀파일의 시트 정보를 읽어서 JSON 형태로 변환한다.
        workbook.SheetNames.forEach(function (item, index, array) {
          var EXCEL_JSON = xlsx.utils.sheet_to_json(workbook.Sheets[item]);
          console.log(EXCEL_JSON)
          const name = document.getElementById("name")
          const sex = document.getElementById("sex")
          const mbti = document.getElementById("mbti")
          const univ = document.getElementById("univ")
          const description = document.getElementById("description")
          const style = document.getElementById("style")
          const age = document.getElementById("age")
          const link = document.getElementById("link")
          name.value = EXCEL_JSON[0].name
          sex.value = EXCEL_JSON[0].sex
          mbti.value =EXCEL_JSON[0].mbti
          univ.value =EXCEL_JSON[0].univ
          description.value =EXCEL_JSON[0].description
          style.value =EXCEL_JSON[0].style
          age.value = EXCEL_JSON[0].age
          link.value = EXCEL_JSON[0].link
          
        }); //end. forEach

      }; //end onload

      //파일객체를 읽는다. 완료되면 원시 이진 데이터가 문자열로 포함됨.
      reader.readAsBinaryString(f);
    } //end. for
  }

  
  

}
// if(image){
//   console.log(image)
//     image.onchange = function() {
//         const imageList = image.files;
//         const reader = new FileReader();

//         reader.readAsDataURL(imageList[0]);
//         reader.onload = function() {
//             imagePreview.src = reader.result;
//         }
//     }
// }

if (window.location.href.split('/').pop() === "mhome") {
  const maleButton = document.getElementById('maleButton')
  const maleText = document.getElementById('maleText')
  maleButton.src = "/static/1.svg"
  maleText.style.color = "#6a35ee"
}
if (window.location.href.split('/').pop() === "fmhome") {
  const maleButton = document.getElementById('femaleButton')
  const maleText = document.getElementById('femaleText')
  maleButton.src = "/static/1.svg"
  maleText.style.color = "#6a35ee"
}


if (window.location.href.split('/').pop() === "me") {
  const maleButton = document.getElementById('myButton')
  const maleText = document.getElementById('myText')
  maleButton.src = "/static/4.svg"
  maleText.style.color = "#6a35ee"
}

if (postings) {
  const communityButton = document.getElementById('communityButton')
  const communityText = document.getElementById('communityText')
  communityButton.src = "/static/6.svg"
  communityText.style.color = "#6a35ee";
}


if (filterButton) {
  filterButton.addEventListener('click', function () {
    let univValue = document.getElementById('univFilter').value;
    let mbtiValue = document.getElementById('mbtiFilter').value;
    let univFilteredTags = document.getElementsByClassName(univValue);
    let mbtiFilteredTags = document.getElementsByClassName(mbtiValue);

    let userDatas = document.getElementsByClassName('grid-container')


    for (let k of userDatas) {
      k.classList.add('filtered')
    }

    if (univValue || mbtiValue) {

      let filtered = document.getElementsByClassName(`${mbtiValue} ${univValue}`)
      for (let a of filtered) {
        a.classList.remove('filtered')
      }
    } else {
      for (let i of mbtiFilteredTags) {
        i.classList.remove('filtered')
      }
      for (let l of univFilteredTags) {
        l.classList.remove('filtered')
      }
    }



  })
}


const refresh = document.getElementById('refresh')
if (refresh) {
  refresh.addEventListener('click', function () {
    const refreshed = document.getElementsByClassName('filtered')
    for (let k of refreshed) {
      k.classList.remove('filtered')
    }
  })

}




const lb = document.querySelectorAll('.like')
const pb = document.querySelectorAll('.postlike')
if (pb) {
  pb.forEach(el => el.addEventListener('click', async function () {
    const postId = this.value;
    const likeNumb = this.nextSibling
    const response = await axios({
      method: 'post',
      url: `/api/postlike`,
      data: {
        postId
      }
    })
    if (response.status === 200) {
      console.log(response)
      addLike(likeNumb);
    } else if (response.status === 201) {
      minusLike(likeNumb);
    }
  }))

}


if (lb) {
  lb.forEach(el => el.addEventListener('click', async function () {
    const userId = this.value;
    const likeNumb = this.nextSibling
    const response = await axios({
      method: 'post',
      url: `/api/like`,
      data: {
        userId
      }
    })
    if (response.status === 200) {
      console.log(response)
      addLike(likeNumb);
    } else if (response.status === 201) {
      minusLike(likeNumb);
    }
  }))
}


const addLike = (node) => {
  node.innerHTML = parseInt(node.innerHTML, 10) + 1;
}

const minusLike = (node) => {
  node.innerHTML = parseInt(node.innerHTML, 10) - 1;
}






// const sendLike = async() => {
//   const userId = this.value;
//   console.log("sendLike")

//   const response = await axios({
//     method: 'post',
//     url: `/api/like`,
//     data: {
//        userId
//     }
//   }); 



//   if( response.status === 200){
//     console.log(response)
//     addLike();
//   } else if(response.status === 201){
//     minusLike();
//   }
// }

// const addComment = (answer,user) => {
//   answerList.innerHTML = answer;
//   console.log("add")


// };

// const sendComment = async comment => {
//   const postId = window.location.href.split("/posting/")[1];
//   console.log(comment)
//   const response = await axios({
//     url: `/api/${postId}/comment`,
//     method: "POST",
//     data: {
//       comment
//     }
//   }); 
//   if (response.status === 200) {
//     console.log(response)
//     let answer = response.data[0];
//     let user = response.data[1];
//     addComment(answer,user);
//   }
// };

// const handleSubmit = (event) => {
//   console.log("button click")
//   event.preventDefault();
//   const answerInput = addAnswerForm.querySelector("textarea")
//   let comment = answerInput.value;
//   console.log(comment)
//   sendComment(comment);
// };

// const handleClick = (event) => {

//   event.preventDefault();
//   console.log('handleclicks')
//   sendLike();


// }


// function init() {

//   likeButton.addEventListener("click",handleClick);
// }

// init();