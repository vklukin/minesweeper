export function RenderTimer(counter, obj) {
  let countes = counter.toString().split("");

  if (countes.length === 1) {
    obj.Second.classList.value = "counter counter-zero";
    obj.First.classList.value = "counter counter-zero";
    switch (countes[0]) {
      case "0":
        obj.Third.classList.value = "counter counter-zero";
        break;
      case "1":
        obj.Third.classList.value = "counter counter-one";
        break;
      case "2":
        obj.Third.classList.value = "counter counter-two";
        break;
      case "3":
        obj.Third.classList.value = "counter counter-three";
        break;
      case "4":
        obj.Third.classList.value = "counter counter-four";
        break;
      case "5":
        obj.Third.classList.value = "counter counter-five";
        break;
      case "6":
        obj.Third.classList.value = "counter counter-six";
        break;
      case "7":
        obj.Third.classList.value = "counter counter-seven";
        break;
      case "8":
        obj.Third.classList.value = "counter counter-eight";
        break;
      case "9":
        obj.Third.classList.value = "counter counter-nine";
        break;
    }
  }

  if (countes.length === 2) {
    switch (countes[0]) {
      case "0":
        obj.Second.classList.value = "counter counter-zero";
        break;
      case "1":
        obj.Second.classList.value = "counter counter-one";
        break;
      case "2":
        obj.Second.classList.value = "counter counter-two";
        break;
      case "3":
        obj.Second.classList.value = "counter counter-three";
        break;
      case "4":
        obj.Second.classList.value = "counter counter-four";
        break;
      case "5":
        obj.Second.classList.value = "counter counter-five";
        break;
      case "6":
        obj.Second.classList.value = "counter counter-six";
        break;
      case "7":
        obj.Second.classList.value = "counter counter-seven";
        break;
      case "8":
        obj.Second.classList.value = "counter counter-eight";
        break;
      case "9":
        obj.Second.classList.value = "counter counter-nine";
        break;
    }

    switch (countes[1]) {
      case "0":
        obj.Third.classList.value = "counter counter-zero";
        break;
      case "1":
        obj.Third.classList.value = "counter counter-one";
        break;
      case "2":
        obj.Third.classList.value = "counter counter-two";
        break;
      case "3":
        obj.Third.classList.value = "counter counter-three";
        break;
      case "4":
        obj.Third.classList.value = "counter counter-four";
        break;
      case "5":
        obj.Third.classList.value = "counter counter-five";
        break;
      case "6":
        obj.Third.classList.value = "counter counter-six";
        break;
      case "7":
        obj.Third.classList.value = "counter counter-seven";
        break;
      case "8":
        obj.Third.classList.value = "counter counter-eight";
        break;
      case "9":
        obj.Third.classList.value = "counter counter-nine";
        break;
    }
  }

  if (countes.length === 3) {
    switch (countes[0]) {
      case "0":
        obj.First.classList.value = "counter counter-zero";
        break;
      case "1":
        obj.First.classList.value = "counter counter-one";
        break;
      case "2":
        obj.First.classList.value = "counter counter-two";
        break;
      case "3":
        obj.First.classList.value = "counter counter-three";
        break;
      case "4":
        obj.First.classList.value = "counter counter-four";
        break;
      case "5":
        obj.First.classList.value = "counter counter-five";
        break;
      case "6":
        obj.First.classList.value = "counter counter-six";
        break;
      case "7":
        obj.First.classList.value = "counter counter-seven";
        break;
      case "8":
        obj.First.classList.value = "counter counter-eight";
        break;
      case "9":
        obj.First.classList.value = "counter counter-nine";
        break;
    }

    switch (countes[1]) {
      case "0":
        obj.Second.classList.value = "counter counter-zero";
        break;
      case "1":
        obj.Second.classList.value = "counter counter-one";
        break;
      case "2":
        obj.Second.classList.value = "counter counter-two";
        break;
      case "3":
        obj.Second.classList.value = "counter counter-three";
        break;
      case "4":
        obj.Second.classList.value = "counter counter-four";
        break;
      case "5":
        obj.Second.classList.value = "counter counter-five";
        break;
      case "6":
        obj.Second.classList.value = "counter counter-six";
        break;
      case "7":
        obj.Second.classList.value = "counter counter-seven";
        break;
      case "8":
        obj.Second.classList.value = "counter counter-eight";
        break;
      case "9":
        obj.Second.classList.value = "counter counter-nine";
        break;
    }

    switch (countes[2]) {
      case "0":
        obj.Third.classList.value = "counter counter-zero";
        break;
      case "1":
        obj.Third.classList.value = "counter counter-one";
        break;
      case "2":
        obj.Third.classList.value = "counter counter-two";
        break;
      case "3":
        obj.Third.classList.value = "counter counter-three";
        break;
      case "4":
        obj.Third.classList.value = "counter counter-four";
        break;
      case "5":
        obj.Third.classList.value = "counter counter-five";
        break;
      case "6":
        obj.Third.classList.value = "counter counter-six";
        break;
      case "7":
        obj.Third.classList.value = "counter counter-seven";
        break;
      case "8":
        obj.Third.classList.value = "counter counter-eight";
        break;
      case "9":
        obj.Third.classList.value = "counter counter-nine";
        break;
    }
  }
}

export const ClearTimer = (obj) => {
  obj.timerFirstRef.current.classList.value = "counter counter-zero";
  obj.timerSecondRef.current.classList.value = "counter counter-zero";
  obj.timerThirdRef.current.classList.value = "counter counter-zero";
};

export const CountFlags = (arr, obj) => {
  let counter = 40;
  let arrLength = arr.size;

  counter = counter - arrLength;

  RenderTimer(counter, obj);
};

export const ClearFlags = (obj) => {
  obj.counterFirstRef.current.classList.value = "counter counter-zero";
  obj.counterSecondRef.current.classList.value = "counter counter-four";
  obj.counterThirdRef.current.classList.value = "counter counter-zero";
};
