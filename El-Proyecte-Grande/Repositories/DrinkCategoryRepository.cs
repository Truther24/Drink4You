using El_Proyecte_Grande.Models;
using Newtonsoft.Json;

namespace El_Proyecte_Grande.Repositories
{
    public class DrinkCategoryRepository
    {
        public async Task<List<DrinkCategory>> GetAllCategories()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");


            DrinkCategoryList drinkCategoryList = JsonConvert.DeserializeObject<DrinkCategoryList>(response);
            return drinkCategoryList.drinks;
        }



        public async Task<List<SimpleDrink>> GetAllCocktails()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllOrdinaryDrinks()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllShakes()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllCocoas()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllShots()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shot");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllCoffeeAndTeas()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Coffee_/_Tea");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllHomemadeLiqueors()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Homemade_Liqueur");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllPartyDrinks()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Punch_/_Party_Drink");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllBeers()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Beer");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllSoftDrinks()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Soft_Drink");


            Drink? drink = JsonConvert.DeserializeObject<Drink>(response);
            return drink.drinks;
        }
    }
}
