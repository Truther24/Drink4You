
using el_proyecte_grande.Models;
using el_proyecte_grande.Repositories;

namespace el_proyecte_grande.Services
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
