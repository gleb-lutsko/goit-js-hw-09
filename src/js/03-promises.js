const createBtn = document.querySelector('button[type="submit"]');
const amountInput = document.querySelector('input[name="amount"]');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
createBtn.addEventListener('click', onSubmit)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(evt) {
  evt.preventDefault();
  for (let i = 0; i < Number(amountInput.value); i += 1){
    const position = i + 1;
    const delay = Number(delayInput.value) + Number(stepInput.value * i);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  };
}