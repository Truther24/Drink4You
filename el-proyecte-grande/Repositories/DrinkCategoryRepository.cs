using El_Proyecte_Grande.Models;
using Newtonsoft.Json;

namespace El_Proyecte_Grande.Repositories
{
    public class DrinkCategoryRepository
    {



        public async Task<string> GetAllCategories()
        {
            HttpClient client = new();
            return await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");


           
        }



        public async Task<List<SimpleDrink>> GetDrinksForCategory(string categoryName)
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c={categoryName}");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }







        public async Task<Drink> GetDrinkById(string id) 
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id}");

            ComplexDrink complexDrink = JsonConvert.DeserializeObject<ComplexDrink>(response);


            return complexDrink.drinks[0];
        }


    }
}
