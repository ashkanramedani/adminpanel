// import { Injectable } from "@angular/core";
// import { HttpService } from "./http.service";
// import { Domain } from "../domain/doamin";
// import { IEmployees } from "../interfaces/IEmployees";
// import { IClassDetails } from "../interfaces/IClassDetails";

// @Injectable({
//     providedIn: 'root'
//   })
//   export class JoinService {

//     constructor(private http:HttpService){}
//     EmployiesData: IEmployees
//      ClassData: IClassDetails
//     ShowCratorTitle(created_fk_by:string)
//     {
//         this.http.get(Domain.GetAuditEmplooyies,created_fk_by).subscribe((response) => {
//             this.EmployiesData = response;
//             console.log("dfdfdfddddddddd")
//             console.log(response)
//           })
//           return this.EmployiesData
//     }
//     ShowClassTitle(class_fk_id:string) {
//         this.http.get(Domain.GetAuditClass,class_fk_id).subscribe((response) => {
//           this.ClassData = response;
//           console.log(response)
//         })
//         return this.ClassData
//       }
//   }