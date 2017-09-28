import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: '../../../../app/components/tasks/tasks.component.html'
})

export class TasksComponent { 
    tasks: Task[];
    title: string;
    isDone: boolean;
    message: string;
    
    constructor(private taskService:TaskService){
        console.log(this.message)
        this.getAllTasks();
    }

    getAllTasks() {
        this.taskService.getTasks()
        .subscribe(tasks => {
            this.tasks = tasks;
        });
    }

    addTask(event){
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: this.isDone
        }
        console.log("is Done? " + this.isDone)
        this.taskService.addTask(newTask)
            .subscribe(task => {
                this.tasks.push(task);
                this.title = '';
            });
        this.message = "Successfully added task: '" + newTask.title + "'.";
    }
    
    deleteTask(id){
        var tasks = this.tasks;
        
        this.taskService.deleteTask(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < tasks.length;i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i, 1);
                    }
                }
            }
        });
        this.message = "Successfully deleted task id: " + id + ".";
    }
    
    updateStatus(task){
        var _task = {
            _id:task._id,
            title: task.title,
            isDone: !task.isDone
        };
        
        this.taskService.updateStatus(_task).subscribe(data => {
            task.isDone = !task.isDone;
        });
        this.message = "Successfully updated task: '" + task.title + "'.";
    }
}
