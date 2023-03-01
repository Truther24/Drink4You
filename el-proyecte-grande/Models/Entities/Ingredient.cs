using System.ComponentModel.DataAnnotations;

namespace El_Proyecte_Grande.Models.Entities
{
    public class Ingredient
    {
        public int IngredientId { get; set; }
        public string Name{ get; set; }
        public string IdDrink { get; set; }


    }
}
