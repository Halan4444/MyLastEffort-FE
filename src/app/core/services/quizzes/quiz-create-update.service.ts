import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
// import { CustomValidators } from 'src/app/shared/custom.validators';
import { FirebaseService } from '../firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/account/authentication/authentication.service';
import {CustomValidators} from '../../../shared/components/custom.validators';

@Injectable({
  providedIn: 'root'
})
export class QuizCreateUpdateService {
  private _amountAnswers = 1;
  private _correctAnswers: Array<number> = [];
  private _quizId: string;
  private _correctAnswer = [];
  private _formIsBuild = false;
  private _quizCreateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
    ) {
      this.route.queryParams.subscribe(queryParams => {
        this._quizId ? this.editQuiz() : this._quizCreateForm = this.createNewQuizForm();
      });
      this.setConditionalValidators();
    }

  createNewQuizForm(): FormGroup {
    return this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      config: this.formBuilder.group({
        quizWithResult: new FormControl(true),
        quizOnTime: new FormControl(true),
        numberAnswersNeededToPass: new FormControl(null,
          [
            Validators.required,
            CustomValidators.numberAnswersNeededToPassValidator(this)
          ]),
        timeInSeconds: new FormControl(null, [Validators.required, Validators.min(1)])
      }),
      questions: this.formBuilder.array([this.addQuestionGroup()])
    });
  }

  editQuiz(): void {
    this.route.params.subscribe(params => {
      this._quizId = params.id;
    });

    const loggedUser = this.authenticationService.user;
    const quizQuestions = [];
    let answers = [];

    this.firebaseService.getUserQuizByid(loggedUser.uid, this._quizId).subscribe(quiz => {
      quiz.questions.forEach(question => {
        answers = [];
        this._amountAnswers += 1;
        this._correctAnswer.push(question.correctAnswer);

        question.answers.forEach((answer, index) => {
          if (question.correctAnswer === answer) {
            this._correctAnswers.push(index);
          }
          answers.push(new FormControl(answer, [Validators.required]));
        });

        const questionGroup = this.formBuilder.group({
          question: new FormControl(question.question, [Validators.required]),
          answers: this.formBuilder.array(
            [
              ...answers
            ],
            [Validators.required, CustomValidators.answersValidator]
          )
        });
        quizQuestions.push(questionGroup);
      });

      this._quizCreateForm = this.formBuilder.group({
        title: new FormControl(quiz.title, [Validators.required]),
        config: this.formBuilder.group({
          quizWithResult: new FormControl(quiz.config.quizWithResult.value),
          quizOnTime: new FormControl(quiz.config.quizOnTime.value),
          numberAnswersNeededToPass: new FormControl(quiz.config.numberAnswersNeededToPass,
            [
              Validators.required,
              CustomValidators.numberAnswersNeededToPassValidator(this)
            ]),
          timeInSeconds: new FormControl(quiz.config.timeInSeconds, [Validators.required, Validators.min(1)])
        }),
        questions: this.formBuilder.array([...quizQuestions])
      });
      this._formIsBuild = true;
      this.setConditionalValidators();
    });
  }

  setConditionalValidators(): void {
    this.quizWithResult.valueChanges.subscribe(value => {
      if (value === true) {
        this.numberAnswersNeededToPass.setValidators(
          [
            Validators.required,
            CustomValidators.numberAnswersNeededToPassValidator(this)
          ]
        );
        this.numberAnswersNeededToPass.updateValueAndValidity();
      } else {
        this.numberAnswersNeededToPass.setValidators(null);
        this.numberAnswersNeededToPass.reset();
      }
    });

    this.quizOnTime.valueChanges.subscribe(value => {
      if (value === true) {
        this.timeInSeconds.setValidators(
          [
            Validators.required,
            Validators.min(1)
          ]
        );
        this.timeInSeconds.updateValueAndValidity();
      } else {
        this.timeInSeconds.setValidators(null);
        this.timeInSeconds.reset();
      }
    });
  }

  setQuizId(id: string): void {
    this._quizId = id;
  }

  addQuestionGroup(): FormGroup {
    this._amountAnswers += 1;
    this._correctAnswers.push(0);

    return this.formBuilder.group({
      question: new FormControl(null, [Validators.required]),
      answers: this.formBuilder.array(
        [
          new FormControl(null, [Validators.required]),
          new FormControl(null, [Validators.required]),
          new FormControl(null, [Validators.required]),
          new FormControl(null, [Validators.required])
        ],
        [Validators.required, CustomValidators.answersValidator]
      )
    });
  }

  get amountAnswers(): number {
    return this._amountAnswers;
  }

  set amountAnswers(value: number) {
    this._amountAnswers = value;
  }

  get correctAnswer(): Array<string> {
    return this._correctAnswer;
  }

  get formIsBuild(): boolean {
    return this._formIsBuild;
  }

  get quizCreateForm(): FormGroup {
    return this._quizCreateForm;
  }

  get questionsArray(): FormArray {
    return (this._quizCreateForm.get('questions') as FormArray);
  }

  get title(): FormControl {
    return this._quizCreateForm.get('title') as FormControl;
  }

  get quizOnTime(): FormControl {
    return (this._quizCreateForm.get('config') as FormArray).controls['quizOnTime'];
  }

  get numberAnswersNeededToPass(): FormControl {
    return (this._quizCreateForm.get('config') as FormArray).controls['numberAnswersNeededToPass'];
  }

  get quizWithResult(): FormControl {
    return (this._quizCreateForm.get('config') as FormArray).controls['quizWithResult'];
  }

  get timeInSeconds(): FormControl {
    return (this._quizCreateForm.get('config') as FormArray).controls['timeInSeconds'];
  }

  setCorrectAnswer(value: number, questionNumber: number): void {
    this._correctAnswers[questionNumber] = value;
  }

  addQuesion(): void {
    (this.questionsArray as FormArray).push(this.addQuestionGroup());
  }

  removeQuestion(index: number): void {
    this._amountAnswers -= 1;
    this.questionsArray.removeAt(index);
  }

  addAnswer(formGroupNumber: number): void {
    const control = (this._quizCreateForm.controls['questions'] as FormArray).at(formGroupNumber).get('answers');
    (control as FormArray).push(new FormControl(null, [Validators.required]));
  }

  removeAnswer(formGroupNumber: number, index: number): void {
    const control = (this._quizCreateForm.controls['questions']as FormArray).at(formGroupNumber).get('answers');
    (control as FormArray).removeAt(index);
  }

  onSubmitCreateQuiz(): void {
    this.firebaseService.createNewQuiz(this._quizCreateForm.value, this._correctAnswers);
    this._quizCreateForm.reset();
    this.router.navigate(['/home']);
  }

  onSubmitEditQuiz(): void {
    this.firebaseService.updateUserQuiz(this._quizId, this._quizCreateForm.value, this._correctAnswers);
    this.router.navigate(['/dashboard/list']);
  }
}
