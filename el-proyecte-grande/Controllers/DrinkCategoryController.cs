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
    public class DrinkCategoryController : Controller
    {
        private readonly DrinkCategoryService _drinkCategoryService;

        private readonly RoleService roleService;
        private readonly IHostEnvironment _hostEnvironment;

        public DrinkCategoryController(DrinkCategoryService drinkCategoryService, RoleService roleService, IHostEnvironment hostEnvironment)
        {
            this._drinkCategoryService = drinkCategoryService;
            this.roleService = roleService;
            this._hostEnvironment = hostEnvironment;
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
            //var drinksWithLikes = await _drinkCategoryService.GetLikesAndDisLikes();
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
           LikeDislikeResponse result = await _drinkCategoryService.UpdateLikesAndDislikes(drink);

            return Ok(result);
        }


        [Authorize(Roles = "User")]
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



        [Authorize(Roles = "Admin")]
        [HttpPost("addDrink")]
        public async Task<IActionResult> AddDrinkAsAdmin([FromBody] AddedDrinkViewModel addedDrinkViewModel)
        {
            var result = await _drinkCategoryService.AddDrinkAsAdmin(addedDrinkViewModel.AddedDrink , addedDrinkViewModel.Ingredients);
            return Ok(result);
        }

        [HttpPost("addDrinkImage")]
        public async Task<IActionResult> AddDrinkImageAsAdmin([FromForm] ImageViewModel imageViewModel)
        {
            var imageName = await SaveImage(imageViewModel.imageFile);

            var addedDrink = _drinkCategoryService.UpdateAddedDrinkImageById(imageViewModel.idDrink, imageName);

            return Ok();
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.Name).Take(10).ToArray()).Replace(' ', '-');
            imageName= imageName+DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.Name);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using(var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;



        }

    }
}
