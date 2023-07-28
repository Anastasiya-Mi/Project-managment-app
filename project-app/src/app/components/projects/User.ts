// export interface User {
//     id?: string;
//     email?: string;
//     password?: string;
//     name?: string;
//     token?:string;
//     uid:string;
//     displayName?: string,
//     // firstName: string,
//     // lastName:string,
//   }
  export interface User {
    uid: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    phone?: string;
    address?: string;
    photoURL?: string;
  }