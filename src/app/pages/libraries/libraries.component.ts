import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IPost } from 'src/app/interfaces/IPost';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.css'
})
export class LibrariesComponent implements OnInit {
  SearchValue: string
  LibrariessDataLenght: number[];
  filteredCount = { count: 0 };
  content_type: string;
  librariessData: IPost[] = [];
  isCheckedStatus: number;
  isLoading: boolean = true;
  selected_content_ids: number[] = [];
  title: string = '';
  constructor(private router:ActivatedRoute,private http:HttpService,private alertServices:AlertifyService)
  {

  }
  ngOnInit(): void {
    this.router.queryParams.subscribe((res) => {
      this.isLoading = true
      this.content_type = res.type;
      this.GetLibrariesData();
      this.GetTitle();
    });
  }
  GetLibrariesData()
  {
    this.http
    .getAll(`${Domain.GetLibrary}/${this.content_type}/read`)
    .subscribe((response) => {
      this.isLoading = false;
      this.librariessData = response;
      this.LibrariessDataLenght = new Array(Math.ceil(response.length / 15))
    });
  }
  GetTitle() {
    switch (this.content_type) {
      case 'magazine':
        this.title = 'مجلات';
        break;
      case 'story':
        this.title = 'داستانی';
        break;
      case 'educational':
        this.title = 'آموزشی';
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
        this.librariessData = response;
        this.LibrariessDataLenght = new Array(Math.ceil(response.length / 15))
      });
  }
  ChangeStatusCheckbox(event: any) {
    this.isCheckedStatus = event.target.value;
  }
  RemoveItem(id?: number) {
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
      () => { }
    );
  }

  RemoveMultiItem() {
    if (this.selected_content_ids.length > 0) {
      console.log(this.selected_content_ids);
      this.alertServices.confirm(
        ' حذف آیتم ها',
        'آیا از حذف این آیتم ها اطمینان دارید؟',
        () => {
          this.http
            .deleteWithBody(
              `${Domain.GroupDeletePost}/${this.content_type}/group-delete`,
              this.selected_content_ids,
              null
            )
            .subscribe((response) => {
              console.log(response);
              if (response != null) {
                this.GetContentsData();
                this.alertServices.success('آیتم ها با موفقیت حذف شدند');
                this.selected_content_ids = []
              }
            });
        },
        () => { }
      );
    } else this.alertServices.warning('آیتمی برای حذف انتخاب نشده است');
  }
  checkToDeletedCheckBox(event: any, id: number) {
    if (event?.target.checked) {
      this.selected_content_ids.push(id);
    } else {
      let index = this.selected_content_ids.indexOf(id);
      this.selected_content_ids.splice(index, 1);
    }
  }
  ShowTitleStatus(status: Number) {
    var title = "";
    var classStatus = "";
    switch (status) {
      case 0:
        title = "غیر فعال"
        classStatus = "inline-flex rounded-full bg-[#637381] px-2 py-1 text-xs font-medium text-white hover:bg-opacity-90"
        break;
      case 1:
        title = "تایید نشده "
        classStatus = "inline-flex rounded-full bg-[#3BA2B8] px-2 py-1 text-xs font-medium text-white hover:bg-opacity-90"
        break;
      case 2:
        title = " فعال "
        classStatus = "inline-flex rounded-full bg-[#3CA745] px-2 py-1 text-xs font-medium text-white hover:bg-opacity-90"
        break;
      default:
        title = "نامشخص"
        break;
    }
    return { title: title, classStatus: classStatus }
  }
  ChangeStatusMultiItem(event: any) {
    if (this.selected_content_ids.length > 0) {
      let items_to_changed_status: { post_pk_id: Number, post_status: Number }[]=[];
      for (let index = 0; index < this.selected_content_ids.length; index++) {
        items_to_changed_status.push({
          post_pk_id: this.selected_content_ids[index],
          post_status: event.target.value
        })
      }
      this.alertServices.confirm(
        ' تغییر وضعیت آیتم ها',
        'آیا از تغییر وضعیت این آیتم ها اطمینان دارید؟',
        () => {
          //TODO
          this.http
            .patch(
              `${Domain.ChangeGroupStatus}`,
              items_to_changed_status,
              null
            )
            .subscribe((response) => {
              console.log(response);
              if (response != null) {
                this.GetContentsData();
                this.alertServices.success('آیتم ها با موفقیت تغییر وضعیت داده شدند');
                this.selected_content_ids = []
              }
            });
        },
        () => { }
      );
    } else this.alertServices.warning('آیتمی برای تغییر وضعیت انتخاب نشده است');
  }

}
