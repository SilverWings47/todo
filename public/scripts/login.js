const usernameInput = document.querySelectorAll("input")[0];
const passwordInput = document.querySelectorAll("input")[1];
const submitBtn = document.querySelector("button");
const errorMsg = document.querySelector(".error-msg");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if(usernameInput.value === '' || passwordInput.value === '') return;

  const user = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  const response = await fetch("http://localhost:3000/auth", {
    method: "POST",
    credentials : "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  console.log(data);
  if(response.status === 200) {
    
    window.location.href = '/index';
  }else { 
    errorMsg.textContent = data.message;
    errorMsg.classList.add("active");
  }
});
