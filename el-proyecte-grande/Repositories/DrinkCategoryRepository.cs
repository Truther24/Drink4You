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



        public async Task<List<SimpleDrink>> GetAllCocktails()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllOrdinaryDrinks()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllShakes()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllCocoas()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllShots()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shot");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllCoffeeAndTeas()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Coffee_/_Tea");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllHomemadeLiqueors()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Homemade_Liqueur");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllPartyDrinks()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Punch_/_Party_Drink");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllBeers()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Beer");


            DrinkList? drink = JsonConvert.DeserializeObject<DrinkList>(response);
            return drink.drinks;
        }

        public async Task<List<SimpleDrink>> GetAllSoftDrinks()
        {
            HttpClient client = new();
            string response = await client.GetStringAsync($"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Soft_Drink");


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
