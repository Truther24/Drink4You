using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace El_Proyecte_Grande.Models.Entities
{
    public class AddedDrink
    {
        public int AddedDrinkID { get; set; }
        public string IdDrink { get; set; }
        public string StrDrink { get; set; }
        public string StrCategory { get; set; }
        public string StrAlcoholic { get; set; }
        public string StrGlass { get; set; }
        public string StrInstructions { get; set; }
        public string StrDrinkThumb { get; set; }


    }
}
