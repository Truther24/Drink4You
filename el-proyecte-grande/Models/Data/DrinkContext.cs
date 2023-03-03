using Azure.Core;
using El_Proyecte_Grande.Models.Entities;
using El_Proyecte_Grande.Models.ResponseModels;
using El_Proyecte_Grande.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices;

namespace El_Proyecte_Grande.Models.Data
{
    public class DrinkContext : IdentityDbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<DrinkDatabase> Drinks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<AddedDrink> AddedDrinks { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }


        public DrinkContext(DbContextOptions<DrinkContext> options) : base(options)
        {

        }

        public async Task<List<DrinkDatabase>> GetLikesAndDisLikes()
        {
            
            return await Drinks.ToListAsync();
        }

        public async Task<LikeDislikeResponse> UpdateLikesAndDisklikes(DrinkDatabase drink)
        {
            DrinkDatabase result = Drinks.Where(d => d.fetchID == drink.fetchID).FirstOrDefaultAsync().Result;


            if (result != null)
            {
                result.Dislikes = drink.Dislikes;
                result.Likes = drink.Likes;

                List<DrinkDatabase> listToReturn = new();
                listToReturn?.Add(result);

                try
                {

                    var r = await SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return new LikeDislikeResponse
                    {
                        Message = "There was an error",
                        IsSuccess = false,
                        Errors = ex
                    };
                }

                return new LikeDislikeResponse
                {
                    Message = "Updated succesfully",
                    DrinksDatabase = listToReturn,
                    IsSuccess = true
                };

            }
            else
            {
                DrinkDatabase newDrink = new DrinkDatabase()
                {
                    Dislikes = drink.Dislikes,
                    Likes = drink.Likes,
                    fetchID = drink.fetchID

                };
               await Drinks.AddAsync(newDrink);

                List<DrinkDatabase> listToReturn = new();
                listToReturn?.Add(newDrink);

                try
                {

                    var r = await SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return new LikeDislikeResponse
                    {
                        Message = "There was an error",
                        IsSuccess = false,
                        Errors = ex
                    };
                }

                return new LikeDislikeResponse
                {
                    Message = "Created new entry succesfully",
                    DrinksDatabase = listToReturn,
                    IsSuccess = true
                };
            }
        }

        public async Task<CommentResponse> AddComment(PostCommentViewModel comment, string userName)
        {


            Comment newComment = new()
            {
                IdDrink = comment.IdDrink,
                Message = comment.Message,
                AuthorName = userName,

            };

            Comments?.AddAsync(newComment);
            await SaveChangesAsync();


            return new CommentResponse
            {
                Message = "Comment added succesfully",
                IsSuccess = true,
                Comments = new List<Comment> { newComment }
            };
        }

        public async Task<List<Comment>> GetCommentsById(string id)
        {
            return await Comments.Where(x => x.IdDrink == id).ToListAsync();
        }

        public async Task<Response> AddDrinkAsAdmin(AddedDrink drinkToAdd, List<Ingredient> ingredients)
        {
            var newIdDrink = Guid.NewGuid().ToString();

            ingredients.ForEach(ingredient => ingredient.IdDrink = newIdDrink);
            ingredients.ForEach(ingredient => Ingredients.AddAsync(ingredient));


            AddedDrink addedDrink = new()
            {
                IdDrink = newIdDrink,
                StrDrink = drinkToAdd.StrDrink,
                StrCategory = drinkToAdd.StrCategory,
                StrAlcoholic = drinkToAdd.StrAlcoholic,
                StrGlass = drinkToAdd.StrGlass,
                StrInstructions = drinkToAdd.StrInstructions,
                StrDrinkThumb = drinkToAdd.StrDrinkThumb
            };


            await AddedDrinks.AddAsync(addedDrink);
            await SaveChangesAsync();


            return new Response { Message = "hope that drink was added successfully", IsSuccess = true };

        }

        public async Task<List<SimpleDrink>> GetAddedDrinksFromDb(string categoryName)
        {
            var dbAddedDrinks = await AddedDrinks.ToListAsync();

            var drinksToReturn = new List<SimpleDrink>();

            foreach (var drink in dbAddedDrinks)
            {
                if (drink.StrCategory == categoryName)
                {
                    drinksToReturn.Add(new SimpleDrink
                    {
                        StrDrink = drink.StrDrink,
                        StrDrinkThumb = drink.StrDrinkThumb,
                        IdDrink = drink.IdDrink
                    });
                }
            }
            return drinksToReturn;
        }


        public async Task<Drink> GetAddedDrinkById(string id)
        {
            var addedDrinks = await AddedDrinks.ToListAsync();

            foreach(var addedDrink in addedDrinks)
            {
                if(addedDrink.IdDrink== id)
                {
                    var ingredientsFromDb = await Ingredients.ToListAsync();
                    var ingredients = new List<string>();
                    foreach (var ingredientFromDb in ingredientsFromDb)
                    {
                        if(ingredientFromDb.IdDrink == id)
                        {
                            ingredients.Add(ingredientFromDb.Name);
                        }
                    }

                    return new Drink()
                    {
                        IdDrink = addedDrink.IdDrink,
                        StrAlcoholic = addedDrink.StrAlcoholic,
                        StrCategory = addedDrink.StrCategory,
                        StrGlass = addedDrink.StrGlass,
                        StrInstructions = addedDrink.StrInstructions,
                        StrIngredients = ingredients,
                        StrDrinkThumb = addedDrink.StrDrinkThumb

                    };
                }
            };
            return null;
        }
    }
}
