using El_Proyecte_Grande.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace El_Proyecte_Grande.Models
{
    public class DrinkContext : DbContext
    {

        public DbSet<User> Users { get; set; }




        public DrinkContext(DbContextOptions<DrinkContext> options) : base(options)
        {

        }
    }
}
