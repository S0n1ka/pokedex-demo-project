import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonApiService } from 'src/app/services/pokemon-api/pokemon-api.service';
import * as testPokemonData from './test-pokemon.json';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemonDetail;
  private pokemonDetail$: Subscription;

  constructor(private pkmService: PokemonApiService) {}

  ngOnInit(): void {
    this.pokemonDetail$ = this.pkmService.SelectedPokemon.subscribe(
      (pokemonDetail) => {
        if (pokemonDetail) {
          this.pokemonDetail = pokemonDetail;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.pokemonDetail$) {
      this.pokemonDetail$.unsubscribe();
    }
  }
}
