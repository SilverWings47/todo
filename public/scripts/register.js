const usernameInput = document.querySelectorAll("input")[0];
const passwordInput = document.querySelectorAll("input")[1];
const submitBtn = document.querySelector("button");
const errorMsg = document.querySelector(".error-msg");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (usernameInput.value === "" || passwordInput.value === "") return;

  if (passwordInput.value.length < 6) {
    errorMsg.classList.add("active");
    errorMsg.textContent = "Password should be > 6 characters";
    return;
  } else {
    errorMsg.classList.remove("active");
  }

  const user = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  const response = await fetch("http://localhost:3000/createAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.status === 201) {
    window.location.href = "/index";
  } else {
    const data = await response.json();
    errorMsg.textContent = data.message;
    errorMsg.classList.add("active");
  }
});
