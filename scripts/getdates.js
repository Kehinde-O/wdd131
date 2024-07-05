const today = new Date();

document.getElementById("currentyear").textContent = today.getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const setTextNode = document.getElementById("lastModified");
setTextNode.textContent = document.lastModified;
setTextNode.inn