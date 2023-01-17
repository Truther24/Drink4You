using El_Proyecte_Grande.Models;
using Newtonsoft.Json;

namespace El_Proyecte_Grande.Repositories
{
    public class CocktailRepository
    {

        public async Task<List<SimpleCocktail>> GetCocktailsFromApi()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }


    }
}
