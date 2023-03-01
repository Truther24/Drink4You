using System.ComponentModel.DataAnnotations;

namespace El_Proyecte_Grande.Models.Entities
{
    public class Ingredient
    {
        [Key]
        public int Id { get; set; }
        public string Name{ get; set; }

    }
}
