using el_proyecte_grande.Repositories;
using el_proyecte_grande.Services;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande.Controllers
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
