const loginButton = document.querySelector(".js-login-button");

loginButton.addEventListener("click", login);

async function login() {
  const username = document.querySelector(".js-username").value;
  const password = document.querySelector(".js-password").value;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/login", {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);

    alert(response.data.message);
    window.location.href = "./index.html";
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
}
