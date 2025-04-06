// Set the current year in the footer
const today = new Date();
document.getElementById("currentyear").textContent = today.getFullYear();

// Set the last modified date in the footer
document.getElementById("lastModified").textContent = document.lastModified;

const setTextNode = document.getElementById("lastModified");
setTextNode.textContent = document.lastModified;
setTextNode.inn