import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseAddComponent } from './course/course-add/course-add.component';
import { CourseCategoryComponent } from './course/course-category/course-category.component';
import { CourseLanguageComponent } from './course/course-language/course-language.component';
import { CourseTagComponent } from './course/course-tag/course-tag.component';
import { CourseTypeComponent } from './course/course-type/course-type.component';
import { CourseCategoryAddComponent } from './course/course-category/course-category-add/course-category-add.component';
import { CourseLanguageAddComponent } from './course/course-language/course-language-add/course-language-add.component';
import { CourseTagAddComponent } from './course/course-tag/course-tag-add/course-tag-add.component';
import { CourseTypeAddComponent } from './course/course-type/course-type-add/course-type-add.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { StudentsComponent } from './students/students.component';
import { QuestionsComponent } from './questions/questions.component';
import { AnswersComponent } from './answers/answers.component';
import { PaymentsComponent } from './payments/payments.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { QuestionAddComponent } from './questions/question-add/question-add.component';
import { AnswerAddComponent } from './answers/answer-add/answer-add.component';
import { PaymentAddComponent } from './payments/payment-add/payment-add.component';

const routes: Routes = [
  { path: 'course', component: CourseComponent },
  { path: 'course/add', component: CourseAddComponent },

  { path: 'course-category', component: CourseCategoryComponent },
  { path: 'course-category/add', component: CourseCategoryAddComponent },
  { path: 'course-category/edit/:id', component: CourseCategoryAddComponent },

  { path: 'course-language', component: CourseLanguageComponent },
  { path: 'course-language/add', component: CourseLanguageAddComponent },
  { path: 'course-language/edit/:id', component: CourseLanguageAddComponent },

  { path: 'course-tag', component: CourseTagComponent },
  { path: 'course-tag/add', component: CourseTagAddComponent },
  { path: 'course-tag/edit/:id', component: CourseTagAddComponent },

  { path: 'course-type', component: CourseTypeComponent },
  { path: 'course-type/add', component: CourseTypeAddComponent },
  { path: 'course-type/edit/:id', component: CourseTypeAddComponent },

  { path: 'users', component: UsersComponent },
  { path: 'user/add', component: UserAddComponent },
  {path:'user/edit/:id',component:UserAddComponent},

  { path: 'roles', component: RolesComponent },
  { path: 'role/add', component: RoleAddComponent },
  { path: 'role/edit/:id', component: RoleAddComponent },

  { path: 'students', component: StudentsComponent },
  { path: 'student/add', component: StudentAddComponent },
  { path: 'student/edit/:id', component: StudentAddComponent },


  { path: 'questions', component: QuestionsComponent },
  { path: 'question/add', component: QuestionAddComponent },
  { path: 'question/edit/:id', component: QuestionAddComponent },

  { path: 'answers', component: AnswersComponent },
  { path: 'answer/add', component: AnswerAddComponent },
  { path: 'answer/edit/:id', component: AnswerAddComponent },

  { path: 'payments', component: PaymentsComponent },
  { path: 'payment/add', component: PaymentAddComponent },
  { path: 'payment/edit/:id', component: PaymentAddComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
