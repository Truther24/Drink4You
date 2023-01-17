
using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repositories;

namespace El_Proyecte_Grande.Services
{
    public class DrinkCategoryService
    {
        private readonly DrinkCategoryRepository _drinkCategoryRepository;
        public DrinkCategoryService(DrinkCategoryRepository drinkCategoryRepository)
        {
            _drinkCategoryRepository = drinkCategoryRepository;
        }

        public async Task<List<DrinkCategory>> GetAllCategories()
        {
            return await _drinkCategoryRepository.GetAllCategories();
        }

        public async Task<List<SimpleDrink>> GetAllCocktails()
        {
            return await _drinkCategoryRepository.GetAllCocktails();
        }

        public async Task<List<SimpleDrink>> GetAllOrdinaryDrinks()
        {
            return await _drinkCategoryRepository.GetAllOrdinaryDrinks();
        }
        public async Task<List<SimpleDrink>> GetAllShakes()
        {
            return await _drinkCategoryRepository.GetAllShakes();
        }
        public async Task<List<SimpleDrink>> GetAllCocoas()
        {
            return await _drinkCategoryRepository.GetAllCocoas();
        }
        public async Task<List<SimpleDrink>> GetAllShots()
        {
            return await _drinkCategoryRepository.GetAllShots();
        }
        public async Task<List<SimpleDrink>> GetAllCoffeeAndTeas()
        {
            return await _drinkCategoryRepository.GetAllCoffeeAndTeas();
        }
        public async Task<List<SimpleDrink>> GetAllHomemadeLiqueors()
        {
            return await _drinkCategoryRepository.GetAllHomemadeLiqueors();
        }
        public async Task<List<SimpleDrink>> GetAllPartyDrinks()
        {
            return await _drinkCategoryRepository.GetAllPartyDrinks();
        }
        public async Task<List<SimpleDrink>> GetAllBeers()
        {
            return await _drinkCategoryRepository.GetAllBeers();
        }public async Task<List<SimpleDrink>> GetAllSoftDrinks()
        {
            return await _drinkCategoryRepository.GetAllSoftDrinks();
        }


    }
}
