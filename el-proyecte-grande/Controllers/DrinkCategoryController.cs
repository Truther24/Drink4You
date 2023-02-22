using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Models.Entities;
using El_Proyecte_Grande.Models.ResponseModels;
using El_Proyecte_Grande.Models.ViewModels;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace El_Proyecte_Grande.Controllers
{
    [ApiController]
    [EnableCors("MyPolicy")]
    //[Authorize]
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

            var comments = await _drinkCategoryService.GetCommentsById(id);
            return Ok(new DrinkPage { Drink = drink, Comments = comments});
        }



        [HttpGet("drink/likesDislikes")]
        public async Task<IActionResult> SetLikesAndDislikes()
        {
            return Ok(await _drinkCategoryService.GetLikesAndDisLikes());
        }

        [HttpPut("drink/likesDislikes/update")]
        public async Task<IActionResult> UpdateLikesAndDislikes([FromBody] DrinkDatabase drink)
        {
            Task<LikeDislikeResponse> result = _drinkCategoryService.UpdateLikesAndDislikes(drink);



            return Ok(result);
        }


        [Authorize]
        [HttpPost("postComment")]
        public async Task<IActionResult> PostComment([FromBody] PostCommentViewModel comment)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var idenityUserId = tokenS.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;


            var response = await _drinkCategoryService.PostComment(comment, idenityUserId);

            return Ok(response);
        }

    }
}
