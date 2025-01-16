import { Component, OnInit } from '@angular/core';
import { ITodo, TodeoService } from '../../../../core/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import {v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrl: './add-edit-todo.component.css',
  standalone: false
})
export class AddEditTodoComponent implements OnInit{


  todo: ITodo = {
    id: '',
    title: '',
    startDate: '',
    endDate: '',
    category: '',
    dependsOn: []
  }
  isEdit = false
   todos: ITodo[] = []

  constructor (
    private todoService: TodeoService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }


  ngOnInit(): void {
     this.todos = this.todoService.getTodos()
      const id = this.route.snapshot.paramMap.get('id')
      if (id) {
        this.isEdit = true
        const todos = this.todoService.getTodos()
        
        this.todo = todos.find((t) => t.id === id) || this.todo
        console.log(this.todo)
      }
  }

  saveTodo(): void {
    if (this.isEdit) {
      this.todoService.editTodo(this.todo.id, this.todo)
    } else {
      this.todo.id = uuidv4()
      console.log("Todddoo", this.todo)
      this.todoService.addTodo(this.todo)
    }
    this.router.navigate(['/todos'])
  }
}
