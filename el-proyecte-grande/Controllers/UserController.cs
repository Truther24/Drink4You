using El_Proyecte_Grande.Models.Entities;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
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
            return Ok(await _service.GetAllUsers());
        }


        [HttpPost("/add-user")] 
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (await _service.AddUser(user))
            {
                return Ok(user);
            }

            return BadRequest();

        }


        [HttpDelete("/delete-user/{id}")] 
        public async Task Delete([FromRoute] string id)
        {
            await _service.DeleteUser(id);

        }


        [HttpDelete("/delete-users")] 
        public async Task DeleteUsers()
        {
            await _service.DeleteAllUsers();

        }



        [HttpGet("/users/{id}")]  
        public async Task<IActionResult> GetUserByID([FromRoute] string id)
        {
            return Ok(await _service.GetUserByID(id));
        }



        [HttpPut("/users/update/{id}")] 
        public async Task UpdateUser([FromRoute] string id, [FromBody] User user)
        {
            await _service.UpdateUser(user,id);
        }


        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            IdentityUser checkedUser = await _service.Login(user);


            if (checkedUser != null)
            {
                return Ok(checkedUser);
            }

            return BadRequest(checkedUser);
        }

    }
}
