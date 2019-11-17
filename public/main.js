var like = document.getElementsByClassName("fas fa-trophy");
var dislike = document.getElementsByClassName("fas fa-poo");
var trash = document.getElementsByClassName("fa-trash");

Array.from(like).forEach(function(element) {
      element.addEventListener('click', function(){
        var name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const like = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        const dislike = parseFloat(this.parentNode.parentNode.childNodes[9].innerText)
        fetch('talk', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'team': name,
            'like': like,
            'dislike': dislike,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('talk', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'team': name,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
