import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Domain } from 'src/app/domain/doamin';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  StudentCount: number
  UsersCount: number
  RolesCount: number
  CourseCount: number

  constructor(private http: HttpService) { }
  ngOnInit(): void {
    this.GetCount()
  }
  GetCount() {
    const $student_count = this.http.getAll(`${Domain.GetCount}?field=student`)
    const $user_count = this.http.getAll(`${Domain.GetCount}?field=employee`)
    const $course_count = this.http.getAll(`${Domain.GetCount}?field=course`)
    const $role_count = this.http.getAll(`${Domain.GetCount}?field=Role`)
    forkJoin([$student_count, $user_count, $course_count, $role_count]).
      subscribe(([student_count, user_count, course_count, role_count]) => {
        this.StudentCount = student_count
        this.UsersCount = user_count
        this.RolesCount = role_count
        this.CourseCount = course_count
      });
  }
}

