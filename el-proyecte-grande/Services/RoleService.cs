using El_Proyecte_Grande.Models.ResponseModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace El_Proyecte_Grande.Services
{
    public class RoleService
    {
        private UserManager<IdentityUser> _userManager;

        private IConfiguration _configuration;

        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleService(UserManager<IdentityUser> userManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _configuration = configuration;
            _roleManager = roleManager;
        }

        public async Task<Response> CreateRole(string roleName)
        {
            var roleResult = await _roleManager.RoleExistsAsync(roleName);

            if (!roleResult)
            {
                IdentityResult result = await _roleManager.CreateAsync(new IdentityRole(roleName));

                if (result.Succeeded)
                {

                    return new Response()
                    {
                        Message="Role added successfully!",
                        IsSuccess=true

                    };
                }
                else
                {
                    return new Response()
                    {
                        Message = "Role not added successfully!",
                        IsSuccess = false

                    };
                }


            }

            return new Response()
            {
                Message = "Role already exists!",
                IsSuccess = false

            };


        }

        public async Task<List<IdentityRole>> GetAllRoles()
        {
            return await _roleManager.Roles.ToListAsync();
        }

        public async Task<List<string>> GetAllRolesForUser(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var roles = await _userManager.GetRolesAsync(user);

            return roles.ToList();
        }

        public async Task<Response> AssignUserToRole(string userName, string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return new Response()
                {
                    Message = "User does not exist!",
                    IsSuccess = false
                };
            }

            var roleExists = await _roleManager.RoleExistsAsync(roleName);

            if (!roleExists)
            {
                return new Response()
                {
                    Message = "Role does not exist",
                    IsSuccess = false
                };
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return new Response()
                {
                    Message = "Role added to user successfully!",
                    IsSuccess = true
                };
            }

            return new Response()
            {
                Message = "Could not add role to user!",
                IsSuccess = false
            };
        }
    }
}
