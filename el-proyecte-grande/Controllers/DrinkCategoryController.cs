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
    //[Authorize(Roles = "User")]

    [EnableCors("MyPolicy")]
    //[Authorize]
    public class DrinkCategoryController : Controller
    {
        private readonly DrinkCategoryService _drinkCategoryService;

        private readonly RoleService roleService;

        public DrinkCategoryController(DrinkCategoryService drinkCategoryService, RoleService roleService)
        {
            this._drinkCategoryService = drinkCategoryService;
            this.roleService = roleService;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> Categories()
        {
            var drinks = await _drinkCategoryService.GetAllCategories();
            return Ok(drinks);
        }

        [HttpGet("categories/{categoryName}")]
        public async Task<IActionResult> DrinksForCategory(string categoryName)
        {
            categoryName = categoryName.Replace('+', '/');
            var drinks = await _drinkCategoryService.GetDrinksForCategory(categoryName);
            //var drinksWithLikes = await _drinkCategoryService.GetLikesAndDisLikes()
            return Ok(drinks);
        }




        [HttpGet("drink/{id}")]
        public async Task<IActionResult> GetDrinkById(string id)
        {
            var drink = await _drinkCategoryService.GetDrinkById(id);

            var comments = await _drinkCategoryService.GetCommentsById(id);
            return Ok(new DrinkPage { Drink = drink, Comments = comments });
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


        //[Authorize(Roles = "Admin")]
        [HttpPost("postComment")]
        public async Task<IActionResult> PostComment([FromBody] PostCommentViewModel comment)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var idenityUserId = tokenS.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;


            var response = await _drinkCategoryService?.PostComment(comment, idenityUserId);

            return Ok(response);
        }



        //[Authorize(Roles = "Admin")]
        [HttpPost("addDrink")]
        public async Task<IActionResult> AddDrinkAsAdmin([FromBody] AddedDrinkViewModel addedDrinkViewModel)
        {
            var result = await _drinkCategoryService.AddDrinkAsAdmin(addedDrinkViewModel.AddedDrink , addedDrinkViewModel.Ingredients);
            return Ok(result);
        }

    }
}
