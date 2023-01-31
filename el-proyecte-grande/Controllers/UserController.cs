using El_Proyecte_Grande.Models.Entities;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Mvc;

namespace El_Proyecte_Grande.Controllers
{
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserService _service;
        public UserController(UserService userService)
        {
            _service = userService;
        }



        [HttpPost("/add-user")]
        public async Task CreateUser([FromBody] User user)
        {
           await _service.AddUser(user);

        }


        [HttpDelete("/delete-user/{id}")]
        public async Task Delete([FromRoute] Guid id)
        {
            await _service.DeleteUser(id);

        }


    }
}
