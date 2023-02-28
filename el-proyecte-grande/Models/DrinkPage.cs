using El_Proyecte_Grande.Models.Entities;

namespace El_Proyecte_Grande.Models
{
    public class DrinkPage
    {
        public Drink Drink { get; set; }
        public List<Comment> Comments { get; set; }
        public DrinkPage()
        {
            List<Comment> comments = new List<Comment>();
        }
    }
}
