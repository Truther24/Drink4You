using El_Proyecte_Grande.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace El_Proyecte_Grande.Models.Data
{
    public class DrinkContext : DbContext
    {

        public DbSet<User> Users { get; set; }




        public DrinkContext(DbContextOptions<DrinkContext> options) : base(options)
        {

        }


        public Task<List<User>> GetAllUsers()
        {
            return Users.ToListAsync();
        }



        public async Task<bool> CreateUser(User user)
        {
            if (Users == null)
            {
                User newUser = new()
                {
                    Id = Guid.NewGuid(),
                    Username = user.Username,
                    Email = user.Email,
                    Passowrd = user.Passowrd
                };


                await Users.AddAsync(newUser);
                await SaveChangesAsync();
                return true;

                
            }
            else
            {
                if (Users.All(dbUser => dbUser.Username != user.Username) && Users.All(dbUser => dbUser.Email != user.Email) && Users.All(dbUser => dbUser.Passowrd != user.Passowrd))
                {
                    User newUser = new()
                    {
                        Id = Guid.NewGuid(),
                        Username = user.Username,
                        Email = user.Email,
                        Passowrd = user.Passowrd,
                    };


                    await Users.AddAsync(newUser);
                    await SaveChangesAsync();
                    return true;

                }
            }

            return false;

        }

        public async Task DeleteUserByID(Guid id)
        {

            User? user = await Users.FindAsync(id);
            Users.Remove(user);
            await SaveChangesAsync();
        }

        public async Task<User> GetUserByID(Guid id)
        {
            return await Users.FindAsync(id);
        }


        public async Task UpdateUser(User user)
        {
            Users.Update(user);
            await SaveChangesAsync();

        }


        public async Task DeleteAllUsers()
        {
            Users.RemoveRange(Users);
            await SaveChangesAsync();
        }

        public async Task<User> Login(User user)
        {
            foreach(User dbUser in Users)
            {
                if(dbUser.Username == user.Username && dbUser.Passowrd == user.Passowrd )
                {
                    return dbUser;
                }
            }

            return null;
        }
    }
}
