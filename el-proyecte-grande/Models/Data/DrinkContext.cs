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

        public async Task CreateUser(User user)
        {
            User newUser = new()
            {
                Id = Guid.NewGuid(),
                Username= user.Username,
                Email= user.Email,
                Passowrd= user.Passowrd,
            };

            await Users.AddAsync(newUser);
            await SaveChangesAsync();


        }

        public async Task DeleteUserByID(Guid id)
        {

            User? user = await Users.FindAsync(id);
            Users.Remove(user);
            await SaveChangesAsync();
        }




    }
}
