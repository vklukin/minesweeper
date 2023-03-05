function OpenPlate(field) {
  switch (field) {
    case "-5":
      return "question-pressed";
    case "-4":
      return "question";
    case "-3":
      return "bomb-died";
    case "-2":
      return "bomb-flagged";
    case "-1":
      return "bomb";
    case "0":
      return "pressed-field";
    case "1":
      return "number-one";
    case "2":
      return "number-two";
    case "3":
      return "number-three";
    case "4":
      return "number-four";
    case "5":
      return "number-five";
    case "6":
      return "number-six";
    case "7":
      return "number-seven";
    case "8":
      return "number-eight";
  }
}

export default OpenPlate;
