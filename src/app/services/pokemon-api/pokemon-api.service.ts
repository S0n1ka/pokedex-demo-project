import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/';
  private selectedPokemon = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {}

  get SelectedPokemon() {
    return this.selectedPokemon.asObservable().pipe(
      map((pokemon) => {
        return pokemon;
      })
    );
  }

  public IsActivePokemon(name: string): boolean {
    if (this.selectedPokemon.value) {

      return this.selectedPokemon.value.name === name;
    }
  }

  public fetchPokemon(): Observable<any> {
    const url = this.baseUrl + 'pokemon/';
    return this.httpClient.get(url);
  }

  public fetchPokemonDetail(url: string): void {
    let pokemon;
    this.httpClient
      .get(url)
      .pipe(
        take(1),
        switchMap((response) => {
          pokemon = response;
          return this.fetchPokemonSpecies(response['species'].url);
        })
      )
      .subscribe((response) => {
        pokemon.flavor_text = this.getFlavourTextFromSpecies(response);
        pokemon.genera = this.getGeneraTextFromSpecies(response);
        this.selectedPokemon.next(pokemon);
      });
  }

  public fetchPokemonSpecies(url: string): Observable<any> {
    return this.httpClient.get(url).pipe(take(1));
  }

  private getFlavourTextFromSpecies(species: any): string {
    return species.flavor_text_entries.find((entry) => entry.language.name === 'en');
  }

  private getGeneraTextFromSpecies(species: any): string {
    return species.genera.find((entry) => entry.language.name === 'en');
  }
}
