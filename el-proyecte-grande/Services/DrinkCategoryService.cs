
using Azure.Core;
using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Models.Data;
using El_Proyecte_Grande.Models.Entities;
using El_Proyecte_Grande.Models.ResponseModels;
using El_Proyecte_Grande.Models.ViewModels;
using El_Proyecte_Grande.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Newtonsoft.Json;

namespace El_Proyecte_Grande.Services
{

    public class DrinkCategoryService
    {
        private UserManager<IdentityUser> _userManager;

        private readonly DrinkCategoryRepository _drinkCategoryRepository;

        private readonly DrinkContext _context;
        public DrinkCategoryService(UserManager<IdentityUser> userManager, DrinkCategoryRepository drinkCategoryRepository , DrinkContext drinkContext)
        {
            _userManager = userManager;

            _drinkCategoryRepository = drinkCategoryRepository;

            _context = drinkContext;

        }

        public async Task<string> GetAllCategories()
        {
            string response= await _drinkCategoryRepository.GetAllCategories();
            DrinkCategoryList drinkCategoryList = JsonConvert.DeserializeObject<DrinkCategoryList>(response);

            string jsonString = JsonConvert.SerializeObject(drinkCategoryList);

            return jsonString;
        }



        public async Task<List<SimpleDrink>> GetDrinksForCategory(string categoryName)
        {
            var drinksWithlikesandDislikes = await GetLikesAndDisLikes();

            var dbDrinks = await _context.GetAddedDrinksFromDb(categoryName);

            var apiDrinks =  await _drinkCategoryRepository.GetDrinksForCategory(categoryName);

            apiDrinks.AddRange(dbDrinks);

            foreach (var apiDrink in apiDrinks)
            {
                var fouundDrink = drinksWithlikesandDislikes.Find(dbDrink => dbDrink.fetchID == apiDrink.IdDrink);
                if(fouundDrink != null)
                {
                    apiDrink.Likes = fouundDrink.Likes;
                    apiDrink.Dislikes = fouundDrink.Dislikes;
                }
                else
                {
                    apiDrink.Likes = 0;
                    apiDrink.Dislikes = 0;
                }

            }


            return apiDrinks;
        }




        public async Task<Drink> GetDrinkById(string id)
        {
            var response = await _drinkCategoryRepository.GetDrinkById(id);
            if (response == null)
            {
                response = await _context.GetDrinkByAddedDrinkId(id);
            }
            return response;


        }

        public async Task<AddedDrink?> UpdateAddedDrinkImageById(string idDrink, string imageName)
        {
            return await _context.UpdateAddedDrinkImageById(idDrink, imageName);
        }

        public async Task<List<DrinkDatabase>> GetLikesAndDisLikes()
        {
            return await _context.GetLikesAndDisLikes();
        }

        public async Task<List<DrinkDatabase>> PutLikesAndDisLikes()
        {
            return await _context.GetLikesAndDisLikes();
        }

        public async Task<LikeDislikeResponse> UpdateLikesAndDislikes(DrinkDatabase drink)
        {
            var result = await _context.UpdateLikesAndDisklikes(drink);

            return result;
           
        }

        public async Task<CommentResponse> PostComment(PostCommentViewModel comment, string idenityUserId)
        {

            IdentityUser identityUser = await _userManager.FindByIdAsync(idenityUserId);

            var result = await _context.AddComment(comment, identityUser.UserName);
            return result;
        }

        public async Task<List<Comment>> GetCommentsById(string id)
        {
            var result = await _context.GetCommentsById(id); 
            return result;
        }

        public async Task<Response> AddDrinkAsAdmin(AddedDrink drinkToAdd,List<Ingredient> ingredients)
        {
            var result = await _context.AddDrinkAsAdmin(drinkToAdd,ingredients);
            return result;
        }
    }
}
