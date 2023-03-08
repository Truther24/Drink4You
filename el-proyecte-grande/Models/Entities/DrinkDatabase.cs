using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace El_Proyecte_Grande.Models.Entities
{
    public class DrinkDatabase
    {
        public int ID { get; set; }
        public string fetchID { get; set; }
        public int Likes { get; set; }
        public bool Favorite { get; set; }
    }
}
