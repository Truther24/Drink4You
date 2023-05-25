using El_Proyecte_Grande.Models.ResponseModels;
using El_Proyecte_Grande.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace El_Proyecte_Grande.Services
{
    public class UserService
    {

        private UserManager<IdentityUser> _userManager;

        private IConfiguration _configuration;

        private RoleService _roleService;


        public UserService(UserManager<IdentityUser> userManager, IConfiguration configuration, RoleService roleService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _roleService = roleService;
        }


        public async Task<Response> GetAllUsers()
        {
            return new Response
            {
                IdentityUsers = await _userManager.Users.ToListAsync(),
                IsSuccess = true,
                Message = " This is the list of users "
            };
        }


        public async Task<Response> AddUser(RegisterViewModel user)
        {
            if(user.Username.Length  < 5 || user.Username.Length > 12)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = "The length of your username must be between 5-12 characters."
                };
            }
            IdentityUser identityUserSameEmail = await _userManager?.FindByEmailAsync(user.Email);
            IdentityUser identityUserSameUsername = await _userManager?.FindByNameAsync(user.Username);

            if (identityUserSameEmail != null)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = "There is already an user with the same email."
                };
            }

            else if (identityUserSameUsername != null)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = "There is already an user with the same username "
                };
            }


            IdentityUser identityUser = new IdentityUser
            {
                Email = user.Email,
                UserName = user.Username
            };

            IdentityResult result = await _userManager.CreateAsync(identityUser, user.Password);

            if(!result.Succeeded)
            {
                return new Response
                {
                    IsSuccess = result.Succeeded,
                    Errors = result.Errors,
                    Message = "Something went wrong"
                };
            }

            var roleResult = await _roleService.AssignUserToRole(user.Username, "User");

            if(user.Username == "admin")
            {
                roleResult = await _roleService.AssignUserToRole(user.Username, "Admin");

            }

            if (!roleResult.IsSuccess)
            {
                return roleResult;
            }

            if (result.Succeeded)
            {
                return new Response
                {
                    IsSuccess = true,
                    Message = "Successfuly added an user"
                };
            }
            return new Response
            {
                IsSuccess = false,
                Message = "Could not add user",
                Errors = result.Errors
            };


        }



        public async Task<Response> DeleteUser(string id)
        {
            var result = await _userManager.DeleteAsync(await _userManager?.FindByIdAsync(id));
            if (result.Succeeded)
            {
                return new Response { IsSuccess = true, Message = "you have successfully deleted an user" };
            }
            return new Response { IsSuccess = false, Message = "there is no user with this ID", Errors = result.Errors };

        }




        public async Task<Response> DeleteAllUsers()
        {
            var result = await _userManager.Users.ExecuteDeleteAsync();
            if (result > 0)
            {
                return new Response { IsSuccess = true, Message = $"you have deleted {result} number of users" };
            }

            return new Response { IsSuccess = false, Message = "no users to delete" };
        }




        public async Task<Response> GetUserByID(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user is null)
            {
                return new Response { IsSuccess = false, Message = "there is no user with that ID" };
            }
            return new Response { IsSuccess = true, Message = $"The user is {user.UserName}", IdentityUsers = new List<IdentityUser> { user } };

        }




        public async Task<Response> UpdateUser(UpdateViewModel user, string id)
        {
            var result = await GetUserByID(id);
            if (!result.IsSuccess)
            {
                return new Response { IsSuccess = false, Message = "there is no such user" };
            }
            
            IdentityUser identityUser = result.IdentityUsers.First();

           var resultAfterChangingPass =  await _userManager.ChangePasswordAsync(identityUser, user.OldPassword, user.NewPassword);

            if (!(resultAfterChangingPass.Succeeded))
            {
                return new Response { IsSuccess = false, Errors=resultAfterChangingPass.Errors};
            }


            //identityUser.PasswordHash = _userManager.PasswordHasher.HashPassword(identityUser,user.NewPassword);
            identityUser.Email = user.Email;
            identityUser.UserName = user.Username;
            var afterUpdateResult = await _userManager.UpdateAsync(identityUser);

            if (!afterUpdateResult.Succeeded)
            {
                return new Response { IsSuccess = false, Message = "could not update the user", Errors = result.Errors };
            }
            return new Response { IsSuccess = true, Message = $"The user {identityUser.UserName} is updated ", IdentityUsers = new List<IdentityUser> { identityUser } };

        }



        public async Task<Response> Login(LoginViewModel user)
        {
            IdentityUser identityUser = await _userManager.FindByNameAsync(user.Username);

            if (identityUser == null)
            {
                return new Response { IsSuccess = false, Message = "Credentials Incorrect!" };

            }

            if (!await _userManager.CheckPasswordAsync(identityUser, user.Password))
            {
                return new Response { IsSuccess = false, Message = "Credentials Incorrect!" };
            }

            var usersRoleResult = await _roleService.GetAllRolesForUser(user.Username);

            var claims = new[]
                {
                new Claim("Username",identityUser.UserName),
                new Claim("Email",identityUser.Email),
                new Claim(ClaimTypes.NameIdentifier,identityUser.Id),
            };

            foreach (string role in usersRoleResult)
            {

                claims = claims.Concat(new Claim[] { new Claim(ClaimTypes.Role, role) }).ToArray();
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

            var token = new JwtSecurityToken(

                issuer: _configuration["AuthSettings:Issuer"],
                audience: _configuration["AuthSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(30),

                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

            string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

            return new Response { IsSuccess = true, Message = tokenAsString, ExpireDate = token.ValidTo, IdentityUsers = new List<IdentityUser> { identityUser } };
        }



    }
}
