const registerButton = document.querySelector(".js-register-button");

registerButton.addEventListener("click", register);

async function register() {
  const username = document.querySelector(".js-username").value;
  const password = document.querySelector(".js-password").value;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/register", {
      username,
      password,
    });

    alert(response.data.message);
    window.location.href = "./login.html";
  } catch (error) {
    alert(error.response?.data?.message || "Registration Failed");
  }
}
