import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin'; 
import { IPost } from 'src/app/interfaces/IPost';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
})
export class ContentsComponent implements OnInit {
  //#region change this informaion
  ResponseDataList: IPost[] = []
  SingleData: IPost
  title: string = '';
  form_title = `محتوای آموزشی /${this.title}`
  table_header: string[] = ["ردیف", " عنوان " , "تاریخ ","وضعیت","عملیات"]
  field_count:string=""
  get_all_route:string=Domain.GetPost
  content_type: string;
  delete_route:string=Domain.DeletePost
  add_url:string="/contents/add"
  edit_url:string="/contents/edit"
  //#endregion
  ResponseDataLenght: number[];
  totalCount: number = 0
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  order: string = "desc"
  IsShowenModal: boolean = false
   page:number=1
   limit:number=10
  currentPage: number = 1
  constructor(private http: HttpService, private alertServices: AlertifyService, private router: ActivatedRoute,) { }
  ngOnInit(): void {
    this.router.queryParams.subscribe((res) => {
      console.log(res)
    this.content_type = res.type;
    this.GetTitle();
    this.GetResponseData(0, 1000, this.order)
    this.GetResponseDataLenght()
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
  GetResponseDataLenght() {
    this.http.getAll(`${Domain.GetCount}?field=${this.field_count}`).subscribe((response) => {
      this.totalCount = response
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  GetResponseData(page: number, limit: number, order: string) {
 this.isLoading = true;
    this.http.getAll(`${this.get_all_route}/${this.content_type}/read`).subscribe((response) => {
      this.ResponseDataList = response;

      this.isLoading = false
      console.log(response)
    })
  }

  RemoveItem(id?: string) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .deleteWithQuery(`${this.delete_route}/${id}`)
          .subscribe((response) => {
            console.log(response);
            if (response == "Deleted") {
              this.GetResponseData(0, 1000, this.order);
              this.alertServices.success('آیتم با موفقیت حذف شد');
            }
            else { this.alertServices.error('متاسفانه خطایی رخ داده است'); }
          });
      },
      () => { }
    );
  }
  ChangeSort(value: any) {
    this.order = value.target.value
    this.GetResponseData(0, 1000, this.order);
  }

  OpenModal(id: string) {
    if (id == null) {
      alert("رکورد وجود ندارد")
      return;
    }
    this.http
      .get(this.get_all_route, id)
      .subscribe((response) => {
        this.SingleData = response;
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
}

