import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 const routes: Routes = [
    { path: '',  redirectTo :"todos" , pathMatch: 'full'},
    {path: 'todos', loadChildren: ()=> import('./features/todo/todo.module').then((m)=> m.TodoModule)}
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }