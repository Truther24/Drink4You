namespace El_Proyecte_Grande.Models
{
    public class Drink
    {
        public string IdDrink { get; set; } 
        public string StrDrink { get; set; }
        public string StrCategory { get; set; }
        public string StrAlcoholic { get; set; }
        public string StrGlass { get; set; }
        public string StrInstructions { get; set; }
        public string StrIngredient1 { get; set; }
        public string StrIngredient2 { get; set; }
        public string StrIngredient3 { get; set; }
        public string StrIngredient4 { get; set; }
        public string StrIngredient5 { get; set; }
        public string StrIngredient6 { get; set; }
        public string StrIngredient7 { get; set; }
        public string StrIngredient8 { get; set; }
        public List<string> StrIngredients { get; set; }
        public string StrDrinkThumb { get; set; }



        public Drink()
        {
            StrIngredients = new();
        }

    }
}
