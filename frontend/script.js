document.addEventListener("DOMContentLoaded", function () {
  // Handle form switching
  document
    .getElementById("showRegister")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("registerForm").style.display = "block";
    });

  document
    .getElementById("showLogin")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("registerForm").style.display = "none";
      document.getElementById("loginForm").style.display = "block";
    });

  // Login form submission
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var email = this.elements["email"].value;
      var password = this.elements["password"].value;

      $.ajax({
        url: "http://localhost:3000/api/auth/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email: email, password: password }),
        success: function (data) {
          sessionStorage.setItem("authToken", data.token);
          window.location.href = "dashboard/dashboard.html";
        },
        error: function (xhr) {
          alert("Login failed: " + xhr.responseText);
        },
      });
    });

  // Registration form submission
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var firstname = this.elements["firstname"].value;
      var lastname = this.elements["lastname"].value;
      var address = this.elements["address"].value;
      var email = this.elements["email"].value;
      var password = this.elements["password"].value;

      $.ajax({
        url: "http://localhost:3000/api/auth/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          address: address,
          email: email,
          password: password,
        }),
        success: function (data) {
          alert("Registration successful. Please log in.");
          document.getElementById("registerForm").style.display = "none";
          document.getElementById("loginForm").style.display = "block";
        },
        error: function (xhr) {
          alert("Registration failed: " + xhr.responseText);
        },
      });
    });
});
