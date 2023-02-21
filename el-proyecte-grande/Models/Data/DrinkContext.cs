using El_Proyecte_Grande.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace El_Proyecte_Grande.Models.Data
{
    public class DrinkContext : IdentityDbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<DrinkDatabase> Drinks { get; set; }

        public DrinkContext(DbContextOptions<DrinkContext> options) : base(options)
        {

        }

        public Task<List<DrinkDatabase>> GetLikesAndDisLikes()
        {
            return Drinks.ToListAsync();
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

                    var r = SaveChangesAsync();
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
                Drinks.AddAsync(newDrink);

                List<DrinkDatabase> listToReturn = new();
                listToReturn?.Add(newDrink);

                try
                {

                    var r = SaveChangesAsync();
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
    }
}
