$("#btnSubmitLogin").click(function () {
  let email = $("#email").val();
  let pasword = $("#password").val();

  if (email === "" || pasword === "") {
    alert("algun campo esta vacio");
  } else {
    let dataString = { email, pasword };

    $.ajax({
      //  url: 'http://localhost:8000/auth'  ,
      url: "https://backdev-humble-zebra-zj.mybluemix.net/auth",
      method: "POST",
      data: JSON.stringify(dataString),
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      success: (response) => {
        const { status, token, vim, user } = response;
        if (status === "ok") {
          sessionStorage.setItem("apitoken", token);
          sessionStorage.setItem("vim", vim),
            sessionStorage.setItem("user", JSON.stringify(user));
          $(location).attr("href", "index.html");
        }
      }, //success
      error: (error) => {
        let { responseJSON } = error;
        if (responseJSON.message === "No registrado") {
          $(location).attr("href", "signup.html");
        } else {
          alert("No se encontraron concidencias");
        }
      },
    });
  }
});
