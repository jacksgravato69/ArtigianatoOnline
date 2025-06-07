document.addEventListener('DOMContentLoaded', () => {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/public/service-worker.js')
      .then(reg => {

        console.log(reg.scope);

      })
      .catch(err => {

        console.error(err);
        
      });
  } 

});