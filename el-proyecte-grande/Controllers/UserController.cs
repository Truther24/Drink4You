using El_Proyecte_Grande.Models;
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
            var result = await _service.GetAllUsers();
            return Ok(result);

        }


        [HttpPost("/add-user")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            var result = await _service.AddUser(user);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);

        }


        [HttpDelete("/delete-user/{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
           var result =  await _service.DeleteUser(id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);

        }


        [HttpDelete("/delete-users")]
        public async Task<IActionResult> DeleteUsers()
        {
            var result = await _service.DeleteAllUsers();
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);


        }



        [HttpGet("/users/{id}")]
        public async Task<IActionResult> GetUserByID([FromRoute] string id)
        {
            var result = await _service.GetUserByID(id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);


        }



        [HttpPut("/users/update/{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] string id, [FromBody] User user)
        {
            var result = await _service.UpdateUser(user, id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var result =  await _service.Login(user);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

    }
}
