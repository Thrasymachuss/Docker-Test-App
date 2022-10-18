(function () {
  const rootUrl = window.location.origin;

  const btns = document.querySelectorAll(".btn");
  const pageSections = document.querySelectorAll(".page-section");
  const nameInfo = document.querySelector("#name-info");
  const colorInfo = document.querySelector("#color-info");
  const inputName = document.querySelector("#name");
  const inputColor = document.querySelector("#color");
  const form = document.querySelector("#form");

  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      pageSections.forEach((section) => section.classList.toggle("active"));
    })
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    nameInfo.textContent = inputName.value;
    colorInfo.textContent = inputColor.value;
    fetch(`${rootUrl}/update-user`, {
      method: "POST",
      mode: "same-origin",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ name: inputName.value, color: inputColor.value }),
    });
  });

  (async function () {
    try {
      const res = await fetch(`${rootUrl}/user-info`);
      const data = await res.json();
      nameInfo.textContent = inputName.value = data.name;
      colorInfo.textContent = inputColor.value = data.color;
    } catch (error) {
      console.warn("Something went wrong.", error);
    }
  })();
})();
