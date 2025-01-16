import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { AddEditTodoComponent } from "./components/add-edit-todo/add-edit-todo.component";


const routes: Routes = [

    {path: '', component: TodoListComponent},
    {path: 'add', component: AddEditTodoComponent},
    {path: 'edit/:id', component: AddEditTodoComponent},
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TodoRoutingModule { }