import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CrewDTO} from "../../interfaces/crewDTO";
import {CrewService} from "../../services/crew.service";
import {Pageable} from "../../interfaces/pageable";
import {MovieService} from "../../services/movie.service";
import {MovieDTO} from "../../interfaces/movieDTO";

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  crewId: string;
  crew: CrewDTO;
  crewMoviesList: MovieDTO[] = [];
  pageSize = 30;
  pageIndex = 0;
  totalSize: number;
  percent: number;

  constructor(private route: ActivatedRoute, private crewService: CrewService,
              private movieService: MovieService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUrlParameter();
  }

  getUrlParameter() {
    this.route.paramMap.subscribe(params => {
      this.crewId = params.get('id');
      this.getCrewById(params.get('id'));
    });
  }

  getCrewById(id: string): void {
    this.crewService.getCrewById(Number(id)).subscribe(data => {
      this.crew = data;
      this.percent = data.popularity;
      console.log(data);
      this.getMoviesByCrew(30, 1, data.id);
    });
  }

  getMoviesByCrew(pageSize: number, pageIndex: number, id: number) {
    const pageable: Pageable = {
      pageSize: pageSize,
      pageIndex: pageIndex,
      filter: id.toString()
    }
    this.movieService.getItemsWithPagination('/lock/crew/get/movies', pageable).subscribe(data => {
      this.crewMoviesList = data.content;
      console.log(data.content);
    });
  }

  navigateToDetailsPage(id: number) {
    this.router.navigate(['movies-details/', id.toString()]);
  }

}
