import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicRoutingModule } from './basic-routing.module';
import { CourseComponent } from './course/course.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink } from '@angular/router';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseAddComponent } from './course/course-add/course-add.component';
import { CourseCategoryComponent } from './course/course-category/course-category.component';
import { CourseLanguageComponent } from './course/course-language/course-language.component';
import { CourseTagComponent } from './course/course-tag/course-tag.component';
import { CourseTypeComponent } from './course/course-type/course-type.component';
import { CourseCategoryAddComponent } from './course/course-category/course-category-add/course-category-add.component';
import { CourseLanguageAddComponent } from './course/course-language/course-language-add/course-language-add.component';
import { CourseTagAddComponent } from './course/course-tag/course-tag-add/course-tag-add.component';
import { CourseTypeAddComponent } from './course/course-type/course-type-add/course-type-add.component';
import { AnswersComponent } from './answers/answers.component';
import { PaymentsComponent } from './payments/payments.component';
import { QuestionsComponent } from './questions/questions.component';
import { RolesComponent } from './roles/roles.component';
import { StudentsComponent } from './students/students.component';
import { UsersComponent } from './users/users.component';
import { AnswerAddComponent } from './answers/answer-add/answer-add.component';
import { PaymentAddComponent } from './payments/payment-add/payment-add.component';
import { QuestionAddComponent } from './questions/question-add/question-add.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { SubCourseComponent } from './course/sub-course/sub-course.component';
import { SubCourseAddComponent } from './course/sub-course/sub-course-add/sub-course-add.component';
import { SessionAddComponent } from './course/sessions/session-add/session-add.component';
import { SessionsComponent } from './course/sessions/sessions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatNativeDateTimeModule, MatTimepickerModule } from '@dhutaryan/ngx-mat-timepicker';
import { InputWithCommaDirective } from 'src/app/directive/input-with-comma.directive';

@NgModule({
  declarations: [CourseComponent, CourseAddComponent, CourseCategoryComponent, CourseCategoryAddComponent, CourseLanguageAddComponent,
    CourseTagAddComponent, CourseTypeAddComponent, CourseLanguageComponent, CourseTagComponent, CourseTypeComponent,
    AnswersComponent, AnswerAddComponent, PaymentsComponent, PaymentAddComponent, QuestionsComponent, QuestionAddComponent,
    SessionAddComponent, SessionsComponent, RolesComponent, RoleAddComponent, StudentsComponent,
    StudentAddComponent, UsersComponent, UserAddComponent, SubCourseComponent, SubCourseAddComponent,InputWithCommaDirective
  ],
  imports: [
    CommonModule,
    BasicRoutingModule,
    NgPersianDatepickerModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class BasicModule { }
