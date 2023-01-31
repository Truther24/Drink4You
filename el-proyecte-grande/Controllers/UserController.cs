using El_Proyecte_Grande.Models.Entities;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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


        [HttpGet("/users")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok( await _service.GetAllUsers());
            
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



        [HttpDelete("/delete-users")]
        public async Task DeleteUsers()
        {
            await _service.DeleteAllUsers();

        }





        [HttpGet("/users/{id}")]
        public async Task<User> GetUserByID([FromRoute]Guid id)
        {
            return await _service.GetUserByID(id);
        }



        [HttpPut("/users/update/{id}")]
        public async Task UpdateUser([FromRoute] Guid id,[FromBody] User user)
        {
             await _service.UpdateUser(user);
        }


    }
}
