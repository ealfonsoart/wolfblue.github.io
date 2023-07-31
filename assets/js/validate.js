const shareBtn = document.querySelector(".share-btn");
const shareOptions = document.querySelector(".share-options");

shareBtn.addEventListener("click", () => {
  shareOptions.classList.toggle("active");
});

// Get all share buttons
const shareButtons = document.querySelectorAll(".share-button");

// Add click event listener to each button
shareButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the URL of the current page
    const url = encodeURI(window.location.href);
    const title = encodeURIComponent(
      document.querySelector("title").textContent
    );

    const msg = encodeURIComponent("Hey, I like your work");

    console.log([url, title, msg]);

    // Get the social media platform from the button's class name
    const platform = button.classList[1];

    // Set the URL to share based on the social media platform
    let shareUrl;
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/share?url=${url}&text=${msg}&hashtags=artist,art,painting,alfonso89`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
        break;
      case "mailbox":
        shareUrl = `mailto:enriquealfonso99%40gmail.com?subject=${title}&body=${msg}`;
        break;
    }

    //

    // Open a new window to share the URL
    window.open(shareUrl, "_blank");
  });
});

// *** formvalidations a send using formsubmit

const d = document;

function contactForm() {
  const $form = d.querySelector(".contact-form"),
    $inputs = d.querySelectorAll(".contact-form [required]");

  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;

      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);

        //* INPUT WHIT PATTENR
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }

      if (!pattern) {
        //* INPUT WHIT PATTENR
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();

    const $loader = d.querySelector(".contact-form-loader"),
      $reponse = d.querySelector(".contact-form-response");

    $loader.classList.remove("none");

    fetch("https://formsubmit.co/ajax/wolfdevblue@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        $loader.classList.add("none");
        $reponse.classList.remove("none");
        $reponse.innerHTML = `<p>${json.message}</p>`;
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText ||
          "An error occurred while sending, please try again.";
        $reponse.innerHTML = `<p>Error ${err.status}: ${message} </p>`;
      })
      .finally(() =>
        setTimeout(() => {
          $reponse.classList.add("none");
          $reponse.innerHTML = "";
        }, 3000)
      );
  });
}
d.addEventListener("DOMContentLoaded", contactForm);
