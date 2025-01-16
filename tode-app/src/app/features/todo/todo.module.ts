import { NgModule } from "@angular/core";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { AddEditTodoComponent } from "./components/add-edit-todo/add-edit-todo.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TodoRoutingModule } from "./todo-routing.module";


@NgModule({
    declarations: [TodoListComponent, AddEditTodoComponent],
    imports: [CommonModule, FormsModule, TodoRoutingModule],
})

export class TodoModule {}