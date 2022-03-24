import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task{
  name:string;
  isUpdated:boolean;
  isVisible:boolean;
}
enum sortOption{
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'

}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:Task[]= [];
  SortEnum = sortOption;
  sort:sortOption=sortOption.NONE;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm){
    let newTask = {name:addForm.value.task, isUpdated:false, isVisible:false};
    this.tasks.push(newTask);
    addForm.resetForm();
  }
  handleRemove(t:string){
    this.tasks=this.tasks.filter((myTask:Task)=> myTask.name!= t);
  }
  handleUdate(t:Task){
    t.isUpdated = true;
  }
  handleSubmitUpdate(oldName:string, newTaskname:string){
    let updatedTask:Task = this.tasks.filter((t)=> t.name === oldName)[0]
    updatedTask.name=newTaskname;
    updatedTask.isUpdated = false;
  }
  handleSort(sortDirection:sortOption){
    
    if(sortDirection === this.sort){
      this.sort = sortOption.NONE;
      return;
    }
    this.sort = sortDirection;
    switch (sortDirection) {
      case sortOption.ASC:
        this.tasks = this.tasks.sort((a,b)=> {
          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();
          if(aLower<bLower){
            return -1;
          }
          if(aLower> bLower){
            return 1
          }
          return 0;
        });
        break;
        case  sortOption.DESC:
          this.tasks = this.tasks.sort((a,b)=> {
            let aLower = a.name.toLowerCase();
            let bLower = b.name.toLowerCase();
            if(aLower<bLower){
              return 1;
            }
            if(aLower> bLower){
              return -1
            }
            return 0;
          });
          break;
          case sortOption.NONE:
      default:
        break;
    }

    
  }
  handleSearch(v:string){
      this.tasks.map((task)=>{
        task.isVisible=(task.name.includes(v));
      });
  }

}
