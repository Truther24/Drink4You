
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
        public async Task<List<SimpleDrink>> GetAllOtherUknown()
        {
            return await _drinkCategoryRepository.GetAllOtherUnknown();
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
        }
        public async Task<List<SimpleDrink>> GetAllSoftDrinks()
        {
            return await _drinkCategoryRepository.GetAllSoftDrinks();
        }

        public async Task<Drink> GetDrinkById(string id)
        {
            return await _drinkCategoryRepository.GetDrinkById(id);
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

        internal async Task<List<Comment>> GetCommentsById(string id)
        {
            var result = await _context.GetCommentsById(id); 
            return result;
        }
    }
}
