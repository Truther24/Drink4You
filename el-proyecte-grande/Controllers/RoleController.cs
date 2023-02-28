using El_Proyecte_Grande.Models.ResponseModels;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace El_Proyecte_Grande.Controllers
{
    public class RoleController : Controller
    {
        private UserManager<IdentityUser> _userManager;


        private readonly RoleService _roleService;
        public RoleController(RoleService roleService, UserManager<IdentityUser> userManager)
        {
            this._roleService = roleService;
            _userManager = userManager;
        }

        [HttpPost("createRole")]
        public async Task<IActionResult> CreateRole([FromBody] string roleName)
        {
            Response response = await _roleService.CreateRole(roleName);

            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            
            return Ok(response);
        }

        [HttpGet("getAllRoles")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleService.GetAllRoles();

            return Ok(roles);
        }

        [HttpPost("assignRoleToUser")]
        public async Task<IActionResult> AssignUserToRole([FromBody] string userName, string roleName)
        {
            return Ok( await _roleService.AssignUserToRole(userName, roleName));
        }
    }
}
