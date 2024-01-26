import { environment } from '../../environments/environment';
export const Domain=
{
    "WebsiteUrl":"",
    "HomePageData": `${environment.apiUrl}Home/GetHomePageData`,
    "RoomPageData":`${environment.apiUrl}Room/Room`,
    "RoomsPageData":`${environment.apiUrl}Room/Rooms`,
    "FaqPageData":`${environment.apiUrl}content/GetContentBySourceId`,
    "Login":`${environment.apiUrl}Auth/Login`,
    "validateCode":`${environment.apiUrl}Auth/TwoStepLogin`,
    "UserInfo":`${environment.apiUrl}Auth/UserInfo`,
    "IsAuthenticated":`${environment.apiUrl}Auth/IsAuthenticated`,
    "AddHost":`${environment.apiUrl}pages/host`,
    "UserFavorites":`${environment.apiUrl}user/Favorites`,
    "AddUserFavorites":`${environment.apiUrl}UserFavorites/AddUserFavorites`,
    "RemoveUserFavorites":`${environment.apiUrl}UserFavorites/RemoveUserFavorites`,
    "updateUserProfile":`${environment.apiUrl}User/updateUser`,
    "ChargeWallet":`${environment.apiUrl}Payment/Charge`,
    "test":`${environment.apiUrl}payment/test`,
    "RegisterReserve":`${environment.apiUrl}room/RegisterReserve`,
    "BookInfo":`${environment.apiUrl}Order/BookInfo`,
    "Book_preorder":`${environment.apiUrl}Order/book/preorder`,
    "Book_pay":`${environment.apiUrl}Order/book/pay`,
    "Book_final":`${environment.apiUrl}Order/book/final`,
    "OnlinePayment":`${environment.apiUrl}payment/pay`,
    "GetCategoryByModuleId":`${environment.apiUrl}Category/GetCategoryByModuleId`
}
