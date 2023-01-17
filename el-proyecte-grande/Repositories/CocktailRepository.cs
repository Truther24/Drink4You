using el_proyecte_grande.Models;
using Newtonsoft.Json;

namespace el_proyecte_grande.Repositories
{
    public class CocktailRepository
    {

        public async Task<List<SimpleCocktail>> GetCocktailsFromApi()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");


            Drink drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }


    }
}
