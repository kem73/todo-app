import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITodo, TodeoService } from '../../../../core/services/todo.service';
import { Router } from '@angular/router';
import { debounceTime, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  standalone: false
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];
  filteredTodos: ITodo[] = [];
  searchText: string ='';
  startDate: string = '';
  endDate: string = '';
  category: string= ''

  // Search 
  private searchSubject: Subject<string> = new Subject<string>();
  private searchDebounced$ = this.searchSubject.pipe(
    debounceTime(300),
    switchMap((searchText: string)=> this.todoService.searchTodos(searchText))
    )
  constructor(private todoService: TodeoService, private router: Router) {
    
  }

  ngOnInit(): void {
     this.todos = this.todoService.getTodos() ||  []
     this.filteredTodos = [...this.todos];
    //  this.searchDebounced$.subscribe((filteredTodos: ITodo[]) => {
    //   this.filteredTodos = filteredTodos;
    // });
  }
  // ngOnDestroy(): void {
  //   this.searchSubject.unsubscribe();
  // }


  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
    this.todos = this.todoService.getTodos()
    this.filteredTodos = [...this.todos];
  }

  search (): void {
    this.filteredTodos= this.todoService.searchTodos(this.searchText)
    // this.searchSubject.next(this.searchText)
    console.log('SEARCH',   this.filteredTodos)

  }

  applyFilters (): void {
    this.filteredTodos= this.todoService.filterTodos(this.startDate, this.endDate, this.category)
    console.log('filte',   this.filteredTodos)
  }

  navigateToEdit (id: string): void {
    this.router.navigate(['/todos/edit', id] )
  }
}
