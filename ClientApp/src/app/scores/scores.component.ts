import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentScoresService } from '../student-scores.service';
import { IStudent } from './student';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit, OnDestroy{

  constructor(private studentScoresService: StudentScoresService) { }

  students: IStudent[] = [];
  sub: Subscription;

  ngOnInit() {
    this.sub = this.studentScoresService.getStudentsAndScores().subscribe({
      next: students => this.students = students
    })

    console.log('students',this.students);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

