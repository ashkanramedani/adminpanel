import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IPost } from 'src/app/interfaces/IPost';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrl: './contents.component.css',
})
export class ContentsComponent implements OnInit {
  content_type: string;
  ContentsData: IPost[] = [];
  isCheckedStatus: number;
  isLoading: boolean = true;
  deleting_content_id: number[] = [];
  title: string = '';
  constructor(
    private router: ActivatedRoute,
    private http: HttpService,
    private alertServices: AlertifyService
  ) {}
  ngOnInit(): void {
    this.router.queryParams.subscribe((res) => {
      this.content_type = res.type;
      this.GetContentsData();
      this.GetTitle();
    });
  }
  GetTitle() {
    switch (this.content_type) {
      case 'podcast':
        this.title = 'پادکست';
        break;
      case 'blog':
        this.title = 'بلاگ';
        break;
      case 'news':
        this.title = 'اخبار';
        break;
      default:
        this.title = '';
        break;
    }
  }
  GetContentsData() {
    this.http
      .getAll(`${Domain.GetPost}/${this.content_type}/read`)
      .subscribe((response) => {
        this.isLoading = false;
        this.ContentsData = response;
      });
  }
  ChangeStatusCheckbox(event: any) {
    this.isCheckedStatus = event.target.value;
  }
  RemoveItem(id: number) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .delete(Domain.DeletePost + '/blog/delete', id)
          .subscribe((response) => {
            console.log(response);
          });
        this.GetContentsData();
        this.alertServices.success('آیتم با موفقیت حذف شد');
      },
      () => {}
    );
  }

  RemoveMultiItem() {
    if (this.deleting_content_id.length > 0) {
      console.log(this.deleting_content_id);
      this.alertServices.confirm(
        ' حذف آیتم ها',
        'آیا از حذف این آیتم ها اطمینان دارید؟',
        () => {
          this.http
            .deleteWithBody(
              `${Domain.GroupDeletePost}/${this.content_type}/group-delete`,
              this.deleting_content_id,
              null
            )
            .subscribe((response) => {
              console.log(response);
              if (response != null) {
                this.GetContentsData();
                this.alertServices.success('آیتم ها با موفقیت حذف شدند');
                this.deleting_content_id=[]
              }
            });
        },
        () => {}
      );
    } else this.alertServices.warning('آیتمی برای حذف انتخاب نشده است');
  }
  checkToDeletedCheckBox(id: number, event: any) {
    if (event?.target.checked) {
      this.deleting_content_id.push(id);
    } else {
      let index = this.deleting_content_id.indexOf(id);
      this.deleting_content_id.splice(index, 1);
    }
  }
}
