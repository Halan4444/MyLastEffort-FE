import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static answersValidator(control: AbstractControl): ValidationErrors | null {
    const answers: Array<string> = control.value;
    let sameValueInInputs: number;

    answers.forEach((answerA, i) => {
      answers.forEach((answerB, j) => {
        if (i !== j && answerB !== null && answerA === answerB) {
          sameValueInInputs = i;
        }
      });
    });

    return sameValueInInputs ? { sameInputValue: sameValueInInputs } : null;
  }

  static numberAnswersNeededToPassValidator(amountAnswers): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputValue = control.value;
      const invalid = inputValue !== null && (inputValue > amountAnswers._amountAnswers - 1 || inputValue < 1);

      return invalid ? { amountAnswers: true } : null;
    };
  }
}
