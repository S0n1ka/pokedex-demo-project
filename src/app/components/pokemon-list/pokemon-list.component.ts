import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonList } from 'src/app/models/pokemon-list.interface';
import { PokemonApiService } from 'src/app/services/pokemon-api/pokemon-api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemonList: PokemonList[];
  private fetchPokemon$: Subscription;

  constructor(private pkmService: PokemonApiService) { }

  ngOnInit(): void {
    this.pkmService.fetchPokemon().subscribe(response => {
      this.pokemonList = response.results;
    })
  }

  ngOnDestroy(): void {
    if (this.fetchPokemon$) {
      this.fetchPokemon$.unsubscribe();
    }
  }

}
