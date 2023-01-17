
using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repositories;

namespace El_Proyecte_Grande.Services
{
    public class SimpleCocktailService
    {
        private readonly CocktailRepository _cocktailRepository;
        public SimpleCocktailService(CocktailRepository cocktailRepository)
        {
            this._cocktailRepository = cocktailRepository;
        }

        public async Task<List<SimpleCocktail>> GetALlCocktails()
        {
            return await _cocktailRepository.GetCocktailsFromApi();
        }


    }
}
