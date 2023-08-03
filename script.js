// script.js

const form = document.querySelector("form");
const formSteps = [...form.querySelectorAll(".form-step")];
const stepProgress = [...form.querySelectorAll(".step-progress strong")];

let currentStep = 0;

stepProgress[currentStep].classList.add("active");

form.addEventListener("click", (e) => {
  if (e.target.dataset.action === "next") {
    if (isValidInputs()) {
      formSteps[currentStep].classList.remove("active");
      currentStep++;
      formSteps[currentStep].classList.add("active");
      updateStepProgress();
    }
  } else if (e.target.dataset.action === "prev") {
    formSteps[currentStep].classList.remove("active");
    currentStep--;
    formSteps[currentStep].classList.add("active");
    updateStepProgress();
  }
});

function updateStepProgress() {
  stepProgress.forEach((step, idx) => {
    step.classList.remove("done");

    if (idx < currentStep + 1) {
      step.classList.add("active");
    }

    if (idx < currentStep) {
      step.classList.add("done");
    }
  });
}

function isValidInputs() {
  const currentFormStep = formSteps[currentStep];
  const formFields = [
    ...currentFormStep.querySelectorAll("input"),
    ...currentFormStep.querySelectorAll("textarea"),
  ];
  return formFields.every((input) => input.reportValidity());
}

/* animação */
formSteps.forEach((formStep) => {
  function addHide() {
    formStep.classList.add("hide");
  }
  formStep.addEventListener("animationend", (e) => {
    addHide();
    formSteps[currentStep].classList.remove("hide");
  });
});
