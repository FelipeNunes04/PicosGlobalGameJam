 $(document).ready(function () {
   if ((window.screen.availWidth < 479))
       document.getElementById("img").src = "images/topo/logo_mobile.png";
   else
       document.getElementById("img").src = "images/topo/logo.png";
})