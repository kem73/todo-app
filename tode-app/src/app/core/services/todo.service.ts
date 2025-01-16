import { Injectable } from "@angular/core";


export interface ITodo {
    id: string;
    title: string,
    startDate: string,
    endDate: string,
    category: string,
    dependsOn: string[]
}


@Injectable({
    providedIn: "root"
})
export class TodeoService {
    private todos: ITodo[] = [];
    constructor() { 
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            this.todos = JSON.parse(savedTodos);
        }
    }

    addTodo(todo: ITodo) {
        this.todos.push(todo);
        this.saveToLocalStorage();
    }
    
    getTodos(): ITodo[]{
        return this.todos;
    }

    deleteTodo(id: string): void {
        const todos = this.getTodos()
        const todoToDelete = todos.find(todo => todo.id === id);
        if(todoToDelete && !this.hasDepenencies(todoToDelete)) {
            this.todos = this.todos.filter((todo)=> todo.id !== id);
            this.saveToLocalStorage();
        } else {
            alert("Cannot delete todo")
        }
       
    }

    private hasDepenencies (todo: ITodo): boolean {
        const todos = this.getTodos()
        return todos.some((t) =>todo.dependsOn.includes(t.id))
    }

    searchTodos (searchText: string): ITodo[]{
        const todos = this.getTodos()
        return todos.filter((todo)=> todo.title.toLowerCase().includes(searchText.toLowerCase()));
    }


    filterTodos(startDate?: string, endDate?: string, category?: string): ITodo[]{
        const todos = this.getTodos()
        return todos.filter((todo)=> {
            const isStartValid =  startDate ? new Date(todo.startDate) >= new Date(startDate) : true;
            const isEndValid =  endDate ? new Date(todo.endDate) >= new Date(endDate) : true;
            const isCategoryValid =  category ? todo.category === category : true;
            return isStartValid && isEndValid && isCategoryValid;

        })


    }
    editTodo(id: string, updateTodo: ITodo): void {
        const index = this.todos.findIndex((todo)=> todo.id === id);
        if(index!== -1){
            this.todos[index] = updateTodo;
            this.saveToLocalStorage();
        }
    }


    private saveToLocalStorage(): void{
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}
