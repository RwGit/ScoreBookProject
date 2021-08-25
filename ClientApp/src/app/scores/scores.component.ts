import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentScoresService } from '../student-scores.service';
import { IScore } from './score';
import { IStudent } from './student';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit, OnDestroy{

  constructor(private studentScoresService: StudentScoresService) { }

  students: IStudent[] = [];
  sub!: Subscription;
  showAlert: boolean = false;
  averageScore: number = 0;

  private _studentsChanged: IStudent[]=[];
  get studentsChanged(): IStudent[] {
    return this._studentsChanged;
  }
  set studentsChanged(value: IStudent[]) {
    this._studentsChanged = value;
    this.averageScore = this.getAverageScore(value);
  }

  ngOnInit() {
    this.sub = this.studentScoresService.getStudentsAndScores().subscribe({
      next: students => {
      this.students = students;
      this.studentsChanged = JSON.parse(JSON.stringify(this.students));
      },
      error: err=> console.log('Error Retrieving Students',err)
    });
  }

  updateScores(){
    console.log('changed',this.studentsChanged);
    console.log('orig', this.students);

    var changedScores: IScore[] = [];
    // for(var i=0;i<this.studentsChanged.length;i++){
    //   if(this.studentsChanged[i].scores[0].score != this.students[i].scores[0].score){
    //     changedScores.push(this.studentsChanged[i].scores[0]);
    //   }
    // }

    this.studentsChanged.forEach((sc, i) => {
      if (sc.scores[0].score != this.students[i].scores[0].score) {
        changedScores.push(sc.scores[0]);
      }
    })

    this.sub = this.studentScoresService.updateScores(changedScores).subscribe({
        error: err=> console.log('Error Updating Scores',err),
        complete: () => {
          this.showAlert = true;
          this.sub = this.studentScoresService.getStudentsAndScores().subscribe({
            next: students => {
              this.students = students;
              this.studentsChanged = JSON.parse(JSON.stringify(this.students));
            },
            error: err => console.log('Error Retrieving Students', err)
          });
        }
      });
  }

  getAverageScore(scoresListFull: IStudent[]): number {
    var scores:number[] = [];
    scoresListFull.forEach(s=>scores.push(s.scores[0].score));
    return scores.reduce((pV,cV)=> pV+cV)/scores.length;
  }

  closeAlert() {
    this.showAlert = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

