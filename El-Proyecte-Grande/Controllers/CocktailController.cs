using El_Proyecte_Grande.Repositories;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Mvc;

namespace El_Proyecte_Grande.Controllers
{
    [ApiController]
    public class CocktailController : Controller
    {
        private readonly SimpleCocktailService simpleCocktailService;

        public CocktailController(SimpleCocktailService simpleCocktailService)
        {
            this.simpleCocktailService = simpleCocktailService;
        }
        

        [HttpGet("cocktails")]
        public async Task<IActionResult >Cocktails()
        {
            var cocktails = await simpleCocktailService.GetALlCocktails();
            return Ok(cocktails);
        }
    }
}
