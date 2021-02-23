import { Component, Input, OnInit } from '@angular/core';
import { PokemonList } from 'src/app/models/pokemon-list.interface';
import { PokemonApiService } from 'src/app/services/pokemon-api/pokemon-api.service';



@Component({
  selector: 'app-pokedex-item',
  templateUrl: './pokedex-item.component.html',
  styleUrls: ['./pokedex-item.component.scss']
})
export class PokedexItemComponent implements OnInit {
  @Input() pokemon: PokemonList;

  constructor(private pkmService: PokemonApiService) { }

  ngOnInit(): void {}

  selectPokemon(): void {
    this.pkmService.fetchPokemonDetail(this.pokemon.url);
  }

  isActive(): boolean {
    return this.pkmService.IsActivePokemon(this.pokemon.name);
  }

}
