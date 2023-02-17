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
    }
}
