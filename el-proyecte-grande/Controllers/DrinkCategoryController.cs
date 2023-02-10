using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace El_Proyecte_Grande.Controllers
{
    [ApiController]
    [EnableCors("MyPolicy")]
    [Authorize]
    public class DrinkCategoryController : Controller
    {
        private readonly DrinkCategoryService _drinkCategoryService;

        public DrinkCategoryController(DrinkCategoryService drinkCategoryService)
        {
            this._drinkCategoryService = drinkCategoryService;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> Categories()
        {
            var drinks = await _drinkCategoryService.GetAllCategories();
            return Ok(drinks); 
        }

        [HttpGet("categories/cocktails")]
        public async Task<IActionResult> Cocktails()
        {
            var drinks = await _drinkCategoryService.GetAllCocktails();
            return Ok(drinks);
        }
         
        [HttpGet("categories/ordinary_drinks")]
        public async Task<IActionResult> OrdinaryDrinks()
        {
            var drinks = await _drinkCategoryService.GetAllOrdinaryDrinks();
            return Ok(drinks);
        }

        [HttpGet("categories/shakes")]
        public async Task<IActionResult> Shakes()
        {
            var drinks = await _drinkCategoryService.GetAllShakes();
            return Ok(drinks);
        }

        [HttpGet("categories/other_unknowns")]
        public async Task<IActionResult> Other()
        {
            var drinks = await _drinkCategoryService.GetAllOtherUknown();
            return Ok(drinks);
        }


        [HttpGet("categories/cocoas")]
        public async Task<IActionResult> Cocoas()
        {
            var drinks = await _drinkCategoryService.GetAllCocoas();
            return Ok(drinks);
        }

        [HttpGet("categories/shots")]
        public async Task<IActionResult> Shots()
        {
            var drinks = await _drinkCategoryService.GetAllShots();
            return Ok(drinks);
        }

        [HttpGet("categories/coffee_teas")]
        public async Task<IActionResult> CoffeeAndTeas()
        {
            var drinks = await _drinkCategoryService.GetAllCoffeeAndTeas();
            return Ok(drinks);
        }

        [HttpGet("categories/homemade_liqueurs")]
        public async Task<IActionResult> HomemadeLiqueors()
        {
            var drinks = await _drinkCategoryService.GetAllHomemadeLiqueors();
            return Ok(drinks);
        }

        [HttpGet("categories/punch_party_drinks")]
        public async Task<IActionResult> PartyDrinks()
        {
            var drinks = await _drinkCategoryService.GetAllPartyDrinks();
            return Ok(drinks);
        }

        [HttpGet("categories/beers")]
        public async Task<IActionResult> Beers()
        {
            var drinks = await _drinkCategoryService.GetAllBeers();
            return Ok(drinks);
        }

        [HttpGet("categories/soft_drinks")]
        public async Task<IActionResult> SoftDrinks()
        {
            var drinks = await _drinkCategoryService.GetAllSoftDrinks();
            return Ok(drinks);
        }

        [HttpGet("drink/{id}")]
        public async Task<IActionResult> GetDrinkById(string id)
        {
            var drink = await _drinkCategoryService.GetDrinkById(id);
            return Ok(drink);
        }

    }
}
