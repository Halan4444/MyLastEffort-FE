import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { QuizCreateUpdateService } from 'src/app/core/services/quizzes/quiz-create-update.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-quiz-edit-form',
  templateUrl: './user-quiz-edit-form.component.html',
  styleUrls: ['./user-quiz-edit-form.component.scss'],
  providers: [QuizCreateUpdateService]
})
export class UserQuizEditFormComponent implements OnInit {

  faCheck = faCheck;

  constructor(private quizCreateUpdateService: QuizCreateUpdateService) { }

  ngOnInit() {
    this.quizCreateUpdateService.editQuiz();
  }

  get formIsBuild(): boolean {
    return this.quizCreateUpdateService.formIsBuild;
  }

  get correctAnswer(): Array<string> {
    return this.quizCreateUpdateService.correctAnswer;
  }

  get quizCreateForm(): FormGroup {
    return this.quizCreateUpdateService.quizCreateForm;
  }

  get questionsArray(): FormArray {
    return this.quizCreateUpdateService.questionsArray;
  }

  get title(): FormControl {
    return this.quizCreateUpdateService.title;
  }

  get quizOnTime(): FormControl {
    return this.quizCreateUpdateService.quizOnTime;
  }

  get numberAnswersNeededToPass(): FormControl {
    return this.quizCreateUpdateService.numberAnswersNeededToPass;
  }

  get quizWithResult(): FormControl {
    return this.quizCreateUpdateService.quizWithResult;
  }

  get timeInSeconds(): FormControl {
    return this.quizCreateUpdateService.timeInSeconds;
  }

  setCorrectAnswer(value: number, questionNumber: number): void {
    return this.quizCreateUpdateService.setCorrectAnswer(value, questionNumber);
  }

  addQuesion(): void {
    (this.quizCreateUpdateService.questionsArray as FormArray).push(this.quizCreateUpdateService.addQuestionGroup());
  }

  removeQuestion(index: number): void {
    const currentAmountAnswers = this.quizCreateUpdateService.amountAnswers;
    this.quizCreateUpdateService.amountAnswers = currentAmountAnswers - 1;
    this.quizCreateUpdateService.questionsArray.removeAt(index);
  }

  addAnswer(formGroupNumber: number): void {
    this.quizCreateUpdateService.addAnswer(formGroupNumber);
  }

  removeAnswer(formGroupNumber: number, index: number): void {
    this.quizCreateUpdateService.removeAnswer(formGroupNumber, index);
  }

  onSubmit(): void {
    this.quizCreateUpdateService.onSubmitEditQuiz();
  }
}
