import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { UserService } from "./user.service";
import { User } from './../../core/model/User'
import { catchError, finalize } from 'rxjs/operators';
 
export class UserDataSource extends DataSource<any> {
  
    private usersSubject = new BehaviorSubject<User[]>([]);
  
    // to show the total number of records
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private userService: UserService) {
        super();
    }
 
    loadUsers(pageIndex: number, pageSize: number, sortBy:string, sortType:string) {
        
        // use pipe operator to chain functions with Observable type
      this.userService.getUsersPage(pageIndex, pageSize, sortBy, sortType)
    //   .pipe(
    //      catchError(() => of([]))
    //   )
      // subscribe method to receive Observable type data when it is ready
      .subscribe((result : any) => {
        this.usersSubject.next(result.data);
         this.countSubject.next(result.total);
        }
      );
    }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.usersSubject.asObservable();
    }
    
    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.countSubject.complete();
    }
}